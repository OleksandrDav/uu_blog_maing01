"use strict";
const CommentAbl = require("../../abl/comment-abl.js");

class CommentController {

  create(ucEnv) {
    return CommentAbl.create(
      ucEnv.getUri().getAwid(), 
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
      );
  }

}

module.exports = new CommentController();
