### In filter

The in filter allows you to specify a list of values for which a property should match.

For example, the following will filter for events that have a `category` of either "Bikes", "Books" or "Magazines":

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.Where(new {
		category = Filters.In(new[] {"Bikes", "Books", "Magazines"})
	})
	.Execute();
```

You can also use the shorthand of this:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.Where("category", new[] {"Bikes", "Books", "Magazines"})
	.Execute();
```

**Note:** All values in the list must be of the same type (i.e. string, numeric or boolean).  Mixed types are currently not supported.
