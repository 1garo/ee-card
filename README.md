# EE CARD

### Company Credit Card that the employees can rent

The idea is that the employee is able to rent a cash card with more quota than he usually have, and use it on a vacation, buying something for him or his family, 'cause many times personal cards you have to be with the same company for a long time to get more quota/limit.

* Techologies:
  * [typescript](https://www.typescriptlang.org/)
  * [node.js](https://nodejs.org/en/)
  * [electron](https://www.electronjs.org/)
  * [express](https://expressjs.com/)
  * [postgres](https://www.postgresql.org/) ``` aim to use the db on docker later on```
  * [typeORM](https://typeorm.io/#/)

 
## API Usage
**create .env file with the following content:**

```python
DB_HOST=<hostname>
DB_USER=<username> 
DB_PASS=<password>
DB_NAME=<table_name>
```

**replace username/password/database on the ormconfig.json:**

```python
"username": <username>,
"password": <password>,
"database": <db_name>,
```

* Endopoints:
  * GET /employee?hash="password-hash"
  * POST /employee with body:
```json
{
 "firstName": "",
 "lastName": "",
 "age": 0,
 "email": "test@test.com"
}
```
  * /card - GET and POST (WIP);
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
