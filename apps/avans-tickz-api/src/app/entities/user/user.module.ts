import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Neo4jModule } from "../neo4j/neo4j.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),   
    Neo4jModule.forRoot({
        scheme: 'neo4j',
        host: 'localhost',
        port: 7687,
        username: 'neo4j',
        password: 'neo'
      }), ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})

export class UserModule{}