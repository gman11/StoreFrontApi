import exp from "constants";
import { rmSync } from "fs";
import {User,UserStore} from "../models/users";

const userStore = new UserStore();
let user:User ={
    id:0,
    first_name:"Leo",
    last_name:"Messy",
    password:"pureTalent"
}

describe("User Model", () =>{
    it("should have an index method",() =>{
        expect(userStore.index).toBeDefined();
    });
    it("should have a create method",() =>{
        expect(userStore.create).toBeDefined();
    });
    it("should have a show method",() =>{
        expect(userStore.show).toBeDefined();
    });
    it("should have a authenticate method",() =>{
        expect(userStore.authenticate).toBeDefined();
    });
    it("should create user",async() =>{
        const result = await userStore.create(user);
        console.log("model user create" );
        console.log(result );

        user.id = result.id;
        expect(result.first_name).toEqual(user.first_name);
        expect(result.last_name).toEqual(user.last_name);
    });
    it("should show the index users",async() =>{
        const result = await userStore.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it("should show the user",async () =>{
        const result = await userStore.show(String(user.id));
        expect(result.id).toEqual(user.id);
    });
    it("should have a authenticate user",async() =>{
        const result = await userStore.authenticate(user);
        expect(result).not.toBeNull;
    });
});