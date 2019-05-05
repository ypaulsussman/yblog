---
title: Learning React (Banks, Alex)
date: "2018-09-03"
template: "post"
draft: true
slug: "/posts/learning-react-notes/"
category: "What I Read"
tags:
  - "React"
  - "O'Reilly"
description: "Notes from a book I furtively skimmed while begining a large frontend rewrite at work. (Tagline: \"This book will show you how to create UIs with this small JavaScript library that can deftly display data changes on large-scale, data-driven websites without page reloads. Along the way, you’ll learn how to work with functional programming and the latest ECMAScript features.\")"
---

## Chapter 03. Functional Programming with JavaScript

**Pure functions** are naturally testable. They do not change anything about their environment or “world,” and therefore do not require a complicated test setup or teardown.

When writing functions, try to follow these three rules: 
1. The function should take in at least one argument.  
2. The function should return a value or another function.  
3. The function should not change or mutate any of its arguments.​​​

---

Functions can be sent to functions as arguments or returned from functions as results. ​More complex functions, called **higher-order functions**, can manipulate functions and use them.

The first category of higher-order functions are functions that expect other functions as arguments. `Array.map`, `Array.filter`, and `Array.reduce` all take functions as arguments, and thus _are_ higher-order functions.

---

A function is considered a **first-class citizen** when it can be declared as a variable and sent to functions as an argument. These functions can even be returned from functions:

```javascript
var createScream = function(logger) {
 return function(message) {
     logger(message.toUpperCase() + "!!!")
 }
}

const scream = createScream(message => console.log(message))

scream('functions can be returned from other functions’)

// FUNCTIONS CAN BE RETURNED FROM OTHER FUNCTIONS!!!
```

Using ES6 syntax, we could describe the same `createScream` higher-order function with arrows: 

```javascript
const createScream = logger => message =>
   logger(message.toUpperCase() + "!!!")
```

---

The following is an example of **currying**. The `userLogs` function hangs on to some information (the username) and returns a function that can be used and reused when the rest of the information (the message) is made available.

```javascript
const userLogs = userName => message =>
   console.log(`${userName} -> ${message}`)

const print = userLogs("grandpa23")

print("attempted to load 20 fake members")

// grandpa23 -> attempted to load 20 fake members
```

`userLogs` is the higher-order function. The `print` function is produced from `userLogs`, and every time the `print` function is used, `“grandpa23”` is prepended to the message.

---

## Chapter 04. Pure React

In an SPA... 
* the browser initially loads one HTML document. 
* As users navigate through the site, they actually stay on the same page. 
* JavaScript destroys and creates a new user interface as the user interacts with the application.

The DOM API is a collection of objects that JavaScript can use to interact with the browser to modify the DOM.
* However, the process of inserting new elements is painfully slow.
* Managing DOM changes with JavaScript efficiently can become very complicated and time-consuming. 
* Example: from a coding perspective, it is easier to clear all the children of a particular element and reconstruct them than it would be to leave those child elements in place and attempt to efficiently update them.
* Another example: inserting an element into the DOM is one of the most costly DOM API operations — it’s slow. In contrast, updating DOM elements that are already in place performs much more quickly than inserting new ones.

---

The **virtual DOM** is made up of React elements, which conceptually seem similar to HTML elements, but are actually JavaScript objects.

We make changes to a JavaScript object in the virtual DOM, and React renders those changes for us using the DOM API as efficiently as possible.

​All the tools necessary to generate HTML from the virtual DOM are found in ReactDOM:
* it’s where we will find the `render` method, as well as 
* the `renderToString` and `renderToStaticMarkup` methods (used on the server.)

`ReactDOM` renders child elements using `props.children`. In the previous section, we rendered a text element as a child of the `h1` element, and thus `props.children` was set to `"Baked Salmon"`. We could render other React elements as children too, creating a tree of elements. (This is why we use the term **component tree**.)

---

Side note: `data-reactroot` will always appear as an attribute of the root element of your React component.

