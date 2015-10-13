## Reliability of events

Currently, it is not possible to persist/queue events for delivery in the Python SDK. If the push fails, it is not persisted in a queue of any sort.

We recommend that you consider using a queuing mechanism to ensure reliability of the events if your application relies on the delivery of all events.

Events also allow a custom ID to be sent in the event document which will prevent duplicates (i.e. guarantees idempotence even if the event is delivered multiple times). For example:

```python
event = {
  'id': '12345678',
  'type': 'cycling',
  'distance': 21255,
  'caloriesBurned': 455,
  'duration': 67
}

connect.push_event('activity', event)
```
