var express = require("express");
var app = express();
const bodyParser = require("body-parser");

const adddata = require("./AddData");
const fileUpload = require("express-fileupload");
const createfolder = require("./makefolder");

var ObjectId = require("mongodb").ObjectId;
app.use(express.json());
require("./db");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.get("/", async function (req, res) {
  res.send("req");
});

app.get("/city_list", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  const data = await adddata.distinct("city");
  res.status(200).json(data);
});

app.get("/getData", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  var query = require("url").parse(req.url, true).query;

  const data = await adddata.find({ city: query.city });
  console.log(data);

  res.json(data);
});

app.get("/getData2", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  var query = require("url").parse(req.url, true).query;
  var o_id = new ObjectId(query.flat);
  const data = await adddata.find({
    _id: o_id,
  });

  res.json(data);
});

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },

    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.post("/postData", async function (req, res) {
  const t = req.files.images;
  const array = [];
  t.forEach((e) => {
    array.push(e.name);
  });
  createfolder(req.body.name);
  images = req.files.images;
  try {
    const data = new adddata({
      name: req.body.name,
      phone_number: req.body.phone_number,
      street_name: req.body.street_name,
      area: req.body.area,
      city: req.body.city,
      state: req.body.state,
      furnished_status: req.body.furnished_status,
      rent: req.body.rent,
      image: array,
    });
    console.log(data);
    data.save();
    t.forEach((e) => {
      uploadPath = __dirname + "/Public/Images/" + req.body.name + "/" + e.name;
      e.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    });
    res.send("okay");
  } catch (error) {
    res.status(500).send("error");
  }
});

app.post("*", function (req, res) {
  res.send("You have posted a wrong Request", 404);
});

app.listen(80, () => {
  console.log("Server listening on port 80");
});
