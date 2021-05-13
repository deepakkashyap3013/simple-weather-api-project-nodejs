const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended : true}));

const endpoint ='https://api.openweathermap.org/data/2.5/weather';
const id='7a9ef89939327119afbe31687a81f769'


app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");   
});

app.post("/",(req,res)=>{
    // console.log("post received");
    let query = req.body.CityName;
    let unit = 'metric';
    let url = endpoint+'?q='+query+'&units='+unit+'&appid='+id;
    https.get(url,(response)=>{
        response.on('data',(data)=>{
            let weatherData = JSON.parse(data);
            // console.log(weatherData);
            let temperature = weatherData['main']['temp'];
            let weatherDescription = weatherData['weather'][0]['description'];
            let icon = weatherData['weather'][0]['icon'];
            let imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";        
            res.write('<h1>The temperature in '+query+' is '+temperature+' and the weather is likely to be '+weatherDescription+'</h1>');
            res.write("<img src="+imageURL+">");
            res.send();

        });
    });

});



app.listen(3000,()=>{
    console.log("Server is up and running on port 3000");
});