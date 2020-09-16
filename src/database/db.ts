import "reflect-metadata";
import {createConnection, Connection} from "typeorm";

export const CONN: Promise<Connection> = createConnection();
/*createConnection.then(async connection => {

    console.log("Inserting a new user into the database...");
    // CREATE CARD
    // const card = new Card();
    // card.cardNumber = "Timber";
    // card.expirationDate = "Saw";
    // card.securityCode = 794;
    // // console.log('hash: ' + user.passwordHash);
    // await connection.manager.save(card);
    // CREATE COMPANY
    // const user11 = new Company();
    // user11.firstName = "Timber";
    // user11.lastName = "Saw";
    // user11.email = 'teste@a';
    // let password2 = 'aaa';
    // await user11.encrypt(user11, password2);
    // await user11.checkPassword(password2);
    // // console.log('hash: ' + user.passwordHash);
    // await connection.manager.save(user11);
    // Employees
    const user = new Employee();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.email = 'teste@a';
    user.age = 10;
    user.companyId = '5d0710ff-952f-4fe8-8113-5b80cd8a4b19';
    user.ecardId = '512db3cf-005d-4e47-8adb-df5db9c7565f';
    let password = 'aaa';
    await user.encrypt(user, password);
    await user.checkPassword(password);
    const user1 = new Employee();
    user1.firstName = "Timber";
    user1.lastName = "Saw";
    user1.email = 'teste@a';
    user1.age = 20;
    user1.companyId = '5d0710ff-952f-4fe8-8113-5b80cd8a4b19';
    user1.ecardId = '512db3cf-005d-4e47-8adb-df5db9c7565f';
    let password1 = 'aaa';
    await user1.encrypt(user1, password1);
    await user1.checkPassword(password1);
    // console.log('hash: ' + user.passwordHash);
    await connection.manager.save(user);
    await connection.manager.save(user1);
    console.log("Saved a new user with id: " + user1.id);
    console.log("Loading users from the database...");
    const users = await connection.manager.find(Employee);
    console.log("Loaded users: ", users.forEach(d => d.checkPassword('aaa').then(d => console.log(d))));
    // console.log("loaded users: " +users);
    
    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));

  return ''
}

*/