---
title: Design for Developers (Drasner, Sarah)
date: "2018-11-28"
template: "post"
draft: true
slug: "/posts/design-for-developers-notes/"
category: "What I Read"
tags:
  - "Frontend Masters"
  - "Web Design"
description: "Notes from a FEM workshop I attended. (Tagline: \"This class condenses and demystifies a lot of the rules of design as well as styles and implementation so that students are empowered to make their own interfaces the way they imagine.\")"
---

Note to self: [read more about neuromyths](http://www.oecd.org/education/ceri/neuromyth6.htm)

Learning skills outside "your discipline" => strengthening the corpus collosum => better at all skills 

Goal here: create designs that interest people in your code.

[_Side Idea:_] text-heavy website that has solely horizontal scrolling. Surely this has been done before, and discarded as unappealing/impractical? Wonder what the obstacles were.

### Layout

Grid layout: brings order to chaos; helps (visual) mind focus.

**Balance: Symmetry**

* Tactic: lip colors across symmetric line to keep eye moving in otherwise-perfectly-symmetric layout
* Strategy: use intentional asymmetry to draw the eye to that location
* Downside to symmetry: not a ton that's _exceptional_ about its proper use

**Balance: Asymmetry**

* Orizon Design -- good examples of intentional use of asymmetry, especially breaking _out_ of the grid layout that they themselves had architected 
* People _like_ asymmetry: our world is asymmetric, so in some ways it's what we're used to.
* Rule of Thirds:
* Triad Composition: keep the eye circling, in triangle cycle, from one of three points to the next.
* Swiss Design: famous for large, flat, clean geometric shapes.

**Shape**
* Saccade: even when focusing on one image, your eyes are constantly moving around, scanning, creating the environment
* For evolutionary reasons, certain items instinctively draw our eyes:
    * Movement draws the eye (predator/prey)
    * Bright colors draw the eye (berries!)
    * Circles draw the eye (faces/eyes)
* Our eyes compensate for circles -- you often need to shift them slightly beyond the margin, or else they'll _look_ off-centered
* Diagonals are dynamic: add them sparingly, to get people excited


**Scale and Cropping**
* Cropping pulls people in: they want to know _more,_ about what lies beyond the grid
* Rarely/never just plop an image down as a backround: crop, rotate, mask 

Read _Making and Breaking the Grid_ for more re: layouts.

**Anchoring**
* For lines, doesn't need to be solely aligned to edges of images: can also be focal point of image

**Tools**
* Photoshop
    * jpg/bmp's, rasters
    * transparencies, masks, filters
    * beginning, now, to work with shapes (formerly solely Illustrator)
* Illustrator
    * svg's, vectors
    * combining, clipping, etc shapes
* Sketch
    * USP: efficient at having multiple views/ideas in one space
    * Way inferior to Illustrator for exporting SVG's/other assets


When working on layout, don't forget the z-axis! Overlap, underlap, touch... lot of options.

### Layouts in CSS Grid

* Step 01: learn from Rachel Andrew's _Grid by Example_ page: great feature-demos, and prebuilt patterns.
* Step 02: _CSS Grid Garden_ -- ~30 short exercises; great place to start out.
* Step 03: Jen Simmons' _Experimental Layout Lab_

Chrome and Firefox both have great support for CSS grid in their inspectors, now.

`grid-template-columns`, `grid-template-rows`, and `grid-template-areas`

`grid-column-gap` and `grid-row-gap`

`justify items`

`grid-area`

`grid-column-start` and `grid-row-start`; `grid-column-end` and `grid-row-end` --> also replaceable by `grid-area`


* `*fr` is for "fraction"; it's just the fraction of the selected element.
    * It can also take a `repeat(number, fr)`
* `minmax()` for minimum/maximum


### CSS shape and text manipulation

`shape-outside` -- Chrome/Safari only; use e.g. `border-radius` as fallback

`clip-path`
* Generally, try not to use CSS to build shapes; use SVG's (which were _designed_ for adding shapes to the web.)
* [There's a good codepen for levels of support across varying methods of shape design/masking](https://codepen.io/yoksel/full/fsdbu/)

`transform` is supported everywhere, while `writing-mode` is on the way... and better/more semantic for actual script internationalization. 

[_Side Idea:_] When using Codepen: in settings, turn on normalize & autoprefixer.


### Color

**Additive color-mixing:** red, green, blue, all-in? White. (_You're adding light._)

**Subtractive color-mixing:** cyan, magenta, yellow, all-in? Black. (_You're subtracting light._)

[_Side Idea:_] Colorable, Contrast-A, Accessible Colors, a11y Check: all good sources for checking your accessibility.

**Color Wheel Combinations**
    * monochromatic - highs and lows in one color (across the key)
    * analogous - proximate in color spectrum (same key)
    * split/complementary - across the color spectrum
    * triadic -- easy to mess up; careful!

Duotone: ranges between two colors

In real life, the shadow of a thing is the opposite of whatever color lightis being shined on it.

In real life, objects that are further away have lower contrast.


### Color in Code

**Color Namings:** 
* RGBA, Hex: easy for computer, but not terribly human-readable
* HSLA: human-readable. Hue, saturation, lightness.
    * H: number between 0 - 360;
    * S and L: percentage (0% - 100%);
    * A: decimal (0.0 - 1.0)  
* Named colors = good for demos, but not much else.

**Color Variables:** saves your time refactoring.
    * JS can recognize native CSS variables! (Not true for Sass/SCSS).
    * Sass/SCSS variables give you access to `mix()`, `adjust-hue()`, `lighten()`, `darken()`, `saturate()`, though.
    
### Color Tools

* Dribbble lets you... 
    * steal palettes
    * search by a color
* Coolors.co (not .com!) lets you easily generate nice palettes (esp. for side projects)
* color.adobe.com is a good color wheel for experimenting with a little more detail
* Paletton lets you generate palettes with still more precision
* Adobe Capture lets you extract colors from a particular image you feed in
* For building gradients from two prexisting colors, use Ultimate CSS Gradient Generator
* For generating preselected gradients, use uiGradients


### Making a palette

* Anchoring: grab one color across a range of keys
* Get greys - reduce saturation of the colors you generated
* Gather accents - just a few


### Typography

* Slab serif: chunky serif
* Display: tends to be illegible when small, and lively when large; can be sans or serif

**Basic Rules of Fonts**
* Pairing: one display, one sans / or / one serif, one sans
* Never more than three; two is best
* Don't pick too-similar fonts
* Google Fonts offers "suggested pairings," and lets you preview (also: supported by popularity, so you may be getting some fonts for free b/c they've been cached; alternatively, can find more unique fonts.)
* Fontjoy lets you pair fonts

_Typography for Lawyers_ is a good intro to typography.

**Line length:** 45-90 chars; 2-3 alphabets

**Typographic Color:** no relation to color-color; squint eyes and check cadence of words

For text within SVG's, you can use [text lockup to maintain positioning.](https://css-tricks.com/snippets/svg/text-lock-up/)

_Proportioned_ is opposite of _monospace._

_Kerning_ (CSS: letter-spacing) is not only extra spacing between letters, but also the overlap/tucking between e.g. AV

_Leading_ (CSS: line-height, vertical-align) is space between lines. (Pronounced like the metal: ledding.)

_Widow:_ last word in a paragraph, on a new line; _orphan:_ last word in a paragraph, in a new column. 

Human eyes overcorrect on pages, too: you'll never see text in a book that is vertically centered (always more space at bottom than at top.)

Zach Leatherman: good advice on font loading; Peter Mueller's Subfont: CLI tool to simplify the implementation of that advice.

[_Side Note:_] holy wow [this visualization is pretty.](https://ich.unesco.org/en/dive#)

Mandy Michael's pens are phenomenal for exploring font manipulation.

### Images

Images are heavy, and a huge part of what a site downloads: thus a major component of performance optimization.

Good free image sources:
* Unsplash
* Google Image  Search license
* Freepik
* freeimages
* Pexels

Optimization: 
* Smashing magazine -- good writeup re: double the size with low compression to get smaller image
* tinyJPG/tinyPNG (or Webpack plugins) -- jpg/png optimizers
* SVGOMG - SVG optimizer (with service worker for offline access!)

Interesting: "_With Canvas, you're learning Canvas. With SVG, you're using the DOM._"

[Clipping vs masking overview here](https://css-tricks.com/masking-vs-clipping-use/)

Use SVG inline if you want DOM-manipulation capability.