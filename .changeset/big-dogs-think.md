---
"@itwin/components-react": minor
---

Deprecated `dispose` method of `FilteringPropertyDataProvider` and `TreeEventHandler` classes which is defined in now deprecated `IDisposable` interface from `@itwin/core-bentley` package.

In version `5.2`, TypeScript [introduced](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management) `Disposable` type and `using` declarations (from the upcoming [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management) feature in ECMAScript).

Consumers should use `Symbol.dispose` instead, which is polyfilled by the AppUI package.

```ts
// Before #1
const handler = new TreeEventHandler();
handler.dispose();

// Before #2 when using `using` utility from `@itwin/core-bentley`
using(new TreeEventHandler(), (handler) => {
  // Do something with handler, it'll get disposed when the callback returns
});

// After
using handler = new TreeEventHandler();
// Do something with handler, it'll get disposed when it goes out of scope
```
