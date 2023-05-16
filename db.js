const mongoose = require("mongoose");
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });
