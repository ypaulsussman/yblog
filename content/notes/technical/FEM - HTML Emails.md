---
title: HTML Emails (Rodriguez, Jason)
date: "2019-09-26"
template: "post"
draft: true
slug: "/posts/html-emails-notes/"
category: "What I Read"
tags:
  - "CSS"
  - "HTML"
  - "Email"
  - "Frontend Masters"
description: "Notes from a live workshop I attended. (Course tagline: \"Get an understanding of the foundational principles behind HTML email development and how it differs from web development. Learn how to create accessible, responsive emails that can be easily used by anyone, and see how to add interactivity to expand functionality in the inbox.\")"
---

# HTML Emails, v2

## Introduction

- Email is awesome! 
   - Open standard; 
   - Easy to set up _and_ track; 
   - Fairly forgiving (_because forgettable_); 
   - Highly remunerative
- `reallygoodemails.com` is a nice archive of _successful_ campaigns

## Email Basics
- No rendering standards: 
   - Each client uses its own HTML-rendering engine (_many use WebKit, fortunately_)
   - Outlook, however, uses MSWord for rendering HTML (_which results in it not liking lots of HTML/CSS_)
   - And, previously... used IE's rendering engine
- Float, grid, JS, and plenty of CSS **don't** work in email
   - Gmail _does_ allow JSON in the `<head>` of your doc, if structured properly
   - Table-based design will work everywhere

### HTML Basics
- Example HTML skeleton: 
    ```html
    <!DOCTYPE html>
    <!--careful to localize w/ `lang` attr 
      - v important to screenreaders; 
      - note: lang attr  can be used in many different HTML tags, even w/in different parts of the doc-->
    <html lang="en">
        <head>
          <!-- <title> won't be used in email client: but many readers open their email for later in a browser tab, making it useful-->
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <!--viewport for responsivity: 
            - note: don't disable zoom; not our right! -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
          <!--below is boilerplate for helping out w/ rando MS bugs-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css"> </style>
        </head>
       <!-- zero out styles below to prevent clients from adding that; 
          - added in <body> b/c some clients will strip out css clients-->
        <body id="body" style="margin: 0 !important; padding: 0 !important;"> </body>
    </html>
    ```
- email-friendly html
   - `div`, `span`
   - `h1` - `h6`
   - `p`, `strong`, `em`
   - `img`
   - semantic tags aren't _bad,_ but screen-readers don't really process them yet
- "footer" often is just a `<p>` tag containing ling
- [CANSPAM (US), CASTLE (Canada), GDPR] all require legal disclosures; they go in the footer
- In email, `<div>`'s and `<span>`'s main purpose is for housing css-selectors (less so semantic)
- Good coding practice: since it's mostly HTML, start w/ just comments describing what you want to be where, e.g. 
    ```html
    <!--Logo image-->
    
    <!--Headline-->
    
    <!--Hero image-->
    
    <!--Body copy-->
    
    <!--Button-->
    
    <!--Footer-->
    ```

### CSS basics
- Typically, CSS can be in...
   - linked stylesheet (breaks in tons - most? - of clients, so not usable)
   - embedded styles (in `<head>` of doc: until 2017, gMail stripped these, but now better)
   - inline styles (often useful as fallback; some EU/RU clients still strip `<head>` CSS)
