import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/bag`;

export const bagServiceFactory = (token) => {
  const request = requestFactory(token);

  // const userId = localStorage.getItem("userUUID");

  return {
    create: (data, jewelryId) =>
      request.post(`${baseUrl}/create/${jewelryId}`, data),

    findAll: (userId) => request.get(`${baseUrl}/find-all/${userId}`),

    findCount: () => request.get(`${baseUrl}/find-count`),

    decrease: (bagId) => request.put(`${baseUrl}/decrease/${bagId}`),

    increase: (bagId) => request.put(`${baseUrl}/increase/${bagId}`),

    update: (bagId, quantity) =>
      request.put(`${baseUrl}/update/${bagId}`, quantity),

    delete: (bagId) => request.delete(`${baseUrl}/delete/${bagId}`),
  };
};



// export const bagServiceFactory = (token) => {
//   const request = requestFactory(token);

  

//   const create = async (data, jewelryId) => {
//     await request.post(`${baseUrl}/create/${jewelryId}`, data);
//   };

//   const findAll = async (userId) => {
//     const items = await request.get(`${baseUrl}/find-all/${userId}`);

//     return items;
//   };

//   const findCount = async () => {
//     const count = request.get(`${baseUrl}/find-count`);

//     return count;
//   };

//   const decrease = async (bagId) => {
//     await request.put(`${baseUrl}/decrease/${bagId}`);
//   };

//   const increase = async (bagId) => {
//     await request.put(`${baseUrl}/increase/${bagId}`);
//   };

//   const update = async (bagId, quantity) => {
//     await request.put(`${baseUrl}/update/${bagId}`, quantity);
//   };

//   const remove = async (bagId) => {
//     await request.delete(`${baseUrl}/delete/${bagId}`);
//   };

//   return { create, findAll, findCount, decrease, increase, update, remove };
// };
