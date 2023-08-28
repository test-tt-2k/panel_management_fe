import Axios from "axios";

const baseURL = "http://45.32.103.75:8800/api/v1/";

export const request = Axios.create({
  baseURL,
});
