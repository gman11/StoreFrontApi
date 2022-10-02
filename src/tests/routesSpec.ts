import supertest from 'supertest';
import app from '../server';
import {User} from '../models/users';
import {Product} from '../models/product';
import {Order} from '../models/orders';


const request = supertest(app);

let userToken = "";
let newUser:User={
    id:0,
    first_name:"Cristiano",
    last_name:"Ronaldo",
    password:"DaBest7"
};
let newProduct:Product={
    id:0,
    name:"Pencil",
    price:"15"
};
let newOrder:Order={
    id:0,
    user_id:0,
    status:"open"
}

describe("Testing user route",() =>{
    it('Test /user create POST route ', () => {
       
        return request.post('/user')
            .send(newUser)
            .expect(201)
            .then( (res) => {
                expect(res.body.first_name).toEqual(newUser.first_name);
                newUser = res.body;
            })
            .catch(err => console.error(err.message));
    });
    it("Test /user authenticate POST route",()=>{
        return request.post("/userAuth")
          .send(newUser)
          .expect(200)
          .then((res) =>{
            expect(res.body.length).toBeGreaterThan(0);
            userToken = res.body;
          })
          .catch(err => console.error(err.message));
    })
    it("Test / user index GET route", ()=>{
        return request.get("/user")
            .auth(userToken,{type:"bearer"})
            .expect(200)
            .then((res) => {
                expect(res.body.length).toBeGreaterThan(0);
            })
            .catch(err => console.error(err.message));
    })
    it("Test / user SHOW GET route", ()=>{
        console.log("newUser id " + newUser.id);
        return request.get("/user/" + newUser.id)
            .auth(userToken,{type:"bearer"})
            .expect(200)
            .then((res) => {
                expect(res.body.first_name).toEqual(newUser.first_name);
            })
            .catch(err => console.error(err.message));
    })
});

describe("Test order route",()=>{
    it('Test /order create POST route ', () => { 
        return request.post('/order')
            .auth(userToken,{type: 'bearer'})
            .send( {"user_id":newUser.id,"status": "open"})
            .expect(200)
            .then( (res) => {
                expect(res.body.status).toEqual("open");
                expect(res.body.user_id).toEqual(newUser.id);
                newOrder = res.body;
            })
            .catch(err => console.error(err.message));
    });
    it("Test / order index GET route", ()=>{
        return request.get("/order")
            .auth(userToken,{type:"bearer"})
            .expect(200)
            .then((res) => {
                expect(res.body.length).toBeGreaterThan(0);
            })
            .catch(err => console.error(err.message));
    })
    it("Test / order show GET route", ()=>{
        return request.get("/order/" + newOrder.id)
            .auth(userToken,{type:"bearer"})
            .expect(200)
            .then((res) => {
                expect(res.body.status).toEqual(newOrder.status);
            })
            .catch(err => console.error(err.message));
    })
});
describe("Test product route", () =>{
  
    it('Test /product create POST route ', () => { 
        return request.post('/products')
            .auth(userToken,{type: 'bearer'})
            .send(newProduct)
            .expect(200)
            .then( (res) => {
                expect(res.body.name).toEqual(newProduct.name);
                newProduct.id = res.body.id;
            })
            .catch(err => console.error(err.message));
    });
    it("Test / product index GET route", ()=>{
        return request.get("/products")
            .expect(200)
            .then((res) => {
                expect(res.body.length).toBeGreaterThan(0);
            })
            .catch(err => console.error(err.message));
    });
    it("Test / product show GET route", ()=>{
        return request.get("/products/" + newProduct.id)
            .expect(200)
            .then((res) => {
                expect(res.body.name).toEqual(newProduct.name);
            })
            .catch(err => console.error(err.message));
    });
});
describe("Test add Products to Orders", ()=>{
    it("Test /addProductToOrder POST route", () =>{
        return request.post("/addProductToOrder/1")
        .auth(userToken,{type:"bearer"})
        .send({"productId":newProduct.id,"quantity":"5"})
        .expect(200)
        .then((res) => {
            expect(res.body.quantity).toEqual(5);
        })
        .catch(err => console.error(err.message));
    });
});