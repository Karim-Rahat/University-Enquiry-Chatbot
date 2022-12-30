const connection = require("../database/DB");

const DataInsertModels = {
    createAccount: async function (values){
        let sqlquery = "INSERT INTO `users`(`first_name`, `last_name`, `batch`, `id`, `email`, `password`) VALUES (?,?,?,?,?,?)";
   

        try {
         const rows = await connection.promise().execute(sqlquery,values);
      
     
         return rows[0]
       } catch (err) {
         return err;
       }


    },
    addQuery: async function (values){
      let sqlquery = "INSERT INTO `predefined_query`(`question`, `query1`, `query2`, `query3`, `query4`, `answer`) VALUES (?,?,?,?,?,?)";
 

      try {
       const rows = await connection.promise().execute(sqlquery,values);
    
   
       return rows[0]
     } catch (err) {
       return err;
     }


  },
  editQuery: async function (values){
    console.log(values);
    let sqlquery = "UPDATE `predefined_query` SET `question`=?,`query1`=?,`query2`=?,`query3`=?,`query4`=?,`answer`=? WHERE id=?";


    try {
     const rows = await connection.promise().execute(sqlquery,values);
  
 console.log(rows);
     return rows[0]
   } catch (err) {
     return err;
   }


},
insertInvalidQuestion: async function (values){

  let sqlquery = "INSERT INTO `invalid_question`(`chat_id`, `answer`, `question`, `userId`, `timestamp`) VALUES (?,?,?,?,?)";


  try {
   const rows = await connection.promise().execute(sqlquery,values);

console.log(rows);
   return rows[0]
 } catch (err) {
   return err;
 }


},

};
module.exports = DataInsertModels;
