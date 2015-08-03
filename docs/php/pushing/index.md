# Pushing events

Once you have initialized the client, you can start pushing events easily.

## Single event

To push a single event, simply provide the collection name and event to push:

```php
$purchase = [
	'customer' => [
	   'firstName' => 'Tom',
	   'lastName' => 'Smith'
	],
	'product' => '12 red roses',
	'purchasePrice' => 34.95
];

Connect::push('purchases', $purchase);
```

## Batches of events

To push multiple events to one or more collections, simply provide an associative array of collection name
to arrays of events to push:

```php
$batch = [
	'purchases' => [
		[
            'customer' => [
                'firstName' => 'Tom',
                'lastName' => 'Smith'
			],
			'product' => '12 red roses',
			'purchasePrice' => 34.95
		],
		[
            'customer' => [
                'firstName' => 'Fred',
				'lastName' => 'Jones'
			],
			'product' => '12 pink roses',
			'purchasePrice' => 38.95
		]
	]
];

Connect::push($batch);
```

## Exception handling

When pushing events, exceptions could be thrown, so you should either ignore or handle those exceptions gracefully.

Currently, the following exception could be thrown when pushing events:

* `InvalidEventException` - the event being pushed is invalid (e.g. invalid event properties)
