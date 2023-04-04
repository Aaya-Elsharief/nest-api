export const ErrorCodes = {
  INVALID_PARAMS: {
    code: 'INVALID_PARAMS',
    message: {
      en: 'INVALID_PARAMS',
      ar: 'قيم غير متوقعة',
    },
    fields: {},
  },

  UNEXPECTED_ERROR: {
    code: 'UNEXPECTED_ERROR',
    message: {
      en: 'Unexpected error, try again later',
      ar: 'حدثت مشكلة غير متوقعة، يرجى المحاولة لاحقاً',
    },
  },
  UNAUTHORIZED_ERROR: {
    code: 'UNAUTHORIZED_ERROR',
    message: {
      en: 'unauth',
      ar: ' يرجى المحاولة لاحقاً',
    },
  },
  UNSUPPORTED_FILE_EXT: {
    code: 'UNSUPPORTED_FILE_EXT',
    message: {
      en: 'Invalid file type.',
      ar: 'امتداد ملف غير مسموح به',
    },
  },
  LIMIT_FILE_SIZE: {
    code: 'LIMIT_FILE_SIZE',
    message: {
      en: 'Invalid files size',
      ar: 'عدد ملفات غير مسموح به',
    },
  },
};
