import { request } from "./request";

export const sendData = (url, data) => {
  return request.post(url, data);
};
