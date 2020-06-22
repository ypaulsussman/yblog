
## V5 Changes

- [Listed here.](https://github.com/d3/d3/blob/master/CHANGES.md)
- Rather than callbacks...
  ```javascript
  d3.csv("file.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
  });
  ```
- Use promises:
  ```javascript
    d3.csv("file.csv")
      .then(function(data) {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    // or even:
    const data = await d3.csv("file.csv");
    console.log(data);
  ```


## SVG

pixel-based coordinates system in which `0,0` is the top-left corner of the drawing space. Increasing `x` values move to the right, while increasing `y` values move down

`rect` draws a rectangle. Use `x` and `y` to specify the coordinates of the upper-left corner, and `width` and `height` to specify the dimensions: `<rect x="0" y="0" width="500" height="50"/>`

`circle` draws a circle. Use `cx` and `cy` to specify the coordinates of the center, and `r` to specify the radius: `<circle cx="250" cy="25" r="25"/>`

`ellipse` is similar, but expects separate radius values for each axis: `<ellipse cx="250" cy="25" rx="100" ry="25"/>`

`line` draws a line: use `x1` and `y1` to specify the coordinates of one end of the line, and `x2` and `y2` to specify the coordinates of the other end. A stroke color must be specified for the line to be visible: `<line x1="0" y1="0" x2="500" y2="50" stroke="black"/>`

`text` renders text. Use `x` to specify the position of the left edge, and `y` to specify the vertical position of the type’s baseline. (_Baseline is a typographical term for the invisible line on which the letters appear to rest. Portions of letters such as “p” and “y” that extend below the baseline are called descenders._) `text` will inherit the CSS-specified font styles of its parent element unless specified otherwise: `<text x="250" y="25" font-family="serif" font-size="25" fill="gray">Easy-peasy</text>`

`path` is for drawing anything more complex than the preceding shapes.

SVG’s default style is a black fill with no stroke. Common SVG attributes are as follows:
`fill`: A color value.
`stroke`: a color value.
`stroke-width`: A numeric measurement, typically in pixels.
`opacity`: a numeric value between `0.0` (_completely transparent_) and `1.0` (_completely opaque_). 
`text-anchor`can center the text horizontally: `.attr("text-anchor", "middle")`
With `text`, you can also use `font-family` and `font-size`.

There are no “layers” in SVG and no real concept of depth. SVG does not support CSS’s `z-index` property, so shapes can be arranged only within the two-dimensional x/y plane. Instead, the order in which elements are coded determines their depth order.

There are two ways to apply transparency to SVG: use an RGB color with alpha, or set an `opacity` value: `<circle cx="50" cy="25" r="20" fill="rgba(0, 0, 255, 0.75)"/>` and `<circle cx="50" cy="25" r="20" fill="rgb(0, 0, 255)" opacity=".75"/>` are similar, though you can set a separate `stroke` opacity only with the former.

---------///---------///---------///---------///---------///---------///---------///---------///

## Generating Page Elements

`d3` references the D3 object, so we can access its methods.

`select("body")` 
Give the `select()` method a CSS selector as input, and it will return a reference to the first element in the DOM that matches. Use `selectAll()` when you need more than one element.

`.append("p")` 
`append() `creates whatever new DOM element you specify and appends it to the end (but just inside) of whatever selection it’s acting on; it then returns a reference to the new element it just created.

`.text("New paragraph!")`
`text()` takes a string and inserts it between the opening and closing tags of the current selection.

## Binding Data

With D3, we bind our data input values to elements in the DOM. Binding is like “attaching” or associating data to specific elements, so that later you can reference those values to apply mapping rules.

But there are two things we need in place beforehand: the data, and the selected DOM elements.

- `csv()` takes two arguments: a string representing the path of the CSV file to load in, and an anonymous function to be used as a callback, after the CSV file has been loaded into memory. 
  - When called, the anonymous function is handed the result of the CSV loading and parsing process — that is, the data. 
    - Typically this is where you’d call other functions that construct the visualization
  - Each value from the CSV is stored as a string, even the numbers.
  - As a third, optional, argument, you may pass a method that will be applied to each row of the file as it's being loaded; this precedes the callback:
  ```javascript
  var rowConverter = function(d) { return {
    Food: d.Food,
    Deliciousness: parseFloat(d.Deliciousness) };
  }

  d3.csv("food.csv", rowConverter, function(data) { 
    console.log(data);
  });
  ```
  - The callback function is executed whether or not the datafile was loaded successfully
    - You can include an optional `error` parameter in the callback function definition
    - `error` must be the first parameter, and data the second

- A common mistake is to include references to the external data outside of the callback function. 
  - Reference your data only from within the callback function (or from within other functions that you call within the callback function)
  - One option: 
    - Declare a global variable first, then call `d3.csv()` to load the data. 
    - Within the callback function, copy the data into the global variable, then finally 
    - call any functions that rely on the data being present. 
    - This ensures that the data is available later to any subsequent functions, even outside of `d3.csv()`:
    ```javascript
    var dataset; // Declare global variable.
    d3.csv("food.csv", function(data) {
    dataset = data;   // Once loaded, copy to dataset. 
    generateVis();    // Then call other functions that 
    hideLoadingMsg(); // depend on data being present.
    });

    var useTheDataLater = function() {
      // Assuming useTheDataLater() is called sometime after 
      // d3.csv() has successfully loaded in the data, 
      // then the global dataset would be accessible here.
    };
    ```

- Once you've loaded the data, use the `data()` method to bind each datum to an element:
  ```javascript
  d3.select("body")
    .selectAll("p") // Selects all paragraphs in the DOM. 
                    // Because none exist yet, this returns an empty selection. 
                    // Think of this empty selection as representing the paragraphs that will soon exist.
    .data(dataset)  // Counts and parses our data values. 
                    // There are five values in our `dataset` array, 
                    // so everything past this point is executed five times, once for each value.
    .enter()        // This method compares [the count of the current DOM selection] and [the count of data it receives.] 
                    // If there are more data values than corresponding DOM elements, then `enter()` 
                    // creates a new placeholder element, and returns a reference to it
    .append("p")
    .text(function(d) { return d; }); // Anytime after you call `data()`, you can create 
                                      // an anonymous function that accepts `d` as input. 
                                      // `data()` ensures that `d` is set to the corresponding value 
                                      // in the dataset, relative to the current element in the loop.
  ```

- Often it makes sense to 
  - first declare the encompassing `svg` element, then 
  - bind and declare the data, then 
  - style it:
  ```javascript
  var w = 500
  var h = 50 
  var svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  var circles = svg.selectAll("circle") 
                    .data(dataset)
                    .enter() 
                    .append("circle");

  circles.attr("cx", function(d, i) { return (i * 50) + 25; })  // i is the current element's index
          .attr("cy", h/2) 
          .attr("r", function(d) { return d; });
  ```


## Scales

- Scales are functions that map from an input domain to an output range.
  - The values in any dataset are unlikely to correspond exactly to pixel measurements. 
  - Scales map those data to new values useful for visualization.
    - D3 scales are functions with parameters that you define. 
    - Once they are created, you call the scale function on a data value, and it returns a scaled output value. 
    - You can define and use as many scales as you like.
  - A scale is a mathematical relationship, with no direct visual output: think of scales and axes as two different, yet related, features.
    - A scale’s **input domain** is the range of possible input data values.
    - A scale’s **output range** is the range of possible output values, commonly used as display values in pixel units. The output range is completely up to you.
    - Example usage:
    ```javascript
    var scale = d3.scaleLinear(); // `scale` is a function to which you can pass input values; 
                                  // Because you haven’t set a domain and a range yet, this function
                                  // will map input to output on a 1:1 scale, i.e. unchanged.
    scale.domain([100, 500]);
    scale.range([10, 350]);

    scale(100); //Returns 10 
    scale(300); //Returns 180 
    scale(500); //Returns 350
    ```
  - Typically, you call `scale` from within an `attr()` or similar method or similar, not on their own.
