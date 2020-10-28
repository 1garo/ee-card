# EE CARD API

### Company Credit Card that the employees can rent

The idea is that the employee is able to rent a cash card with more quota than he usually have, and use it on a vacation, buying something for him or his family, 'cause many times personal cards you have to be with the same company for a long time to get more quota/limit.

* Technologies:
  * [typescript](https://www.typescriptlang.org/)
  * [node.js](https://nodejs.org/en/)
  * [express](https://expressjs.com/)
  * [docker and docker-compose](https://www.docker.com/)
    * [postgres](https://www.postgresql.org/) 
  * [typeORM](https://typeorm.io/#/)
  * [aws cloud](https://aws.amazon.com/)
  
For the sake of learning, I deployed a beta version of the code today (28/09) on aws cloud(18.220.31.149), the endpoints you can see below.

The endpoint is not working anymore, Free Tier Usage Limit :( 

## Docker Usage
```
- docker build -t ee_card_server .
- docker-compose up/down | start/stop containers

- docker-compose exec database bash | interactive bash with db (database is the default service name).
root@...:/# psql -h <service-name> -d <db_name> -U <username>
- docker-compose exec server bash | interactive bash with server
```
## API Usage
**create .env file with your following info:**

database and 5432 are the default, only change if you know what are you doing.

```python
POSTGRES_USER=<user> 
POSTGRES_PASSWORD=<pass> 
POSTGRES_DB=<db_name>
POSTGRES_URL=postgres://user:pass@database:5432/db_name
PORT=8000 
DB_PORT=5432
INTERNAL_DB_PORT=5433
```

**replace username/password/database on the ormconfig.docker.json:**

```python
"username": <username>,
"password": <password>,
"database": <database>
```

## Response  
### Codes
```
200: Success
400: Bad request
401: Unauthorized
404: Cannot be found
50x: Server Error
```

## Employee

**Request:**
**Register a new employee**
```json
POST /employee HTTP/1.1
Basic Auth: email:password
Accept: application/json
Content-Type: application/json
Content-Length: xy
{
	"firstName": "nameTest",
	"lastName": "lastTest",
	"age": 55,
	"email": "test@test.com",
	"companyName": "test",
	"card": {
		"cardNumber": "5555666677778884",
		"expirationDate": "20/50",
		"securityCode": 121
	}
}
```

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
   "message": "Employee was succesfully inserted on database!"
}
```

**Failed Response:**
```json
HTTP/1.1 404 or 500
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "Employee wasn't inserted",
}
``` 

**Request:**
**Get employee by hash**
```json
GET /employee?auth=<employee-pw-hash>  
HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

```

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "message": 
  {
  	"id": "...",
	"firstName": "nameTest",
	"lastName": "lastTest",
	"age": 55,
	"email": "test@test.com",
  }
}
```

**Failed Response:**
```json
HTTP/1.1 404 or 500
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "error": "Employee with the hash passed doesn't exist",
}
``` 

## Card
**Request:**
**Get specific card**
```json
GET /card/number/<CardNumber> HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "id": "64cbb16f-539a-4093-b2be-34ee5b357bcc",
  "cardNumber": "cardnumber",
  "expirationDate": "20/08",
  "securityCode": 999
}
```

**Failed Response:**
```json
HTTP/1.1 404 Not Found
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "error": "Cardnumber wasn't found!"
}
``` 

**Request:**
**Get all cards**
```json
GET /card HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
"cards": [
    {
      "id": "f187f27b-31b7-49a2-878f-5e2a6ba26a6b",
      "cardNumber": "testeCardNUmber",
      "expirationDate": "20/08",
      "securityCode": 794
    },
    ]
}
```


**Failed Response:**
```json
HTTP/1.1 404 Not Found
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "cards": []
}
``` 
**Other endpoints**

```
GET /card/number/<cardNumber> - retrive the info about the card passed or throw error
```

## Company (WIP)
**Request:**
**Get all companies**
```json
GET /company HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
"data": [
    {
      "id": "b3a32c12-18c8-4477-9d46-8ffa65eb9b18",
      "name": "tt",
      "email": "test@test.com"
    },
    ]
}
```


**Failed Response:**
```json
HTTP/1.1 404 Not Found
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "message": "None company was found registered!"
}
``` 
**Request:**
**Register a new company**
```json
POST /company HTTP/1.1
Basic Auth: email:password
Accept: application/json
Content-Type: application/json
Content-Length: xy
{
   "name": "testing",
   "email": "test@test.com"
}
```

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "data": "Company was succesfully inserted on database!"
}
```
**Failed Response:**
```json
HTTP/1.1 500 Internal server error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
  "error": "Company wasn't inserted"
}
``` 
**Other endpoints**

```
GET /company/hash?auth=<company-pw-hash> - retrive the info about the company passed or throw error
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Progress
I'm documenting my progress due today 15/08 using [notion](https://www.notion.so/EE_CARD-99b245127f1544dc91727a1a5eccdf1f)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Made by ♥ Alexandre Vardai 👋 
[Find me here](https://www.linkedin.com/in/alexandre-vardai-b8255b15b/)
