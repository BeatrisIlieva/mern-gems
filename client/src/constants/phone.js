const PHONE_LENGTH = {
  MIN: 7,
  MAX: 15,
};

export const PHONE_PATTERN = `^[0-9]{${PHONE_LENGTH.MIN},${PHONE_LENGTH.MAX}}$`;
export const PHONE_ERROR_MESSAGE = `This field requires ${PHONE_LENGTH.MIN}-${PHONE_LENGTH.MAX} digits`;
