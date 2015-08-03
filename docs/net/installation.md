# Installing the SDK

Getting started is easy - simply install the .NET SDK using NuGet.  For example, from the package manager console:

```ps
Install-Package ConnectSdk
```

# Initializing the client

Before you can start [pushing events](#pushing-events) or [executing queries](#querying), you must initialize the
Connect client with your [project ID and API key](#projects-and-keys).

You can either do this statically (when you don't wish to manage the client instances):

```csharp
Connect.Initialize(new BasicConfiguration("API_KEY", "PROJECT_ID"))
```

Or you can create a specific instance of a client (e.g. to push to/query multiple projects):

```csharp
IConnect connect = new ConnectClient(new BasicConfiguration("API_KEY", "PROJECT_ID"));
```

Both these classes confirm to the same API, so which you use is purely personal preference. The static method
will be used in the remaining examples.