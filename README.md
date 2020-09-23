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
**create database.dev.env file with the following content:**

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

**Endopoints:**
* GET /employee?hash="password-hash":
* POST /employee with:
```json
{
 "firstName": "",
 "lastName": "",
 "age": 0,
 "email": "",
 "companyName": "",
	"card": {
		"cardNumber": "",
		"expirationDate": "",
		"securityCode": 0
	}
}
```
* GET /card/number/cardNumber: return info from cardNumber queried
  * /card: return all cards
* POST /card with:

```json
 {
		"cardNumber": "",
		"expirationDate": "",
		"securityCode": 0
}
```
* /company - GET and POST (WIP);

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
