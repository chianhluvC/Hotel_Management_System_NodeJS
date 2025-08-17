const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
    },

    email: {
      type: String,
    },

    checkInDate: {
      type: Date,
    },

    checkOutDate: {
      type: Date,
    },

    payment: {
      type: String,
    },

    total: {
      type: Number,
    },

    roomNumberBooked: {
      type: String,
    },

    confirmed: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
