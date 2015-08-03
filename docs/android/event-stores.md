## Configuring event stores

To queue events, the SDK uses an `EventStore` to store and retrieve events for queuing and later pushing, respectively.

By default, `AndroidConnectClient` uses `FileEventStore` to store events temporarily on the filesystem (in Android's cache directory).
This store is persistent and will guarantee delivery even in the event of app/device failure.