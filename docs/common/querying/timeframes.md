## Timeframes

You can restrict query results by specifying the **timeframe** for the query which will filter for events only within that specific timeframe.

> If no timeframe is specified, events will not be filtered by time; the query will match events from all time.

For example, the following query filters for events only for this month:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"timeframe": "this_month"
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timeframe("this_month")
	.execute()
    .then(function(result) {
        // Handle the result
    });
```
```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.ThisMonth()
	.Execute();
```

There are two types of timeframes:

* **Relative timeframes** - a timeframe relative to the current date and time.
* **Absolute timeframes** - a timeframe between two specific dates and times.
