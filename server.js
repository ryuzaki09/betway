const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signIn", async (req, res) => {
  const { body } = req;
  const { data } = await axios.post(
    "https://fn-uks-dev-eng-fe-mock-svc.azurewebsites.net/api/sign-in",
    body
  );

  res.send(data);
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`API Server listening on ${PORT}`);
});
