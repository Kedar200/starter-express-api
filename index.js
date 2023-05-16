const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
});
app.get("/city_list", async function (req, res) {
  res.send("Data Here");
});
app.listen(process.env.PORT || 3000)
