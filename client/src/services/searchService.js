import { requestFactory } from "./requester";

import { HOST } from "../constants/host";

const baseUrl = `${HOST}/search`;

export const searchServiceFactory = (token) => {
  const request = requestFactory(token);

  const user = localStorage.getItem("userUUID");

  const display = async (query) => {
    const jewelries = await request.get(
      `${baseUrl}/display/${user}?query=${query}`
    );

    return jewelries;
  };

  return { display };
};
