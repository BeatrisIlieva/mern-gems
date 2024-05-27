const ZIP_CODE_LENGTH = {
  MIN: 5,
  MAX: 15,
};

export const ZIP_CODE_PATTERN = `^[\w\s\d-]{${ZIP_CODE_LENGTH.MIN},${ZIP_CODE_LENGTH.MAX}}$`;
export const ZIP_CODE_ERROR_MESSAGE = `This field requires ${ZIP_CODE_LENGTH.MIN}-${ZIP_CODE_LENGTH.MAX} characters`;
