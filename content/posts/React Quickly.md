---
title: React Quickly (Mardan, Azat)
date: "2018-01-27"
template: "post"
draft: true
slug: "/posts/react-quickly-notes/"
category: "What I Read"
tags:
  - "Manning"
  - "React"
description: "Notes from a book I read (and, happily, worked through!) one winter. (Tagline: \"Following carefully chosen and clearly explained examples, you'll learn React development using your existing JavaScript and web dev skills. You'll explore a host of different projects as you learn about web components, forms, and data.\")"
---

## Chapters 01-03: Intro to JSX

Creating composable UIs has been around for a long time, but React is the first to use pure JavaScript without templates to make this possible.

One of the most painful tasks when developing large web apps is managing how the views change in response to data changes.

The React solution is elegant in its simplicity: UIs as functions. Call them with data, and you get rendered views predictably.

Generating elements in memory is extremely fast; the actual bottleneck is rendering in the DOM. The React team thus came up with an algorithm that avoids unnecessary DOM pain.

---

In React, simplicity is achieved with the following features:
1. Declarative over imperative style
   1. Developers write how the view should be: not what to do, step-by-step.
   2. React then updates views automatically.
   3. This fully shines when you need to make changes to the view (via the internal state.)
   4. Under the hood, React uses a virtual DOM to find differences between what’s already in the browser and the new view (DOM diffing.)
   5. This means developers don’t need to worry about explicitly changing the view; all they need to do is update the state, and the view will be updated automatically as needed.
1. Component-based architecture using pure JavaScript
   1. CBA is popular because it provides for separation of concerns, loose coupling, and code reuse.
   2. Because single page applications (SPAs) now handle complex user input and perform rendering on the browser, HTML and JavaScript are closely coupled.
   3. if a framework uses a domain-specific language (DSL), you need to learn its magic variables and methods. In React, you can use pure JavaScript.
   4. In React, there’s also no separation of (the logic about the data, and the description of how that data should be rendered) when working on the same functionality.
1. Powerful abstractions
   1. React has a simplified way of interacting with the DOM.
   2. It hides the underlying interfaces and provides normalized/synthesized DOM methods and properties.
   3. You can expect the same behavior from synthetic events, regardless of the browser.
   4. You can also render React elements on the server. (This can be handy for better search engine optimization (SEO) and/or improving performance.)
---

The added benefit of the virtual DOM is that you can do unit testing without headless browsers like PhantomJS, via a Jasmine layer called Jest.

React isn’t reactive (as in reactive programming, which are more event-driven, resilient and responsive) out of the box. Developers need to use other tools such as Reactive Extensions (RxJS) to compose asynchronous data streams with Observables.

---

In versions 0.14 and higher, the React team split the library into two packages: **React Core** (`react` package on npm) and **ReactDOM** (`react-dom` package on npm.) 
* Implication: by separating [writing components] and [rendering components], React is on a path to become a universal library for describing UIs (also called “isomorphic,” because it can be used in different environments.)
* The community has since created multiple packages to support various rendering targets beyond the DOM, including `<canvas>`, three.js, VR, the ART library (for drawing vector graphics), and the Blessed CLI (a terminal interface API for node.js). 

---

Two approaches to **rendering**:* 
1. The SPA or thick-client approach: most rendering for UIs happens on the browser. Only data travels to and from the browser. 
2. The thick-server approach: all the rendering happens on the server. 

*Here “rendering” means “generating HTML from templates or UI code,” not “rendering that HTML in the browser” -- this is sometimes called “painting” or “drawing” the DOM.

---

`window.React` has a method to create an element (`React.createElement`); `window.ReactDOM` has a method to render it in a `<div>` container (`ReactDOM.render`).
`React.createElement(elementName, data, child)` has three arguments:
1. `elementName` can be one of two things: 
   1. HTML as a string (for example, `h1`, `div`, or `p` - it’s lowercase.)
   2. A custom component class as an object (for example, `SkillProfiler` or `LandingPageGears` - it’s uppercase.)
      1. “component classes” === “components” but !== “web components”
      2. You create a React component class by extending the `React.Component` class with `class ${Child} extends ${Parent}` ES6 syntax.
