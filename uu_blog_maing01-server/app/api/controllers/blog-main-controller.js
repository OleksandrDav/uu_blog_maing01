"use strict";
const BlogMainAbl = require("../../abl/blog-main-abl.js");

class BlogMainController {
  init(ucEnv) {
    return BlogMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return BlogMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return BlogMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new BlogMainController();
