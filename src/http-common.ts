import axios from "axios";
export default axios.create({
  baseURL: "https://fakerestapi.azurewebsites.net/api/v1/Users",
  headers: {
    "Content-type": "application/json"
  }
});