1. data about the element, in the form of attributes and properties, for example `null` or `{name: 'Azat'}`
2. child elements or inner HTML/text content; for example, `Hello world!` inside a `<p>` tag
---

We define `render()` using ES6 style, in which you omit the colon and the word `function`. It’s exactly the same as ES5’s way: defining an attribute with a property that’s a function, i.e. the render: function() key-value pair.

Historically, React had its own method to create a component class: `React.createClass()`. Pure ES6 `class` replaced it, and is the only supported method as of 15.5.4.

The `render()` method can only return a single element: thus the need to wrap multiple same-level elements in a single `<div>`, `<span>`, etc container.

---

**Properties** are a cornerstone of React’s declarative style:
* They’re immutable values within an element/component.
* A parent assigns properties to its children upon their creation.
* If it matches the name of a standard HTML attribute (e.g. `href`, `title`, `style`, `name`, etc), a property will be rendered on an element as that attribute.
* More importantly, properties that don’t match a standard HTML attribute can be used in the JavaScript code of a React component class, via `this.props`

---

**JSX** is a JavaScript extension that provides syntactic sugar (sugar-coating) for function calls and object construction - it's not a templating engine.

Once you get into the habit of thinking about `<NAME/>` not as XML, but as an alias to JavaScript code, you’ll get over the perceived weirdness of JSX syntax.

In JSX, the `{}` can be used for template literals, or to execute any JavaScript code.

If you need to pass properties, write them in JSX as you would in normal HTML (i.e., `<DateTimeNow userName='Azat'/>` ) 

When **rendering standard elements** (`<h>`, `<p>`, `<div>`, `<a>`, and so on), React renders all attributes from the HTML specification and omits all other attributes (i.e. props.)
* Storing data in the DOM (via custom HTML attributes) is an anti-pattern:
* You don’t want the DOM to be a front-end data store (and getting data from the DOM is slower than getting it from a virtual/in-memory store.) 
* If you must, within JSX, use the the `data-${name}` prefix: 
   * The following JSX: `<li data-react-is-awesome={this.reactIsAwesome}>React is awesome!</li>`
   * will render `<li data-react-is-awesome="true">React is awesome!</li>`
* Custom elements don’t have any problem with `this` or need for `data-${name}`; they get all their attributes as properties via `this.props`.

---

With `{...this.props}`, you can pass every property to the child:

```javascript
class HelloWorld extends React.Component {
 render() {
   return (
     <h1 {...this.props}>
       Hello {this.props.frameworkName} world!!!
     </h1>
   );
 }
}

//is the same as

class HelloWorld extends React.Component {
 render() {
   return (
     <h1 title={this.props.title} id={this.props.id}>
       Hello {this.props.frameworkName} world!!!
     </h1>
   );
 }
}
```

---

**Destructuring** extracts properties into separate variables: 

```javascript
const YoungSuss = {
 firstName: 'Y',
 lastName: 'Sussman'
}

// When you write:
let { firstName, lastName } = YoungSuss

// ES6 does this:
let firstName = YoungSuss.firstName
let lastName = YoungSuss.lastName
```

---

The **rest parameter** means “take the rest of the stuff and pack it into an array” -  it converts a comma separated list of arguments into an array. 
It appears in function parameters, and also while destructuring arrays:

```javascript
let scores = ['98', '95', '93', '90', '87', '85']
let [first, second, third, ...restOfScores] = scores

console.log(first) // 98
console.log(second) // 95
console.log(third) // 93
console.log(restOfScores) // [90, 97, 95]
```

---

The **spread operator** behaves in the opposite way: it takes an array and spreads it into a comma-separated list of arguments. In this way, it can serve as an alternative to the ES5 `.concat()` method:

```javascript
let array1 = ['one', 'two']
let array2 = ['three', 'four']
let array3 = ['five', 'six']
let combinedArray = [...array1, ...array2, ...array3]
console.log(combinedArray) // ['one', 'two', 'three', 'four', 'five', 'six']
```

The spread operator can also be used (especially in Redux) to remove an item from an array without mutating it:

