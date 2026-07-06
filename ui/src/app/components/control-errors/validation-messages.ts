export const ValidationMessages: { [key: string]: (args: any) => string } = {
  required: () => 'This field is required.',
  email: () => 'Please enter a valid email address.',
  minlength: (args) => `Minimum length is ${args.requiredLength} characters.`,
  maxlength: (args) => `Maximum length is ${args.requiredLength} characters.`,
  pattern: () => 'Invalid format provided.',
  customError: (args) => args.message || 'Invalid input.',
};
