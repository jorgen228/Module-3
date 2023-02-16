var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var HotelService = require("../services/HotelService")
var db = require("../models");
var hotelService = new HotelService(db);
/* GET hotels listing. */
router.get('/', async function(req, res, next) {
  const hotels = await hotelService.get();
  res.render('hotels', { hotels: hotels });
});

router.get('/:hotelId', async function(req, res, next) {
  const hotel = await hotelService.getHotelDetails(req.params.hotelId);
  res.render('hotelDetails', { hotel: hotel });
});

router.post('/:hotelId/rate', jsonParser, async function(req, res, next) {
  let value = req.body.Value;
  let userId = req.body.UserId;
  await hotelService.makeARate(userId, req.params.hotelId, value);
  res.end()
});

router.post('/', jsonParser, async function(req, res, next) {
  let Name = req.body.Name;
  let Location = req.body.Location;
  await hotelService.create(Name, Location);
  res.end()
});

router.delete('/', jsonParser, async function(req, res, next) {
  let id = req.body.id;
  await hotelService.deleteHotel(id);
  res.end()
});

router.delete('/:id', jsonParser, async function(req, res, next) {
  await hotelService.deleteHotel(req.params.id);
  res.end()
});

module.exports = router;
