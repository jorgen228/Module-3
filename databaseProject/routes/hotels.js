const express = require("express");
const router = express.Router();
const HotelService = require("../services/HotelService");
const db = require("../models");
const hotelService = new HotelService(db);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", async (req, res, next) => {
  const hotels = await hotelService.get();
  res.render("hotels", { hotels: hotels });
});

router.get("/:hotelId", async (req, res, next) => {
  const hotel = await hotelService.getHotelDetails(req.params.hotelId);
  res.render("hotelDetails", { hotel: hotel });
});

router.post("/", jsonParser, async (req, res, next) => {
  let Name = req.body.Name;
  let Location = req.body.Location;
  await hotelService.create(Name, Location);
  res.end();
});

router.post("/:hotelId/rate", jsonParser, async (req, res, next) => {
  let value = req.body.Value;
  await hotelService.makeARate(1, req.params.hotelId, value);
  res.end();
});

router.delete("/", jsonParser, async (req, res, next) => {
  let id = req.body.id;
  await hotelService.deleteHotel(id);
  res.end();
});

router.delete("/:id", jsonParser, async (req, res, next) => {
  let id = req.params.id;
  await hotelService.deleteHotel(id);
  res.end();
});

module.exports = router;
