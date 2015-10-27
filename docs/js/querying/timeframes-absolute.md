### Absolute timeframes

You can specify an absolute timeframe by constructing an object with the **start** and **end** properties set to
the desired start and end times in ISO-8601 format.

For example:

```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timeframe({ "start": "2015-02-01T00:00:00.000Z", "end": "2015-02-25T00:00:00.000Z" })
	.execute()
    .then(function(result) {
        // Handle the result
    });
```

You can also set the **start** end **end** properties to Date objects, for example:

```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timeframe({ "start": new Date(2015, 2, 1), "end": new Date(2015, 2, 25) })
	.execute()
    .then(function(result) {
        // Handle the result
    });
```


> You can only specify a timezone and an absolute timeframe when you have also specified a [time interval](#time-intervals).
> If a timezone is specified on an absolute timeframe query that does not have a time interval an error
> will occur.
