import axios from "axios";

const ServiceAPI = axios.create({
  baseURL: "https://devtest.teskalabs.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ServiceAPI;
