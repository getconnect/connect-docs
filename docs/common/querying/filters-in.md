### In filter

The in filter allows you to specify a list of values for which a property should match.

For example, the following will filter for events that have a `category` of either "Bikes", "Books" or "Magazines":

 ```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"filter": {
		"category": { "in": ["Bikes", "Books", "Magazines"] }
	}
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.filter({
		"category": { "in": ["Bikes", "Books", "Magazines"] }
	})
	.execute()
    .then(function(result) {
        // Handle the result
    });
```

**Note:** All values in the list must be of the same type (i.e. string, numeric or boolean).  Mixed types are currently not supported.
