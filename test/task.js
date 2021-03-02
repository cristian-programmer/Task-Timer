const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
const server = require("../app");
const taskModel = require("../models/task");

chai.use(chaiHttp);

describe("API TASK", () => {
  before((done) => {
    taskModel
      .cleanSchemaTask()
      .then((res) => {
        console.log("Task Before");
        done();
      })
      .catch((error) => {
        throw error;
      });
  });

  let idUser = "";
  it("should  logged a user for create a task", (pass) => {
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

        idUser = res.body.id;
        pass();
      });
  });

  it("should create a task for a user logged 1", (pass) => {
    const task = {
      idUser,
      name: "Task 1",
      description: "Description 1 test",
    };
    chai
      .request(server)
      .post("/v1/tasks")
      .send(task)
      .end((error, res) => {
        res.should.have.status(201);
        res.headers["content-type"].should.contains("application/json");
        res.body.should.have.property("created").eql("created");
        pass();
      });
  });

  it("should create a task for a user logged 2", (pass) => {
    const task = {
      idUser,
      name: "Task 2",
      description: "Description 2 test",
    };
    chai
      .request(server)
      .post("/v1/tasks")
      .send(task)
      .end((error, res) => {
        res.should.have.status(201);
        res.headers["content-type"].should.contains("application/json");
        res.body.should.have.property("created").eql("created");
        pass();
      });
  });

  it("should fail to create a task for a user logged", (pass) => {
    const task = {
      idUser,
      description: "Description task",
    };
    chai
      .request(server)
      .post("/v1/tasks")
      .send(task)
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.property("error").eql("missing send parameters");

        pass();
      });
  });

  it("should get all tasks for a user logged", (pass) => {
    chai
      .request(server)
      .get("/v1/tasks/user/" + idUser)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const tasks = res.body.task;
        tasks.should.be.a("array");
        pass();
      });
  });

  it("should fail to get all tasks for a user logged", (pass) => {
    chai
      .request(server)
      .get("/v1/tasks/user/")
      .end((error, res) => {
        res.should.have.status(404);
        pass();
      });
  });

  after((done) => {
    console.log("Task After");
    done();
  });
});
