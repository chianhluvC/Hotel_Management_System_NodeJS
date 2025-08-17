const { ObjectId } = require("mongodb");
var config = require("../../config/setting.json");
const bcrypt = require("bcrypt");

class UserService {
  databaseConnection = require("../database/database");
  user = require("../model/User");
  client;
  userDatabase;
  userCollection;

  constructor() {
    this.client = this.databaseConnection.getMongoClient();
    this.userDatabase = this.client.db(config.mongodb.database);
    this.userCollection = this.userDatabase.collection("users");
  }

  async deleteUser(id) {
    return await this.userCollection.deleteOne({ _id: new ObjectId(id) });
  }

  async updateUser(user) {
    return await this.userCollection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: user }
    );
  }

  async insertUser(user) {
    return await this.userCollection.insertOne(user);
  }

  async getUser(username) {
    return await this.userCollection.findOne({ username: username }, {});
  }

  async getUserList() {
    const cursor = await this.userCollection.find({}, {}).skip(0).limit(100);
    return await cursor.toArray();
  }

  async getUserListPagination(skip, limit) {
    const cursor = await this.userCollection
      .find({}, {})
      .skip(skip)
      .limit(limit);
    return await cursor.toArray();
  }

  async comparePassword(password, user) {
    return await bcrypt.compare(password, user.password);
  }
}
module.exports = UserService;
