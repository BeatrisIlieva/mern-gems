import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/jewelry`;

export const jewelryServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: (categoryId, skip, limit) =>
      request.get(`${baseUrl}/by-category/${categoryId}/${skip}/${limit}`),
      // request.get(`${baseUrl}/by-category/&categoryId=${categoryId}&skip=${skip}&limit=${limit}`),
      // request.get(`${baseUrl}/by-category/${categoryId}/${skip}/`),

    findOne: (jewelryId) => request.get(`${baseUrl}/by-jewelry/${jewelryId}`),
  };
};
