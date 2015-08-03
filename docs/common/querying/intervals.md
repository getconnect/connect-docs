## Time intervals

Time intervals allow you to group results by a time period, so that you could analyze your events over time.

For example, to query daily total sales this month:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"timeframe": "this_month",
	"interval": "daily"
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timeframe("this_month")
	.interval("daily")
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
	.Daily()
	.Execute();
```

This would return a result like:

```json
{
	"metadata": {
		"groups": [],
		"interval": "daily",
		"timezone": null
	},
	"results": [{
		"interval": { "start": "2015-02-01T00:00:00Z", "end": "2015-02-02T00:00:00Z" },
		"results": [{
			"totalPrice": 500000
		}]
	},
	{
		"interval": { "start": "2015-02-02T00:00:00Z", "end": "2015-02-03T00:00:00Z" },
		"results": [{
			"totalPrice": 150000
		}]
	},
	{
		"interval": { "start": "2015-02-03T00:00:00Z", "end": "2015-02-04T00:00:00Z" },
		"results": [{
			"totalPrice": 25000
		}]
	}]
}
```
```csharp
var metadata = queryResponse.Metadata;
// metadata.Interval is Interval.Daily

foreach (var intervalResult in queryResponse.Results) {
	// intervalResult is QueryIntervalResult<IDictionary<string, object>>
	
	// single result because no group by
	var result = intervalResult.Results.First();
	
	Console.WriteLine(string.Format("{0:d} to {1:d}: {2}", intervalResult.Start,
		intervalResult.End, result["totalPrice"]));
}

// output is (en-US dates):
//
// 02/01/2015 to 02/02/2015: 500000
// 02/02/2015 to 02/03/2015: 150000
// 02/03/2015 to 02/04/2015: 25000
```

The following time intervals are supported:

* minutely
* hourly
* daily
* weekly
* monthly
* quarterly
* yearly

### Time interval with group by

You can also combine a time interval with a group by in your query.

For example, to query daily total sales this month by country:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"timeframe": "this_month",
	"interval": "daily",
	"groupBy": "country"
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timeframe("this_month")
	.interval("daily")
	.groupBy("country")
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
	.Daily()
	.GroupBy("country")
	.Execute();
```

This would return a result like:

```json
{
	"metadata": {
		"groups": ["country"],
		"interval": "daily",
		"timezone": null
	},
	"results": [{
		"interval": { "start": "2015-02-01T00:00:00Z", "end": "2015-02-02T00:00:00Z" },
		"results": [
			{
				"country": "Australia",
				"totalPrice": 100000
			},
			{
				"country": "Italy",
				"totalPrice": 100000
			},
			{
				"country": "United States",
				"totalPrice": 300000
			}
		]
	},
	{
		"interval": { "start": "2015-02-02T00:00:00Z", "end": "2015-02-03T00:00:00Z" },
		"results": [
			{
				"country": "Australia",
				"totalPrice": 25000
			},
			{
				"country": "Italy",
				"totalPrice": 25000
			},
			{
				"country": "United States",
				"totalPrice": 100000
			}
		]
	},
	{
		"interval": { "start": "2015-02-03T00:00:00Z", "end": "2015-02-04T00:00:00Z" },
		"results": [
			{
				"country": "Australia",
				"totalPrice": 5000
			},
			{
				"country": "Italy",
				"totalPrice": 5000
			},
			{
				"country": "United States",
				"totalPrice": 15000
			}
		]
	}]
}
```
```csharp
var metadata = queryResponse.Metadata;
// metadata.Interval is Interval.Daily
// metadata.Groups is new string[] { "country" }

foreach (var intervalResult in queryResponse.Results) {
	// intervalResult is QueryIntervalResult<IDictionary<string, object>>
	
	Console.WriteLine(string.Format("Totals for {0:d} to {1:d}:",
		intervalResult.Start, intervalResult.End));
	
	foreach (var result in intervalResult.Results) {
		Console.WriteLine(string.Format("{0}: {1}", result["country"], result["totalPrice"]));
	}
	
	Console.WriteLine();
}

// output is (en-US dates):
//
// Totals for 02/01/2015 to 02/02/2015:
// Australia: 100000
// Italy: 100000
// United States: 300000
//
// Totals for 02/02/2015 to 02/03/2015:
// Australia: 25000
// Italy: 25000
// United States: 100000
//
// Totals for 02/03/2015 to 02/04/2015:
// Australia: 5000
// Italy: 5000
// United States: 15000
//
```
