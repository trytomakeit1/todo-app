let axios = require("axios");

const fetchList = () => {
    return axios.get("/api/list").then(listData => {
        console.log("in get from axios", listData);

        return listData.data;
    }).catch(e=>console.error(e))
}



const fetchTask = (taskId) => {

    return axios.get(`/api/task/${taskId}`).then(data => {
        console.log("data of you", data.data);
        return data.data;
    }).catch(e=>console.error(e))
}


module.exports = {fetchList, fetchTask}