## Filters

You can filter the events you wish to include in your queries by specifying one or more filters.  For example:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"filter": {
		"product": "12 red roses"
	}
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.filter({
		"product": "12 red roses"
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
	.Where("product", "12 red roses")
	.Execute();
```

The above will filter the query results for only those events that have a `product` property equalling "12 red roses".
The above is also shorthand for the **eq** operator. To illustrate this, the following is identical to the above:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"filter": {
		"product": { "eq": "12 red roses" }
	}
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.filter({
		"product": { "eq": "12 red roses" }
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
	.Where(new {
		product = Filters.Eq("12 red roses")
	})
	.Execute();
```