- Inline is safest/default; embedded sometimes required for e.g. `:hover` or multi-tag effects
- [premailer](https://premailer.github.io/premailer/) is Ruby gem for 'inlining' CSS that's been written in separate stylesheet
-email-friendly css
   - for text: `color`, `font-family`, `font-size`, `font-style`, `font-weight`, `line-height`, `text-align`, 
   - for block-level: `margin`, `padding`, `width`, `max-width`, `border`
- Set `line-height` higher than you would on a website: ensures the reader has breathing-room for e.g. clicking links  
- For measurements, use `px` -- not all clients render relative units well
- `margin`/`padding` 
   - For block-level elements, be sure to overwrite these: start w/ setting to `0px`, then set per how it looks
   - Most clients will respect shorthand (no need for e.g. `margin-right` etc)
   - Use these for vertical/horizontal centering
   - For old-school Outlook, though...
      - you'll need to use `table`-based layout as fallback
      - `<center>` tag is completely deprecated: but will be recognized by Outlook

An aside on strategy: 
   - rare that you're purely sending information in an email 
   - almost always, an email has a goal... 
   - ...and that goal is accomplished via links
   - taking the user to a page where they'll interact

### Links and Buttons
- Use descriptive links (don't say "_Click here_"; say "_Get help here_" or "_Read the article here_")
- Embrace link conventions (avoid using underline on non-links; don't rely on color alone for denoting a link)
- Don't use images for buttons (most emails disable these)
- Worth implementing 'bulletproof buttons' 
   - One button in multiple HTML implementations
   - Use `buttons.cm` to build them (unless you want to learn MSO's proprietary VML yourself...)
   - B/C so verbose and arcane, less maintainable/customizable than the other (`padding`/`border`-based) examples
   - However, the safest (save for Samsung mail)
   - Responsivity isn't great (for e.g. long strings of text, inside the button, that will need to wrap on mobile screens)
   
### Images
- make them responsive by default
   - For Outlook, set fixed `width= $$$px`
   - Use inline `style="display: block; max-width: 100%; min-width: $$$px; width: 100%"` to adjust across screen size 
- compress as much as you can, esp for animated gifs
- use `alt` text (elide "_an image of..._"; just say e.g. "_...the front of a schoolbus._")
- stick to `jpg`, `png`, `gif`
- can use background images, too
   - often underutilized!
   - use both HTML attributes and inline CSS for wider client-coverage, e.g.
       ```html
       <td 
          style="color: #ffffff; padding: 20px;" 
          background="path/to/file.jpg" 
          bgcolor="#229efd" 
          style="background: #229efd url('path/to/file.jpg');"
       >
       ```
   - most reliable on `td` tags (table cells)

## Accessibility in Email
- Note: we're all only  _temporarily_ able-bodied
   - eye-exams (w/ eye-dilation fluid) happen; 
   - sometimes you're holding things or driving;
   - sometimes it's really loud or sunny out;
   - accidents happen; 
   - eventually you get old.
- Keep color-contrast high
- Create strong visual hierarchy: make email scannable
- Focus on readability 
   - Generous font size and line height; 
   - Left-align blocks of text (but don't just justify: right-end rag is best)
   - Biggest win: don't put text in images!
- Keep layouts (esp. links/buttons) simple and usable
- Keep tables-for-layout "quiet" on SR's by using `role="presentation"` (not inherited, so apply to nested tables)
- Include `lang` attribute for SR's
- Test, too: NVDA (Windows), VoiceOver (macOS/iOS), JAWS (paid option)
- Some accessibility tools:
   - `NoCoffee Vision Simulator` = Chrome extension for variety of visual issues 
   - `Silktide` = Chrome extension for variety of visual issues
   - `tota11y` (bookmark? also extension) = by Kahn Academy; provides nice alternative to WAVE

## Simple Layouts

- Table-based design is the most reliable way; 'hybrid/spongy' coding is a good alernative for responsivity
- Rule #1: for layout, think in modules
- Table-based design basic practices:
   - Don't forget `role="presentation"`!
   - Use `table`, table row (`tr`), and table cell (`td`)
   - Ignore `th`, `thhead`, `tbody`, `tfooter`
   - Keep components in their own rows/tables
   - Overwrite defaults using HTML attributes
   - Place most styles on table cells
   - Avoid nesting (old IBM/Lotus clients will break)
- Single-column layout system:
  - fluid-width `table`
  - inside that, fixed-width `table`
  - inside that, content within `<tr>`
- For multi-column layouts (which we don't recommend!), nest the above system further:
   - fluid-width `table`
   - inside that, fixed-width `table`
   - inside that, fluid-width `table`
   - inside that, one fixed-width `table` per column (prefer this to using `<td>`, for older client support: though, yes, way less semantic)
- `padding` tends to be better supported on table cells than `margin` for e.g. older Outlook versions

- Side note: Litmus has a chrome extension -- is it paid? Free version?

## Complex Layouts and Responsive Design

- Half of subscribers now open email links on mobile (up from like a third only a few years ago)
- Three approaches to mobile email, each progressively more involved (but allowing more complex layouts)
    - Mobile-aware Design
        - Simple layouts
        - Large text and buttons
        - Design scales down (no reordering/stacking of content)
    - Traditional responsive
        - Fluid layouts (columns, stacking, etc)
        - Fluid image sizes (a la `max-width, min-width, width` styling)
        - Media queries to adjust both
            - Note you'll have to use `!important` for any (embedded) query properties, in order to overwrite the preexisting (inline) properties
            - Note it's safer for emails to use the _desktop_ styles as the default, then media queries for the mobile views (rather than vice-versa, as you often do for websites) 
    - Hybrid / "spongy" coding
        - Designed for life prior to Google allowing styles in the `<head>`
        - All components fluid by default (rather using `<table>` with fixed-widths)
        - Instead, `max-width` to constrain components
        - For MSO, use "ghost-tables": `<!--[if (gte mso 9)|(IE)]-->`, then `<![endif]-->`
            - "_greater than or equal to MS office 9, or IE_"
            - `gt`, `lte`, and `lt` are alternatives
            - `mso 9` is Outlook 2000; list of all correspondences [available here](https://stackoverflow.design/email/base/mso)
        - Downside: since you often still need _some_ tables, can rapidly get very involved/complex/nested
        - Second upside: does provide for some nifty weirdness like reverse-stacking
        - See the `Hybrid Examples` dir; it's got well-annotated examples by the dev who pioneered this format 

## Creating Interactive Emails

- [Interactivity / Animation] within emails is hot right now
- Commonly-requested features 
    - Carousel, image gallery, tabbed content 
    - Hamburger menus 
    - Hot spots and hover effects
    - Quizzes and polls
    - Anchor tags for navigation w/in email
    - Accordions 
- Upside: can increase functionality and engagement
- Downside: doesn't work everywhere (often only AppleMail/WebKit-using clients)
- Downside: harder to track interactions
- Downside: often flashy, not useful

### Animations
- Baseline for "_interactivity_" -- `:hover` states
    - Great for accessibility (if unsupported... just a regular, working button) 
    - Easy to code 
    - Must be included in `<head>` (so some concerns if clients ever begin stripping that code again)
    - Target elements, not classes, to prevent people adding other-classed elements via WYSIWG (this is a general rule)
        ```css
            a { color: #229efd; font-weight: bold; }
            a:hover { color: #fd6350; text-decoration: none; }
            a.button { transition: all 0.2s ease; }
            a.button:hover { 
                background-color: #fd6350 !important;
                box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
                transform: translateY(-10px);
            }
        ```
- `@keyframes` animations are more powerful, but require more-complex setup; research further

### Interactivity
- Often need to use "The Checkbox Hack" to manage state
- Despite name, radio buttons are more commonly used (b/c only allow one element to be checked at a time -- prevents weird overlappings of state)
- Linked stylesheets can be used to dynamically feed in content (using CSS `content` property to grab a different stylesheet off the server, depending on the email's current state)

### AMP for Email
- Announced last year
- Less about lightweight experience; more about interactivity w/in email
- [Playground here](https://amp.gmail.dev/playground/)
- Effectively a third (along side `html` and `txt`) MIME-type, `amp`, that you'll need to send (and which not many clients yet support)
- This MIME-type then has a variety of more-interactive `amp-*` components

## Testing, Tools, and Wrap Up
- "_Is it supported?_" resources
    - `caniemail.com` was released a couple weeks ago
    - `freshinbox.com/resources/` also has lots of demos/gists for 'kinetic' (interactive) emails 
- Email builder frameworks: 
    - `mjml.io` - polished, well-documented framework for abstracting away underlying HTML/CSS 
    - Foundation has another popular email-templating language, "Inky"
    - Maizzle is the newest of these; rather than custom tags, it uses Tailwind CSS' utility classes. It's the new hotness
 - `email.geeks.chat/` is the main Slack channel for email discussion 
 - `thebetter.email/resources` is his personal list of good resources

