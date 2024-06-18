import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/order-confirmation`;

export const orderConfirmationServiceFactory = (token) => {
  const request = requestFactory(token);

  const display = async (userId) => {
    const { order, address } = await request.get(
      `${baseUrl}/display/${userId}`
    );

    return { order, address };
  };

  return { display };
};
