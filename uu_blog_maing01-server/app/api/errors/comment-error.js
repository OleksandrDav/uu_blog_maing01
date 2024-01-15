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

const Delete = {
  UC_CODE: `${COMMENT_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserNotAuthorized: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  CommentDoesNotExist: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}commentDoesNotExist`;
      this.message = "post does not exist.";
    }
  },
};

const List = {
  UC_CODE: `${COMMENT_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${COMMENT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CommentDoesNotExist: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}commentDoesNotExist`;
      this.message = "comment does not exist.";
    }
  },
};

module.exports = {
  Get,
  List,
  Delete,
  Create
};
