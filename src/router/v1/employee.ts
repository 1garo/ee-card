import * as fast from 'fastify'
import fastJson from 'fast-json-stringify';
import {CONN} from "../../database/db";
import * as employeeController from '../../controller/employee.controller';

const employee = async (fastify, _opts, done) => {

  fastify.get('/employee/hash', async (req, reply: fast.FastifyReply) => {
    const auth = req.query.auth!.toString();
    try{
      const resp = await employeeController.getEmployeeByHash(auth, CONN);
      reply.code(200).send({resp});
    } catch(e) {
      reply.code(404).send({message: `${e}`})
    }

  });

  fastify.post('/employee', async (req, reply: fast.FastifyReply) => {
    if (!req.headers.authorization) {
      reply.code(401).send({
          error: "Unauthorised access, send basic auth!"
      });
    }

    const {message, status} = await employeeController.setEmployee(req.body, req.headers.authorization, CONN);
    console.log('message e status: '+ message +'\t'+ status);
    if (status === 404 || status === 500){
      reply.code(status).send({error: `${message}`})
    }

    reply.code(status).send({message: `${message}`})

  });

  done();
};

export {employee as employeeRouter};
