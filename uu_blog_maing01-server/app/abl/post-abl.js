"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/post-error.js");
const { BinaryComponent } = require("uu_appbinarystoreg02");

const Warnings = require("../api/warnings/post-warnings.js")

class PostAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("post");
    this.binaryComponent = new BinaryComponent();
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("PostGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    const post = await this.dao.get(awid, dtoIn.id);
    if (!post) {
      // 3.1
      throw new Errors.Get.PostDoesNotExist(uuAppErrorMap, { postId: dtoIn.id });
    }

    const dtoOut = {
      ...post,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("PostDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    const post = await this.dao.get(awid, dtoIn.id);
    if (!post) {
      // 3.1
      throw new Errors.Delete.PostDoesNotExist({ uuAppErrorMap }, { postId: dtoIn.id });
    }
    if (post.imageCode) {
      await this.binaryComponent.delete(awid, {
        awid: awid,
        code: post.imageCode
      });
    }

    await this.dao.delete(awid, dtoIn.id);

    const dtoOut = {
      post,
      uuAppErrorMap,
    };

    return dtoOut;

  }

  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("PostCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    let imageCode;
    if (dtoIn.image) {
      const uuBinary = await this.binaryComponent.create(awid, {
        data: dtoIn.image,
        filename: dtoIn.image.filename,
        contentType: dtoIn.image.contentType,
      });

      imageCode = uuBinary.code;
    }

    const uuObject = {
      awid,
      title: dtoIn.title,
      postText: dtoIn.postText,
      imageCode,
      creatorIdentity: uuIdentity,
      creatorName: uuIdentityName,
      totalViews: 0
    };

    const post = await this.dao.create(uuObject);

    const dtoOut = { ...post, uuAppErrorMap };
    return dtoOut;
  }

}

module.exports = new PostAbl();
