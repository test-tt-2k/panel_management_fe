import { request } from "./request";

export const createData = async payload => {
  return request.post("data", payload);
};

export const listData = date => {
  return request.get("data?date=" + date);
};

export const deleteData = id => {
  return request.delete("data/" + id);
};

export const getDetail = id => {
  return request.get("data/" + id);
};

export const updateData = async (id, payload) => {
  return request.put("data/" + id, payload);
};
