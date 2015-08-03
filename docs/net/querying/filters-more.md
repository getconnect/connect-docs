### Chaining filters

Filters can be chained by calling the `Where` method multiple times. The query below will query for purchase that are
in the "Shirts" category **and** have a delivery type of "Standard" or "Express":

```csharp
var queryResponse = await Connect.Query("purchases")
    .Select(new {
        totalPrice = Aggregations.Sum("price")
    })
    .Where(new {
        category = Filters.Eq("Shirts")
    })
    .Where(new {    
        delivery = Filters.In(new [] {"Express", "Standard"})
    })
    .Execute();
```

### Filter dictionaries

The SDK also supports specifying filters as dictionaries. This especially useful if you wish to specify a nested property path.
For example, to filter on `product.category`:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
        totalPrice = Aggregations.Sum("price")
	})
	.Where(new Dictionary<string, Filter[]>{
		{"product.category", Filters.Eq("Shirts")}
	})
	.Execute();
```
