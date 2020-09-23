import express, {Request, Response} from 'express';
import { getEmployeeByHash, setEmployee } from '../controller/employee.controller';
import {CONN} from "../database/db";
import { createConnection, InsertResult } from 'typeorm';
import { Employee } from '../entity/Employee';
import { Card } from '../entity/Card';
import { Company } from '../entity/Company';
import { create } from '../service/employee.service';
import { decodeBase64 } from 'bcryptjs';
// import { Employee } from '../entity/Employee';
// import { Card } from '../entity/Card';
// import { Company } from '../entity/Company';

const router = express.Router();

router.get('/employee', async (req: Request, res: Response) => {
  const hash = req.query.hash!.toString();
  if (hash === ''){
    res.send({"error": "You need to pass the hash as a query parameter!"})
  } else{
    getEmployeeByHash(hash, CONN).then(data => {
      if (data === undefined)
        res.send({"data": { "message": "Employee with the hash passed doesn't exist", "hash": `${hash}`}})
      return res.send({"data": data});
    }).catch((err: any)=> res.send({"error": err}));
  }
});

router.post('/employee', async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
        error: "Unauthorised access, send basic auth!"
    });
  }
  const {message, status} = await setEmployee(req.body, req.headers.authorization, CONN);
  console.log('message e status: '+ message +'\t'+ status);
  if (status === 404 || status === 500){
    return res.status(status).send({error: `${message}`})
  }
  return res.status(status).send({message: `${message}`})
});

export {router as employeeRouter};