export type VInput = Vue & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};