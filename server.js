let express = require('express');

let app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req,res)=>{
    res.render("index");
})

app.listen(8080, ()=>{
    console.log("Listening to port 8080");
});

