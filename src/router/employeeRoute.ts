import express, {Request, Response} from 'express';
import { getUserbyHash } from '../controller/employeeController';
import {CONN} from "../database/db";
// import { Employee } from '../entity/Employee';
// import { Card } from '../entity/Card';
// import { Company } from '../entity/Company';

const router = express.Router();

router.get('/employee', async (req: Request, res: Response) => {
  const hash = req.query.hash!.toString();
  if (hash === ''){
    res.send({"error": "You need to pass the hash as a query parameter!"})
  } else{
    getUserbyHash(hash, CONN).then(data => {
      if (data === undefined)
        res.send({"data": { "message": "Employee with the hash passed doesn't exist", "hash": `${hash}`}})
      return res.send({"data": data});
    }).catch((err: any)=> res.send({"error": err}));
  }
// createConnection().then(async connection => {

//       console.log("Inserting a new user into the database...");
//       // CREATE CARD
//       // const card = new Card();
//       // card.cardNumber = "Timber";
//       // card.expirationDate = "Saw";
//       // card.securityCode = 794;
//       // // console.log('hash: ' + user.passwordHash);
//       // await connection.manager.save(card);
//       // CREATE COMPANY
//       // const user11 = new Company();
//       // user11.firstName = "Timber";
//       // user11.lastName = "Saw";
//       // user11.email = 'teste@a';
//       // let password2 = 'aaa';
//       // await user11.encrypt(user11, password2);
//       // await user11.checkPassword(password2);
//       // // console.log('hash: ' + user.passwordHash);
//       // await connection.manager.save(user11);
//       // Employees
//       const user1 = new Employee();
//       user1.firstName = "Timber";
//       user1.lastName = "Saw";
//       user1.email = 'teste@a';
//       user1.age = 20;
//       user1.companyId = 'a3cdd9d8-7d07-49e0-90a0-124db72fcded';
//       user1.ecardId = 'bd5549ff-7362-4889-bdaa-01c36f24d9f2';
//       let password1 = 'aaa';
//       await user1.encrypt(user1, password1);
//       await user1.checkPassword(password1);
//       // console.log('hash: ' + user.passwordHash);
//       await connection.manager.save(user1);
//       // console.log("Saved a new user with id: " + user1.id);
//       // console.log("Loading users from the database...");
//       const users = await connection.manager.find(Employee);
//       console.log("Loaded users: ", users.forEach(d => d.checkPassword('aaa').then(d => console.log(d))));
//       // console.log("loaded users: " +users);
      
//       console.log("Here you can setup and run express/koa/any other framework.");

//   }).catch(error => console.log(error));

});

router.post('/employee', (req: Request, res: Response) => {
  const body = req.body;  
  return res.send({"message": `employee was succefully created: ${body.firstName} ${body.lastName}`})
});

export {router as employeeRouter};