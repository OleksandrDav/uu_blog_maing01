"use strict";

const BlogMainUseCaseError = require("./blog-main-use-case-error.js");
const COMMENT_ERROR_PREFIX = `${BlogMainUseCaseError.ERROR_PREFIX}comment/`;

const Create = {
  UC_CODE: `${COMMENT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserNotAuthorized: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
};

module.exports = {
  Create
};
