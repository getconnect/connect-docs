# Pushing events

Once you have created the client, you can start pushing events. The SDK uses [futures](https://docs.python.org/3/library/concurrent.futures.html) to support pushing events asynchronously.


## Single event

To push a single event asynchronously, call the `push_event` method on `ConnectClient` and pass a collection name and a dict object.
 

```python
event = {
  'type': 'cycling',
  'distance': 21255,
  'caloriesBurned': 455,
  'duration': 67
}

# asynchronous push to Connect returns a future
single_future = connect.push_event('activity', event)
```

## Batches of events

To push multiple events asynchronously, call the `push_events` method on `ConnectClient` and pass a dict object keyed by collection name with a list of dict objects as values:

```python
# Event batch: dict keyed by collection name 
# values are a list of dict objects, one for each event
events = {
    'activity': [{
        'type': 'cycling',
        'distance': 21255,
        'caloriesBurned': 455,
        'duration': 67
    }, {
        'type': 'swimming',
        'distance': 21255,
        'caloriesBurned': 455,
        'duration': 67
    }]
}

# asynchronous push to Connect returns a future
batch_future = connect.push_events(events)
```

## Responses
Future objects returned from pushing single and batch events will return `PushResponse` and `PushBatchResponse` objects respectively. 

```python
# single event push returns a PushResponse object
r = single_future.result()
print r.success             # True
print r.error_message       # None
print r.http_status_code    # 200
print r.event 
"""
r.event returns the event as a dict, as it was sent to Connect:
{
    'type': 'cycling',
    'distance': 21255,
    'caloriesBurned': 455,
    'duration': 67,
    'id': 'b1c345e0-767b-4f88-9ac3-a4fb566ff0f1',
    'timestamp': '2015-09-30T06:02:04.602000'
}
 """

# batch event push returns a PushBatchResponse object 
r = batch_future.result()
print r.success             # True
print r.error_message       # None
print r.http_status_code    # 200
print r.results
"""
r.results returns a dict keyed by collection name
with a list of of PushResponse objects as values.
Refer to the single event response example above 
for details on the PushResponse object.
	
{
    'activity': [
		<PushResponse object>,
		<PushResponse object>
	]
}
"""
```
## Exception handling

When pushing events, exceptions could be returned in the future, so you should either ignore or handle those exceptions gracefully. Currently, the following exception could be thrown when pushing events:
* `InvalidEventError` - the event being pushed is invalid (e.g. invalid event properties)
