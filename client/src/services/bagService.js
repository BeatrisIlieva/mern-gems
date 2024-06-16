import { requestFactory } from "./requester";

const baseUrl = `${HOST}/bag`;

export const bagServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    create: (data, jewelryId) =>
      request.post(`${baseUrl}/create/${jewelryId}`, data),

    findAll: (userId) => request.get(`${baseUrl}/find-all/${userId}`),

    decrease: (bagId) => request.put(`${baseUrl}/decrease/${bagId}`),

    increase: (bagId) => request.put(`${baseUrl}/increase/${bagId}`),

    update: (bagId, quantity) =>
      request.put(`${baseUrl}/update/${bagId}`, quantity),

    delete: (bagId) => request.delete(`${baseUrl}/delete/${bagId}`),
  };
};
