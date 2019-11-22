---
date: "2019-11-21"
template: "post"
draft: true
slug: "/posts/advanced-css-layouts-notes/"
category: "What I Read"
tags:
  - "React"
  - "Frontend Masters"
description: 'Notes from a live workshop I attended. (Course tagline: "As client-side applications increase in complexity, frontend developers need to manage more and more state. A number of solutions have been built into React over the last few years. But which one is the best for your needs? What are the differences, advantages, and trade-offs?")'
---

Understanding 'State'

- TL;DR of React: app_state => DOM_nodes
- Sure, there's vdom diffing, etc: but the most important thing is that it allows for ease of state-management on the client
- Common 'state' constituents:
  - Model data
  - Location state (which file, via URL/params? or, if client-side routing, which JS-based 'location'?)
  - View/UI state (e.g. UI-based sort, filter, etc of indexes)
  - Session state (user logged in?)
  - Network-request state
- Above often condensed to: Model state, and 'ephemeral' state
- Great take: "anything with clear rules can be abstracted to the library/language/compiler -- the tough/bad choices/tradeoffs are the ones the devs must make."

Refresher: `this.setState()`

- Don't forget: `this.setState()` is asynchronous (to avoid unnecessary rerenders)
- Also don't forget: `this.setState({stateObject: goesHere})` _queues_ up state changes
  - it batches them (via `Object.assign({}, eachCallToState, nowCallToState, anotherCallToState)
  - As such, calling multiple identical calls to `setState` inside a method will only occur once; they just overwrite each other.)
  - However, `this.setState(state => {state.key = new_value})` will _not_ merge (b/c series of function-definitions, not objects)
    - If called multiple times, it'll actually execute multiple times.
    - Note that `return`ing `undefined` _here_ will result in the state not being updated; this isn't the case with e.g. `setCount` below
- Reminder: using (the arrow function && static-property assignment) _inside_ the class for the definition of the function is what binds the method to the (instance, not class) of the component (vs `this.myMethod = this.myMethod.bind(this)` inside the `constructor`)
- `localStorage` only allows the storage of strings, so you'll want to
  - `JSON.parse` anything that you `localStorage.getItem('myKeyName')`, and
  - `JSON.stringify` anything that you `localStorage.setItem('myKeyName', JSON.stringify(myNestedData))`
  - note `localStorage` also has a `clear()` method
- Careful: the callback function (that is, the second argument) to `this.setState` does _not_ get passed `state`/`props` as arguments
  - Only the first argument, the state-setter, does.
  - Alternatives: define callback elsewhere, then pass the fn with `myCallback.bind(this)`; or pass `this.state` as a direct parameter
- Anti-Patterns in `this.state`
  - No `PropTypes` in state: need to use e.g. TypeScript
  - Don't use `this.state` for anything that _doesn't_ need to trigger a rerender: if it's not used inside `render()`, don't put it in `this.state`
  - Don't use `this.state` for anything computed from props:
    - If simple, just compute it inside the `render()`
    - If complex, `get` keyword method inside class

Now: `hooks`!

- Generically speaking, in `const [count, setCount] = React.useState(0);`...
  - the return is destructured into [state, setState], passing `0` as the initial value
  - it's destructured into an array so that JS can use the index (rather than the hash-key's name) -- allowing for flexible naming
- `setCount` is asynchronous, and composes when passed an obj (like passing an obj to `this.setState`): the same `setCount` three times will only occur once
- `setCount` behavior when passed a fn-definition is also the same as `this.setState` (will occur three times)
- `setCount` is _not_ passed `props`, only state
- `setCount` does _not_ have the second-param (the callback) that `this.setState` does
- Instead, you call `useEffect` (which is short for `sideEffect` -- that is, anything _other_ than the `return` value)
- `useEffect` takes two args:
  - the callback-fn-definition as its first arg
  - `deps`, an array of dependencies which will trigger the `useEffect` whenever they change
    - if the array is empty, it'll only run the first time, a la `componentDidMount`
    - if there's no array, it'll run _every_ time state changes
  - `useEffect` executes that function _after_ the render occurs; if you want to execute a(nother) function immediately _before_ removal of the component (for e.g. cleanup), `return` that fn's definition from `useEffect`
- See the composition of `useLocalStorage` for how to combine e.g. `useState` and `useEffect` into a custom hook.
- Stash a hook's value in `useRef` to create a persistent state-storage that a hook's function can use across callings:

  ```javascript
  const countRef = React.useRef();
  let message = "";

  if (countRef.current < count) message = "Higher";
  if (countRef.current > count) message = "Lower";

  countRef.current = count;
  ```

- (more more-specific hooks [here](https://reactjs.org/docs/hooks-reference.html#additional-hooks))
- Side note: `setInterval` returns an id; you can remove it via e.g. `clearInterval(my_setInt_id)`

Now: `useReducer`!

- Hey, remember Miles' format for Redux actions? Turns out it was following a [flux convention!](https://github.com/redux-utilities/flux-standard-action)
- In `const [deeplyNestedState, myRadDispatch] = useReducer(myDopeReducer, initialCount, initializerFn);`, the third argument is optional (you can also pass two arguments; the `initialCount` will be set directly)
- You'd assign `() => myRadDispatch(_probably-FSA-prescribed-args_)` to an e.g. `onClick`; then
- `myDopeReducer` would receive both `deeplyNestedState` and the FSA-prescribed-args, and execute whatever code you'd included therein

For performance, consider implementing logic to prevent unnecessary re-rendering.

- Initial option: `React.memo` is a higher order component
  - Similar to `React.PureComponent` (but for function components instead of classes.)
  - By default, only shallowly-compares complex objects in the `props` object.
  - As alternative, can provide a custom comparison function as the second argument.
- `useCallback` and `useMemo` are similar
  - Former returns the fn, to be called; latter gives you the result of the fn
  - `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`
  - `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
  - `useMemo` will only recompute `memoizedValue` when `a` or `b` has changed.

Now: props drilling, and the Context API

- Pre-hooks, `const FooContext = createContext(myPropsObj)` will create the need for two components, `FooContext.Provider` and `FooContext.Consumer`
- With hooks, you would extract the context-values (inside whichever component function needs them) via `const gotMyPropsObjBack = useContext(FooContext)`
- Note hooks does _not_ replace `FooContext.Provider`; you still need to establish that component at e.g. the top of the tree
- This pattern pairs nicely with abstracting `FooContext.Provider` (and its `createContext()`) into an HOC/render-prop-using component named e.g. `GrudgeProvider`
- Note that this pattern precludes the perf-optimization of `useMemo`/`useCallback`/`React.memo`

Now: fetching data

- He mentions this in "prefer hashes over arrays", but in greater detail I _believe_ the same point is being made in the [redux docs](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
- For managing the request-state
  - You _could_ use one `useState` hook per request-state (loading, error, etc) -- but that rapidly becomes redundant/WET
  - Better to extract into a separate, custom hook... or parts of a `useReducer`
- With `useEffect()`, promise-chaining for e.g. HTTP-requests often works better than `async/await`
  - You can't pass an `async () => {}` fn directly as the first parameter.
  - You could define such a fn, then call it, inside a normal fn -- and pass that. But it feels gross.
- A thunk is a fn returned by fn (so it can be executed later)
  - Thunks are passed to the reducer by actions, such that the thunk can be executed later -- after an async even has finished
  - It's a little tricky: you're essentially overwriting both `dispatch` and `reducer` to allow for asynchronicity
    - They'll check whether `action` is a function (and, if so, execute it before running `dispatch` on whatever's returned)
    - See [here](https://github.com/stevekinney/star-wars-characters-react-state#refactoring-to-a-reducer) for the code changes in detail.
  - `useMiddleware` = npm lib that provides many current Redux-lib plugins, within the hooks ecosystem

Time-travel/undo-redo

- See the `exercise-redo` branch of `grudges` for how this works - it's essentially a `pop` and `push` within the state
