export const ValidationErrorCodes = {
  isNumber: {
    en: 'must be a number',
    ar: 'يجب أن يكون رقم',
  },
  isString: {
    en: 'must be a string',
    ar: 'يجب أن يكون نص',
  },
  isNotEmpty: {
    en: 'must not be empty',
    ar: 'يجب أن لا يكون فارغاً',
  },
  max: {
    en: 'must be less than or equal to $constraint1 characters',
    ar: 'يجب أن يكون أقل من أو يساوي $constraint1 حروفاً',
  },
  min: {
    en: 'must be at least $constraint1 characters',
    ar: 'يجب أن يكون على الأقل $constraint1 حروفاً',
  },
  isPositive: {
    en: 'must be a positive number',
    ar: 'يجب أن يكون رقماً موجباً',
  },
  isEmail: {
    en: 'must be a valid email address',
    ar: 'يجب أن يكون عنوان بريد إلكتروني صحيح',
  },
  IsUniqueUsername: {
    en: 'Username already exist',
    ar: 'اسم المستخدم موجود مسبقاً',
  },
  IsUniqueEmail: {
    en: 'Email already exist',
    ar: 'الإيميل موجود من قبل',
  },
  IsExistEmail: {
    en: 'Email not exist',
    ar: 'الإيميل غير موجود  ',
  },
  IsValidPassword: {
    en: 'Password is not correct',
    ar: 'كلمة المرور غير صحيحة',
  },
  matches: {
    en: 'must match some regular expression',
    ar: 'يجب إدخال كلمة مرور مناسبة',
  },
  IsMatchPassword: {
    en: 'confirm Password not match',
    ar: 'يجب إدخال كلمة المرور صحيحة للتأكد',
  },
  IsUniqueTitle: {
    en: 'Title already exist',
    ar: 'العنوان موجود من قبل',
  },
  isLength: {
    en: 'must be longer than or equal to $constraint1  characters',
    ar: 'يجب أن تكون $constraint1  أطول من أو تساوي $constraint1  أحرف',
  },
  isEnum: {
    en: 'The parameter must be one of the allowed values',
    ar: 'يجب أن تكون القيمة إحدى القيم المسموح بها',
  },
  isValidDate: {
    en: 'The parameter must be one of the allowed values',
    ar: 'يجب أن تكون القيمة إحدى القيم المسموح بها',
  },
  isMongoId: { en: 'must be a mongodb id', ar: 'يجب أن يكون قيمة صحيحة' },
  isInstance: { en: 'must be an instance', ar: 'يجب أن يكون من النوع الصحيح' },
  isValidImgType: {
    en: 'Invalid file type. Only JPEG and PNG images are allowed.',
    ar: 'JPG و JPEG ,PNG  نوع ملف غير مسموح به, فقط مسموح ب: ',
  },
  // isValidDocType: {
  //   en: 'Invalid file type. Only .txt, .pdf, .doc, .docx, etc. are allowed.',
  //   ar: '.txt, .pdf, .doc, .docx نوع ملف غير مسموح به, مسموح ب: ',
  // },
  FileRequired: {
    en: 'File is required',
    ar: 'الملف مطلوب',
  },
  FieldName: {
    en: 'Field name missing',
    ar: 'يجب إدخال اسم الحقل',
  },
};
