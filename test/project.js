const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
const server = require("../app");
const taskModel = require("../models/task");
const project = require("../models/project");

chai.use(chaiHttp);

describe("API PROJECT", () => {
  before((done) => {
    project
      .cleanSchemaProject()
      .then((res) => {
        console.log("Project before");
        done();
      })
      .catch((error) => {
        throw error;
      });
  });

  let idUser = "";
  it("should looged a user for create a project", (pass) => {
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

  it("should create a project for a user logged #1", (pass) => {
    const project = {
      idUser,
      name: "proyecto 1x",
      description: "hey este es el proyecto 1x",
    };

    chai
      .request(server)
      .post("/v1/projects")
      .send(project)
      .end((error, res) => {
        res.should.have.status(201);
        res.headers["content-type"].should.contains("application/json");
        res.body.should.have.property("created").eql("created");
        pass();
      });
  });

  it("should create a project for a user logged #2", (pass) => {
    const project = {
      idUser,
      name: "proyecto 2x",
      description: "hey este es el proyecto 2x",
    };

    chai
      .request(server)
      .post("/v1/projects")
      .send(project)
      .end((error, res) => {
        res.should.have.status(201);
        res.headers["content-type"].should.contains("application/json");
        res.body.should.have.property("created").eql("created");
        pass();
      });
  });

  it("should get all project for a user logged", (pass) => {
    chai
      .request(server)
      .get("/v1/projects/user/" + idUser)
      .send(project)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.headers["content-type"].should.contains("application/json");
        const projects = res.body.projects;
        projects.should.be.a("array");
        projects.should.have.lengthOf(2);
        pass();
      });
  });

  let idTasks = [];

  it("should create a task", (pass) => {
    const task = {
      idUser,
      name: "Task 3",
      description: "Description 3 test",
    };
    chai
      .request(server)
      .post("/v1/tasks")
      .send(task)
      .end((error, res) => {
        res.should.have.status(201);
        res.headers["content-type"].should.contains("application/json");
        res.body.should.have.property("created").eql("created");
        idTask = res.body.id;

        pass();
      });
  });

  after((done) => {
    console.log("Project After");
    done();
  });
});