---

`React.Component` is an abstract class that we can use to build new React components. We can create custom components through inheritance by extending this class with ES6 syntax.

Stateless functional components are functions, not objects; therefore, they do not have a “this” scope. 

Because they are simple, pure functions, they are a good way to practice the rules of functional programming: they should take in props and return a DOM element without causing side effects.

---

## Chapter 5. React with JSX

Component properties will take two types: either a string or a JavaScript expression. 

JavaScript expressions can include arrays, objects, and even functions. In order to include them, you must surround them in curly braces.

JSX is JavaScript, so you can incorporate JSX directly inside of JavaScript functions. For example, you can map an array to JSX elements: 

```javascript
<ul>
   {this.props.ingredients.map((ingredient, i) =>
       <li key={i}>{ingredient}</li>
   )}
</ul>
```
---

Aside from transpiling, webpack also can handle:
* **Code splitting** splits up your code into different chunks that can be loaded when you need them.
* **Feature flagging** sends code to one or more — but not all — environments when testing out features.

A **loader** is a function that handles the transformations that we want to put our code through during the build process.

Webpack has a huge number of loaders; the most common use case is transpiling. Another popular category of loaders is for styling.

---

## Chapter 6. Props, State, and the Component Tree

All property type validators are functions (see title below):

```javascript
propTypes: {
 ingredients: PropTypes.number,
 steps: PropTypes.number,
 title: (props, propName) =>
     (typeof props[propName] !== 'string') ?
         new Error("A title must be a string") :
         (props[propName].length > 20) ?
             new Error(`title is over 20 characters`) :
             null
}
```

When rendering the component, React will inject the `props` object and the name of the current property into the function as arguments. We can use those arguments to check the specific value for a specific property.

---

When working with ES6 classes, `propTypes` and `defaultProps` declarations are defined on the class instance, outside of the class body.

An alternative to this is emerging in one of the latest proposals to the ECMAScript spec: Class Fields & Static Properties. 

Class static properties allow us to encapsulate `propTypes` and `defaultProps` inside of the class declaration. 

Property initializers also provide encapsulation and cleaner syntax: 

```javascript
class Summary extends React.Component {
 static propTypes = {
   ingredients: PropTypes.number,
   steps: PropTypes.number,
   title: (props, propName) =>
     typeof props[propName] !== "string"
       ? new Error("A title must be a string")
       : props[propName].length > 20
         ? new Error(`title is over 20 characters`)
         : null
 };

 static defaultProps = {
   ingredients: 0,
   steps: 0,
   title: "[recipe]"
 };

 render() {
   const { ingredients, steps, title } = this.props;
   return (
     <div className="summary">
       <h1>{title}</h1>
       <p>
         <span>{ingredients} Ingredients | </span>
         <span>{steps} Steps</span>
       </p>
     </div>
   );
 }
}
```

---

Nifty alternative to using a `for`-loop:

```javascript
const { totalStars } = this.props;

{
  [...Array(totalStars)].map((n, i) => (
    <Star
      key={i}
      selected={i < starsSelected}
      onClick={() => this.change(i + 1)}
    />
  ));
}

```

Here, the **spread operator** is used with the `Array` constructor to initialize a new array of a specific length that is mapped to `Star` elements.

---

There are only a few necessary cases for **initializing our state values using incoming properties** (e.g. when we create a reusable component that we would like to use across applications in different component trees.)

---

In many React applications, it is possible to group all state data in the root component. State data can be passed down the component tree via properties, and data can be passed back up the tree to the root via two-way function binding.

You can also use state to cache data in your application. For instance, if you had a list of records that the user could search, the records list could be stored in state until they are searched.

---

## Chapter 7. Enhancing Components

The `componentWillMount` method is invoked before the DOM is rendered; it can be used to initialize third-party libraries, start animations, request data, or perform any additional setup.

