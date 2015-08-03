## Bulk importing events

> **POST** https://api.getconnect.io/event-import
>
> | Parameter         | Description                                          |
> | ----------------- | ---------------------------------------------------- |
> | collection        | collection to which to import the events             |
> | s3Path            | path to the S3 file containing the events to import  |
> | s3AccessKeyId     | key to access the S3 file                            |
> | s3SecretAccessKey | secret key to access the S3 file                     |

To import a large number of events (usually historical), you must use the event import API and provide a file accessible via S3.

> If you are importing a small number of events (fewer than 5,000), you can use [event batches](#batches-of-events) to push the events in the request body.
> You're still welcome to use event imports if you prefer, though!

The import requires the name of the collection in which to import the events and the S3 details to retrieve the file.

Only JSON formatted files are supported and the format must be a single event per line (not a JSON array). For example, the following is a valid file to import:

```json
{ "product": "12 red roses", "quantity": 5, "price": 25.00 }
{ "product": "White bouquet", "quantity": 2, "price": 48.40 }
```

The entire batch will be rejected if the format does not align with this.

For example:

```bash
curl -X POST \
  -H "X-Project-Id: YOUR_PROJECT_ID" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "collection": "purchases",
    "s3Path": "s3://mybucket/purchases.json",
    "s3AccessKeyId": "YOUR_ACCESS_KEY_ID",
    "s3SecretAccessKey": "YOUR_SECRET_ACCESS_KEY"
}' \
  https://api.getconnect.io/event-import
```
```json
{
    "collection": "purchases",
    "s3Path": "s3://mybucket/purchases.json",
    "s3AccessKeyId": "YOUR_ACCESS_KEY_ID",
    "s3SecretAccessKey": "YOUR_SECRET_ACCESS_KEY"
}
```

A successful batch import operation results in a **201 Created** response and specifies a URI in the Location header of the response where you can monitor the
status of the batch import.

### Monitoring the import

> **GET** https://api.getconnect.io/event-import/:id
>
> | Parameter         | Description                                                                                     |
> | ----------------- | ----------------------------------------------------------------------------------------------- |
> | id                | ID of the event import (returned from the import endpoint on creation in the `Location` header) |

Once you have started an import of events, you can monitor the import with the URI provided in the Location header of the import API.

This allows you to check the status, progress and speed of the import, as well as any errors that have occurred during the import process.

An example response would be:

```json
{
    "collection": "purchases",
    "status": "running",
    "created": "2015-04-01T00:32:45.000Z",
    "started": "2015-04-01T00:33:03.000Z",
    "finished": null,
    "importedEvents": 5130985,
    "duplicateEvents": 0,
    "percentComplete": 42.43,
    "insertRate": "15096/s",
    "error": null,
    "eventErrors": [
        { "index": 9951, "error": "The JSON specified was not valid." },
        { "index": 45930, "error": "The JSON specified was not valid." }
    ]
}
```

An import can be in one of the following statuses:

* **Pending** - the import is yet to start
* **Running** - the import is currently running
* **Complete** - the import completed successfully
* **Failed** - the import failed (the error will contain the reason)

The `eventErrors` property in the response refers to an array of errors, with the index property of each error referring to the index (or line number) in the import file.
