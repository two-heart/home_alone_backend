#API Doc

## Login

`POST /auth/login`

```json
{
  "username": "testuser@dev",
  "password": "testpassword"
}
```

_Response_

```json
{
  "accessToken": "such a nice base64 encode jwt"
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
