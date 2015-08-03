### Exists filter

The exists filter will filter the query results for only events that either have or don't have the specified property
and where the specified property is or isn't null respectively.  You supply a boolean value with the exists operator
to specify whether to include or exclude the events.

> **Missing properties vs null values**
>
> We treat missing properties and properties with a null value the same for the purpose of the exists filter.  While we
> plan to change this behavior in the future, you should consider setting a default value as opposed to a null value on
> properties if you wish to make a distinction.

For example, the following will filter for events that have a property called `gender`:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"filter": {
		"gender": { "exists": true }
	}
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.filter({
		"gender": { "exists": true }
	})
	.execute()
    .then(function(result) {
        // Handle the result
    });
```
```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		TotalPrice = Aggregations.Sum("Price")
	})
	.Where(new {
		gender = Filters.Exists(true)
	})
	.Execute();
```

Whereas the following will filter for events that *do not* have a property called `gender`:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"filter": {
		"gender": { "exists": false }
	}
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.filter({
		"gender": { "exists": false }
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
		gender = Filters.Exists(false)
	})
	.Execute();
```
