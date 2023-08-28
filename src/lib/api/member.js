import { request } from "./request";

export const createMember = async payload => {
  return request.post("member", payload);
};

export const listMember = () => {
  return request.get("member");
};

export const deleteMember = id => {
  return request.delete("member/" + id);
};
