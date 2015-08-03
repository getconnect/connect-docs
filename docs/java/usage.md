# Creating a client

To start pushing or queuing events for delivery to Connect, you must create a Connect client:

```java-android
ConnectClient client = new AndroidConnectClient("PROJECT_ID", "PUSH_API_KEY");
```
```java-vanilla
ConnectClient client = new JavaConnectClient("PROJECT_ID", "PUSH_API_KEY");
```

Each client is bound to a specific project.  If you wish to push to multiple projects, simply construct multiple clients.

By default, the client has default implementations for JSON serialization, an HTTP client and event storage.
You can also construct your own `ConnectClient` and provide it with your own implementations of these interfaces.