var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req, res){
    res.sendFile('./index.html');
});

app.get('/getdata',function(req,res,next){
    var data = fs.readFileSync('data.json','utf8');  
    var data1=  JSON.parse(data);
    console.log(data1);
    res.send(data1);
});

app.post('/postdata', (req, res) => {
    // you have address available in req.body:
    console.log(req.body);
    // write to json file
    fs.writeFile("data.json",(JSON.stringify(req.body.data)),(err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
  });
  

app.listen(port,function(){
    console.log("Express server listening on: " +port);   
});



 