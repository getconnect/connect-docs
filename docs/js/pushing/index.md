# Pushing events

Once you have created a client, you can start pushing events easily.

## Single event

To push a single event into a collection simply call the push function on the Connect object and pass in the collection name and the event itself.

```js
connect.push('purchases', {
    name: 'Phone', 
    price: 465.55
})
.then(function () {
    // Handle the response
    
})
.catch(function (error) {
    // Handle the error
    
});
```
