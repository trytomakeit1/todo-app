// Routings
// api to fetch data
let express = require("express");
let router = express.Router();

let dbCalls = require('../db/dbCalls');

router.get("/list", (req, res)=>{
    // call DB to retrieve data

    dbCalls.findAllTasks((err, result) => {
        let response = {
            error: err,
            result
        }
       res.send(response);

    });


});


router.get("/task/:id", (req,res)=>{

    // search in the tasks list and retrieve the one with given id


/*     data.todoList.forEach((el) => {

        if(el.id.toString() === req.params.id) {
            res.send(el);

        }
    }) */
    let taskId = req.params.id;
    dbCalls.findTask(taskId, (err, result)=>{
        let response = {
            error: err,
            result
        }
       res.send(response);
    })
});



router.post('/insertTask', (req,res) => {

    dbCalls.addTask(req.body.newTask, (err, result)=>{

        let response = {
            error: err,
            result
        }
       res.send(response);

    });

});



router.post('/updateTask/:id',  (req, res) => {


    dbCalls.updateTask(req.params.id, req.body.editedTask, (err, result) => {
        let response = {
            error: err,
            result
        }
       res.send(response);
    });
});


router.post('/removeTask/:id', (req, res)=>{

    dbCalls.deleteTask(req.params.id, (err, result) => {
        let response = {
            error: err,
            result
        
        }
        res.send(response)
    });
});


module.exports = router;