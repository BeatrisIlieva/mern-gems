import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/complete-order`;

export const completeOrderServiceFactory = (token) => {
  const request = requestFactory(token);

  const update = async (userId, data) => {
    const addressBook = await request.put(`${baseUrl}/update/${userId}`, data);

    return addressBook;
  };

  return { update };
};
