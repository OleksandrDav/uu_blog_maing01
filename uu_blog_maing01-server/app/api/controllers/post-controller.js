"use strict";
const PostAbl = require("../../abl/post-abl.js");

class PostController {

  list(ucEnv) {
    return PostAbl.list(
      ucEnv.getUri().getAwid(), 
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
      );
  }

  update(ucEnv) {
    return PostAbl.update(
      ucEnv.getUri().getAwid(), 
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
      );
  }

  get(ucEnv) {
    return PostAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return PostAbl.delete(
      ucEnv.getUri().getAwid(), 
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
      );
  }

  create(ucEnv) {
    return PostAbl.create(
      ucEnv.getUri().getAwid(), 
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
      );
  }

}

module.exports = new PostController();
