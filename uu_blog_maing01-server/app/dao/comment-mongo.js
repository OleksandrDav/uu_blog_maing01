"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CommentMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, postId: 1 });
    await super.createIndex({ awid: 1, id: 1 });
  }

  async create(comment) {
    return await super.insertOne(comment);
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async list(awid, postId, pageInfo) {
    let filter = { awid, postId };
    return await super.find(filter, pageInfo);
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }

}

module.exports = CommentMongo;
