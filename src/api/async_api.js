const axios = require('axios');
const API_URI = 'https://xxx';

export default {
  putData(data) {
    axios.put(API_URI + "data.json", data);
  },
  getData() {
    return axios.get(API_URI + "data.json");
  }
};
