# Installing the SDK

The JavaScript SDK can be installed in a number of different ways, depending on your environment and use case.

## CDN

You can easily reference the SDK for browser apps by including it from our CDN.  Simple copy and paste the 
following script into your page:

```html
<script src="https://cdn.getconnect.io/connect-js/{x.x.x}/standalone/connect-all.min.js"></script>
```

To take advantage of the visualizations provided, you must also reference the CSS (this is not required if you
simply wish to push events using the SDK):

```html
<link href="https://cdn.getconnect.io/connect-js/{x.x.x}/standalone/connect-all.min.css" rel="stylesheet" />
```

For more info on visualization, see [visualizing data](#visualizing-data).

## NPM

If you are writing a Node.js app, or using NPM packages in the browser with something like [Browserify](http://browserify.org),
you can install the package from NPM:

```bash
npm install connect-js
```

You would then `require` the SDK as follows:

```js
var Connect = require('connect-js');
```

For browser apps, you can also install the visualization package:

```bash
npm install connect-js-viz
```

When using the visualization, you only need to `require` the viz package and all other functionality is included:

```js
var Connect = require('connect-js-viz');
```

For more info on visualization, see [visualizing data](#visualizing-data).

## Bower

You can easily install the SDK from Bower:

```bash
bower install connect-js
```

# Creating the client

Before you can start [pushing events](#pushing-events), [executing queries](#querying) or [visualizing data](#visualizing-data),
you must create a Connect client with your [project ID and API key](#projects-and-keys):

```js
var connect = new Connect({
    projectId: 'YOUR_PROJECT_ID',
    apiKey: 'YOUR_API_KEY'
});
```

Each client is specific to a particular project - if you wish to push to or query multiple projects, simply create multiple clients.