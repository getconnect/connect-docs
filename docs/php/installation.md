# Installing the SDK

The quickest and easiest way to install the SDK is using [Composer](https://getcomposer.org): [![Latest Stable Version](https://poser.pugx.org/connect/connect-client/version)](https://packagist.org/packages/connect/connect-client)

Simply add the following to your composer.json and run `php composer.phar install`:

```json
"require": {
    ...
    "connect/connect-client" : "0.*"
    ...
}
```

# Initializing the client

Before you can start [pushing events](#pushing-events), you must initialize the
Connect client with your [project ID and API key](#projects-and-keys):

```php
use Connect\Connect;

Connect::initialize('your-project-id', 'your-push-api-key');
```