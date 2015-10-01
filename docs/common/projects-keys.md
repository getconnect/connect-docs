# Projects and keys

Connect allows you to manage multiple projects under a single account so that you can easily segregate
your collections into logical projects.

You could use this to separate analytics for entire projects, or to implement separation between different
environments (e.g. My Project (Prod) and My Project (Dev)).

To start pushing and querying your event data, you will need both a project ID and an API key.  This information
is available to you [via the admin console](http://app.getconnect.io/#/projects) inside each project under the "Keys" tab:

![Screenshot of project keys in Connect admin console](images/screens/projects-keys.png)

By default, you can choose from four different types of keys, each with their own specific use:

* `Push/Query Key` - you can use this key to both push events and execute queries.  
  You should only use this key in situations where it is not possible to isolate merely pushing or querying.
  
* `Push Key` - you can only use this key to push events.  
  You should use this key in your apps where you are tracking event data, but do not require querying.
  
* `Query Key` - you can only use this key to execute queries.    
  You should use this key in your reporting interfaces where you do not wish to track events.
  
* `Master Project Key` - you can use this key to execute all types of operations on a project, including
  pushing, querying and deleting collections.  
  **Keep this key safe** - it is intended for very limited use and definitely should not be included in your main apps.

You must use your project ID and desired key to begin using Connect:

```js
var Connect = require('connect-js');

var connect = new Connect({
    projectId: 'YOUR_PROJECT_ID',
    apiKey: 'YOUR_API_KEY'
});
```
```objc
#import "Connect.h"

[TPConnectClient sharedClientWithProjectId:@"YOUR_PROJECT_ID"
                                    apiKey:@"YOUR_API_KEY"];
```
```swift
TPConnectClient.sharedClientWithProjectId("YOUR_PROJECT_ID", apiKey: "YOUR_API_KEY")
```
```bash
curl -X POST \
  -H "X-Project-Id: YOUR_PROJECT_ID" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "customer": { "firstName": "Tom", "lastName": "Smith" }, "product": "12 red roses", "purchasePrice": 34.95 }' \
  https://api.getconnect.io/events/test-collection
```
```ruby
require 'connect_client'

ConnectClient.configure do |config|
  config.project_id = 'YOUR_PROJECT_ID'
  config.api_key = 'YOUR_API_KEY'
  config.async = false
end
```
```php
use Connect\Connect;

Connect::initialize('YOUR_PROJECT_ID', 'YOUR_API_KEY');
```
```java-vanilla
JavaConnectClient client = new JavaConnectClient("YOUR_PROJECT_ID", "YOUR_API_KEY");
```
```java-android
AndroidConnectClient client = new AndroidConnectClient(getBaseContext(), "YOUR_PROJECT_ID", "YOUR_API_KEY");
```
```csharp
Connect.Initialize(new BasicConfiguration("YOUR_API_KEY", "YOUR_PROJECT_ID"));
```
```python
from connect.client import ConnectClient

connect = ConnectClient(project_id='YOUR_PROJECT_ID', 
                        api_key='YOUR_API_KEY')
```
