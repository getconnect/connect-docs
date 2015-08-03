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
    ],
    "refunds": [
        {
            "success": true
        }
    ]
}
```
