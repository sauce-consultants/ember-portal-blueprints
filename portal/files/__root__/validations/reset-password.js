import {
  validateConfirmation,
  validateLength,
  validatePresence,
} from "ember-changeset-validations/validators";

export default {
  password: [
    validatePresence(true),
    validateLength({
      min: 8,
      max: 255,
    }),
  ],
  passwordConfirmation: [
    validatePresence(true),
    validateLength({
      min: 8,
      max: 255,
    }),
    validateConfirmation({ on: "password" }),
  ],
};
