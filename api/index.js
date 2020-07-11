let axios = require("axios");

const fetchList = (cb) => {
    return axios.get("/api/list").then(listData => {
        
        if(listData.data && listData.data != "") {
            if(listData.data.error && listData.data.error !== "") {
                cb(listData.data.error);

            } else {
                cb(null, listData.data.result);

            }
        } else {
           cb("No response was returned from the api");

        }
    }).catch(e => {
            cb("Error-There was a problem calling api/list" + e);

        })
}



const fetchTask = (taskId,cb) => {

    return axios.get(`/api/task/${taskId}`).then(taskData => {

        if(taskData.data && taskData.data != "") {
            if(taskData.data.error && taskData.data.error !== "") {
                cb(taskData.data.error);

            } else {
                cb(null, taskData.data.result);

            }
        } else {
           cb("No response was returned from the api");

        }
    }).catch(e=>cb("Error-There was a problem calling api/task" + e))
}



const addTask = (newTask,cb) => {

    return axios.post('/api/insertTask', {newTask}).then((result) => {
        // result is just a string that says :Successfully added the task
        if(result.data && result.data != "") {
            if(result.data.error && result.data.error !== "") {
                cb(result.data.error);

            } else {
                cb(null, result.data.result);

            }
        } else {
           cb("No response was returned from the api");

        }
    }).catch(e =>{

        cb("Error-There was a problem calling api/insertTask" + e);
    })

}

const updateTask = (taskId, editedTask, cb) => {

    return axios.post(`/api/updateTask/${taskId}`, {editedTask})
    .then((result) => {
        
        if(result.data && result.data != "") {
            if(result.data.error && result.data.error !== "") {
                cb(result.data.error);

            } else {
                cb(null, result.data.result);

            }
        } else {
           cb("No response was returned from the api");

        }
    })
    .catch(e=>cb("Error-There was a problem calling api/updateTask" + e));

}

module.exports = {fetchList, fetchTask, addTask, updateTask}