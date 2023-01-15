const request = require("supertest");
const app = require("../server");

const ridePayload = {

    ename: "armin-van-buuren",
    fname: "Yontatan",
    lname: "Mendelson",
    city: "TEL AVIV",
    facebook: "https://www.facebook.com/shimi.kalifa/",
    time: "19:00",
    userGender: "Male",
    userImg:"ddsadasdasdasdas",
    uID:"63491ddadd9521448174bcd1"

}

const updateRideInput = {

    firstName:"Jacky",
    lastName:"Jackson",
    city:"TEL-AVIV",
    time:"19:00"

}





describe('Rides Tests' , () =>{
    
    it('GET /rides --> Get all rides ' , async () => {
        return request(app)
        .get('/api/rides')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) =>{
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        eventName: expect.any(String),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        city: expect.any(String),
                        facebook: expect.any(String),
                        time: expect.any(String),
                        userID: expect.any(String),
                        userImg: expect.any(String),
                        userGender: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    }),

                ])
            );

        });

    });



    it('GET /rides/id --> Get a specific ride by id', async () => {
        return request(app)
        .get('/api/rides/634e814f68c8e0e34c114aca')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) =>{
            expect(res.body).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        eventName: expect.any(String),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        city: expect.any(String),
                        facebook: expect.any(String),
                        time: expect.any(String),
                        userID: expect.any(String),
                        userImg: expect.any(String),
                        userGender: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    }),
            );

        });

    });

    it('GET /rides/id --> 500 if not found', async () => {
        return request(app).get('/api/rides/453453').expect(500);
    });


    it('POST /rides --> create a ride', async () => {
        return request(app).post('/api/rides')
        .send(ridePayload)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) =>{
            expect(res.body).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        eventName: expect.any(String),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        city: expect.any(String),
                        facebook: expect.any(String),
                        time: expect.any(String),
                        userID: expect.any(String),
                        userImg: expect.any(String),
                        userGender: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    }),
            );
    
        });
    });

    it('PUT /rides/id --> update a ride', async () =>{
        return request(app).put('/api/rides/update/634e810a68c8e0e34c114aad')
        .send({

        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.stringContaining("Ride has been updated")  
            )
        })
    })


    it('PUT /rides/id --> update ', async () =>{
        return request(app).put('/api/rides/update/634e810a68c8e0e34c114aad')
        .send(updateRideInput)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.stringContaining("Ride has been updated")  
            )
        })
    })

    
    it('DELETE /rides/id --> 404 if ride wasnt found ', async () => {
        
        return request(app).delete('/api/rides/634e810a68c8e0e34c114aad')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.stringContaining("Ride not found")
            )
        })


    });


    it('GET /rides/user/id --> get rides of specific user', async () => {

        return request(app).get('/api/rides/user/63491ddadd9521448174bcd1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        eventName: expect.any(String),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        city: expect.any(String),
                        facebook: expect.any(String),
                        time: expect.any(String),
                        userID: expect.any(String),
                        userImg: expect.any(String),
                        userGender: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    }),

                ])
            );
        })

    })





})
