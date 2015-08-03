## Batches of events

You can also push multiple events to multiple collections in a single call by passing an object with arrays of events keyed by collection name.

```js
connect.push({
    "purchases": [
        {
            "customer": {
                "firstName": "Tom",
                "lastName": "Smith"
            },
            "id": "1849506679",
            "product": "12 red roses",
            "purchasePrice": 34.95
        },
        {
            "customer": {
                "firstName": "Jane",
                "lastName": "Doe"
            },
            "id": "123456",
            "product": "1 daisy",
            "purchasePrice": 8.95
        }
    ],
    "refunds": [
        {
            "customer": {
                "firstName": "Tom",
                "lastName": "Smith"
            },
            "id": "REF-1234",
            "product": "12 red roses",
            "purchasePrice": -34.95
        }
    ]
})
.then(function (response) {
    // Handle the response
    
})
.catch(function (error) {
    // Handle the error
    
});
```
