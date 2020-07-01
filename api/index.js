let axios = require("axios");

const fetchList = () => {
    return axios.get("/api/list").then(listData => {

        return listData.data;
    }).catch(e=>console.error(e))
}



const fetchTask = (taskId) => {

    return axios.get(`/api/task/${taskId}`).then(taskData => {

        return taskData.data;
    }).catch(e=>console.error(e))
}



const addTask = (newTask) => {

    return axios.post('/api/insertTask', {newTask}).then((result) => {
        // result is just a string that says :Successfully added the task
        if(result)
            return result;
    }).catch(err =>{

        console.error(err);
    })

}

const updateTask = (taskId, editedTask) => {
    console.log(" index js ", taskId, editedTask);
    return axios.post(`/api/updateTask/${taskId}`, {editedTask})
    .then((result) => {
        console.log(result);
        return result;
    })
    .catch(e=>console.error(e));

}

module.exports = {fetchList, fetchTask, addTask, updateTask}