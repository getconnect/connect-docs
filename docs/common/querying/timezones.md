## Timezones

By default, Connect uses **UTC** as the timezone for queries with relative timeframes or time intervals.
You can override this to be the timezone of your choice by specifying the **timezone** in your query.

> You can only specify a timezone when you have specified a [time interval](#time-intervals) and/or a
> [relative timeframe](#relative-timeframes).  If you try to specify a timezone 
> without one of these set, an error will be returned.

You can specify a numeric (decimal) value for an hours offset of UTC, for example:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"timezone": 10
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timezone(10)
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
	.Timezone(10)
	.Execute();
```

You can also specify a string which contains an [IANA time zone identifier](http://www.iana.org/time-zones), for example:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"timezone": "Australia/Brisbane"
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timezone("Australia/Brisbane")
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
	.Timezone("Australia/Brisbane")
	.Execute();
```
