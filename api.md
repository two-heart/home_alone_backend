#API Doc

## Login

`POST /auth/login`

```json
{
	"username":"dev@home-alone.de",
	"password":"password"
}
```

_Response_

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMmJkNjBhYS1iMDI1LTQ0NzktYWZkMS0yNDg4YmUyYjdjNTIiLCJpYXQiOjE1ODQ3ODUwMzJ9.5b0jT17YFB5K9N-C6Y6TYI_Vpz-wwV5vEKYuSDJ5CFk"
}
```

## Challenge

### Create Challenge

`POST /api/challenge`

```json
{
  "name": string,
  "description": string
}
```

`GET /api/challenge`

```json
{
  "id": "535fcc18-72d5-45aa-9c73-1067b6f97303",
  "name": "Test challenge",
  "description": "This is a test challenge",
  "created": "",
  "creator": {
    "email": "testuser@dev.de"
  }
}
```

`PUT /api/challenge/<challenge-id>`

```


```
