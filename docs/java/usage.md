# Creating a client

To start pushing or queuing events for delivery to Connect, you must create a Connect client:

```java-android
AndroidConnectClient client = new AndroidConnectClient(getBaseContext(), "PROJECT_ID", "PUSH_API_KEY");
```
```java-vanilla
JavaConnectClient client = new JavaConnectClient("PROJECT_ID", "PUSH_API_KEY");
```

Each client is bound to a specific project.  If you wish to push to multiple projects, simply construct multiple clients.
