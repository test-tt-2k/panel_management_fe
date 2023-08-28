import { request } from "./request";

export const login = async payload => {
  return request.post("member/login", payload);
};
