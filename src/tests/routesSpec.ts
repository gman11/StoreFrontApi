import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

let userToken = "";

describe("Testing user route",() =>{
    it('Test /user create POST route ', () => {
        const user = {
            "firstName": "Cristiano",
            "lastName": "Rolaldo",
            "password": "DaBest7"
        };
        return request.post('/user')
            .send(user)
            .expect(200)
            .then( (res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    });
    it("Test /user authenticate POST route",()=>{
        const user = {
            id: 1,
            firstName: "",
            lastName: "",
            password: "DaBest7",
          }

        return request.post("/userAuth")
          .send(user)
          .expect(200)
          .then((res) =>{
            expect(res.body).toBeTruthy;
            userToken = res.body;
          })
          .catch(err => console.error(err.message));
    })
    it("Test / user index GET route", ()=>{
        return request.get("/user")
            .auth(userToken,{type:"bearer"})
            .expect(200)
            .then((res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    })
    it("Test / user SHOW GET route", ()=>{
        let param = 1;
        return request.get("/user/" + param)
            .auth(userToken,{type:"bearer"})
            .expect(200)
            .then((res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    })
});

describe("Test order route",()=>{
    it('Test /order create POST route ', () => { 
        return request.post('/order')
            .auth(userToken,{type: 'bearer'})
            .send( {"user_id":"1","status": "open"})
            .expect(200)
            .then( (res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    });
    it("Test / order index GET route", ()=>{
        return request.get("/order")
            .auth(userToken,{type:"bearer"})
            .expect(200)
            .then((res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    })
    it("Test / order show GET route", ()=>{
        return request.get("/order/1")
            .auth(userToken,{type:"bearer"})
            .expect(200)
            .then((res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    })
});
describe("Test product route", () =>{
    it('Test /product create POST route ', () => { 
        return request.post('/products')
            .auth(userToken,{type: 'bearer'})
            .send( {"name":"pencil","price": "15"})
            .expect(200)
            .then( (res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    });
    it("Test / product index GET route", ()=>{
        return request.get("/products")
            .expect(200)
            .then((res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    });
    it("Test / product show GET route", ()=>{
        return request.get("/products/1")
            .expect(200)
            .then((res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    });
});
describe("Test add Products to Orders", ()=>{
    it("Test /addProductToOrder POST route", () =>{
        return request.post("/addProductToOrder/1")
        .auth(userToken,{type:"bearer"})
        .send({"productId":"1","quantity":"5"})
        .expect(200)
        .then((res) => {
            expect(res.body).toBeTruthy;
        })
        .catch(err => console.error(err.message));
    });
});