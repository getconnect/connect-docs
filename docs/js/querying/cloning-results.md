## Manipulating results client-side

You can manipulate the result set client-side after executing one or more queries to perform calculations
or join multiple queries together.

By chaining promises together, you can maintain a single promise which returns the desired result set, which
will easily plug into the [visualization library](#visualizing-data).

**Note:** Before you modify a result set, it is important to clone the result set first to ensure other forks
of the original promise are not modified.  The SDK provides a simple clone function to assist with this. 

For example, perhaps you want to calculate the gross profit of your sales:

```js
var resultsPromise = connect.query("purchases")
	.select({
		totalSales: { "sum": "price" },
		totalCost: { "sum": "cost" }
	})
	.timezone('Australia/Brisbane')
	.execute();
	.then(function (results) {
		var newResults = results.clone();
		
		for (var i = 0; i < newResults.results.length; i++)
			newResults.results[i].grossProft = newResults.results[i].totalSales - newResults.results[i].totalCost;
		
		return results;
	});
```

Your `resultsPromise` can now be passed to the [visualization library](#visualizing-data) and will be treated
as if it is a standard query.

In fact, promises are entirely loosely-coupled to queries - you can construct your own promise that returns a valid
result set with `metadata` and `results`.

This means you can combine multiple queries, augment results with data from other services or perform complex
calculations client-side. 
