import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/collection`;

export const jewelryCollectionServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: (collectionId) => request.get(`${baseUrl}/${collectionId}`),

    // findStoneTypes: (serializedObject) =>
    //   request.get(
    //     `${baseUrl}/by-stone-types?data=${encodeURIComponent(serializedObject)}`
    //   ),

    // findStoneColors: (serializedObject) =>
    //   request.get(
    //     `${baseUrl}/by-stone-colors?data=${encodeURIComponent(
    //       serializedObject
    //     )}`
    //   ),
  };
};
