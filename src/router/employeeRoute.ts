import express, {Request, Response} from 'express';
import { getEmployeeByHash, setEmployee } from '../controller/employee.controller';
import {CONN} from "../database/db";
// import { Employee } from '../entity/Employee';
// import { Card } from '../entity/Card';
// import { Company } from '../entity/Company';

const router = express.Router();

router.get('/employee/hash', async (req: Request, res: Response) => {
  const auth = req.query.auth!.toString();
  try{
    const resp = await getEmployeeByHash(auth, CONN);
    return res.status(200).send({resp});
  }catch(e) {
    return res.status(404).send({message: `${e}`})
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