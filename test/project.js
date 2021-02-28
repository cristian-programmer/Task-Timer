const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
const server = require("./../app");
const taskModel = require("./../models/task");
const project = require("./../models/project");

chai.use(chaiHttp);

describe("API PROJECT", ()=> {
    beforeEach((done)=> {
        taskModel.cleanSchemaTask().then(res=> {
            done();
        }).catch(error => {
            throw error;
        });
    });

    let idUser = "";
    it("should looged a user for create a project", (pass)=> {
        const user = {
            username: "cvg97",
            password: "abc1"
        };


        chai.request(server)
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
            description: "hey este es el proyecto 1x"
        }

        chai.request(server)
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
            description: "hey este es el proyecto 2x"
        }

        chai.request(server)
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
        chai.request(server)
        .get("/v1/projects/user/" + idUser)
        .send(project)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.headers["content-type"].should.contains("application/json");
            const projects = res.body.projects;
            console.log(projects);
            projects.should.be.a("array");
            projects.should.have.lengthOf(2);
            pass();
           
        });
    });


    /*describe("add a task to a project", (pass) => {
       
        
    });*/

    let idTasks = [];
    /* 
     it("should create a task", (pass)=> {
         const task = {
             idUser,
             name: "Task 3",
             description: "Description 3 test",
         };
         chai.request(server)
         .post("/v1/tasks")
         .send(task)
         .end((error, res) => {
             res.should.have.status(201);
             res.headers["content-type"].should.contains("application/json");
             res.body.should.have.property("created").eql("created");
             pass();
             idTask = res.body.id;
         });
     });*/

     it("should get all tasks for a user logged", (pass) => {
         console.log("idUser ", idUser);
        chai.request(server)
         .get("/v1/tasks/user/"+idUser)
         .end((error, res) => {
             res.should.have.status(200);
             res.body.should.be.a("object");
             const tasks = res.body.task;
             console.log(tasks);
             tasks.should.be.a("array");
             tasks.should.have.lengthOf(2);
             idTasks.push(tasks[0]._id);
             idTasks.push(tasks[1]._id);
             pass();
         }); 
     });

     it("should add a idtask to a project", (pass) => {
         console.log("id tasks", idTasks);
         pass();
     });

});