An example: initially, when the component is mounted, `MemberList` has an empty array for members and loading is `false`. 
* In the `componentWillMount` method, the state is changed to reflect the fact that a request was made to load some users. 
* Next, while waiting for the request to complete, the component is rendered. 
* Because loading is now `true`, a message will be displayed alerting the user to the latency. 
* When the promise passes or fails, the loading state is returned to `false` and either the members have been loaded or an error has been returned.
* Calling `setState` at this point will rerender our UI with either some members or an error.

---

Calling `setState` before the component has rendered will not kick off the updating lifecycle. Calling `setState` after the component has been rendered will kick off the updating lifecycle. 

So: if you call `setState` inside an asynchronous callback defined within the `componentWillMount` method, it will be invoked after the component has rendered, and will trigger the updating lifecycle.

---

`componentDidMount` is another good place to make API requests. This method is invoked after the component has rendered, so any `setState` calls from this method will kick off the updating lifecycle and rerender the component.

`componentDidMount` is also a good place to initialize any third-party JavaScript that requires a DOM. For instance, you may want to incorporate a drag-and-drop library or a library that handles touch events.

Another good use for `componentDidMount` is to start background processes like intervals or timers.

---

The “updating lifecycle” kicks off every time `setState` is called.

The updating lifecycle’s methods can be used to... 
* incorporate JavaScript before the component updates,
* interact with the DOM after the update, or 
* improve the performance of an application (it gives you the ability to cancel unnecessary updates.)

---

Calling `setState` within the updating lifecycle will cause an infinite recursive loop that results in a stack overflow error. 

Therefore, `setState` can only be called in `componentWillReceiveProps`, which allows the component to update state when its properties are updated.

`componentWillReceiveProps(nextProps)` is only invoked if new properties have been passed to the component.

---

`shouldComponentUpdate(nextProps, nextState)` is the update lifecycle’s gatekeeper: a predicate function that can call off the update.

The `shouldComponentUpdate` method can compare the new properties with the old ones:

```javascript
shouldComponentUpdate(nextProps) {
 const { rating } = this.props
 return rating !== nextProps.rating
}
```

---

The only reason we would ever **add state to a child component** is when we want that component to change things about itself internally.

If the component is not going to change itself, keep it stateless and manage the state from the parent only.​

---

`React.Children` allows you to count, map, loop over, or convert `props.children` to an array. It also allows you to verify that you are displaying a single child with `React.Children.only`.

---

​Components that make API calls have to handle latency, the delay that the user experiences while waiting for a response. We can address these issues in our state by including variables that tell the component whether a request is pending or not.

The easiest way to incorporate D3 into a React component is to let React render the UI, then have D3 create and add the visualization.

---

A **higher-order component**, or HOC, is a simply a function that takes a React component as an argument and returns another React component. 

An HOC allows us to wrap a component with another component. The parent component can hold state or contain functionality that can be passed down to the composed component as properties. 

The **composed component** (the lower-order component passed as an argument) does not need to know anything about the implementation of an HOC, other than the names of the properties and methods that it makes available.

ComposedComponent is the component that we will wrap. The returned class, DataComponent, will then store and manage the state:

```javascript
const DataComponent = (ComposedComponent, url) =>
class DataComponent extends Component {
  constructor(props) {
    // ...
  }
render() {
   return (
       <div className="data-component">
           {(this.state.loading) ?
               <div>Loading...</div> :
               <ComposedComponent {...this.state}
                                  {...this.props} />
           }
       </div>
   )
}
};
```

Notice that `DataComponent` is actually a function. (All higher-order components are functions.) 

Also notice how the HOC passes state and props down to the composed component.

---

**Flux** is an alternative to MVC; it’s an entirely different design pattern that complements the functional approach.

Using Flux does not mean that you cannot have state in any of your view components. It means that application state is not managed in your view components.

In Flux, application state data is managed outside of React components in **stores**. 
* Stores hold and change the data, and are the only thing that can update a view in Flux. 
* Stores are similar to models in the MVC pattern, but stores are not restricted to managing data in a single object.

