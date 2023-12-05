"use strict";

const BlogMainUseCaseError = require("./blog-main-use-case-error.js");
const POST_ERROR_PREFIX = `${BlogMainUseCaseError.ERROR_PREFIX}post/`;

const Create = {
  UC_CODE: `${POST_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Delete = {
  UC_CODE: `${POST_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PostMainDoesNotExist: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}postMainDoesNotExist`;
      this.message = "UuObject postMain does not exist.";
    }
  },
  PostMainNotInCorrectState: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}postMainNotInCorrectState`;
      this.message = "UuObject postMain is not in correct state.";
    }
  },
  PostDoesNotExist: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}postDoesNotExist`;
      this.message = "Post does not exist.";
    }
  },
};

const Get = {
  UC_CODE: `${POST_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PostMainDoesNotExist: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}postMainDoesNotExist`;
      this.message = "UuObject postMain does not exist.";
    }
  },
  PostMainNotInCorrectState: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}postMainNotInCorrectState`;
      this.message = "UuObject postMain is not in correct state.";
    }
  },
  PostDoesNotExist: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}postDoesNotExist`;
      this.message = "post does not exist.";
    }
  },
};

const Update = {
  UC_CODE: `${POST_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PostMainDoesNotExist: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}postMainDoesNotExist`;
      this.message = "UuObject postMain does not exist.";
    }
  },
  PostMainNotInCorrectState: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}postMainNotInCorrectState`;
      this.message = "UuObject postMain is not in correct state.";
    }
  },
  PostDoesNotExist: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}postDoesNotExist`;
      this.message = "post does not exist.";
    }
  },
};

const List = {
  UC_CODE: `${POST_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends BlogMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Update,
  Get,
  Delete,
  Create
};
