# EE CARD

### Company Credit Card that the employees can rent

The idea is that the employee is able to rent a cash card with more quota than he usually have, and use it on a vacation, buying something for him or his family, 'cause many times personal cards you have to be with the same company for a long time to get more quota/limit.

* Technologies:
  * [typescript](https://www.typescriptlang.org/)
  * [node.js](https://nodejs.org/en/)
  * [express](https://expressjs.com/)
  * [docker and docker-compose](https://www.docker.com/)
    * [postgres](https://www.postgresql.org/) 
  * [typeORM](https://typeorm.io/#/)

## Docker Usage
```
- docker build -t ee_card_server .
- docker-compose up/down | start/stop containers

- docker-compose exec server bash  | interactive bash with api container
root@...:/# yarn run typeorm schema:sync
root@...:/# yarn run typeorm migration:run

docker-compose exec database bash | interactive bash with db container
root@...:/# psql -h database -d <db_name> -U <username>
```
## API Usage
**replace .env file with your following infos:**

**database:5432** are the default values, unless of course you change the service name in docker-compose.yml file and db port, do it for your own risk.

```python
POSTGRES_USER=<user> 
POSTGRES_PASSWORD=<pass> 
POSTGRES_DB=<db_name>
POSTGRES_URL=postgres://user:pass@database:5432/db_name
PORT=8000 
```

**replace username/password/database on the ormconfig.docker.json:**

```python
"username": <username>,
"password": <password>,
"database": <db_name>,
```

## Response  
### Codes
```
200: Success
400: Bad request
401: Unauthorized
404: Cannot be found
50X: Server Error
```

### Example Error Message
```json
http code 404
{
    "message": "company name wasn't found!"
}
```

## Employee

**Request:**
**Register a new employee**
```json
POST /employee HTTP/1.1
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
**Get employee by**
```json
GET /employee?hash=<employee-hash-id>  
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

## Company (WIP)

**I'm still developing the back-end and modeling the db, after it i'll start the front.**


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Progress
I'm documenting my progress due today 15/08 using [notion](https://www.notion.so/EE_CARD-99b245127f1544dc91727a1a5eccdf1f)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Made by ♥ Alexandre Vardai 👋 
[Find me here](https://www.linkedin.com/in/alexandre-vardai-b8255b15b/)
