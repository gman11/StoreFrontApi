import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe("Testing products route",() =>{
    it('Test /user POST route ', () => {
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

});