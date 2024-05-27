const PASSWORD_LENGTH = {
  MIN: 2,
  MAX: 255,
};

export const PASSWORD_PATTERN = `^(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[0-9]{1})[A-Za-z\d]{${PASSWORD_LENGTH.MIN},${PASSWORD_LENGTH.MAX}}$`;

export const PASSWORD_ERROR_MESSAGE = `Password must be ${PASSWORD_LENGTH.MIN}-${PASSWORD_LENGTH.MAX}} characters and include at least one lowercase letter, one uppercase letter, and one digit.`;
