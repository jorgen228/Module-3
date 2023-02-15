const { sequelize } = require("../models");

class RoomSerivce {
  constructor(db) {
    this.client = db.sequelize;
    this.Room = db.Room;
    this.User = db.User;
    this.Reservation = db.Reservation;
  }
  async create(capacity, pricePerDay, hotelId) {
    return this.Room.create({
      PricePerDay: pricePerDay,
      Capacity: capacity,
      HotelId: hotelId,
    });
  }
  async get() {
    return this.Room.findAll({
      where: {},
      include: {
        model: this.User,
        through: {
          attributes: ["StartDate", "EndDate"],
        },
      },
    });
  }
  async getHotelRooms(hotelId) {
    return this.Room.findAll({
      where: {
        HotelId: hotelId,
      },
      include: {
        model: this.User,
        through: {
          attributes: ["StartDate", "EndDate"],
        },
      },
    });
  }
  async deleteRoom(roomid) {
    return this.Room.destroy({
      where: { id: roomid },
    });
  }
  async rentARoom(userId, roomId, startDate, endDate) {
    sequelize
      .query(
        "CALL insert_reservation(:UserId, :RoomId, :StartDate, :EndDate)",
        {
          replacements: {
            RoomId: roomId,
            UserId: userId,
            StartDate: startDate,
            EndDate: endDate,
          },
        }
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = RoomSerivce;
