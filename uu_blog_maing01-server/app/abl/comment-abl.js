"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/comment-error.js");
const PostErrors = require("../api/errors/post-error.js");
const PostAbl = require("./post-abl.js");

const Warnings = require("../api/warnings/comment-warnings.js")

const DEFAULTS = {
  pageIndex: 0,
  pageSize: 100,
};


class CommentAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("comment");
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("CommentGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    const comment = await this.dao.get(awid, dtoIn.id);
    if (!comment) {
      // 3.1
      throw new Errors.Get.CommentDoesNotExist(uuAppErrorMap, { commentId: dtoIn.id });
    }

    const dtoOut = {
      ...comment,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("CommentListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    const comments = await this.dao.list(awid, dtoIn.postId, dtoIn.pageInfo);

    const dtoOut = {
      comments,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("CommentDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    
    const uuIdentity = session.getIdentity().getUuIdentity();

    const comment = await this.dao.get(awid, dtoIn.id);
    if (!comment) {
      // 3.1
      throw new Errors.Delete.CommentDoesNotExist({ uuAppErrorMap }, { commentId: dtoIn.id });
    }
    console.log(comment);

    const post = await PostAbl.dao.get(awid, comment.postId);
    if (!post) {
      // 3.1
      throw new PostErrors.Delete.PostDoesNotExist({ uuAppErrorMap }, { postId: comment.postId });
    }
    
    if (uuIdentity !== comment.creatorIdentity
      && !authorizationResult.getIdentityProfiles().includes('Authorities')
      && !authorizationResult.getIdentityProfiles().includes('Executives')) {
      throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap })
    }

    await this.dao.delete(awid, dtoIn.id);

    const dtoOut = {
      comment,
      uuAppErrorMap,
    };

    return dtoOut;
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
    
    if (!authorizationResult.getIdentityProfiles().includes('StandardUsers')
      && !authorizationResult.getIdentityProfiles().includes('Authorities')) {
      throw new Errors.Create.UserNotAuthorized({ uuAppErrorMap })
    }

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
