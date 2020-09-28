import express, {Request, Response} from 'express';
import {CONN} from "../database/db";
import * as companyController from '../controller/company.controller';

const router = express.Router();

router.get('/company/hash', async (req: Request, res: Response) => {
  const auth = req.query.auth!.toString();
  try {
    const {data, status} = await companyController.getCompanyByHash(auth, CONN);
    if (status === 404){
      return res.status(status).send({error: `${data}`});
    }
    return res.status(200).send({data});
  }catch(e) {
    return res.status(500).send({error: `${e}`});
  }
});

router.get('/company', async (res: Response) => {
  const {data, status} = await companyController.getAllCompanies(CONN);
  if (status === 404){
    return res.status(404).send({message: `${data}`});
  }
  return res.status(200).send({data});
});

router.post('/company', async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
        error: "Unauthorised access, send basic auth!"
    });
  }
  const {data, status} =  await companyController.setCard(req.body, req.headers.authorization, CONN);
  if (status === 500){
    return res.status(status).send({error: `${data}`})
  }
  return res.status(status).send({data})
});

export {router as companyRouter};