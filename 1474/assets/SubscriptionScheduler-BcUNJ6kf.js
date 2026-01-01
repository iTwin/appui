import { bP as createErrorClass, bQ as __extends, bR as EMPTY_SUBSCRIPTION, bS as Subscription, bT as arrRemove, bU as Observable, bV as errorContext, bW as __values, bX as __spreadArray, bY as __read, bZ as AsyncAction, b_ as AsyncScheduler, b$ as innerFrom, c0 as OperatorSubscriber, c1 as noop, c2 as operate, c3 as SafeSubscriber, c4 as identity, c5 as createOperatorSubscriber, c6 as isFunction, c7 as mergeMap, c8 as observeOn, c9 as subscribeOn } from "./appui-react-CxqBCL1K.js";
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable = new Observable();
    observable.source = this;
    return observable;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }
  return false;
}
var Immediate = {
  setImmediate: function(cb) {
    var handle = nextHandle++;
    activeHandles[handle] = true;
    if (!resolved) {
      resolved = Promise.resolve();
    }
    resolved.then(function() {
      return findAndClearHandle(handle) && cb();
    });
    return handle;
  },
  clearImmediate: function(handle) {
    findAndClearHandle(handle);
  }
};
var setImmediate = Immediate.setImmediate, clearImmediate = Immediate.clearImmediate;
var immediateProvider = {
  setImmediate: function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return setImmediate.apply(void 0, __spreadArray([], __read(args)));
  },
  clearImmediate: function(handle) {
    return clearImmediate(handle);
  },
  delegate: void 0
};
var AsapAction = function(_super) {
  __extends(AsapAction2, _super);
  function AsapAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay !== null && delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
  };
  AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
    var _a;
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null ? delay > 0 : this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
    }
    var actions = scheduler.actions;
    if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
      immediateProvider.clearImmediate(id);
      if (scheduler._scheduled === id) {
        scheduler._scheduled = void 0;
      }
    }
    return void 0;
  };
  return AsapAction2;
}(AsyncAction);
var AsapScheduler = function(_super) {
  __extends(AsapScheduler2, _super);
  function AsapScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  AsapScheduler2.prototype.flush = function(action) {
    this._active = true;
    var flushId = this._scheduled;
    this._scheduled = void 0;
    var actions = this.actions;
    var error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsapScheduler2;
}(AsyncScheduler);
var asapScheduler = new AsapScheduler(AsapAction);
var QueueAction = function(_super) {
  __extends(QueueAction2, _super);
  function QueueAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  QueueAction2.prototype.schedule = function(state, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay > 0) {
      return _super.prototype.schedule.call(this, state, delay);
    }
    this.delay = delay;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  };
  QueueAction2.prototype.execute = function(state, delay) {
    return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
  };
  QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null && delay > 0 || delay == null && this.delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }
    scheduler.flush(this);
    return 0;
  };
  return QueueAction2;
}(AsyncAction);
var QueueScheduler = function(_super) {
  __extends(QueueScheduler2, _super);
  function QueueScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return QueueScheduler2;
}(AsyncScheduler);
var queueScheduler = new QueueScheduler(QueueAction);
var EMPTY = new Observable(function(subscriber) {
  return subscriber.complete();
});
function defer(observableFactory) {
  return new Observable(function(subscriber) {
    innerFrom(observableFactory()).subscribe(subscriber);
  });
}
var DEFAULT_CONFIG = {
  connector: function() {
    return new Subject();
  },
  resetOnDisconnect: true
};
function connectable(source, config) {
  if (config === void 0) {
    config = DEFAULT_CONFIG;
  }
  var connection = null;
  var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
  var subject = connector();
  var result = new Observable(function(subscriber) {
    return subject.subscribe(subscriber);
  });
  result.connect = function() {
    if (!connection || connection.closed) {
      connection = defer(function() {
        return source;
      }).subscribe(subject);
      if (resetOnDisconnect) {
        connection.add(function() {
          return subject = connector();
        });
      }
    }
    return connection;
  };
  return result;
}
function iif(condition, trueResult, falseResult) {
  return defer(function() {
    return condition() ? trueResult : falseResult;
  });
}
var isArray = Array.isArray;
function argsOrArgArray(args) {
  return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
function onErrorResumeNext() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  var nextSources = argsOrArgArray(sources);
  return new Observable(function(subscriber) {
    var sourceIndex = 0;
    var subscribeNext = function() {
      if (sourceIndex < nextSources.length) {
        var nextSource = void 0;
        try {
          nextSource = innerFrom(nextSources[sourceIndex++]);
        } catch (err) {
          subscribeNext();
          return;
        }
        var innerSubscriber = new OperatorSubscriber(subscriber, void 0, noop, noop);
        nextSource.subscribe(innerSubscriber);
        innerSubscriber.add(subscribeNext);
      } else {
        subscriber.complete();
      }
    };
    subscribeNext();
  });
}
function finalize(callback) {
  return operate(function(source, subscriber) {
    try {
      source.subscribe(subscriber);
    } finally {
      subscriber.add(callback);
    }
  });
}
function onErrorResumeNextWith() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  var nextSources = argsOrArgArray(sources);
  return function(source) {
    return onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources)));
  };
}
function share(options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.connector, connector = _a === void 0 ? function() {
    return new Subject();
  } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
  return function(wrapperSource) {
    var connection;
    var resetConnection;
    var subject;
    var refCount = 0;
    var hasCompleted = false;
    var hasErrored = false;
    var cancelReset = function() {
      resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
      resetConnection = void 0;
    };
    var reset = function() {
      cancelReset();
      connection = subject = void 0;
      hasCompleted = hasErrored = false;
    };
    var resetAndUnsubscribe = function() {
      var conn = connection;
      reset();
      conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
    };
    return operate(function(source, subscriber) {
      refCount++;
      if (!hasErrored && !hasCompleted) {
        cancelReset();
      }
      var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
      subscriber.add(function() {
        refCount--;
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
        }
      });
      dest.subscribe(subscriber);
      if (!connection && refCount > 0) {
        connection = new SafeSubscriber({
          next: function(value) {
            return dest.next(value);
          },
          error: function(err) {
            hasErrored = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnError, err);
            dest.error(err);
          },
          complete: function() {
            hasCompleted = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnComplete);
            dest.complete();
          }
        });
        innerFrom(source).subscribe(connection);
      }
    })(wrapperSource);
  };
}
function handleReset(reset, on) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  if (on === true) {
    reset();
    return;
  }
  if (on === false) {
    return;
  }
  var onSubscriber = new SafeSubscriber({
    next: function() {
      onSubscriber.unsubscribe();
      reset();
    }
  });
  return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}
