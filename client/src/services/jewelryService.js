import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/jewelry`;

export const addressInformationServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: (categoryId) => request.get(`${baseUrl}/${categoryId}`),
  };
};
