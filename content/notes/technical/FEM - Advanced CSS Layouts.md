---
title: Advanced CSS Layouts (Kramer, Jen)
date: "2019-08-15"
template: "post"
draft: true
slug: "/posts/advanced-css-layouts-notes/"
category: "What I Read"
tags:
  - "CSS"
  - "Frontend Masters"
description: "Notes from a live workshop I attended. (Course tagline: \"By coding along with us, you'll: learn to combine Flexbox, calc(), custom properties, and media queries to create incredibly DRY layouts; understand modular scales for type; create responsive tables using correct table markup and different techniques for display; and create responsive forms that work well across devices.\")"
---


# Advanced CSS Layouts 

## 01 Review exercise
* there's `align-content` as well as `align-items` -> research further
* `rem` -> `em` based on width of `m`-char _at root of DOM_ (responsive design often uses `%`, or `vh`/`vw`, as well)

### Flexbox version (your solution)
```css
.wrapper {
  display: flex;
  flex-flow: row wrap;  
}

.wrapper > div {
  margin: 0px 10px 20px 10px 
}

.a, .h {
  flex: calc(66% - 20px)
}

.b, .d, .e, .f, .g {
  flex: calc(33% - 20px)
}

.c {
  flex: 100%
}

```

### CSS Grid version (your solution)
```css
.wrapper {
  display: grid;
  grid-gap: 20px;  
}

.a {
  grid-column: 1 / 3;
  grid-row: 1;
}

.b {
  grid-column: 3 / 4;
  grid-row: 1;
}

.c {
  grid-column: 1 / 4;
  grid-row: 2;
}

.d {
  grid-column: 1 / 2;
  grid-row: 3;
}

.e {
  grid-column: 2 / 3;
  grid-row: 3;
}

.f {
  grid-column: 3 / 4;
  grid-row: 3;
}
.g {
  grid-column: 1 / 2;
  grid-row: 4;
}
.h {
  grid-column: 2 / 4;
  grid-row: 4;
}
```

* CSS Grid can be implemented via [span, number, or grid-template] syntax
* `grid-template-columns: repeat(3, 1fr)` = divide the page into three columns, each of 'one fraction' (an equal-sized but relative unit of measurement)
* Future research: Rachel Andrews -- `gridbyexample.com` -- good guide for supporting browsers w/o grid  

---

## 02 CSS-Only Hamburger Button
* Semantic practice: associate each `<section>` with an `<h2>`
* Semantic practice: `<figure>` element - good for [image, caption(s), link] grouping

* Accessibility: in general, avoid messing w/ `tabindex`
* Accessibility: if element has `hidden` attribute, don't need to worry about `tabindex` 
* Accessibility: below is basically the canonical Bootstrap implementation of `sr-only`
```css
  .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
  }
```

* Usability: `<a>` is inline by default (only text is clickable); setting `display: block` makes the entire encompassed area clickable!

* Future research: [hidden attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) vs [display: none](https://developer.mozilla.org/en-US/docs/Web/CSS/display) vs [visibility: hidden](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)

---

## 03 CSS-Calc and Custom Properties

### CSS Calc Overview
* Do math in CSS
    * Works with: [length, frequency, angle, time, number, integer]
    * Can perform: [addition, subtraction, multiplication, division]
* Can mix units (as opposed to SASS)
* Excellent alternative to 'magical numbers'
* Quirks
    * Must surround operator by whitespace (required for `+` and `-`; dimply good practice for `*` and `/`)
    * Can nest `calc()` statements
    * Can interpolate SASS vars e.g. `calc(#{$a} + 1em)` if the var is `$a = 40%`
    * PEMDAS applies

### CSS Custom Properties
* Variables, but with quirks due to inheritance
* Variable is scoped to where it's declared (?)
* Example:
```css
:root {
    --primary-color: blue;
}

.wrapper{ 
    background-color: var(--primary-color);
}
```

* SASS better for... global values that don't change (_color, font, etc_)
* CSS Custom Properties better for... values that change in media queries (_font size, margin, padding, widths, flex basis, etc_)
* Concise CSS: in mobile CSS layout, establish custom properties; then, in media queries, change values of those properties.

## 04, 05, 06 Flexbox Grid Prototype 
* Note the custom-properties syntax allows for default custom properties when called, via `var(--arg, default)` syntax 
* Future research: check out [attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

## 07 and 08 Type Scales
* Use `type-scale.com` to experiment with font-size ratios (_'Major Second' is closest to what browsers implement?_)
* For fonts, better to use `<link>` tag than `@import`; fonts may have been cached by browser from earlier interaction with other sites

## 09 and 10 Responsive Tables
* Further research: what exactly does `border-collapse: collapse;` do? Something with table-cells at small sizes? 

## 11 Forms
* Further research: what exactly does `align-items: baseline;` do? Aligns items such that their gaps are identical?