function tap(observerOrNext, error, complete) {
  var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
  return tapObserver ? operate(function(source, subscriber) {
    var _a;
    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    var isUnsub = true;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var _a2;
      (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
      subscriber.next(value);
    }, function() {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      subscriber.complete();
    }, function(err) {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
      subscriber.error(err);
    }, function() {
      var _a2, _b;
      if (isUnsub) {
        (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      }
      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : identity;
}
const MAX_CONCURRENT_SUBSCRIPTIONS = 1;
class SubscriptionScheduler {
  _scheduler = new Subject();
  constructor() {
    this._scheduler.pipe(mergeMap((sourceObservable) => sourceObservable.pipe(
      // connect source observable when scheduler subscribes
      tap({
        subscribe: () => {
          sourceObservable.connect();
        }
      }),
      // Guard against stack overflow when a lot of observables are scheduled. Without this operation `mergeMap`
      // will process each observable that is present in the pipeline recursively.
      observeOn(queueScheduler),
      // Delay the connection until another event loop task
      subscribeOn(asapScheduler),
      // Ignore errors in this pipeline without suppressing them for other subscribers
      onErrorResumeNextWith()
    ), MAX_CONCURRENT_SUBSCRIPTIONS)).subscribe();
  }
  /**
   * Schedules `source` for subscription in the current scheduler.
   *
   * The actual scheduling is performed when the returned observable is subscribed to. To cancel, remove all subscribers
   * from the returned observable.
   *
   * @param source Input observable for which to schedule a subscription.
   * @returns Hot observable which starts emitting `source` values after subscription.
   */
  scheduleSubscription(source) {
    return defer(() => {
      let unsubscribed = false;
      const connectableObservable = connectable(iif(() => unsubscribed, EMPTY, source), {
        connector: () => new Subject(),
        resetOnDisconnect: false
      });
      this._scheduler.next(connectableObservable);
      return connectableObservable.pipe(finalize(() => unsubscribed = true));
    });
  }
}
function scheduleSubscription(scheduler) {
  return (source) => scheduler.scheduleSubscription(source);
}
export {
  EMPTY as E,
  SubscriptionScheduler as S,
  scheduleSubscription as a,
  Subject as b,
  asapScheduler as c,
  defer as d,
  finalize as f,
  share as s
};
