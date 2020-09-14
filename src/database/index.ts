import "reflect-metadata";
import {createConnection} from "typeorm";
import {Employee} from "../entity/Employee";
// import { v4 as uuidv4 } from 'uuid';
import { Company } from "../entity/Company";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new Company();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.email = 'teste@a';
    let password = 'aaa';
    await user.encrypt(user, password);
    await user.checkPassword(password);
    console.log('hash: ' + user.passwordHash);
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(Employee);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
