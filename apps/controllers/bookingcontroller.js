var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var Booking = require("../model/Booking.js");
var BookingService = require("../service/bookingService.js");
const verifyToken = require("../util/VerifyToken.js");
var RoomService = require("../service/roomService.js");
const Room = require("../model/Room.js");

router.get("/booking-list", async function (req, res) {
  var bookingService = new BookingService();
  var booking = await bookingService.getBookingList();
  res.json(booking);
});

router.get("/get-booking", async function (req, res) {
  var bookingService = new BookingService();
  var booking = await bookingService.getBooking(req.query._id);
  res.json(booking);
});


router.post("/check-availability", async function(req, res){

  var roomService = new RoomService();
  var room = await roomService.getRoom(req.body.roomId);
  if(new Date(req.body.checkOutDate)<=new Date(req.body.checkInDate))
    return res.status(404).json("Checkin date must less than chekout date");
  var numArr = [];
  numArr = req.body.number;
  if(numArr.length == 0)
    return res.status(404).json("Blank room number!");
  for(i=0;i<numArr.length;i++){
    var roomNumbers = room.roomNumbers;
    for(j=0;j<roomNumbers.length;j++){
      if(roomNumbers[j].number == numArr[i]){
        var temp = roomNumbers[j].unavailbleDates;
        if(temp!=[]){
          for(k=0;k<temp.length;k++){
            var tempDate = new Date(temp[k]).toLocaleDateString('en-CA');
            var tempDate3 = new Date(req.body.checkOutDate).getTime();
            var tempDate2 = new Date(tempDate).getTime();
            var tempDate1 = new Date(req.body.checkInDate).getTime();
            if(tempDate1<=tempDate2 && tempDate2<=tempDate3){
              return res.status(404).json("unavailbleDates!");
            };
          };
      };
    };

    };
  };
  return res.status(200).json("You can booking now!");

});

const getNextDays = (currentDate = new Date(), daysToAdd = 1) => {
  const nextDate = new Date(currentDate)
  nextDate.setDate(currentDate.getDate() + daysToAdd)
  return nextDate;
};



router.post("/insert-booking", async function (req, res) {
  var bookingService = new BookingService();
  var roomService = new RoomService();



  var checkInDate = req.body.checkInDate;
  var checkOutDate = req.body.checkOutDate;

  let date1 = new Date(checkInDate);
  let date2 = new Date(checkOutDate);

  var listDate = [];
  let Difference_In_Time = date2.getTime() - date1.getTime();
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  
  console.log(Difference_In_Days);

  listDate.push(date1);
  for(i=0;i<Difference_In_Days+1;i++){
    date1 = getNextDays(date1);
    if(date1<=date2){
      listDate.push(date1);
    };
  };

  console.log(listDate);

  var room = req.body.room;
  var user = req.body.user;
  var number = [];
  number = req.body.number;
  var listRoomNumber = [];
  for(i=0;i< room.roomNumbers.length; i++){
    var tempi = i;
    for(j=0;j<number.length;j++){
      if(room.roomNumbers[i].number==number[j]){
    
          var tempunavail = room.roomNumbers[i].unavailbleDates;
          var roomNumbers ={
            number:number[j],
            unavailbleDates: tempunavail.concat(listDate)
          };
          tempi = tempi + 1;
          listRoomNumber.push(roomNumbers);
      }
      
    };
    if(tempi==i){
      var roomNumbers ={
        number:room.roomNumbers[i].number,
        unavailbleDates: room.roomNumbers[i].unavailbleDates
      };
      listRoomNumber.push(roomNumbers);
    }
    
  };

  console.log(listRoomNumber);

  var roomupdate = new Room();
  roomupdate._id = new ObjectId(room._id);
  roomupdate.roomNumbers = listRoomNumber;

  var save = await roomService.updateRoom(roomupdate);
  console.log(save);

  var total = Difference_In_Days * number.length * room.price; 
  var roomNumberBooked = number.toString();
  var booking = new Booking();
  booking.roomId = room._id;
  booking.userId = user._id;
  booking.name = req.body.name;
  booking.email = req.body.email;
  booking.checkInDate = req.body.checkInDate;
  booking.checkOutDate = req.body.checkOutDate;
  booking.payment = req.body.payment;
  booking.total = total;
  booking.roomNumberBooked = roomNumberBooked; 
  booking.confirmed = req.body.confirmed;  
  var result = await bookingService.insertBooking(booking);
  console.log(result);
  res.json({ status: true, message: "" });
});

router.post("/update-booking", async function (req, res) {
  var bookingService = new BookingService();
  var booking = new Booking();
  booking._id = new ObjectId(req.body._id);
  booking.name = req.body.name;
  booking.email = req.body.email;
  booking.checkInDate = req.body.checkInDate;
  booking.checkOutDate = req.body.checkOutDate;
  booking.payment = req.body.payment;
  booking.total = req.body.total;
  booking.roomNumberBooked = req.body.roomNumberBooked;
  booking.confirmed = req.body.confirmed;
  await bookingService.updateBooking(booking);
  res.json({ status: true, message: "" });
});

router.delete("/delete-booking", async function (req, res) {
  var bookingService = new BookingService();
  await bookingService.deleteBooking(req.query._id);
  res.json({ status: true, message: "" });
});

router.get("/pagination", async function (req, res) {
  try {
    var bookingService = new BookingService();
    var totalBooking = (await bookingService.getBookingList()).length;
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalBooking = totalBooking;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    };
    if (endIndex < totalStudent) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    };
    result.data = await bookingService.getBookingListPagination(
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
