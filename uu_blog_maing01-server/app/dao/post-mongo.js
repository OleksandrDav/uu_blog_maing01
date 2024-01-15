"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PostMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ creatorIdentity: 1 });
    await super.createIndex({ totalViews: 1 });
  }

  async list(awid, pageInfo, searchQuery, sortOptions) {
    let filter = { awid }

    if (searchQuery) {
      filter.title = { $regex: new RegExp(searchQuery, "i") };
    }

    return await super.find(filter, pageInfo, sortOptions);
  }

  async create(post) {
    return await super.insertOne(post);
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async update(post) {
    let filter = { id: post.id, awid: post.awid };
    return await super.findOneAndUpdate(filter, post, "NONE");
  }

  async incrementTotalViews(awid, id) {
    let filter = { awid, id };
    let update = { $inc: { totalViews: 1 } };
    return await super.findOneAndUpdate(filter, update, "NONE");
  }
}

module.exports = PostMongo;
