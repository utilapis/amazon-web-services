const axios = require("axios");

const url = "<URL>";

const body = {
  key1: 5,
  key2: 4,
};

async function callLambda() {
  try {
    const response = await axios.post(url, body);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

callLambda();