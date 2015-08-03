# Exporting events

Connect allows you to export the raw events that were [pushed](#pushing-events) to a collection.

You can [export up to 10,000 events](#small-exports) and receive an immediate response, or
[export up to 1,000,000 events](#exporting-to-amazon-s3) to Amazon S3.

## Small exports

> **GET** https://api.getconnect.io/events/:collection/export?query=
>
> | Parameter                      | Description                                          |
> | ------------------------------ | ---------------------------------------------------- |
> | collection                     | collection to export                                 |
> | query (query string parameter) | query to run                                         |

For exports of up to 10,000 events, you can provide a query and receive an immediate response with the
raw events.

The query specified only supports [filters](#filtering) and [timeframes](#timeframes) with the same format
as the normal query language, for example:

```json
{
	"filter": {
		"product": "apple"
	},
	"timeframe": "today"
}
```

The following responses may occur:

**200 OK**

The export was successful.  The body of the response contains the raw events, for example:

```json
{
  "results": [
    {
      "id": "9eb91561-1964-468a-b6bf-c16034b6757c",
      "timestamp": "2015-07-28T00:00:30.295Z",
      "name": "test"
    },
    {
      "id": "28c86f2e-4ad8-423a-85ea-b09a5ab9549d",
      "timestamp": "2015-07-28T00:00:52.549Z",
      "name": "test"
    } 
  ]
}
```

**422 Unprocessable Entity**

The query supplied is not valid.

**413 Too Many Results**

The query supplied resulted in over 10,000 events, which is not supported.  To export these events
you can [export to Amazon S3](#exporting-to-amazon-s3) (up to 1,000,000 events).

**500 Internal Server Error**

An internal server error occurred in the Connect API.

## Exporting to Amazon S3

> **POST** https://api.getconnect.io/events/:collection/export
>
> | Parameter         | Description                                          |
> | ----------------- | ---------------------------------------------------- |
> | collection        | collection to export                                 |
> | query             | query to run                                         |
> | s3Path            | the S3 path where the export will be uploaded        |
> | s3AccessKeyId     | key to access the S3 bucket                          |
> | s3SecretAccessKey | secret key to access the S3 bucket                   |

You can export up to 1,000,000 events to Amazon S3.  The results of the export will be uploaded to the
S3 path you specify, using the credentials specified.

You must POST these options in JSON format to the above URL, for example:

```json
{
"query": {
"timeframe": "today"
},
"s3Path": "https://my-bucket.s3.amazonaws.com/exports/",
"s3AccessKeyId": "NOT_TELLING",
"s3SecretAccessKey": "NOT_TELLING"
}
```

The query specified only supports [filters](#filtering) and [timeframes](#timeframes) with the same format
as the normal query language.

A unique ID is generated for every export.  This ID is used to [monitor the export](#monitoring-the-export) and
as the filename for the export (*unique_id*.json).  The exported file will contain one line per event.

The following responses may occur:

**201 Created**

The export was successfully created.  The `Location` header will contain the URL with which you can
[monitor the export](#monitoring-the-export).

**422 Unprocessable Entity**

The query supplied is not valid.

**500 Internal Server Error**

An internal server error occurred in the Connect API.

### Monitoring the export

> **GET** https://api.getconnect.io/events/:collection/export/:id
>
> | Parameter         | Description                                                                                         |
> | ----------------- | --------------------------------------------------------------------------------------------------- |
> | collection        | collection being exported                                                                           |
> | id                | unique ID of the export (from the Location header of a successful [export](#exporting-to-amazon-s3) |

Once you have successfully [created an export](#exporting-to-amazon-s3), the `Location` header will provide a URL to monitor
the export.

This allows you to check the status and progress of an export, as well as any errors that may occur during the export process.

For example:

```json
{
    "filename": "55b80dd4eb6742481c62c05e.json",
    "collection": "testing",
    "status": "Pending",
    "created": "2015-07-28T23:18:44.698Z",
    "started": null,
    "finished": null,
    "error": null,
    "percentDone": 0,
    "transferredBytes": 0,
    "totalBytes": 0
}
```

| Property          | Description                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| filename          | the filename being uploaded to Amazon S3 (to the path specified in the export request)              |
| collection        | the collection being exported                                                                       |
| status            | the status of the export                                                                            |
| created           | the date the export was created (in UTC)                                                            |
| started           | the date the export started (in UTC, null if the status is Pending)                                 |
| finished          | the date the export finished (in UTC, null if the status is Pending or Running)                     |
| error             | an error message indicating the reason for failure, if the status is Failed                         |
| percentDone       | a number (0 to 100) indicating the progress of the export                                           |
| transferredBytes  | the number of bytes transferred to Amazon S3 so far                                                 |
| totalBytes        | the total number of bytes to transfer to Amazon S3 (i.e. the size of the export)                    |

An export can be in one of the following statuses:

* **Pending** - the export is yet to start
* **Running** - the export is currently running
* **Complete** - the export completed successfully
* **Failed** - the export failed (the error will contain the reason)
