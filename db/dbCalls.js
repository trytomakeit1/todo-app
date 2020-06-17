let mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'todo';
const collection = 'tasks';

const tasksToInsert = [{
    "title": "first note",
    "description": "this is my first task to do",
    "date": 1591961611970,
    "finished": true
    },
    {
    "title": "second note",
    "description": "this is my second task to do",
    "date": 1591961813171,
    "finished": false
}];

const insertTasksToDB = () => {

    mongoClient.connect(url, (err, client) => {

        let db = client.db(dbName);
        //insert data to tasks collection
        if(err) {
            console.log("there was an error in connecting to DB");

        } else {
            db.collection(collection).insertMany(tasksToInsert,
                (err, result) => {
                    if(err) {
                        console.log(`there was an error in inserting
                         the tasks to DB`);
                        client.close();
                    }
                    console.log("tasks inserted successfully", result);

            });

        }
    })
}



const findAllTasks = (cb) => {

    mongoClient.connect(url, (err, client) =>{

        let databaseName = client.db(dbName);
        databaseName.collection(collection).find({}).toArray(function(err,result) {
            if(err) {console.log(err); cb(err);}

            else {

                cb(null, result);

            }
        });
    });
}


const findTask = (taskId, cb) => {

    // typeof taskId ObjectId
    mongoClient.connect(url, (err, client) => {
        
        let db = client.db(dbName);
        db.collection(collection).findOne({_id: new ObjectID(taskId)}, (err, result)=>{
            
            if(err) {console.log(err); cb(err);}
            
            else {
                cb(null, result);
            }
        })
    });

}



const addTask = (task, cb) =>{

    //check if all fields are filled correctly (FE and BE)

    if(!task.title || !task.description || !task.date) {
        console.log("some fields missing");
    }
    if(!task.finished) {
        task.finished = false;
    }
    let datePieces = task.date.split("-");
    // supported date formats in Javascript: YYYY-MM-DD or MM/DD/YYYY or 25 Mar 2015 or Mar 25 2015
    
    let newDate = datePieces[2]  + "-" + datePieces[1] + "-" + datePieces[0];
    task.date = Number(new Date(newDate));

    console.log("task to be added:", task);
    mongoClient.connect(url, (err, client) => {

        let db = client.db(dbName);
        db.collection(collection).insertOne(task, (err, result) => {

            if(err) {
                console.log("Error in inserting task");
                cb(err);}
            else {console.log("task inserted successfullly");
                cb(null, "Successfully added the task");}
        });
    });


}

module.exports = {insertTasksToDB, findAllTasks, findTask, addTask}