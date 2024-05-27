const STREET_LENGTH = {
  MIN: 8,
  MAX: 255,
};

export const STREET_PATTERN = `^[a-zA-z0-9]{${STREET_LENGTH.MIN},${STREET_LENGTH.MAX}}$`;
export const STREET_ERROR_MESSAGE = `This field requires ${STREET_LENGTH.MIN}-${STREET_LENGTH.MAX} characters`;
