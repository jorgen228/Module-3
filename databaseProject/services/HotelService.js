const { sequelize } = require("../models");

class HotelService {
  constructor(db) {
    this.client = db.sequelize;
    this.Hotel = db.Hotel;
    this.User = db.User;
    this.Rate = db.Rate;
  }
  async create(name, location) {
    return this.Hotel.create({
      Name: name,
      Location: location,
    });
  }
  async get() {
    return this.Hotel.findAll({
      where: {},
    });
  }
  async getHotelDetails(hotelId) {
    const hotel = await this.Hotel.findOne({
      where: {
        id: hotelId,
      },
      include: {
        model: this.User,
        through: {
          attributes: ["Value"],
        },
      },
    });
    hotel.avg =
      hotel.Users.map((x) => x.Rate.dataValues.Value).reduce(
        (a, b) => a + b,
        0
      ) / hotel.Users.length;
    hotel.rated = hotel.Users.filter((x) => x.dataValues.id == 1).length > 0;
    return hotel;
  }
  async makeARate(userId, hotelId, value) {
    sequelize
      .query("CALL insert_rate(:Value, :UserId, :HotelId)", {
        replacements: {
          Value: value,
          UserId: userId,
          HotelId: hotelId,
        },
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }
  async deleteHotel(hotelId) {
    return this.Hotel.destroy({
      where: { id: hotelId },
    });
  }
}

module.exports = HotelService;
