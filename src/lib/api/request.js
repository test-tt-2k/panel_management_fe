import Axios from "axios";

const baseURL = "http://localhost:8800/api/v1/";

export const request = Axios.create({
  baseURL,
});
