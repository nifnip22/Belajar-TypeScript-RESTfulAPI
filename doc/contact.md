# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header :

-   X-API-TOKEN : UUID Token

Request Body :

```json
{
	"first_name" : "Hanif",
	"last_name" : "Ahmad",
	"email" : "hanif22ahmad@gmail.com",
	"phone" : "081234567890"
}
```

Response Body (Success) :

```json
{
	"data" : {
		"id" : 1,
		"first_name" : "Hanif",
		"last_name" : "Ahmad",
		"email" : "hanif22ahmad@gmail.com",
		"phone" : "081234567890"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "first_name must not be empty, ..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :

-   X-API-TOKEN : UUID Token

Response Body (Success) :

```json
{
	"data" : {
		"id" : 1,
		"first_name" : "Hanif",
		"last_name" : "Ahmad",
		"email" : "hanif22ahmad@gmail.com",
		"phone" : "081234567890"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "404 contact is not found, ..."
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :

-   X-API-TOKEN : UUID Token

Request Body :

```json
{
	"first_name" : "Hanif",
	"last_name" : "Ahmad",
	"email" : "hanif22ahmad@gmail.com",
	"phone" : "081234567890"
}
```

Response Body (Success) :

```json
{
	"data" : {
		"id" : 1,
		"first_name" : "Hanif",
		"last_name" : "Ahmad",
		"email" : "hanif22ahmad@gmail.com",
		"phone" : "081234567890"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "first_name must not be empty, ..."
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameters :

-   name : string, contact first name or last name, optional
-   phone : string, contact phone, optional
-   email : string, contact email, optional
-   page : number, default is 1
-   size : number, default is 10

Request Header :

-   X-API-TOKEN : UUID Token

Response Body (Success) :

```json
{
	"data" : [
		{
			"id" : 1,
			"first_name" : "Hanif",
			"last_name" : "Ahmad",
			"email" : "hanif22ahmad@gmail.com",
			"phone" : "081234567890"
		},
		{
			"id" : 2,
			"first_name" : "Hanif",
			"last_name" : "Ahmad",
			"email" : "hanif22ahmad@gmail.com",
			"phone" : "081234567890"
		}
	],
    "paging" : {
        "current_page" : 1,
        "total_page" : 10,
        "size" : 10
    }
}
```

Response Body (Failure) :

```json
{
	"errors" : "Unauthorized, ..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :

-   X-API-TOKEN : UUID Token

Response Body (Success) :

```json
{
	"data" : "Contact successfully removed"
}
```

Response Body (Failure) :

```json
{
	"errors" : "404 contact is not found, ..."
}
```
