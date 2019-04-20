---
title: Advanced React Patterns (Dodds, Kent)
date: "2018-05-25"
template: "post"
draft: false
slug: "/posts/advanced-react-patterns-notes/"
category: "What I Read"
tags:
  - "React"
  - "Frontend Masters"
description: "Notes from a live workshop I attended. (Course tagline: \"This course teaches you advanced patterns in React that you can use to make components that are simple, flexible, and enjoyable to work with.\")"
---

### .setState() options
You can invoke `this.setState()` with...
* an updated object as the first param; or 
* a function with two parameters. (Second parameter is always a callback function.)

The following, then, are identical save for the callback in the second version: 

```javascript
this.setState({ on: !this.state.on });

this.setState(
   () => ({ on: !this.state.on }),      // terser version: ({ on }) => ({ on: !on }) 
   this.props.onToggle(this.state.on),  // invoking onToggle as the callback function
);
```

---

### this.props.children syntax
In JSX, the following are identical: 

```javascript
<Toggle children={foo} />


<Toggle>{foo}</Toggle>
```

...though the latter is preferred by Airbnb. 
(In both cases, `foo` is accessible by `this.props.children`.)

---

### static class methods

When a method doesn't use `this`, it doesn't need to be a class method: preface it with `static` when declaring it inside the Component class.

Static method calls are made directly on the class and are not callable on instances of the class.

---

### Render Props

Sharing code between React components using a prop whose value is a function, e.g. 

1. creating a reusable component that will (though not in this case, really) add functionality to any component that uses it, regardless of that component’s UI

```javascript
import React from 'react';

class SharedComponent extends React.Component {
 render() {
   return (
     <div>
       {this.props.render()} 
       //a function passed in by another component
       // note: doesn’t *need* to be named render; could be called e.g. wrapThisInADiv
     </div>
   );
 }
}


export default SharedComponent;
```
...then...

2. Wrapping a new component in the reusable component, using Render Props

```javascript
import React from 'react';
import SharedComponent from 'components/SharedComponent';
const SayHello = () => (
 <SharedComponent render={() => (
   <span>hello!</span>
 )} />
);
```

By using a prop to define what is rendered, the component just injects functionality without needing to know how it is being applied to the UI. (_This makes it a clearer, terser alternative to higher-order components?_)

The [“A practical render prop component by example” section of this article](https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2) has a nifty demo for checking whether local storage exists (and, if so, loading; if not, making an API call.)

[This video](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) gives a great historical overview of mixins, higher-order components, and render props. (And a nice, brief demo of higher-order functions, and a 10,000-foot overview of the `react-motion` library!)

At 15:56 or so, he changes a function declaration to a function expression in order to bind the `this` context such that the `handleMouseMove method` can be called. Nota bene for future issues with context binding.

Mixins used to be popular in React, when `.createClass` was supported; however, ES6 class syntax doesn’t support them, so they went away. (Also, at scale became problematic b/c which mixin did the state come from? Are any of them overlapping on state keys? If so, React will warn on state collision.)

HOC’s can be nice, but they have the gotcha of needing to spread `this.props` within the HOC’s `render` in order to pass any data through the HOC (i.e. props coming from other sources beyond the HOC.)

This becomes exponentially more problematic when you’re wrapping one component in multiple HOC’s: and React won’t warn on state/naming collision between HOC’s. Ultimately, we have the same problems as we did with mixins.

Also, HOC’s statically compose (only one time) b/c they compose outside of `render` - so they run into issues with hot reloading or `react-router`.

Render props, by contrast to HOC’s, compose dynamically, inside the render method (see 36:50 for the demo.)

In addition, the render props pattern (by definition) will render each of the components, resulting in a more explicit, predictable, readable component hierarchy (in e.g. the source code and/or DevTools.)

[This article](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9) provides another, more complex demo of render props, with some more reasoning on the tradeoff between (potential performance gains from HOC [vs] props namespace issues.) Worth rereading its in-depth example, potentially.

[This article](https://lucasmreis.github.io/blog/simple-react-patterns/) goes into several methods of separating logic and view within components, and provides useful comparisons between how to write the same components using HOC, render props, and ad hoc patterns.

And [here’s the intro code](https://github.com/kentcdodds/advanced-react-patterns-v2/blob/master/src/exercises-final/04.js) from Kent C. Dodds’ original ARP course!

[Your next step in the world of render props:](https://github.com/jaredpalmer/awesome-react-render-props) a list of more resources, as well the most popular libraries currently making use of the render props pattern.

---

### Prop Collections and Getters
From Kent C. Dodds’ [Advanced React Patterns overview](https://blog.kentcdodds.com/advanced-react-component-patterns-56af2b74bc5f):

Often when using the render prop pattern, there are multiple elements that require the same props applied for accessibility or interactivity purposes. 

(_An example from the “toggler” code: the button/element that’s responsible for changing the on state of our toggle component._)

We can take these common props and put them into an object collection; we can then apply that object to the elements we want.

There’s a problem with prop collections that has to do with composability and leaky abstractions, however. 

If the prop collection uses an `onClick`, then [applying an `onClick` to my toggle element for my own behavior] and [applying `onClick` behavior to prop collection] will lead to some problems. 

Prop (collection) getters to avoid this shortcoming. 

There’s a separate, [in-depth article on prop getters here.](https://blog.kentcdodds.com/how-to-give-rendering-control-to-users-with-prop-getters-549eaef76acf)

For more examples, see [Exercises 05 and 06](https://github.com/kentcdodds/advanced-react-patterns-v2/tree/master/src/exercises-final) from the original ARP course.

---

### Provider Pattern

FB’s definition: Context provides a way to pass data through the component tree without having to pass props down manually at every level.

This article describes the [Context API’s updates to this pattern](https://www.robinwieruch.de/react-context-api/).

This article [provides another, more extensive demo](https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-2-react-3c5662b997ab) using the stabilized Context API.