import axios from "axios";

const fetchData = axios.create({
  baseURL: "https://outta-stock-t62a.vercel.app/api",
});

export default fetchData;
