## Multiple events

To push two or more events into a single collection call the push function on the Connect object and pass in the collection name and an array of the events.

```js
connect.push('purchases', [
    {
        name: 'Phone', 
        price: 465.55
    },
    {
        name: 'Case', 
        price: 5.55
    }
])
.then(function (response) {
    // Handle the response
    
})
.catch(function (error) {
    // Handle the error
    
});
```

A possible response to the above example could be:

```json
{
    "purchases": [
        {
            "success": true
        },
        {
            "success": false,
            "duplicate": true,
            "message": "An event with the same id has already been inserted."
        }
    ]
}
```
