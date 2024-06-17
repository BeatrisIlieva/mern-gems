import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/complete-order`;

export const completeOrderServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    update: (userId, data) => request.put(`${baseUrl}/update/${userId}`, data),
  };
};