```javascript
let array1 = ['one', 'two']
const pushEtc = (array) => {
 return [...array, 'etc']
}
console.log (pushEtc(array1)) 
// ['one', 'two', 'etc']
```

---

You can’t use an `if` condition inside the `<div>`’s `createElement()` - you must get the value at runtime. There are four ways to do this: 

```javascript
// Approach 1: Variable
render() {
 let link
 if (this.props.user.session)
   link = <a href='/logout'>Logout</a>
 else
   link = <a href='/login'>Login</a>
 return (
   <div>{link}</div>
 )
}

// Approach 2: Expression
render() {
 let link = (sessionFlag) => {
   if (sessionFlag)
     return <a href='/logout'>Logout</a>
   else
     return <a href='/login'>Login</a>
 }
 return (
   <div>
     {link(this.props.user.session)}
   </div>
 )
}

// Approach 3: Ternary operator
render() {
 return (
   <div>
     {(this.props.user.session) ? 
       <a href='/logout'>Logout</a> : 
       <a href='/login'>Login</a>}
   </div> }
 )
}
```

(You can use the ternary operator as an expression which returns a value; an if condition, however, is a statement.)
```javascript
// Approach 4: IIFE
render() {
 return <div>{
   (sessionFlag) => { // #2 using those arguments to determine what to return 
     if (sessionFlag)
       return <a href='/logout'>Logout</a>
     else
       return <a href='/login'>Login</a>
   }(this.props.user.session) // #1 passing in the relevant props as params here
}</div> }
```

A rule of thumb for conditions and JSX: use `if/else` outside of JSX (before `return`); inside `return`, use the ternary operator (unless the logic is complex enough that it would be clearer with one of the alternatives above.)

---

