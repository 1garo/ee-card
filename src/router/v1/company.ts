import * as fast from 'fastify'
import fastJson from 'fast-json-stringify';
import {CONN} from "../../database/db";
import * as companyController from '../../controller/company.controller';

const company = async (fastify, _opts, done) => {

  fastify.get('/company/hash', async (req, reply: fast.FastifyReply) => {
    const auth = req.query.auth!.toString();
    try {
      const {data, status} = await companyController.getCompanyByHash(auth, CONN);
      if (status === 404){
        reply.code(status).send({error: `${data}`});
      }
      reply.code(200).send({data});
    } catch(e) {
      reply.code(500).send({error: `${e}`});
    }
  });

  fastify.get('/company', async (_req, reply: fast.FastifyReply) => {
    const {data, status} = await companyController.getAllCompanies(CONN);
    if (status === 404){
      reply.code(404).send({message: `${data}`});
    }
    reply.code(200).send({data});
  });

  fastify.post('/company', async (req, reply: fast.FastifyReply) => {
    if (!req.headers.authorization) {
      reply.code(401).send({
          error: "Unauthorised access, send basic auth!"
      });
    }
    const {data, status} =  await companyController.setCompany(req.body, req.headers.authorization, CONN);
    if (status === 500){
      reply.code(status).send({error: `${data}`})
    }
    reply.code(status).send({data})
  });

  done();
};

export {company as companyRouter};
