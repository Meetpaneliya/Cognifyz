const express = require('express');
const cors = require('cors');
const fetch = (...args) =>
     import('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');


const CLIENT_SECRET = '485235fc0b1b802af701095bb2481ae108b6b98d';
const CLIENT_ID = 'Ov23lipqOn9CfpaozZfZ';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req,res) {

    console.log(req.query.code);
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
});

//getUserData
// access token is going to be passed in as an Authorization header

app.get('/getUserData', async function(req,res) {
    req.get("Authorization"); //Bearer ACCESSTOKEN
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
})

app.listen(4000, function () {
    console.log('Server is running on port 4000');
})