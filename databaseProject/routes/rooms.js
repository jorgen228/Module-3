const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const RoomSerivce = require("../services/RoomService");
const db = require("../models");
const roomService = new RoomSerivce(db);

router.get("/:hotelId", async (req, res, next) => {
  const rooms = await roomService.getHotelRooms(req.params.hotelId);
  rooms.map(
    (room) =>
      (room.Users = room.Users.filter((user) => user.id == 1).length > 0)
  );
  res.render("rooms", { rooms: rooms });
});

router.get("/", async (req, res, next) => {
  const rooms = await roomService.get();
  rooms.map(
    (room) =>
      (room.Users = room.Users.filter((user) => user.id == 1).length > 0)
  );
  res.render("rooms", { rooms: rooms });
});

router.post("/", jsonParser, async (req, res, next) => {
  let capacity = req.body.Capacity;
  let pricePerDay = req.body.PricePerDay;
  let hotelId = req.body.HotelId;
  await roomService.create(capacity, pricePerDay, hotelId);
  res.end();
});

router.post("/reservation", jsonParser, async (req, res, next) => {
  let userId = req.body.UserId;
  let roomId = req.body.RoomId;
  let startDate = req.body.StartDate;
  let endDate = req.body.EndDate;
  await roomService.rentARoom(userId, roomId, startDate, endDate);
  res.end();
});

router.delete("/", jsonParser, async (req, res, next) => {
  let id = req.body.id;
  await roomService.deleteRoom(id);
  res.end();
});

module.exports = router;
