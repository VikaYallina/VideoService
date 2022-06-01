const chai = require('chai');
const request = require('supertest');
const server = require('../server.js');

const { expect, should } = chai;

describe('Authentication test', async ()=> {
    it('should login success', async (done) => {
        let data = {
            email: "mail@mail.com",
            password: "pass"
        }
        request(server)
            .post('/api/auth/signin')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')
                res.body.should.have.property("accessToken")
            })
        done()
    });
    it("should fail login", async (done)=> {
        let data = {
            email: "mail@mail.com",
            password: "pass121212"
        }
        request(server)
            .post('/api/auth/signin')
            .send(data)
            .end((err, res) => {
                res.should.have.status(401)
                res.should.be.a('object')
                res.body.should.have.property("message").eql("Invalid credentials")
            })
        done()
    });
})