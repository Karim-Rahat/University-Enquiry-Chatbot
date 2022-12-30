const connection = require("../database/DB");

const DataFetchModel = {
  getCourseList: async (req,res)=>{
    let sqlquery = "SELECT `class_time`, `day`, `dept`, `course_code`, `course_title`, `batch`, `room_no`, `faculty`, `shift`, `trimester` FROM `course_list`";
   

   try {
    const rows = await connection.promise().execute(sqlquery);
 

    return rows[0]
  } catch (err) {
    return err;
  }


},
getUsersData:async ()=>{
  let sqlquery = "SELECT * FROM `users`";
  
  try {
    const rows = await connection.promise().execute(sqlquery);
 

    return rows[0]
  } catch (err) {
    return err;
  }
},
getSingleUsersData:async (value)=>{
  let sqlquery = "SELECT * FROM `users` where user_id=?";
  
  try {
    const rows = await connection.promise().execute(sqlquery,[value]);
 

    return rows[0]
  } catch (err) {
    return err;
  }
},

getPredefinedQues:async ()=>{
  let sqlquery = "SELECT * FROM `predefined_query`";
  
  try {
    const rows = await connection.promise().execute(sqlquery);
 

    return rows[0]
  } catch (err) {
    return err;
  }
},
getSinglePredefinedQues:async (value)=>{
  let sqlquery = "SELECT * FROM `predefined_query` WHERE id=?";
  
  try {
    const rows = await connection.promise().execute(sqlquery,[value]);
 

    return rows[0]
  } catch (err) {
    return err;
  }
},
getInvalidQues:async (value)=>{
  let sqlquery = "SELECT * FROM `invalid_question`";
  
  try {
    const rows = await connection.promise().execute(sqlquery);
 

    return rows[0]
  } catch (err) {
    return err;
  }
},

};

module.exports = DataFetchModel;