If a user were to interact with a web page — say, click a button or submit a form — then an **action** would be created to represent the user’s request. 
* Actions provide the instructions and data that the store will use to modify the state. 
* Action creators are functions that can be used to abstract away the nitty-gritty details required to build an action. 
* Actions themselves are objects that at minimum contain a type field.

Actions are dispatched using a central control component called the **dispatcher**.
* There is only ever one dispatcher, and it represents the air traffic control part of this design pattern. 
* The dispatcher takes the action, packages it with some information about where the action was generated, and sends it on to the appropriate store or stores that will handle the action.

Everything a store needs to change state data is provided in the action. 
* A store will handle actions by type and change their data accordingly. 
* Once data is changed, the store will emit an event and notify any views that have subscribed to the store that their data has changed.
* Current state data can be obtained from a store via properties.

Actions and state data are immutable in Flux. 

---

## Chapter 8. Redux

**Redux** simplifies the concepts of Flux a bit by **removing the dispatcher**, and representing application state with a single immutable object. 

Redux also introduces **reducers**, which are not a part of the Flux pattern. ​Reducers are pure functions that return a new state based on the current state and an action: (state, action) => newState.

---

In pure React or Flux apps, storing state in as few objects as possible is recommended. In Redux, it’s a rule.

When building Redux apps, the first thing you need to think about is state. Try to define it in a single object, even draft a JSON sample of your state tree with some placeholder data.

Usually, when we sit down to construct an object-oriented application, we start by identifying the objects, their properties, and how they work together. Our thinking, in this case, is noun-oriented. When building a Redux application, we want to shift our thinking into being **verb-oriented**. How will the actions affect the state data?

---

Actions are the only way to update the state of a Redux application. 

Actions provide: instructions about what should change in the application state along with the necessary data to make those changes.

We can also look at them like receipts about the history of what has changed over time.

---

Because an action’s type is a string, and manually-entered strings can be typo-prone, using constants can save you: 

```javascript
import C from "./constants"

{ type: C.ADD_COLOR }
```

A typo in a JavaScript variable will cause the browser to throw an error. (Defining actions as constants also lets you tap into the benefits of IntelliSense and code completion!)

---

The `getState` method of the store will return the present application state.

Our entire state tree is stored in a single object. A potential complaint might be that it’s not modular enough, possibly because you’re considering modularity as describing objects. 

Redux achieves modularity via functions, used to update parts of the state tree. 

Reducers are functions that take the current state, along with an action, as arguments and use them to create and return a new state.

In all reducers, we need to treat state as an immutable object. Although it may be tempting to use `state.push({})` or `state[index].rating`, resist the urge to do so!

Generating random data, calling APIs, and other asynchronous processes should be handled outside of reducers. Reducers should be predictable: they are used solely to manage the state data.

Reducers can be coded in a number of different ways. ​(**Switch statements** are a popular choice because they can process the different types of actions that reducers must handle.)

One action object can impact several reducers.​​​

Each reducer is designed to update specific parts of the state tree, either leaves or branches. We can then **compose reducers** into one reducer that can handle updating the entire state of our app given any action.

---

Redux has a function, `combineReducers`, which combines all of the reducers into a single reducer. These reducers are used to build your state tree: 

```javascript
import { createStore, combineReducers } from "redux";
import { colors, sort } from "./reducers";

const initialState = {
 colors: [
   {
     id: "3315e1p5-3abl-0p523-30e4-8001l8yf3036",
     title: "Rad Red",
     color: "#FF0000",
     rating: 3,
     timestamp: "Sat Mar 12 2016 16:12:09 GMT-0800 (PST)"
   }
 ]
};
const store = createStore(combineReducers({ colors, sort }), initialState);
```

---

**​Stores** allow you to subscribe handler functions that are invoked every time the store completes dispatching an action:

```javascript
store.subscribe(() =>
 console.log("color count:", store.getState().colors.length)
);
```

**Subscribing** this listener to the store will log the color count to the console every time we submit any action.

