## Basic visualizations

Connect offers a range of pre-built basic visualizations which you can use to visualize data.  You can also [build your own](#custom-visualizations).

All visualizations support the setting of [field options](#field-options) and [interval options](#interval-options) (if applicable).

### Table viz

<p data-height="320" data-theme-id="17963" data-slug-hash="XbwjVx" data-default-tab="results" data-user="getconnect" class='codepen'>See the Pen <a href='http://codepen.io/getconnect/pen/XbwjVx/'>Connect Table viz</a> by Connect (<a href='http://codepen.io/getconnect'>@getconnect</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

The table viz will display your results in a tabular fashion.  This is best used with [grouped](#group-by) or [time interval](#time-intervals) queries,
which get displayed as multiple rows. 

You can also apply the following CSS classes to your viz's container to change the styling and/or behavior of the table:

* `connect-table-fixed-header` - enable scrolling of the table and ensure that the header remains fixed (using pure CSS).
* `connect-table-striped` - enable "zebra striped" styling of the table.
* `connect-table-hover` - changes a row's background color when hovering over it.
* `connect-table-solid-header` - display the table header with a solid background color.

The actual styling/colors used can be overridden using CSS, or you can [specify custom LESS variables](#less-variables) and build the SDK yourself.

### Text viz

<p data-height="300" data-theme-id="17963" data-slug-hash="WvBGEO" data-default-tab="results" data-user="getconnect" class='codepen'>See the Pen <a href='http://codepen.io/getconnect/pen/WvBGEO/'>Connect Text viz</a> by Connect (<a href='http://codepen.io/getconnect'>@getconnect</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

The text viz will display a single result in simple text.  You can add a title and specify the format via the [options](#chart-options).

You cannot create a text viz for queries with [groups](#group-by) or [time intervals](#time-intervals) - doing so will display an "unsupported query"
error on the visualization.

## Chart visualizations

Connect offers a range of pre-built chart visualizations which you can use to visualize data.  You can also [build your own](#custom-visualizations).

See [chart options](#chart-options) for information on how to customize these charts.  All visualizations also support the setting of
[field options](#field-options) and [interval options](#interval-options) (if applicable).

### Bar chart

<p data-height="300" data-theme-id="17963" data-slug-hash="PqvORv" data-default-tab="results" data-user="getconnect" class='codepen'>See the Pen <a href='http://codepen.io/getconnect/pen/PqvORv/'>Connect Bar Chart viz</a> by Connect (<a href='http://codepen.io/getconnect'>@getconnect</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

You can generate a bar chart for queries by specifying `type: 'bar'` on the options for `chart()`.

Bar charts are great for showing discrete data, such as with single or multiple [grouped](#group-by) queries.  While you can display [time interval](#time-intervals)
queries with a bar chart, it is highly recommended to use [line charts](#line-charts) instead.

### Line charts

<p data-height="300" data-theme-id="17963" data-slug-hash="doBXdm" data-default-tab="result" data-user="getconnect" class='codepen'>See the Pen <a href='http://codepen.io/getconnect/pen/doBXdm/'>Connect Line Charts</a> by Connect (<a href='http://codepen.io/getconnect'>@getconnect</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

You can generate a line chart for [grouped](#group-by) or [time interval](#time-intervals) queries by specifying one of the following `type` values on the options for `chart()`:

* `line`
* `spline`
* `area`
* `area-spline`
* `step`
* `area-step`

In the above example, all area charts specify `stack: true` in the [options](#chart-options) to provide a stacked area chart.  Also, the switch between the various chart types
makes use of the `destroy()` method to clean up (documented [here](#destroying-visualizations)).

### Chart options

All charts allow you to specify various options to customize their appearance and behavior:

```js
var chart = Connect.visualize(query)
    .as('chart')
    .inside('#chart')
    .with({
        chart: {
            type: 'bar',  
            colors: ['#3498db', '#34495e', '#e74c3c'],
            showLegend: true,
            padding:{
                top: 5,
                right: 10,
                bottom: 5,
                left: 10
            },
            yAxis: {
                format: '$,.2f',
                startAtZero: true,
                min: null,
                max: null
            },
            stack: true
        }
    })
    .draw();
```

| Property               | Type                  | Description                                                                                                                                                |
| -----------------------|---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                 | `string`              | Type of chart to display (one of either `bar`, `line`, `area`, `spline`, `area-spline`, `step`, `area-step`)                                               |
| `colors`               | `string[]|function`   | An array of colors to use as a palette for the chart. Or a function to provide more granular control. See [Chart colors](#chart-colors) for more info.     |
| `showLegend`           | `boolean`             | Specify whether or not to show the legend.  By default `true`, but `false` with a single aggregation and no group by/interval.                             |
| `padding`              | `object`              | The padding around the gauge (left, right, top and bottom).  By default, `{ left: 0, right: 0, bottom: 0, top: 0 }`                                        |
| `yAxis.format`         | `string|function`     | Either a format string, or alternatively a function accepting a single value argument that returns a formatted string. See [Formatters](#formatters) for more info. |
| `yAxis.startAtZero`    | `boolean`             | Specifically for `area`, `area-spline`, `area-step` and `bar`, this specifies whether or not the Y-axis min value will default to zero, or automatically calculate based on the data.  By default, this is `true`. |
| `yAxis.min`            | `number`              | An explicit minimum value for the Y-axis (this overrides `startAtZero` in all instances).                                                                  |
| `yAxis.max`            | `number`              | An explicit maximum value for the Y-axis.                                                                                                                  |
| `stack`                | `boolean`             | For all chart types except `bar`, whether or not to stack multiple series.                                                                                 |

### Chart colors

There are multiple ways in which you can customize chart colors.  If no colors are specified in [chart options](#chart-options), the
[default palette](https://github.com/getconnect/connect-js/blob/master/lib/viz/palette.ts) is used.

You can override the palette by setting the `colors` property on the [chart options](#chart-options) with an array of colors. For example:

```js
Connect.visualize(query)
    .as('chart')
    .inside('#sales-area')
    .with({
        title: 'Electric Car Sales 2018 (Units)',
        chart: {
            type: 'bar',    
            colors: ['#ff00000', 'blue', 'rgb(0, 255, 0)']
        }
    })
    .draw();
```

Furthermore, you can provide a custom function to the `colors` property allowing complete control over the coloring on the chart. For example, you may
want specific groups in your data to be the same color across multiple charts to allow users to correlate data by color:

```js
var manufacturerColors = function(context) {
    if (!context.groupBys)
        return;

    switch (context.groupBys['manufacturer']) {
        case 'Tesla':
            return 'rgb(155, 89, 182)';
        case 'Toyota':
            return 'rgb(26, 188, 156)';
        case 'GM':
            return 'rgb(231, 76, 60)';
        case 'Nissan':
            return 'rgb(243, 156, 18)';
        case 'Ford':
            return 'rgb(52, 152, 219)';
    }
};

Connect.visualize(query)
    .as('chart')
    .inside('#sales-bar')
    .with({
        title: 'Electric Car Sales 2018 (Units)',
        chart: {
            type: 'bar',
            colors: manufacturerColors
        }
    })
    .draw();

Connect.visualize(intervalQuery)
    .as('chart')
    .inside('#sales-area')
    .with({
        title: 'Electric Car Sales 2018 (Units)',
        chart: {
            type: 'area-spline',
            colors: manufacturerColors
        }
    })
    .draw();

```

The function that you provide to the `colors` property accepts a single `context` argument and should return a color as a string.
It will be called for each separate component of the chart, each time the `context` parameter will contain the unique combination of `select` and `groupBys` that a color is required for.
The `context` object has the following structure:

| Property        | Type                            | Description                                                                                                               |
| ----------------|---------------------------------| --------------------------------------------------------------------------------------------------------------------------|
| `select`        | `string`                        | The alias given to the aggregation you [selected in the query](#aggregations).                                            |
| `groupBys`      | `object`                        | An object containing the requested groupBy value keyed by the groupBy name [specified in the query](#group-by).           |

Note. When a legend is visible on a chart and a groupBy is defined on the query. The `colors` function will be called to define a color for each legend item, as the legend item is only related to the `select` the `groupBys` property will be `null` in that specific `context`.

## Gauge visualization

<p data-height="300" data-theme-id="17963" data-slug-hash="LVoOJr" data-default-tab="result" data-user="getconnect" class='codepen'>See the Pen <a href='http://codepen.io/getconnect/pen/LVoOJr/'>Connect Gauge viz</a> by Connect (<a href='http://codepen.io/getconnect'>@getconnect</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Gauge visualizations can be generated for basic queries.  You cannot create a gauge viz for queries with [groups](#group-by) or
[time intervals](#time-intervals) - doing so will display an "unsupported query" error on the visualization.

### Gauge options

As well as the setting of [field options](#field-options) (which all visualizations support), you must specify gauge options to configure the viz:

```js
var gauge = Connect.visualize(query)
    .as('guage')
    .inside('#gauge')
    .with({
        gauge: {
            min: 0,
            max: 'total'
            color: '#2980b9',
            padding:{
                top: 5,
                right: 10,
                bottom: 5,
                left: 10
            },
            label: {
                format: '$,.2f'
            }
        }
    })
    .draw();
```

| Property       | Type                  | Description                                                                                                                |
| ---------------|---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `min`          | `string` or `number`  | Specifies the minimum value of the chart.  This can either be a string name of a field in a resultset, or a static number. |
| `max`          | `string` or `number`  | Specifies the maximum value of the chart.  This can either be a string name of a field in a resultset, or a static number. |
| `color`        | `string`              | The color of the data arc of the gauge.                                                                                    |
| `padding`      | `object`              | The padding around the gauge (left, right, top and bottom).                                                                |
| `label.format` | `string|function`     | Either a format string, or alternatively a function accepting a single value argument that returns a formatted string. See [Formatters](#formatters) for more info.     |

## Field options

All visualizations allow specifying field options which describe the way in which aggregated values and grouped fields are displayed in the viz.

Field options are keyed by select or grouped field, for example:

```js
var query = connect.query('purchases')
    .select({
        totalSales: { sum: 'purchasePrice' }
    })
    .groupBy('product');

var chart = Connect.visualize(query)
    .as('chart')
    .inside('#chart')
    .with({
        chart: {
            type: 'bar'
        },
        fields: {
            totalSales: {
                label: 'Total Sales ($)',
                format: '$,.2f'
            },
            product: {
                label: 'Products',
                format: function(value){
                    return value === 'Some product name' ? 'Ours' : value;
                }
            }
        }
    })
    .draw();
```

| Property         | Type                  | Description                                                                                                                         |
| -----------------|---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `label`          | `string`              | A "friendly" label for the select or grouped field.  This may be displayed in a legend, tooltip, etc. depending on the viz type. |
| `format`          | `string|function`     | Either a format string, or alternatively a function accepting a single value argument that returns a formatted string. See [Formatters](#formatters) for more info.  |

## Formatters

Many of the viz types allow you to pass either a format string or a format function that converts a number to its string representation. 
When you pass a format string the d3 format function is used. You can find the [d3 formatting specifictaions here. ](https://github.com/mbostock/d3/wiki/Formatting)
An example of providing a format string:
```js
var fieldOptions = {
    totalSales: {
        //...
        format: '$,.2f'
    }
};
```

If you wish to have complete control over the formatting, you can provide your own format function.  The function must accept a value as an argument and return the formatted string.
This gives you the ability to use other third-party libraries for formatting. For example, you could format currency values using
[Numeral.js](http://numeraljs.com/):

```js
var currencyFormatter = function (value){
    return numeral(value).format('$0.0a');
};

var fieldOptions = {
    totalSales: {
        //...
        format: currencyFormatter
    }
};
```

## Interval options

All visualizations allow specifying interval options when executing a query with [time intervals](#time-intervals).  This controls the formatting
of title labels (i.e. in the [table viz](#table-viz)) and labels for the interval values themselves.

| Property         | Type                       | Description                                                                                                                           |
| -----------------|--------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `label`          | `string`                   | A "friendly" label or title for the interval.  This only applies to the [table viz](#table-viz) (for the column heading).             |
| `format`         | `string|object|function`   | Either a [moment.js format string](http://momentjs.com/docs/#/displaying/format/), an object keyed by [time interval](#time-intervals) with [moment.js format strings](http://momentjs.com/docs/#/displaying/format/) or a function taking the start and optionally the end date of an interval and returning a formatted string.                |

The simplest way to format the date for an Interval is to set the `format` property with a [moment.js format string. ](http://momentjs.com/docs/#/displaying/format/) For example:

```js
var query = connect.query('purchases')
    .select({
        totalSales: { sum: 'purchasePrice' }
    })
    .groupBy('product')
    .interval('monthly');

var table = Connect.visualize(query)
    .as('table')
    .inside('#table')
    .with({
        title: 'Product Sales by Month',
        intervals: {
            label: 'Month',
            format: 'MMM YYY'
        }
    })
    .draw();
```

Your options may be used with different queries that have different intervals. If you wish to override the format for specific intervals you can supply the `format` property with an object that contains [moment.js format strings](http://momentjs.com/docs/#/displaying/format/) keyed by [time interval. ](#time-intervals) For example:

```js
var query = connect.query('purchases')
    .select({
        totalSales: { sum: 'purchasePrice' }
    })
    .groupBy('product')
    .interval('monthly');

var table = Connect.visualize(query)
    .as('table')
    .inside('#table')
    .with({
        title: 'Product Sales by Month',
        intervals: {
            label: 'Month',
            formats: {
                monthly: 'MMM YYYY',
                yearly: 'YY'
            }
        }
    })
    .draw();
```

Alternatively, if you would like full control over formatting, you can provide the `format` property with a function that accepts a start date and optionally an end date as arguments and returns a formatted string. 
Both the start date and optional end date arguments will be native JavaScript date objects.
For example:

```js
var query = connect.query('purchases')
    .select({
        totalSales: { sum: 'purchasePrice' }
    })
    .groupBy('product')
    .interval('monthly');

var table = Connect.visualize(query)
    .as('table')
    .inside('#table')
    .with({
        title: 'Product Sales by Month',
        intervals: {
            label: 'Month',
            formats: function(startValue) {
                return startValue.toString();
            }
        }
    })
    .draw();
```

## Visualization lifecycle

After you have created a viz, you should manage its lifecycle in your app, including [refreshing the data](#refreshing-visualizations),
[updating](#updating-visualizations) or [destroying](#destroying-visualizations) it.

### Refreshing visualizations

If you wish to refresh the data in a viz (i.e. execute the query again for fresh data), you can call the `refresh()` function
on the created viz.  For example:

```js
var chart = Connect.visualize(query)
    .as('chart')
    .inside('#chart')
    .draw();
//...
chart.refresh();
```

Many visualizations support smooth transitions/animations when data is refreshed.  You may also wish to refresh visualizations on a timer to
simulate streaming, real-time data.

The loading animation will **not** be shown when refreshing visualizations.  You should [update the viz](#updating-visualizations) if you wish
this to display.

### Updating visualizations

You can also update visualizations with a new **query** or **function returning a promise** by calling the `update()` function on the created
viz.  This is useful in scenarios, for example, where an end user changes a filter.  For example:

```js
var chart = Connect.visualize(query)
    .as('chart')
    .inside('#chart')
    .draw();
//...
chart.update(newQuery);
```

The loading animation **will** be shown when updating visualizations and any pending queries for the viz will be cancelled/overridden by
this action.

### Destroying visualizations

If a viz is no longer needed in your app, or it needs to be completely replaced with a newly created one, it is important that
you clean up the viz.

Simply removing the viz from the DOM is **not sufficient** and may cause memory leaks in your app.

To destroy a viz, simply call the `destroy()` function on the created viz.  For example:

```js
var chart = Connect.visualize(query)
    .as('chart')
    .inside('#chart')
    .draw();

chart.destroy();
```

## Custom visualizations

You can register your own custom visualizations to take advantage of the regular viz lifecycle which the included visualizations use.
This means your viz will automatically handle:

* Loading animations
* Handle queries or functions that return promises
* Handling out of order query results returned from the API
* Refreshing/updating
* Destruction
* Error handling

For example:

<p data-height="300" data-theme-id="17963" data-slug-hash="MwdRoO" data-default-tab="result" data-user="getconnect" class='codepen'>See the Pen <a href='http://codepen.io/getconnect/pen/MwdRoO/'>Connect Custom viz</a> by Connect (<a href='http://codepen.io/getconnect'>@getconnect</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

A custom viz should supply an implementation for the following contract:

`init(container, options)` *(optional)*

This function is only called during initialization and should implement any initial DOM rendering before the query results
have been received.  Any changes to the DOM during this method will appear even while the loading animation is displayed over
the top.

`render(container, results, options, wasQueryUpdated)`

This function is called whenever a new result set is available.  The bulk of the viz rendering logic should be in this
function.  `results` contains the standard result set returned from a query (including [metadata](#metadata)).
`wasQueryUpdated` will indicate whether or not this is a mere refresh or whether the entire result set has changed
(e.g. due to a completely different query). This function is not optional, if it is not provided the custom viz will not be registered.

`redraw()` *(optional)*

This function is called when the `redraw` function is manually called on a viz.  This should be defined if the
viz must manually respond to changes in the size of the viz container.  The `redraw` function is commonly
used if a viz has been initially rendered when its container is not visible.

`destroy()` *(optional)*

This function is called when the viz is being [destroyed](#destroying-visualizations).  Any DOM elements will be removed
automatically; however, you should define this function if any extra "clean up" is required (e.g. removing listeners,
freeing objects, etc.)

`defaultOptions()` *(optional)*

This function is called when the viz is being first created, before `init` is called. If your vizualization needs some default options you should return them here as an object. The options that are passed to both `init` and `render` will be a union of any default options returned here and the options provided when the custom vizualization is instantiated. User provided options will take precedence over default options.

`isSupported(metadata, selects)` *(optional)*

Not all visualizations can handle all types of results.  For example, the [text viz](#text-viz), cannot handle query results
with [groups](#group-by) or [time intervals](#time-intervals).  In these cases, the viz will gracefully display a
"query not supported" error.

You can include your own logic as to whether your custom viz can support the specified `metadata` and `selects` by returning a boolean for this function.  
The `metadata` argument will be the metadata returned by a query (which is defined here. [metadata](#metadata)) The `selects` argument will be an array of the aliases given to the aggregations selected in the query.
By default, if no function is provided, all types of query results are assumed to be supported.

`cssClasses(options)` *(optional)*

This function is called when the viz is being first created, before `init` is called. The provided function should return an array of strings that will then be added to the target element of the visualization as classes. This is usefull for dynamically setting class names based on the options provided. There are also a few useful predefined CSS classes you can add to change the styling behavior of the viz:

* `grow-results` - grow the viz's height to fill the entire available height.
* `center-results` - center the viz's results vertically.

Once you have implemented the contract, you register the custom viz using `Connect.registerViz`, for example you could provide an object that contains the appropriate functions:

```js
Connect.registerViz('myViz', {
    init: function(container, options) {
        
    },
    render: function(container, results, options, hasQueryUpdated) {
        
    }
});

// The custom viz can then be used in the same manner as the built in ones.

Connect.visualize(query)
    .as('myViz')
    .inside('#custom-viz')
    .draw();

```

Or alternatively if you can provide the `Connect.registerViz` with a factory function. As an example if you using ES6 and classes you might do the following:

```js

class MyViz {

    init(container, options) {

    }

    render(container, results, options, hasQueryUpdated) {
        
    }
    
}

Connect.registerViz('myViz', () => new MyViz);

// The custom viz can then be used in the same manner as the built in ones.

Connect.visualize(query)
    .as('myViz')
    .inside('#custom-viz')
    .draw();

```


