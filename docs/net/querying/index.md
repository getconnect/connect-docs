# Querying events

Querying events in Connect is easy.  Using the SDK, you can construct and execute queries using async/await.

Once you have [initialized the client](#initializing-the-client) with a valid [read key](#projects-and-keys), you can start querying
your collections immediately.

For example, to get the sum of the `price` property in a collection called `purchases`, you would build the following query:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price"),
		averagePrice = Aggregations.Avg("price"),
		minPrice = Aggregations.Min("price"),
		maxPrice = Aggregations.Max("price"),
		purchaseCount = Aggregations.Count()
	})
	.Where(new {
		product = Filters.Eq("12 red roses")
	})
	.Daily()
	.ThisMonth()
	.GroupBy("country")
	.Timezone("Australia/Brisbane")
	.Execute();
```
