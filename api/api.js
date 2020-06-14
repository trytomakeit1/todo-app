//Routings
// api to fetch data
let express = require("express");
let router = express.Router();

let data = require("../tasks.json");

router.get("/list", (req, res)=>{
    res.send(data);

});

router.get("/task/:id", (req,res)=>{

    // search in the tasks list and retrieve the one with given id
    data.todoList.forEach((el) => {

        if(el.id.toString() === req.params.id) {
            res.send(el);

        }
    })
})

// router post_add new task

module.exports = router;