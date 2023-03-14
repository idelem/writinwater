const express = require("express");
const axios = require("axios");
const cors = require('cors');
const env = require('./env.json');

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${env.clientID}&client_secret=${env.clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;
    res.send({accessToken: accessToken});
  });
});

// app.use(express.static(__dirname + "/public"));
app.listen(env.port);