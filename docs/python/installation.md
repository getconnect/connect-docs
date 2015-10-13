# Installing the SDK

The python SDK works on Python versions:
* 2.7
* 3.2 - 3.5

It can be installed via pip [![PyPI version](https://badge.fury.io/py/connect-client.svg)](http://badge.fury.io/py/connect-client)
```
pip install connect-client
```

# Initializing the client

Before you can start [pushing events](#pushing-events), you must initialize the
Connect client with your [project ID and API key](#projects-and-keys):

```python
from connect.client import ConnectClient

connect = ConnectClient(project_id='your-project-id', 
						api_key='your-push-api-key')
```