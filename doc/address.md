# Contact Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :

-   X-API-TOKEN : UUID Token

Request Body :

```json
{
	"street" : "Street",
	"city" : "City",
	"province" : "Province",
	"country" : "Country",
	"postal_code" : "12345"
}
```

Response Body (Success) :

```json
{
	"data" : {
        "id" : 1,
		"street" : "Street",
		"city" : "City",
		"province" : "Province",
		"country" : "Country",
		"postal_code" : "12345"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "postal_code is required, ..."
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

-   X-API-TOKEN : UUID Token

Response Body (Success) :

```json
{
	"data" : {
        "id" : 1,
		"street" : "Street",
		"city" : "City",
		"province" : "Province",
		"country" : "Country",
		"postal_code" : "12345"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "404 address is not found, ..."
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :

-   X-API-TOKEN : UUID Token

Request Body :

```json
{
	"street" : "Street",
	"city" : "City",
	"province" : "Province",
	"country" : "Country",
	"postal_code" : "12345"
}
```

Response Body (Success) :

```json
{
	"data" : {
        "id" : 1,
		"street" : "Street",
		"city" : "City",
		"province" : "Province",
		"country" : "Country",
		"postal_code" : "12345"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "postal_code is required, ..."
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses

Request Header :

-   X-API-TOKEN : UUID Token

Response Body (Success) :

```json
{
	"data" : [
        {
            "id" : 1,
            "street" : "Street",
            "city" : "City",
            "province" : "Province",
            "country" : "Country",
            "postal_code" : "12345"
        },
        {
            "id" : 2,
            "street" : "Street",
            "city" : "City",
            "province" : "Province",
            "country" : "Country",
            "postal_code" : "12345"
        }
    ]
}
```

Response Body (Failure) :

```json
{
	"errors" : "404 contact is not found, ..."
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header :

-   X-API-TOKEN : UUID Token

Response Body (Success) :

```json
{
	"data" : "Address is succesfully removed"
}
```

Response Body (Failure) :

```json
{
	"errors" : "404 address is not found, ..."
}
```
