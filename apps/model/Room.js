const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    name: {
        type: String
    },
    
    price:{
        type: Number
    },

    desc:{
        type: String
    },

    img:{
        type: [String]
    },

    roomNumbers:{
        type:[
            {
                number: Number,
                unavailbleDates: [Date]
            }
        ]
        
    },
});


const Room = mongoose.model("Room", RoomSchema );
module.exports = Room;

