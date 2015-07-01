# User Guide Pro for loggr.io

If you want to set up your own Raspberry Pi you will need the API interface.

The header of all requests is:
<p>_Content-Type: application/json, Authorization: token_ </p>

## Customers

* URL: http://loggr.stkn.org/api/Customers
* Model: Customer {realm (string, optional), username (string, optional), credentials (object, optional), challenges (object, optional), email (string),
emailVerified (boolean, optional), verificationToken (string, optional), status (string, optional), created (string, optional), lastUpdated (string, optional), id (objectid, optional)}
* __POST__ a Customer
* __GET__ a Customer
* __PUT__ a Customer

## Sensors

* URL: http://loggr.stkn.org/api/Customers/{id}/sensors
* Model: Sensor {type (string), location (string), unit (string), id (objectid, optional), customerId (objectid, optional)}
*  __POST__ your sensors
* __GET__ your sensors
* __DELETE__ your sensors. Only User id required.

## Meterings

* URL: http://loggr.stkn.org/api//Customers/{id}/meterings
* Metering {value (number), time (string), id (objectid, optional), customerId (objectid, optional), sensorId (objectid, optional)}
*  __POST__ your meterings
* __GET__ your meterings
* __DELETE__ your meterings. Only User id required.
