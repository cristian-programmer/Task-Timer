const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
const server = require("../app");
const mongo = require("../infraestructure/mongoose");
const userModel = require("../models/users");

chai.use(chaiHttp);

describe("User API ", () => {
  before((done) => {
    userModel
      .cleanSchemaUser()
      .then((res) => {
        console.log("Test user beforeEach");
        done();
      })
      .catch((error) => {
        throw error;
      });
  });

  it("should create a user", (pass) => {
    const user = {
      name: "cristian vargas",
      username: "cvg97",
      password: "abc1",
      email: "cvg97@gmail.com",
    };

    chai
      .request(server)
      .post("/v1/users")
      .send(user)
      .end((error, res) => {
        res.should.have.status(201);
        res.headers["content-type"].should.contains("application/json");
        pass();
      });
  });

  it("shoud fail to create a user", (pass) => {
    const user = {
      username: "cvg97",
      password: "abc1",
    };

    chai
      .request(server)
      .post("/v1/users")
      .send(user)
      .end((error, res) => {
        res.should.have.status(400);
        res.headers["content-type"].should.contains("application/json");
        res.body.should.have.property("error").eql("missing send parameters");
        pass();
      });
  });

  it("should logged a user", (pass) => {
    const user = {
      username: "cvg97",
      password: "abc1",
    };

    chai
      .request(server)
      .post("/v1/users/login")
      .send(user)
      .end((error, res) => {
        res.should.have.status(200);
        res.headers["content-type"].should.contains("application/json");
        res.body.should.have.property("id");
        res.body.should.have.property("token");
        res.body.should.have.property("login").eql(true);
        pass();
      });
  });

  it("should fail logged a user", (pass) => {
    const user = {
      username: "cvg97",
    };

    chai
      .request(server)
      .post("/v1/users/login")
      .send(user)
      .end((error, res) => {
        res.should.have.status(400);
        res.headers["content-type"].should.contains("application/json");
        res.body.should.have.property("error").eql("missing send parameters");
        res.body.should.have.property("login").eql(false);
        pass();
      });
  });

  after(() => {
    console.log("Test user after");
    mongo.closeConnection();
  });
});
