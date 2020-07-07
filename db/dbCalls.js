let mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'todo';
const collection = 'tasks';

const tasksToInsert = [{
    "title": "first note",
    "description": "this is my first task to do",
    "date": "12/05/2018",
    "finished": true
    },
    {
    "title": "second note",
    "description": "this is my second task to do",
    "date": "31/12/2019",
    "finished": false
}];

const insertTasksToDB = () => {

    mongoClient.connect(url, (err, client) => {

        if(err) 
            console.error("Error-dbCalls-insertTasksToDB: problem connecting to DB while adding tasks. error:", err); 

        else {
            let db = client.db(dbName);
            //insert data to tasks collection

            db.collection(collection).insertMany(tasksToInsert,
                (err, result) => {
                    if(err) {
                        console.error("Error-dbCalls-findAllTasks: problem finding tasks list. error:", err); 
                        //TODO
                        client.close();
                    }
                    console.log("Tasks inserted successfully", result);

            });
        }
    })
}



const findAllTasks = (cb) => {

    mongoClient.connect(url, (err, client) =>{

        if(err) {console.error("Error-dbCalls-findAllTasks: problem connecting to DB while fetching tasks. error:", err); 
            cb("*Error: an error occured while fetching the tasks.");

        }

        let databaseName = client.db(dbName);
        databaseName.collection(collection).find({}).toArray(function(err,result) {
            if(err) {console.error("Error-dbCalls-findAllTasks: problem finding tasks list. error:", err); 
                cb("*Error: an error occured while fetching the tasks.");

            } else {
                cb(null, result);

            }
        });
    });
}


const findTask = (taskId, cb) => {

    if(!taskId) {
        console.log("Error-dbCalls-findTask: missing taskId:", taskId);
        cb("*Error: can not fetch the details.");
    
    }
    // typeof taskId ObjectId
    mongoClient.connect(url, (err, client) => {

        if(err) {console.error("Error-dbCalls-findTask: problem connecting to DB while fetching details of taskId:", taskId, " error:", err); 
            cb("*Error: an error occured while fetching the details");
        }
        
        let db = client.db(dbName);
        db.collection(collection).findOne({_id: new ObjectID(taskId)}, (err, result)=>{
            
            if(err) {console.error("Error-dbCalls-findTask: problem finding details of taskId:", taskId, " error:", err); 
                cb("*Error: an error occured while fetching the details");

            } else {
                cb(null, result);
            }
        })
    });

}



const addTask = (task, cb) =>{

    if(!task.title || !task.description || !task.date) {

        console.log("Error-dbCalls-addTask: missing fields in inserting task:", task);
        cb("*Error: can not add the new task. some fields are missing.");
    }
    if(!task.finished) {
        task.finished = false;
    }

    mongoClient.connect(url, (err, client) => {

        if(err) {
            console.error("Error-dbCalls-addTask: problem connecting to DB while inserting task:", task, " error:", err);
            cb("*Error: an error occured while adding the task");
        }
        let db = client.db(dbName);
        db.collection(collection).insertOne(task, (err, result) => {

            if(err) {
                console.error("Error-dbCalls-addTask: problem inserting task:", task, " error:", err);
                cb("*Error: an error occured while adding the task");
            }
            else 
                cb(null, "Successfully added the task");
        });
    });


}


const updateTask = (taskId, editedTask, cb) =>{

    if(!editedTask.title || !editedTask.description || !editedTask.date) {

        if(err) {console.log("Error-dbCalls-updateTask: missing fields in updating task:", taskId, " error:" , err); 
            cb("*Error: can not update the task. some fields are missing.");

        }
    }
    if(!editedTask.finished) {
        editedTask.finished = false;
    }

    mongoClient.connect(url, (err, client) => {
        
        if(err) {console.error("Error-dbCalls-updateTask: problem connecting to DB while updating task:", taskId, " error:", err); 
            cb("*Error: an error occured while updating the task.");

        }

        let db = client.db(dbName);
        db.collection(collection).updateOne({"_id": new ObjectID(taskId)}, {$set: editedTask}, (err, result) => {
            if(err) {console.error("Error-dbCalls-updateTask: problem updating task:", taskId, " error:", err); 
                cb("*Error: an error occured while updating the task.");

            }else{
                    cb(null, "Successfully updated the task")
            }
        });
    });

}

module.exports = {insertTasksToDB, findAllTasks, findTask, addTask, updateTask}