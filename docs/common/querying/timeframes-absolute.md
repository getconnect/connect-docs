### Absolute timeframes

You can specify an absolute timeframe by constructing an object with the **start** and **end** properties set to
the desired start and end times in ISO-8601 format.

For example:

```json
{
	"select": {
		"totalPrice": { sum: "price" }
	},
	"timeframe": { "start": "2015-02-01T00:00:00.000Z", "end": "2015-02-25T00:00:00.000Z" }
}
```

This will match all events with a `timestamp` greater than or equal to 2015-02-01 00:00:00 and less than
2015-02-25 00:00:00 UTC.

> You can't specify a timezone when using absolute timeframes as the timezone information comes from the ISO-8601
> dates specified.  An error will occur if you try to do this.
