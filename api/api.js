// Routings
// api to fetch data
let express = require("express");
let router = express.Router();

//let data = require("../tasks.json");

let bodyParser = require("body-parser");

let dbCalls = require('../db/dbCalls');

router.get("/list", (req, res)=>{
    // call DB to retrieve data

    dbCalls.findAllTasks((err, dbData) => {
        if(!err)
        res.send(dbData);

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
    if(!err)
        res.send(result);
    })
});



// router post_add new task
router.post('/insertTask', bodyParser.json(), (req,res) => {

    dbCalls.addTask(req.body.newTask, (err, result)=>{

        if(!err) res.send(result);

    });

});



module.exports = router;