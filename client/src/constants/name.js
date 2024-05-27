const NAME_LENGTH = {
  MIN: 2,
  MAX: 255,
};

export const NAME_PATTERN = `^[A-Za-z]{${NAME_LENGTH.MIN},${NAME_LENGTH.MAX}}$`;
export const NAME_ERROR_MESSAGE = `This field requires ${NAME_LENGTH.MIN}-${NAME_LENGTH.MAX} letters`;
