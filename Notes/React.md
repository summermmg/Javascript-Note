# React Review
## Table of contents
  - [Hooks](#hooks)
  - [Redux](#redux)
  - [React-Redux](#react-redux)
  - [Reference](#reference)


## Hooks
>Hooks are functions that let you “hook into” React state and lifecycle features from function components. 
### State Hook
We call `useState` inside a function component to add some local state to it. 

```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
#### Functional updates
If the new state is computed using the previous state, you can pass a function to `setState`. The function will receive the previous value, and return an updated value. Here’s an example of a counter component that uses both forms of `setState`:
```
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```
### Effect Hook
You’ve likely performed data fetching, subscriptions, or manually changing the DOM from React components before. We call these operations “side effects” because they can affect other components and can’t be done during rendering. **Put 'side effect' operations in useEffect hook.** 
>By default, React runs the effects after every render — including the first render. but you can choose to fire them only when certain values have changed.

React guarantees the DOM has been updated by the time it runs the effects.

#### Effects Without Cleanup
Sometimes, we want to **run some additional code after React has updated the DOM**. Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup. We say that because we can run them and immediately forget about them. 
#### Effects With Cleanup
For example, we might want to set up a subscription to some external data source. In that case, it is important to clean up so that we don’t introduce a memory leak!
#### What can I do if my effect dependencies change too often?
Sometimes, your effect may be using state that changes too often. You might be tempted to omit that state from a list of dependencies, but that usually leads to bugs:
```
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
}
```
The empty set of dependencies, `[]`, means that the effect will only run once when the component mounts, and not on every re-render. The problem is that inside the `setInterval` callback, the value of `count` does not change, because we’ve created a closure with the value of `count` set to `0` as it was when the effect callback ran. Every second, this callback then calls `setCount(0 + 1)`, so the count never goes above 1.

Specifying `[count]` as a list of dependencies would fix the bug, but would cause the interval to be reset on every change. To fix this, we can use the functional update form of `setState`. It lets us specify how the state needs to change without referencing the current state:
```
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope

  return <h1>{count}</h1>;
}
```
### Additional Hooks 
#### `useReducer` (same as reducer concept in Redux)
```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
`useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. 
```
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### `useCallback`
Pass an inline callback and an array of dependencies. `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed. 
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

#### `useMemo`
Pass a “create” function and an array of dependencies. `useMemo` will only recompute the memoized value when one of the dependencies has changed. 
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

#### `useRef`
`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## Redux
### Concept and data flow
#### Concept
* Global app state is kept in a single store
* The store state is read-only to the rest of the app
* Reducer functions are used to update the state in response to actions
#### Data flow
* State describes the condition of the app at a point in time, and UI renders based on that state
* When something happens in the app:
  * The UI dispatches an action (or action creator)
  * The store runs the reducers, and the state is updated based on what occurred
  * The store notifies the UI that the state has changed
  * The UI re-renders based on the new state

### Actions
> **Actions are plain objects with a type field that describe what happened.**
* The `type` field should be a readable string
* Actions may contain other values, which are typically stored in the `action.payload` field
* Actions should have the smallest amount of data needed to describe what happened
```
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```
### Reducers
> **Reducers are functions that look like (state, action) => newState**
*  Only calculate the new state based on the `state` and `action` arguments
*  Never mutate the existing `state` - always return a copy
*  No "side effects" like AJAX calls or async logic
*  Reducers must not create random values like `Math.random()` or `Date.now()`
*  It's okay to have other state values that are not in the Redux store (like local component state) side-by side with Redux

### Store
> **The Redux store brings together the state, actions, and reducers that make up your app.**
* **Redux apps always have a single store**
  * Stores are created with the Redux createStore API
  * Every store has a single root reducer function
* **Stores have three main methods**
  * `getState` returns the current state
  * `dispatch` sends an action to the reducer to update the state
  * `subscribe` takes a listener callback that runs each time an action is dispatched
* **Store enhancers let us customize the store when it's created**
  * Enhancers wrap the store and can override its methods
  * `createStore` accepts one enhancer as an argument
  * Multiple enhancers can be merged together using the compose API
  ```
  const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
  ```
* **Middleware are the main way to customize the store**
  * Middleware are added using the `applyMiddleware` enhancer
  * Middleware are written as three nested functions inside each other
  * Middleware run each time an action is dispatched
  * Middleware can have side effects inside
* **The Redux DevTools let you see what's changed in your app over time**
  * The DevTools Extension can be installed in your browser 
  * The store needs the DevTools enhancer added, using `composeWithDevTools`
  * The DevTools show dispatched actions and changes in state over time

### Async logic and data fetching
* **You can dispatch additional actions to help track the loading status of an API call**
  * The typical pattern is dispatching a "pending" action before the call, then either a "success" containing the data or a "failure" action containing the error
  * Loading state should usually be stored as an enum, like `'idle' | 'loading' | 'succeeded' | 'failed'`
* **The Redux "Thunk" middleware lets us pass functions to `dispatch`**
  * "Thunk" functions let us write async logic ahead of time, without knowing what Redux store is being used
  * A Redux thunk function receives `dispatch` and `getState` as arguments, and can dispatch actions like "this data was received from an API response"
* **Action creator functions encapsulate preparing action objects and thunks**
  * Action creators can accept arguments and contain setup logic, and return the final action object or thunk function
* **Thunks can return promises from dispatch**
  * Components can wait for async thunks to complete, then do more work
 


## React-Redux 
#### `useSelector`
**The `useSelector` hook lets React components read data from the store**
* Selector functions take the entire store `state` as an argument, and return a value based on that state
  ```
  const user = useSelector(state => state.userLogin)
  ```
* `useSelector` subscribes to the store, and **re-runs the selector each time an action is dispatched**.  
* Whenever the selector result changes, **`useSelector` forces the component to re-render with the new data**
* `useSelector` calls its selector function and returns the result from the selector

#### `useDispatch`
**The `useDispatch` hook lets React components dispatch actions to the store**
* `useDispatch` returns the actual `store.dispatch` function
* You can call `dispatch(action)` as needed inside your components

#### `<Provider>`
**The `<Provider>` component makes the store available to other React components**
* Render `<Provider store={store}>` around your entire `<App>`



## Reference
* https://reactjs.org/docs/hooks-overview.html
* https://redux.js.org/tutorials/fundamentals/part-1-overview