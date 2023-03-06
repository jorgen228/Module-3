module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      StartDate: {
        type: Sequelize.DataTypes.DATE,
        validate: { isDate: true, isAfter: new Date().toDateString() },
      },
      EndDate: {
        type: Sequelize.DataTypes.DATE,
        validate: { isDate: true, isAfter: new Date().toDateString() },
      },
    },
    {
      validate: {
        bothDateSet() {
          if (this.EndDate == null || this.Startdate == null) {
            throw new Error("Provide both dates");
          }
        },
      },
      differenceBetweenDates() {
        if (this.EndDate != null && this.StartDate != null) {
          if (this.StartDate.isAfter(This.EndDate)) {
            throw new Error("Startdate must be before EndDate");
          }
          const start = new Date(this.StartDate);
          const end = new Date(this.EndDate);
          const diff = end - start;
          const singleDatyInTme = 1000 * 60 * 60 * 24;
          if (diff < singleDatyInTme) {
            throw new Error(
              "Startdate should be at least one full day befor EndDate"
            );
          }
        }
      },
    },
    {
      timestamps: false,
      hasTrigger: true,
    }
  );
  return Reservation;
};
