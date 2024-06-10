import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/wishlist`;

export const wishlistServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: (id = null, skip, limit) => request.get(`${baseUrl}/find-all/${skip}/${limit}`),
    findCount: () => request.get(`${baseUrl}/find-count`),


    create: (jewelryId) => request.post(`${baseUrl}/create/${jewelryId}`),

    delete: (jewelryId) => request.delete(`${baseUrl}/delete/${jewelryId}`),
  };
};
