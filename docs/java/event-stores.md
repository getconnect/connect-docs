## Configuring event stores

To queue events, the SDK uses an `EventStore` to store and retrieve events for queuing and later pushing, respectively.

By default, `JavaConnectClient` uses `MemoryEventStore` to store events temporarily in memory.  This store is **not** persistent and is destroyed on application termination, therefore you should not use it for guaranteed delivery.

`JavaConnectClient` can be easily configured to store events in a `FileEventStore` on the filesystem by specifying an event store directory:

```java
ConnectClient client = new JavaConnectClient("PROJECT_ID", "PUSH_API_KEY", "/path/to/event/store");
```