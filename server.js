const express = require('express'),
      app = express(),
      port = 1337,
    //   mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      todoRoutes = require('./routes/todos');


app.use(bodyParser.json()) //before app.use routes!
app.use(bodyParser.urlencoded({ extended: true })); //before app.use routes!
app.use('/api/todos', todoRoutes);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', function(req, res){
    res.sendFile("index.html");
})




app.listen(port, function() { console.log("listening on port 1337");});
// app.listen(process.env.PORT, function(){
//     console.log("app is running");
// })