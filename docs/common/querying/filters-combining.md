### Combining filter expressions

You can also combine filter expressions to filter multiple values on the same property.

For example, the following will filter for events with a `price` property greater than 5 but less than 10:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"filter": {
		"price": { "gt": 5, "lt": 10 }
	}
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.filter({
		"price": { "gt": 5, "lt": 10 }
	})
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
	.Where(new Dictionary<string, Filter[]>{
		{"price", new[]{ Filters.Gt(5), Filters.Lt(10) }}
	})
	.Execute();
```
