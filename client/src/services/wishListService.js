import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/wishlist`;

export const wishlistServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: () => request.get(`${baseUrl}/find-all`),

    create: (jewelryId) => request.post(`${baseUrl}/create/${jewelryId}`),

    delete: (jewelryId) => request.delete(`${baseUrl}/delete/${jewelryId}`),
  };
};
