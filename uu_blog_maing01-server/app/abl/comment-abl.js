"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/comment-error.js");

const Warnings = require("../api/warnings/comment-warnings.js")

class CommentAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("comment");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("CommentCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    const uuIdentity = session.getIdentity().getUuIdentity();

    const uuObject = {
      awid,
      postId: dtoIn.postId,
      text: dtoIn.text,
      creatorIdentity: uuIdentity,
    };

    const comment = await this.dao.create(uuObject);

    const dtoOut = { ...comment, uuAppErrorMap };
    return dtoOut;
  
  }

}

module.exports = new CommentAbl();
