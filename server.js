let express = require('express');
let api = require("./api/api");
let app = express();


app.use(express.static("public")); // need this line to read my assets from
app.set("view engine", "ejs");
app.get("/", (req,res)=>{
    res.render("index");
})


app.use("/api", api);


app.listen(8080, ()=>{
    console.log("Listening to port 8080");
});

