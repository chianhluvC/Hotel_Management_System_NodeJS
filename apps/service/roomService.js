const { ObjectId } = require("mongodb");
var config = require("../../config/setting.json");

class RoomService {
  databaseConnection = require("../database/database");
  room = require("../model/Room");
  client;
  roomDatabase;
  roomCollection;

  constructor() {
    this.client = this.databaseConnection.getMongoClient();
    this.roomDatabase = this.client.db(config.mongodb.database);
    this.roomCollection = this.roomDatabase.collection("rooms");
  }

  async deleteRoom(id) {
    return await this.roomCollection.deleteOne({ _id: new ObjectId(id) });
  }

  async updateRoom(room) {
    return await this.roomCollection.updateOne(
      { _id: new ObjectId(room._id) },
      { $set: room }
    );
  }

  async insertRoom(room) {
    return await this.roomCollection.insertOne(room);
  }

  async getRoom(id) {
    return await this.roomCollection.findOne({ _id: new ObjectId(id) }, {});
  }

  async getRoomList() {
    const cursor = await this.roomCollection.find({}, {}).skip(0).limit(100);
    return await cursor.toArray();
  }

  async getRoomListPagination(skip, limit) {
    const cursor = await this.roomCollection
      .find({}, {})
      .skip(skip)
      .limit(limit);
    return await cursor.toArray();
  }
}
module.exports = RoomService;
