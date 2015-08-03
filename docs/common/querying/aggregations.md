## Aggregations

You can perform various aggregations over events you have pushed.  Simply specify in the query's select which
properties you wish to aggregate and which aggregation you wish to use.  You also must specify an "alias" for the
result set that is returned.

For example, to query the `purchases` collection and perform aggregations on the `price` event property::

```json
{
	"select": {
		"itemsSold": "count",
		"totalPrice": { "sum": "price" },
		"averagePrice": { "avg": "price" },
		"minPrice": { "min": "price" },
		"maxPrice": { "max": "price" }
	}
}
```
```js
connect.query("purchases")
    .select({
		"itemsSold": "count",
		"totalPrice": { "sum": "price" },
		"averagePrice": { "avg": "price" },
		"minPrice": { "min": "price" },
		"maxPrice": { "max": "price" }
	})
	.execute()
    .then(function(result) {
        // Handle the result
    });
```
```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		itemsSold = Aggregations.Count(),
		totalPrice = Aggregations.Sum("price"),
		averagePrice = Aggregations.Avg("price"),
		minPrice = Aggregations.Min("price"),
		maxPrice = Aggregations.Max("price")
	})
	.Execute();
```

This would return a result like:

```json
{
	"metadata": {
		"groups": [],
		"interval": null,
		"timezone": null
	},
	{
		"itemsSold": 25,
		"totalPrice": 5493.25,
		"averagePrice": 219.73,
		"minPrice": 5.49,
		"maxPrice": 589.20
	}
}
```
```csharp
// no important metadata because no group by, interval or timezone
var metadata = queryResponse.Metadata;

// no group by, so only a single result
var singleResult = queryResponse.Results.First();

// get the values from the result
var itemsSold = (double)singleResult["itemsSold"];
var totalPrice = (double)singleResult["totalPrice"];
var averagePrice = (double)singleResult["averagePrice"];
var minPrice = (double)singleResult["minPrice"];
var maxPrice = (double)singleResult["maxPrice"];
```
