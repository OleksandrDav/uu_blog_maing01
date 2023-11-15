"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CommentMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ postId: 1 });
  }

  async create(comment) {
    return await super.insertOne(comment);
  }

}

module.exports = CommentMongo;
