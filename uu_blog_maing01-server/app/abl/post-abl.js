"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/post-error.js");
const { BinaryComponent } = require("uu_appbinarystoreg02");

const Warnings = require("../api/warnings/post-warnings.js")

const DEFAULTS = {
  pageIndex: 0,
  pageSize: 100,
};

class PostAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("post");
    this.binaryComponent = new BinaryComponent();
  }

  async list(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("PostListDtoInType", dtoIn);
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

    const sortOptions = {
      _id: -1,
    };

    if (dtoIn.sortQuery) {
      const { sortBy, order } = dtoIn.sortQuery;
      if (sortBy) {
        sortOptions[sortBy] = order === "asc" ? 1 : -1;
      }
    }

    const posts = await this.dao.list(awid, dtoIn.pageInfo, dtoIn.searchQuery, sortOptions)

    const dtoOut = {
      ...posts,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("PostUpdateDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    const post = await this.dao.get(awid, dtoIn.id);
    if (!post) {
      // 3.1
      throw new Errors.Update.PostDoesNotExist(uuAppErrorMap, { postId: dtoIn.id });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (uuIdentity !== post.creatorIdentity
      && !authorizationResult.getIdentityProfiles().includes('Authorities')
      && !authorizationResult.getIdentityProfiles().includes('Executives')) {
      throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap })
    }

    if (dtoIn.title) {
      post.title = dtoIn.title;
    }
    if (dtoIn.postText) {
      post.postText = dtoIn.postText;
    }

    if (dtoIn.image) {

      if (post.imageCode) {
        await this.binaryComponent.delete(awid, {
          awid: awid,
          code: post.imageCode
        });
      }

      const uuBinary = await this.binaryComponent.create(awid, {
        data: dtoIn.image,
        filename: dtoIn.image.filename,
        contentType: dtoIn.image.contentType,
      });

      post.imageCode = uuBinary.code;
    }


    if (dtoIn.deleteImage && !dtoIn.image && post.imageCode) {

      await this.binaryComponent.delete(awid, {
        awid: awid,
        code: post.imageCode
      });
      post.imageCode = null;
    }
    
    await this.dao.update(post);

    const dtoOut = {
      post,
      uuAppErrorMap,
    };

    return dtoOut;
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

    await this.dao.incrementTotalViews(awid, dtoIn.id);

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

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (uuIdentity !== post.creatorIdentity
      && !authorizationResult.getIdentityProfiles().includes('Authorities')
      && !authorizationResult.getIdentityProfiles().includes('Executives')) {
      throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap })
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

    if (!authorizationResult.getIdentityProfiles().includes('StandardUsers')
      && !authorizationResult.getIdentityProfiles().includes('Authorities')) {
      throw new Errors.Create.UserNotAuthorized({ uuAppErrorMap })
    }

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
