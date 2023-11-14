"use strict";
const PostAbl = require("../../abl/post-abl.js");

class PostController {

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
