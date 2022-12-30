const connection = require("../database/DB");

const AppDataModel = {
  addStu: async () => {
    const sqlquery = "SELECT * FROM `department`";
    const sqlquery2 = "SELECT * FROM `semester`";
    try {
      const rows = await connection.promise().execute(sqlquery);
      const rows2 = await connection.promise().execute(sqlquery2);

      return [rows[0], rows2[0]];
    } catch (err) {
      return err;
    }
  },
  deletePredefinedQues: async (value) => {
    const sqlquery = "DELETE FROM `predefined_query` WHERE id=?";

    try {
      const rows = await connection.promise().execute(sqlquery,[value]);


      return [rows[0]];
    } catch (err) {
      return err;
    }
  },
};
module.exports = AppDataModel;
