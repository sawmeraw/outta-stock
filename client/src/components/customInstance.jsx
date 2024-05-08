import axios from "axios";

const fetchData = axios.create({
  baseURL: "https://outta-stock-t62a.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
});

export default fetchData;
