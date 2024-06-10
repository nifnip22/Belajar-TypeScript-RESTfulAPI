# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
	"username" : "nifnip22",
	"password" : "rahasia123",
	"name" : "Hanif Ahmad"
}
```

Response Body (Success) :

```json
{
	"data" : {
		"username" : "nifnip22",
		"name" : "Hanif Ahmad"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "Username must not be empty, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
	"username" : "nifnip22",
	"password" : "rahasia123"
}
```

Response Body (Success) :

```json
{
	"data" : {
		"username" : "nifnip22",
		"name" : "Hanif Ahmad",
		"token" : "UUID Token"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "Username or password is invalid, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

-   X-API-TOKEN : UUID Token

Response Body (Success) :

```json
{
	"data" : {
		"username" : "nifnip22",
		"name" : "Hanif Ahmad"
	}
}
```

Response Body (Failure) :

```json
{
	"errors" : "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

-   X-API-TOKEN : UUID Token

Request Body :

```json
{
	"password" : "rahasia123", // Optional
	"name" : "Hanif Ahmad" // Optional
}
```

Response Body (Success):

```json
{
	"data" : {
		"username" : "nifnip22",
		"name" : "Hanif Ahmad"
	}
}
```

Response Body (Failure):

```json
{
	"errors" : "Unauthorized, ..."
}
```

## Delete User

Endpoint : DELETE /api/users/current

Request Header :

-   X-API-TOKEN : UUID Token

Response Body (Success):

```json
{
	"data" : "User successfully deleted"
}
```

Response Body (Failure):

```json
{
	"errors" : "Unauthorized, ..."
}
```
