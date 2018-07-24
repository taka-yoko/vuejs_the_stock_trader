const axios = require('axios');
const API_URI = 'https://vuejs-stock-trader-782d3.firebaseio.com/';

export default {
  putData(data) {
    axios.put(API_URI + "data.json", data);
  },
  getData() {
    axios.get(API_URI + "data.json");
  }
};
