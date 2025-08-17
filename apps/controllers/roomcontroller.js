var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var Room = require("../model/Room.js");
var RoomService = require("../service/roomService.js");
const verifyToken = require("../util/VerifyToken.js");



router.get("/room-list", async function (req, res) {
  var roomService = new RoomService();
  var room = await roomService.getRoomList();
  res.json(room);
});

router.get("/get-room", async function (req, res) {
  var roomService = new RoomService();
  var room = await roomService.getRoom(req.query._id);
  res.json(room);
});

router.post("/insert-room",verifyToken("admin"), async function (req, res) {
  var roomService = new RoomService();
  var room = new Room();
  room.name = req.body.name;
  room.price = req.body.price;
  room.desc = req.body.desc;
  room.img = req.body.img;
  room.roomNumbers = req.body.roomNumbers;
  
  var result = await roomService.insertRoom(room);
  res.json({ status: true, message: "" });
});

router.post("/update-room", verifyToken("admin"), async function (req, res) {
  var roomService = new RoomService();
  var room = new Room();
  room._id = new ObjectId(req.body._id);
  room.name = req.body.name;
  room.price = req.body.price;
  room.desc = req.body.desc;
  room.img = req.body.img;
  room.roomNumbers = req.body.roomNumbers;
  await roomService.updateRoom(room);
  res.json({ status: true, message: "" });
});

router.delete("/delete-room", verifyToken("admin"), async function (req, res) {
  var roomService = new RoomService();
  await roomService.deleteRoom(req.query._id);
  res.json({ status: true, message: "" });
});

router.get("/pagination", async function (req, res) {
  try {
    var roomService = new RoomService();
    var totalRoom = (await roomService.getRoomList()).length;
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 50;
    const result = {};
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalRoom = totalRoom;
    if (startIndex > 0) {
        result.previous = {
          pageNumber: pageNumber - 1,
          limit: limit,
        };
    };
    if (endIndex < totalRoom) {
        result.next = {
          pageNumber: pageNumber + 1,
          limit: limit,
        };
    };
    result.data = await roomService.getRoomListPagination(
        startIndex,
        limit
    );
    result.rowsPerPage = limit;
    return res.json({
        msg: "Pagination successfully",
        data: result,
    });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Sorry, something when wrong" });
    };
});



module.exports = router;
