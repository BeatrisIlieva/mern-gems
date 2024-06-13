import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/jewelry`;

export const jewelryServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: (categoryId) =>
      request.get(`${baseUrl}/by-category/${categoryId}`),

    findStoneTypes: (serializedObject) =>
      request.get(
        `${baseUrl}/by-stone-types?data=${encodeURIComponent(serializedObject)}`
      ),

    findStoneColors: (serializedObject) =>
      request.get(
        `${baseUrl}/by-stone-colors?data=${encodeURIComponent(
          serializedObject
        )}`
      ),

    findOne: (jewelryId) => request.get(`${baseUrl}/by-jewelry/${jewelryId}`),
  };
};
