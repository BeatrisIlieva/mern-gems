import { requestFactory } from "./requester";

const baseUrl = `${HOST}/bag`;

export const bagServiceFactory = (token) => {
  const request = requestFactory(token);

  const userId = localStorage.getItem("userUUID");

  return {
    create: (data, jewelryId) =>
      request.post(`${baseUrl}/create/${jewelryId}`, data),

    findAll: () => request.get(`${baseUrl}/find-all/${userId}`),

    findCount: () => request.get(`${baseUrl}/find-count`),

    decrease: (bagId) => request.put(`${baseUrl}/decrease/${bagId}`),

    increase: (bagId) => request.put(`${baseUrl}/increase/${bagId}`),

    update: (bagId, quantity) =>
      request.put(`${baseUrl}/update/${bagId}`, quantity),

    delete: (bagId) => request.delete(`${baseUrl}/delete/${bagId}`),
  };
};
