"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PostMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ creatorIdentity: 1 });
    await super.createIndex({ totalViews: 1 });
  }

  async create(post) {
    return await super.insertOne(post);
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }
  
  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async update(post) {
    let filter = { id: post.id, awid: post.awid };
    return await super.findOneAndUpdate(filter, post, "NONE");
  }

}

module.exports = PostMongo;
