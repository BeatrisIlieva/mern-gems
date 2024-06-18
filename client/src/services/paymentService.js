import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/complete-transaction`;

export const completeCheckoutServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    confirm: (userId, data) => request.post(`${baseUrl}/${userId}`, data),
  };
};
