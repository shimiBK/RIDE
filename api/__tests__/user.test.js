const request = require("supertest");
const app = require("../server");



const updateUserInput = {

    city: "OR AQIVA",
    firstName: "MISHA",
    lastName:"MISHAWSHE",
    gender: "MALE",

}


describe('User Tests', () => {

    it('GET /user/id --> Get specific user', async ()=>{
        return request(app).get('/api/user/633e62feb1e0a66e939f22b1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.objectContaining({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    city: expect.any(String),
                    createdAt: expect.any(String),
                    displayName: expect.any(String),
                    email: expect.any(String),
                    firstName: expect.any(String),
                    gender: expect.any(String),
                    googleId: expect.any(String),
                    image: expect.any(String),
                    isAdmin: expect.any(Boolean),
                    lastName: expect.any(String),
                    loginFlag: expect.any(Boolean),
                    sendMails: expect.any(Array),
                })
            );
        })
    });


    
    it('GET /user/id --> 404 if user not found', async ()=>{
        return request(app).get('/api/user/dsadasdasdas')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.stringContaining("user not found")
            );
        })
    });


       
    it('PUT /user/id --> update a ride', async ()=>{
        return request(app).put('/api/user/633e62feb1e0a66e939f22b1')
        .send(updateUserInput)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.stringContaining("Account has been updated")
            );
        })
    });




})