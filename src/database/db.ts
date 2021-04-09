import "reflect-metadata";
import {createConnection, Connection} from "typeorm";

export const CONN: Promise<Connection> = createConnection();
