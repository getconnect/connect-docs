## Timestamps

All events have a single `timestamp` property which records when the event being pushed occurred.  Events cannot
have more than one date/time property.  If you feel you need more than one date/time property, you probably need
to reconsider how you're [modeling your events](#modeling-your-events).

> **Querying**
>
> You can only run time interval queries or timeframe filters on the `timestamp` property.  No other date/time property
> in an event is supported for querying.

By default, if no `timestamp` property is sent with the event, Connect will use the current date and time as
the timestamp of the event.

The timestamp, however, can be overridden to, for example, accommodate historical events or maintain accuracy
of event times when events are queued.

The timestamp must be supplied as an ISO-8601 formatted date.  The date must be in UTC (you cannot specify a timezone offset).
For example:

```json
{
    "customer": {
        "firstName": "Tom",
        "lastName": "Smith"
    },
    "timestamp": "2015-02-05T14:55:56.587Z",
    "product": "12 red roses",
    "purchasePrice": 34.95
}
```

> **Timezones**
>
> Timestamps are always recorded in UTC.  If you supply a timestamp in a timezone other than UTC, it will
> be converted to UTC.  When you query your events, you can specify a timezone so things like time intervals
> will be returned in local time.
