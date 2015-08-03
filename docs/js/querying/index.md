# Querying events

Using the SDK, you can construct and execute queries client-side and receive a promise to the results.

Once you have [created a client](#creating-the-client) with a valid [read key](#projects-and-keys), you can start querying
your collections immediately. 

For example, to get the sum of the `price` property in a collection called `purchases`, you would execute the following query:

```js
connect.query("purchases")
    .select({ "totalPrice": { "sum": "price" } })
    .execute()
    .then(function(result) {
        // Handle the result
    }, function(error) {
      // Handle an error
    });
```
