## Error handling

Executing a query (via the `execute()` function) returns a promise (we use [Q](https://github.com/kriskowal/q) for our promises).

This means you should handle the failure of that promise if you wish to catch any errors.  For example:

```js
connect.query("purchases")
    .select({
		"itemsSold": "count",
		"totalPrice": { "sum": "price" }
	})
	.execute()
    .then(function(result) {
        // Handle the successful result
		
    })
	.catch(function(err) {
		// Handle the error
		
		console.log("HTTP status: " + err.status);
	});
```
