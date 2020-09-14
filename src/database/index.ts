import "reflect-metadata";
import {createConnection} from "typeorm";
import {Employee} from "../entity/Employee";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new Employee();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(Employee);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
