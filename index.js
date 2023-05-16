const express = require('express')
const app = express()
const bodyParser = require("body-parser");

const adddata = require("./AddData");
const fileUpload = require("express-fileupload");
const createfolder = require("./makefolder");
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
});
app.get("/city_list", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  const data = await adddata.distinct("city");
  res.status(200).json(data);
});
app.listen(process.env.PORT || 3000)
