You can also use the `AggregationOperation` enum to specify the aggregation operation:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Use(AggregationOperation.Sum, "price"),
		averagePrice = Aggregations.Use(AggregationOperation.Avg, "price"),
		minPrice = Aggregations.Use(AggregationOperation.Min, "price"),
		maxPrice = Aggregations.Use(AggregationOperation.Max, "price"),
		purchaseCount = Aggregations.Use(AggregationOperation.Count)
	})
	.Execute();
```

Or a string:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Use("Sum", "price"),
		averagePrice = Aggregations.Use("Avg", "price"),
		minPrice = Aggregations.Use("Min", "price"),
		maxPrice = Aggregations.Use("Max", "price"),
		purchaseCount = Aggregations.Use("Count")
	})
	.Execute();
```

> If you are using C# 6.0 or above you may find it useful to statically include the `Aggregations` class:
>
> `using static ConnectSdk.Querying.Aggregations`
>
> This enables you to use methods like Count() without prefixing with `Aggregations`
