/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Observable, ObservableInput, SchedulerLike } from "rxjs";
import {
  asapScheduler,
  asyncScheduler,
  concat,
  defer,
  from,
  queueScheduler,
  scheduled,
  tap,
  throwError,
} from "rxjs";
import {
  scheduleSubscription,
  SubscriptionScheduler,
} from "../../components-react/common/SubscriptionScheduler";
import { ResolvablePromise } from "../test-helpers/misc";
import {
  extractSequence,
  waitForUnsubscription,
} from "./ObservableTestHelpers";

async function expectSequence<T>(
  expectedSequence: T[],
  observable: Observable<T>
): Promise<void> {
  const actualSequence = await extractSequence(observable);
  expect(actualSequence).to.eql(expectedSequence);
}

describe("SubscriptionScheduler", () => {
  let subscriptionScheduler: SubscriptionScheduler<number>;

  beforeEach(() => {
    subscriptionScheduler = new SubscriptionScheduler();
  });

  describe("scheduleSubscription", () => {
    // Affects when input observables emit values to `SubscriptionScheduler`.
    const schedulers: Array<[string, undefined | SchedulerLike]> = [
      ["no", undefined],
      ["queue", queueScheduler],
      ["asap", asapScheduler],
      ["async", asyncScheduler],
    ];

    // Creates an observable which emits values using the specified `rxjs` scheduler
    function createScheduledObservable<T>(
      sequence: ObservableInput<T>,
      scheduler: undefined | SchedulerLike
    ): Observable<T> {
      return scheduler ? scheduled(sequence, scheduler) : from(sequence);
    }

    for (const [schedulerName, scheduler] of schedulers) {
      const sequence = [0, 1, 2];

      describe(`with ${schedulerName} scheduler`, () => {
        it("schedules source observable and subscribes to it", async () => {
          const source = createScheduledObservable(sequence, scheduler);
          const subscriptionSpy = vi.spyOn(source, "subscribe");
          await expectSequence(
            sequence,
            subscriptionScheduler.scheduleSubscription(source)
          );
          expect(subscriptionSpy).to.have.been.calledOnce;
        });

        it("schedules source observables in subscription order", async () => {
          const firstSource = createScheduledObservable(sequence, scheduler);
          const firstSubscriptionSpy = vi.spyOn(firstSource, "subscribe");
          const firstScheduledObservable =
            subscriptionScheduler.scheduleSubscription(firstSource);

          const secondSource = createScheduledObservable(sequence, scheduler);
          const secondSubscriptionSpy = vi.spyOn(secondSource, "subscribe");
          const secondScheduledObservable =
            subscriptionScheduler.scheduleSubscription(secondSource);

          expect(firstSubscriptionSpy).to.have.not.been.called;
          expect(secondSubscriptionSpy).to.have.not.been.called;

          const secondObservableSubscription =
            secondScheduledObservable.subscribe();
          const firstObservableSubscription =
            firstScheduledObservable.subscribe();

          await waitForUnsubscription(secondObservableSubscription);
          await waitForUnsubscription(firstObservableSubscription);
          expect(secondSubscriptionSpy.calledBefore(firstSubscriptionSpy)).to.be
            .true;
          expect(firstSubscriptionSpy).to.have.been.calledOnce;
          expect(secondSubscriptionSpy).to.have.been.calledOnce;
        });

        it("reschedules the same observable source after it has been completed", async () => {
          const source = createScheduledObservable(sequence, scheduler);
          const subscriptionSpy = vi.spyOn(source, "subscribe");

          const firstScheduledObservable =
            subscriptionScheduler.scheduleSubscription(source);
          await waitForUnsubscription(firstScheduledObservable.subscribe());

          const secondScheduledObservable =
            subscriptionScheduler.scheduleSubscription(source);
          await waitForUnsubscription(secondScheduledObservable.subscribe());

          expect(subscriptionSpy).toHaveBeenCalledTimes(2);
        });

        it("subscribes to one source observable at a time", async () => {
          const firstCompleteSpy = vi.fn();
          const firstSource = createScheduledObservable(
            sequence,
            scheduler
          ).pipe(tap({ complete: firstCompleteSpy }));
          const secondNextSpy = vi.fn();
          const secondSource = createScheduledObservable(
            sequence,
            scheduler
          ).pipe(tap({ next: secondNextSpy }));

          const firstSubscription = subscriptionScheduler
            .scheduleSubscription(firstSource)
            .subscribe();
          const secondSubscription = subscriptionScheduler
            .scheduleSubscription(secondSource)
            .subscribe();

          await waitForUnsubscription(firstSubscription);
          await waitForUnsubscription(secondSubscription);

          expect(firstCompleteSpy).to.have.been.calledBefore(secondNextSpy);
        });

        it("does not subscribe to the next observable until the first one is resolved", async () => {
          const firstSourcePromise1 = new ResolvablePromise<number>();
          const firstSourcePromise2 = new ResolvablePromise<number>();
          const firstSource = createScheduledObservable(
            concat(firstSourcePromise1, firstSourcePromise2),
            scheduler
          );

          const secondSource = createScheduledObservable(sequence, scheduler);
          const secondSpy = vi.spyOn(secondSource, "subscribe");

          const firstSubscription = subscriptionScheduler
            .scheduleSubscription(firstSource)
            .subscribe();
          subscriptionScheduler.scheduleSubscription(secondSource).subscribe();

          await firstSourcePromise1.resolve(0);
          expect(secondSpy).not.toBeCalled();

          await firstSourcePromise2.resolve(1);
          await waitForUnsubscription(firstSubscription);
          expect(secondSpy).toHaveBeenCalled();
        });

        it("notifies subscribers about error in source observable", async () => {
          const error = new Error("TestError");
          const source = createScheduledObservable(
            throwError(() => error),
            scheduler
          );
          const errorSpy = vi.fn();

          const scheduledObservable =
            subscriptionScheduler.scheduleSubscription(source);
          await waitForUnsubscription(
            scheduledObservable.subscribe({ error: errorSpy })
          );

          expect(errorSpy).toHaveBeenCalledWith(error);
        });

        it("schedules the following observable when the previous one emits error", async () => {
          const error = new Error("TestError");
          const firstSource = createScheduledObservable(
            throwError(() => error),
            scheduler
          );
          const secondSource = createScheduledObservable(sequence, scheduler);

          const errorSpy = vi.fn();
          const firstSubscription = subscriptionScheduler
            .scheduleSubscription(firstSource)
            .subscribe({ error: errorSpy });
          const nextSpy = vi.fn();
          const completeSpy = vi.fn();
          const secondSubscription = subscriptionScheduler
            .scheduleSubscription(secondSource)
            .subscribe({ next: nextSpy, complete: completeSpy });

          await waitForUnsubscription(firstSubscription);
          await waitForUnsubscription(secondSubscription);

          expect(errorSpy).toHaveBeenCalledWith(error);
          expect(errorSpy).to.have.been.calledBefore(nextSpy);
          expect(nextSpy).to.have.been.calledThrice;
          expect(completeSpy).to.have.been.calledAfter(nextSpy);
        });

        it("does not subscribe to source observable after schedule cancellation", async () => {
          const onSubscribe = sinon.fake(() =>
            createScheduledObservable(sequence, scheduler)
          );
          const source = defer<Observable<number>>(onSubscribe);
          subscriptionScheduler
            .scheduleSubscription(source)
            .subscribe()
            .unsubscribe();
          await Promise.resolve();
          expect(onSubscribe).not.toBeCalled();
        });
      });
    }
  });
});

describe("scheduleSubscription", () => {
  it("calls SubscriptionScheduler", () => {
    const scheduler = new SubscriptionScheduler();
    const schedulerSpy = vi.spyOn(scheduler, "scheduleSubscription");
    const source = from([0, 1, 2]);
    source.pipe(scheduleSubscription(scheduler)).subscribe();
    expect(schedulerSpy).toHaveBeenCalledWith(source);
  });
});
