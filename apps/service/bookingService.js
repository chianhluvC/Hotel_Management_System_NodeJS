const { ObjectId } = require("mongodb");
var config = require("../../config/setting.json");
databaseConnection = require("../database/database");
booking = require("../model/Booking");
class BookingService {

  client;
  bookingDatabase;
  bookingCollection;

  constructor() {
    this.client = this.databaseConnection.getMongoClient();
    this.bookingDatabase = this.client.db(config.mongodb.database);
    this.bookingCollection = this.bookingDatabase.collection("bookings");
  }

  async deleteBooking(id) {
    return await this.bookingCollection.deleteOne({ _id: new ObjectId(id) });
  }

  async updateBooking(booking) {
    return await this.bookingCollection.updateOne(
      { _id: new ObjectId(booking._id) },
      { $set: booking }
    );
  }

  async insertBooking(booking) {
    return await this.bookingCollection.insertOne(booking);
  }

  async getBooking(id) {
    return await this.bookingCollection.findOne({ _id: new ObjectId(id) }, {});
  }

  async getBookingList() {
    const cursor = await this.bookingCollection.find({}, {}).skip(0).limit(100);
    return await cursor.toArray();
  }

  async getBookingListPagination(skip, limit) {
    const cursor = await this.bookingCollection
      .find({}, {})
      .skip(skip)
      .limit(limit);
    return await cursor.toArray();
  }
}
module.exports = BookingService;