The store’s `subscribe` method also returns a function that you can use later to unsubscribe the listener:

```javascript
const unsubscribeLogger = store.subscribe(logState);
```

---

One use case: with the store’s `subscribe` function, we will... 
1. listen for state changes and save those changes to localStorage under the key 'my-redux-storage'; 
2. then, when we create the store we can check to see if any data has been saved under this key and, if so, 
3. load that data as our initial state. 

With just a few lines of code, we can have persistent state data in the browser!

---

**Action objects** are simply JavaScript literals. **Action creators** are functions that create and return these literals.

You can simplify the logic involved with generating an action by adding an action creator for each of these action types, e.g. from: 

```javascript
{
 type: "RATE_COLOR",
 id: "441e0p2-9ab4-0p523-30e4-8001l8yf2412",
 rating: 5
}
```

...to: 

```javascript
export const rateColor = (id, rating) => ({
 type: C.RATE_COLOR,
 id,
 rating
});
```

You can then can call the action creator, sending the necessary data as function arguments:

```javascript
store.dispatch(rateColor("441e0p2-9ab4-0p523-30e4-8001l8yf2412", 5));
```

The really nice thing about action creators is that they provide a place to encapsulate all of the logic required to successfully create an action.

Action creators are where we should put any asynchronous logic, like requesting data or making an API call.

---

Redux itself also comes with a `compose` function that you can use to compose several functions into a single function. “_It is similar to the React compose function that we created in Chapter 3, but is more robust. It also composes functions from right to left as opposed to from left to right._” ...great.

---

In Redux, **middleware** is defined as a higher-order function: it’s a function that returns a function that returns a function: 
* The last function returned is invoked every time an action is dispatched. 
* When this function is invoked, you have access to the action, the store, and the function for sending the action to the next middleware.

---

## Chapter 9. React Redux

**​Presentational components** are components that only render UI elements. 
* They do not tightly couple with any data architecture. 
* Instead, they receive data as props and send data to their parent component via callback function properties. 
* They are purely concerned with the UI, and can be reused across applications that contain different data.

**​Container components** are components that connect presentational components to the data. 
* They render presentational components by mapping properties to state and callback function properties to the store’s dispatch method. 
* Container components retrieve the store, and manage any interactions with it.
* Container components are not concerned with UI elements; they are only used to connect presentational components to data.

Any time you want to connect a presentational component to some data, then, you can wrap that component in a container that controls the properties and connects them to data.

---

`react-redux` contains some tools to help ease the complexity involved with implicitly passing the store via the **context API**.

It supplies us with a component that we can use to set up our store in context: `Provider`.
* We can wrap any React element with `Provider` and that element’s children will have access to the store via context.
* `Provider` adds the store to the context and updates the e.g. App component when actions have been dispatched. 
* `Provider` expects a single child component:

```javascript
render(
 <Provider store={store}>
   <App />
 </Provider>,
 document.getElementById("react-container")
);
```

`Provider` also requires that we pass `store` as a property. It adds the store to the context so that it can be retrieved by any child of the `App` component.

---

`react-redux` provides us with another way to quickly create container components that work with the `Provider`: the `connect` higher-order function.
* `connect` works in conjunction with Provider: Provider adds the store to the context, and `connect` creates components that retrieve the store. 
* This function maps the current state of the Redux store to the properties of a presentational component. 
* It also maps the store’s `dispatch` function to callback properties.

`connect` returns a function that expects a presentational component, and wraps it with a container that sends it data via props.

`connect` expects two arguments: `mapStateToProps` and `mapDispatchToProps`. (Both are functions.) 

The first function, `mapStateToProps`, injects state as an argument and returns an object that will be mapped to props. (It thus maps state variables to properties.) 

The second function, `mapDispatchToProps`, injects the store’s `dispatch` function as an argument that can be used when a component invokes callback function properties. (It thus dispatches actions when events are raised.)

If you only want to map callback function properties to `dispatch`, you can provide `null` as a placeholder for the first argument.
