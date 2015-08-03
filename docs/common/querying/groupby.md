## Group by

You can group the query results by one or more properties from your events.

> **Missing properties vs null values**
>
> We treat missing properties and properties with a null value the same for the purpose of grouping.
> This means that all events with a null value for a property or missing that property altogether will
> be grouped into the "null" value for that query.  While we plan to change this in the future, you
> should consider setting a default value as opposed to a null value on properties if you wish to make
> a distinction.

For example, to query total sales by country:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"groupBy": "country"
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
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
	.GroupBy("country")
	.Execute();
```

This would return a result like:

```json
{
	"metadata": {
		"groups": ["country"],
		"interval": null,
		"timezone": null
	},
	"results": [{
		"country": "Australia",
		"totalPrice": 1000000
	},
	{
		"country": "Italy",
		"totalPrice": 2500000
	},
	{
		"country": "United States",
		"totalPrice": 10000000
	}]
}
```
```csharp
var metadata = queryResponse.Metadata;
// metadata.Groups is new string[] {"country"}

foreach (var result in queryResponse.Results) {
	Console.WriteLine(string.Format("{0}: {1}", result["country"], result["totalPrice"]));
}

// output is:
//
// Australia: 1000000
// Italy: 2500000
// United States: 10000000
```

### Grouping by multiple properties

You can also group by multiple properties in your events by providing multiple property names.

For example, to query total sales by country and product category:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"groupBy": ["country", "product.category"]
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.groupBy(["country", "product.category"])
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
	.GroupBy("country", "product.category")
	.Execute();
```

This would return a result like:

```json
{
	"metadata": {
		"groups": ["country", "product.category"],
		"interval": null,
		"timezone": null
	},
	"results": [{
		"country": "Australia",
		"product.category": "Bikes",
		"totalPrice": 500000
	},
	{
		"country": "Australia",
		"product.category": "Cars",
		"totalPrice": 500000
	},
	{
		"country": "Italy",
		"product.category": "Scooters",
		"totalPrice": 2500000
	},
	{
		"country": "United States",
		"product.category": "Mobile Phones",
		"totalPrice": 8000000
	},
	{
		"country": "United States",
		"product.category": "Laptops",
		"totalPrice": 2000000
	}] 
}
```
```csharp
var metadata = queryResponse.Metadata;
// metadata.Groups is new string[] {"country", "product.category"}

foreach (var result in queryResponse.Results) {
	Console.WriteLine(string.Format("{0} - {1}: {2}", result["country"],
		result["product.category"], result["totalPrice"]));
}

// output is:
//
// Australia - Bikes: 500000
// Austrlaia - Cars: 500000
// Italy - Scooters: 2500000
// United States - Mobile Phones: 8000000
// United States - Laptops: 2000000
```