**Babel** has a watch option (`-w` or `--watch)`: 

```bash
$ ./node_modules/.bin/babel js/script.jsx -o js/script.js -w
```

Babel will watch for any changes in `script.jsx` and compile it to `script.js` when you save the updated JSX file.

(The `-o` or `--out-file` flag compiles all the files from a directory into a single JS file.)

---

If you want to **dynamically output HTML** entities, all you’ll get is the direct output, not the special characters:

```javascript
let specialChars = '&copy;&mdash;&ldquo;'
<span>{specialChars}</span>
<input value={specialChars}/> // returns &copy;&mdash;&ldquo; rather than ©-’
```

Instead, either 
1. copy the special character directly into your source code (if you’re using UTF-8), or 
2. escape the special character with \u, and use a unicode number.

---

In JSX, the `style` attribute is not a string. Instead, you pass it a JavaScript object, with the CSS properties in camelCase:
```javascript
<span 
 style={
 {
   borderColor: 'red',
   borderWidth: 1,
   borderStyle: 'solid'
  }
 }>Hey</span>
 ```

---

The HTML attributes `class` and `for` are reserved words in JavaScript/ECMAScript, and JSX is converted into regular JavaScript, so instead you must use `className` and `htmlFor`.

---

## Chapter 04: State

Generally speaking: 
* the word states refers to the attributes of the this.state object in a component;
* state can refer to either
   * the `this.state` object or 
   * an individual attribute (such as `this.state.inputFieldValue`)

Use states to generate new UIs; none of the following will trigger a view change: 
* component properties (`this.props`), 
* regular variables (`inputValue`), or 
* class attributes (`this.inputValue`)

---

Unlike properties, states aren’t set on a parent (you define states in the component itself.) You can’t `setState` in `render()` either, because it’ll create an infinite loop.

To set the initial state, use `this.state` in the `constructor` with your ES6 class `React.Component` syntax. 

Don’t forget: when an instance of a class is created....
* if you create a `constructor()` method, you’ll almost always need to invoke `super()` inside it; otherwise, the parent’s constructor won’t be executed. 
* If you don’t define a `constructor()` method, then the call to `super()` will be assumed under the hood.

Avoid setting and updating state directly with `this.state = ...` anywhere else, because doing so may lead to unintended consequences.

---

You change state with the `this.setState(data, callback)` class method:
1. React merges data with current states.
2. React calls `render()`. 
3. React calls callback.

Typically, `setState()` is called from an event handler, or as a callback for incoming data.

Fat-arrow function syntax to creates functions with autobinding (the function gets the current value of `this`.)

---

You cannot use references (`refs`) with stateless components.

References allow you to imperatively modify a child outside of the typical dataflow (rather than the preferred method: re-rendering the child with new props.) 

The most-common use cases are [managing focus, text selection, or media playback], [triggering imperative animations], and [integrating with third-party DOM libraries]. 

Beyond those, it’s almost always best to modify a child declaratively (i.e. the re-render w/ new props.)

---

You can attach methods to functions, but the code isn’t elegant: you can’t use `this` in a function (the value isn’t the component; it’s `window`.) So, instead of this:

```javascript
const DigitalDisplay = function(props) {
 return <div>{DigitalDisplay.locale(props.time)}</div>
}

DigitalDisplay.locale = (time)=>{
 return (new Date(time)).toLocaleString('EU')
}
```

Create a new function inside the stateless component:

```javascript
const DigitalDisplay = function(props) {
 const locale = time => (new Date(time)).toLocaleString('EU')
 
 return <div>{locale(props.time)}</div>
}
```

---

## Chapter 05: Lifecycle Events

The main job of React is to figure out how to modify the DOM to match what the components want to be rendered on the screen. React does so by **mounting** (adding nodes to the DOM), **unmounting** (removing them from the DOM), and **updating** (making changes to nodes already in the DOM).

`constructor()` — not technically a lifecycle event, but important: called when element created; lets you set default props && initial state.

### Mounting events
These happen when a React element (an instance of a component class) is attached to a DOM node (only invoked once.)
* `componentWillMount()` — Happens before mounting to the DOM; good for server-side rendering
   * You can invoke `setState()` in `componentWillMount()` — `render()` will get the new values, if any, and there will be no extra rerendering.
* `componentDidMount()` — Happens after mounting and rendering; only executes in browser (not server)

### Updating events
These happen when a React element is updated as a result of new values of its properties or state (invoked many times.)
* `componentWillReceiveProps(nextProps)` — Happens when the component is about to receive properties
* `shouldComponentUpdate(nextProps, nextState)` - returns a boolean; lets you optimize the component’s rerendering by determining when to update and when to not update
* `componentWillUpdate(nextProps, nextState)` — Happens right before it updates
* `componentDidUpdate(prevProps, prevState)` — Happens right after it updates

### Unmounting events
These happen when a React element is detached from the DOM (only invoked once.)
* `componentWillUnmount()` — Lets you unbind and detach any event listeners or do other cleanup work before the component is unmounted

---

Generally `this.forceUpdate()` should be avoided, because it makes components impure.
A **pure function** is a function that:
* Given the same input, will always return the same output;
* Has no side effects (doesn’t alter external states);
* Doesn’t rely on any external state;
---

`componentDidMount()` is a recommended place to put code to... 
1. integrate with other front-end frameworks and libraries, as well as to 
2. send XHR requests to a server.
(At this point in the component lifecycle, the component’s element is in the real DOM: so you get access to all of its elements, including children.)

Child components’ `componentDidMount()` method is invoked before that of parent components.

---

`componentWillReceiveProps(newProps)` allows you to intercept the component at the stage between getting new properties and before `render()`, in order to add some logic.

This method is useful if you want to [capture the new property, then set the state accordingly] before the rerender.

Note: rerendering (i.e., invoking `render()`) doesn’t necessarily mean changes in the real DOM. The decision whether to update (and what to update) in the real DOM is delegated to `shouldComponentUpdate()`.

---

`shouldComponentUpdate()` is invoked right before rendering. (Rendering is preceded by the receipt of new properties or state.)

You can return `false`, here, to prohibit React from rerendering (i.e., skipping `render()`, `componentWillUpdate()` and `componentDidUpdate()`) -- use this to optimize rendering.

---

`componentWillUpdate()` is called after receiving props/state, but before render() -- so don’t use `this.setState()` here!

---

## Chapter 06: Handling Events

You define an **event handler** as:
1. the value of an element attribute in JSX, or as 
2. an element property in plain JavaScript (when createElement() is called directly without JSX). 

For attributes that are event names, you use standard W3C DOM event names in camelCase (such as `onClick` or `onMouseOver`.)

The `SyntheticEvent` that you pass into your event handler function will the same properties and methods as most native browser events (e.g. `stopPropagation()`, `preventDefault()`, `target`, `currentTarget`, etc), just normalized across browsers. 

If you need to access the native browser event object, you can call `event.nativeEvent`.

To get the text of an input field, you can use `event.target.value`.

---

The `event` object is an enhanced version of a native DOM event object (called `SyntheticEvent` - it’s a wrapper.)

This makes events consistent with the W3C specification regardless of the browser on which you run your pages.

---

You usually need to `.bind(this)` on event handler functions, so that you get a reference to the instance of the class (React element). (If you don’t bind, this will be `null`, from `use strict` mode.). 

You don’t need to `.bind(this)` in the following cases:
* When you don’t need to use `this` inside the function (i.e. don’t need to refer to the class);
* When you’re using the older style, `React.createClass()`, instead of ES6’s class, (`createClass()` autobinds it for you); 
* When you’re using fat arrow function syntax inside the event handler (i.e. `()=>{}`), rather than calling to another function.

---

The following:

```javascript
class SaveButton extends React.Component {
 handleSave(event) {
   console.log(this, event)
 }
 render() {
   return <button onClick={this.handleSave.bind(this)}>Save</button>
 }
}
```

...is the same as:

```javascript
class SaveButton extends React.Component {
 constructor(props) {
   super(props)
    this.handleSave = this.handleSave.bind(this)
 }
 handleSave(event) {
   console.log(this, event)
 }
 render() {
   return <button onClick={this.handleSave}>Save</button>
  }
}
```

However, the latter can end up preventing substantial code duplication (if an event handler is called multiple times across components.)

---

In DOM events, first is the **capture** phase, from the window down to the target element; next is the target phase; and only then comes the **bubbling** phase, when an event travels up the tree back to the window.

In bubbling mode, the event is first captured and handled by the innermost element (target) and then propagated to outer elements (ancestors, starting with the target’s parent). 

In capture mode, the event is first captured by the outermost element and then propagated to the inner elements.

---

React’s event handlers are, by default, triggered by an event in the bubbling phase. 

To register an event listener for the capture phase, append `Capture` to an event name. For example, instead of using `onMouseOver`, you use `onMouseOverCapture`.

You can use this behavior to stop propagation and set priorities between events (for example, when you have the same event on an element and its ancestors.)

---

jQuery and vanilla JavaScript typically put the event listener directly on the DOM node; React doesn’t do this, in order to speed up the adding/removing of events during the UI lifecycle.

In React, events are captured at the root (`document`), then mapped internally to the correct child element.

You can, in the console, enter `getEventListeners(document)` to see an object containing all event listeners. (Or enter e.g. `getEventListeners(document).mouseover[0].remove()` to test the behavior of the app without the first-listed mouseOver event.)

---

Side note: if you select e.g. a `<div>` in the DevTools’ Elements tab, you can refer to that `<div>` in the Console tab by typing $0 and pressing Enter.

---

To trigger an event from a stateless component, pass the event-handler function as a property to this stateless component:

```javascript
class ClickCounterButton extends React.Component {
 render() {
   return <button
     onClick={this.props.handler}
     className="btn btn-danger">
     {this.props.counter})
   </button>
 } 
}

class Content extends React.Component {
 constructor(props) {
   super(props)
   this.handleClick = this.handleClick.bind(this)
   this.state = {counter: 0}
 }
 handleClick(event) {
   this.setState({counter: ++this.state.counter})
 }
 render() {
   return (
     <div>
       <ClickCounterButton
         counter={this.state.counter}
         handler={this.handleClick}/>
     </div>
   ) 
 }
}
```

(You could put the event handler in the child, but using the parent allows you to exchange information among child components: the rule of thumb is to put event-handling logic in the parent component if you need interaction between child components, to prevent tight coupling.)

---

By using lifecycle events in your components, you can create custom event listeners (for e.g. the resize event.)

---

## Chapter 07: Working with Forms

In regular HTML, when you’re working with an input element, the page’s DOM maintains that element’s value in its DOM node: in essence, the DOM is your storage.

React describes the UI declaratively: its end stage, how it should look. However (at least in traditional HTML form elements), the states of elements change with user input: input needs to be dynamic to reflect the state properly.

The best practice to handle forms in React is to sync the internal state with the view:
1. Define elements in `render()` using values from state.
2. Capture changes to a form element as they happen, using `onChange`.
3. Update the internal state in the event handler.
4. New values are saved in state, and then the view is updated by a new `render()`.

The above system is called **one-way binding**: the state changes views, and that’s it. A library won’t update the state/model automatically. (This removes complexity when you’re working with large apps or SPA’s, where many views implicitly can update many states, and vice versa.)

---

The recommended approach for working with forms in React is called **controlled components.** 
* A form element becomes “controlled” if you set its value via a prop: when React sets the values, the internal component state is always in sync with the view. 
* A controlled input accepts its current value as a prop, as well as a callback to change that value (usually attached to onChange.)

Uncontrolled components “pull” the value (from the field, into React) via a `ref` property. It’s simpler and less code, but also less powerful.

There are three additional React events for the `<form>` element, beside the standard React DOM events: 
* `onChange` - fires on a change in any of the form’s input elements
   * Note: the DOM has a change event as well, but it only fires on lost focus.
   * Ironically, React’s onChange is closer to HTML’s onInput...
   * For `<input>`, `<textarea>`, and `<select>`, triggered by a change in value.
   * For `<input>` type=checkbox || radio, triggered by a change in checked.
* `onInput` - fires for each change in `<textarea>` and `<input>` element values.
   * Not recommended! 
   * Use case: accessing native behavior for the onInput event
* `onSubmit` - fires when the form is submitted

You can have events on the `<form>` element, not just on individual elements in the form.

---

Note: `.bind(this)` everywhere -- see the p. 145 `onKeyUp()` example as yet another case where not doing so can bite you...

---

React adds three mutable, **interactive properties**, which can only be used on four specific HTML elements:
* `value` - applies to `<input>`, `<textarea>`, and `<select>`
   * In HTML, `<textarea>` uses its children for the value; in React, it uses value.
   * As such, rather than `<textarea>{this.state.description}</textarea>`, do: `<textarea value={this.state.description}/>`
* `checked` - applies to `<input>` with `type="checkbox"` and `type="radio"` 
   * These two types have one hardcoded, unchanging value per HTML element. Instead, the state of checked changes.
   * With `type="radio"`, this happens by... 
      * erasing all radio buttons’ state such that the default for each button becomes false, 
      * accessing the just-checked button with `obj[event.target.value]`,
      * then setting its value to `event.target.checked` (i.e. `true`).
   * `type="checkbox"` does the same; however, 
      * instead of erasing all buttons’ values in the first step, 
      * it uses `Object.assign` to set all prior states, thus maintaining the state of previously-checked buttons. 
      * Calling `Object.assign` results in a clone of the state (instead of setting state directly.) The analogue for cloning arrays is `clonedArray = Array.from(originArray)`.
* `selected` - applies to `<option>` (used with `<select>`)
   * In regular HTML, you would use e.g. `selectDOMNode.selectedOptions` or `selectDOMNode.selectedIndex`.
   * In React, you just set the value of `<select>` to the value of the selected `<option>`.
   * To enable multiselectable `<select>` elements, provide the multiple attribute without any value (React defaults to `true`). (You can then preselect multiple items by passing an array to the value of `<select>`).

---

Once you capture changes in elements, you can store them in the component’s state, from whence you can send them to a server or another component: 

```javascript
 handleChange(event) => {
   this.setState({ emailValue: event.target.value })
 }
```

---

Consider using the uncontrolled-component pattern (where the value is not set by React) only when you’re not building a complex UI element. It’s a bit of a hack.

To do so, define a form-submit event (typically `onClick` on a button and `onSubmit` on a form). Once you have this event handler, you can either:
* Capture changes as with controlled elements, but use state only for submission (not for value updates).
* Don’t capture changes.

---

When React elements are defined properly (each element’s internal state is in sync with the view’s state/DOM), the need for references is almost nonexistent.

References let you get either the DOM instance or node of a React component. 

First, you add a `ref` attribute with a camelCase name, e.g. `<input ref="userEmail"/>`

You can then access the DOM instance with the named reference, e.g. `this.refs.userEmail`.

Even better, you can access the DOM node itself with e.g: 

```javascript
let emailNode = ReactDOM.findDOMNode(this.refs.userEmail)
let email = emailNode.value
```

It’s also possible to assign a function to the `ref` attribute. This function is called just once, on the mounting of the element.

---

In React, the special attribute `defaultValue` both sets the value and lets users modify form elements (outside of `type="checkbox"` and `type="radio"`, hardcoding `value` will set the input field to be read-only.) 

---

## Chapter 08: Scaling React Components

The key benefit of `defaultProps` is that if a property is missing, a default value is rendered.

---

Instance attributes are set in `constructor()`; static class attributes (e.g. `defaultProps`) are set outside the class.

---

The `propTypes` static class attribute doesn’t enforce data types on property values; instead, it gives you a warning (but only if you’re in development mode).

React warns about each property only once per single `render()`, even if the violation occurs multiple times via e.g. repeated components.

---

You can define your own custom propTypes validation, by creating an expression that returns an instance of `Error`. Then, you use that expression in `propTypes: {...}` as the value of the property:

```javascript
DemoComponent.propTypes = {
 email: (props, propName, componentName) => {
   const emailRegularExpression =   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
   if (!emailRegularExpression.test(props[propName])) {
     return new Error('Email validation failed!')
   }
 }
}
```

---

With `this.props.children`, you can create pass-through components that are flexible, powerful, and universal. 

Below, everything within `<FancyBorder>` gets passed in as `this.props.children`; as such, `<FancyBorder>` never needs to care about the child elements changing across its instances.

```javascript
function WelcomeDialog() {
  
 return (
   <FancyBorder color="blue">
     <h1 className="Dialog-title"> 
       Welcome
     </h1>
     <p className="Dialog-message">
       Thank you for visiting our spacecraft!
     </p>
   </FancyBorder>
 );
}

function FancyBorder(props) {
 return (
   <div className={'FancyBorder FancyBorder-' + props.color}>
     {props.children}
   </div>
 );
}
```

Note that you can access individual items as e.g. `this.props.children[0]` (though be careful: when there’s only one child element, it’s not an array but a string.)

---

An underscore as the start of a name of a variable or method typically means it’s a private attribute, variable, or method (not intended for use by another module, class, object, function, etc).

---

`displayName` sets React element names when they need to be different from the component class name (in e.g. the React extension console.)

---

Another example of combining spread operators with key=value properties: 

`< Component {...this.state } {...this.props } className="main" />`

---

A **higher-order component** lets you enhance a component with additional logic, allowing you to reuse code. 

Really, an HOC is merely an arrow-function that renders the original classes while adding some extra functionality.

Start with components that solve your needs. Then, if you see repeating patterns, or properties that you’re passing over multiple layers of nested components (but aren’t using in the interim components), introduce an HOC as a container component or two.

---

## Chapters 09-11: Projects

This is a pretty cool way to find the location of a DOM node:

```javascript
 toggle() {
   const tooltipNode = ReactDOM.findDOMNode(this)
   this.setState({
     opacity: !this.state.opacity,
     top: tooltipNode.offsetTop,
     left: tooltipNode.offsetLeft
   })
 }
```

---

When a function definition is passed in from a parent component, a la `<Button time="5" startTimer={this.startTimer} />`, then the following: 

```javascript
class Button extends React.Component {
startTimer(event) {
   return this.props.startTimer(this.props.time)
 }
render() {
  return <button
    type="button"
    className='btn-default btn'
    onClick={this.startTimer.bind(this)}>
    {this.props.time} seconds
  </button>
}
}
```

and 

```javascript
class Button extends React.Component {
render() {
  return <button
    type="button"
    className='btn-default btn'
    onClick={() => { this.props.startTimer(this.props.time) }}>
    {this.props.time} seconds
  </button>
}
}
```
will function identically.