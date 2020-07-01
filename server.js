let express = require('express');
let api = require("./api/api");
let app = express();


let bodyParser = require('body-parser');
let {insertTasksToDB} = require("./db/dbcalls");
app.use(express.static("public")); // need this line to read my assets from
app.set("view engine", "ejs");
app.get("/", (req,res)=>{
    res.render("index");
})


app.use(bodyParser.json());

app.use("/api", api);

app.use("/insertTasksToDB", insertTasksToDB);


app.listen(8080, ()=>{
    console.log("Listening to port 8080");
});


