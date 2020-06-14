let axios = require("axios");

const fetchList = ()=>{
    return axios.get("/api/list").then(listData=>{
        console.log("in get from axios", listData);

        return listData.data;
    }).catch(e=>console.log(e))
}


module.exports = fetchList;