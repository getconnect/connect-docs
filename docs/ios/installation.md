# Installing the SDK

The quickest and easiest way to install the SDK is via CocoaPods: [![Version](http://img.shields.io/cocoapods/v/ConnectClient.svg)](http://cocoapods.org/?q=ConnectClient)

To do this, simply add the following line to your podfile and run `pod update`:

```ruby
pod 'ConnectClient'
```

# Initializing the client

Before you can start [pushing events](#pushing-events), you must initialize the
Connect client with your [project ID and API key](#projects-and-keys).

You can either initialize a shared client (when you don't want to manage client instances):

```objc
#import "Connect.h"

[TPConnectClient sharedClientWithProjectId:@"YOUR_PROJECT_ID"
                                    apiKey:@"YOUR_API_KEY"];
```
```swift
TPConnectClient.sharedClientWithProjectId("YOUR_PROJECT_ID", apiKey: "YOUR_API_KEY")
```

Or you can create a specific instance of a client (e.g. to push to/query multiple projects):

```objc
#import "Connect.h"

TPConnectClient *client = [TPConnectClient clientWithProjectId:@"YOUR_PROJECT_ID"
                                                        apiKey:@"YOUR_API_KEY"];
```
```swift
let client = TPConnectClient.clientWithProjectId("YOUR_PROJECT_ID", apiKey: "YOUR_API_KEY")
```