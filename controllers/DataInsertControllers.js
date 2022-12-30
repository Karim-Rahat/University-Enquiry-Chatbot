const connection = require("../database/DB");
const DataInsertModel = require("../models/DataInsertModel");
const MongoClient = require('mongodb').MongoClient;
const DatainsertController = {

createAccount : async function (req, res) {
console.log(req.body);
const {firstName,lastName,batch,id,email,password}=req.body

const values=[firstName,lastName,batch,id,email,password]

const data=await DataInsertModel.createAccount(values)
console.log(data);
if(data.affectedRows==1){
  res.render('template/success',{data:firstName})
}
else{
  res.redirect('/register')
}
  },
chatHistory: async(req,response)=>{
  let data=[]
  const {chat_id,student,chatbot}=req.body
const uri = "mongodb+srv://farjanaSultana:farjana123@chatbot.rnetqs2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("chatbot").collection("chat_history");
    var createdDt = new Date()
    collection.insertOne({chat_id:chat_id, chatbot: chatbot, user: student, userId: req.session.user_Id ,timestamp: createdDt},
      function (err, res) {
        console.log(res);
        console.log([chat_id,student,chatbot]);
          response.send([chat_id,student,chatbot])
          client.close();
     

      });
  });


},
addQuery: async(req,res)=>{
  console.log(req.body);
  const {ques,query1,query2,query3,query4,answer}=req.body
  const values=[ques,query1,query2,query3,query4,answer]
  const data=await DataInsertModel.addQuery(values)
  if(data.affectedRows==1){
    res.render('template/successData')
  }
  else{
    res.redirect('template/error')
  }
},
editQuery: async(req,res)=>{
  const id=req.params.id

  const {ques,query1,query2,query3,query4,answer}=req.body
  const values=[ques,query1,query2,query3,query4,answer,parseInt(id)]
  console.log(values,'val');
  const data=await DataInsertModel.editQuery(values)
  if(data.affectedRows==1){
    res.render('template/successDataUpdate')
  }
  else{
    res.redirect('template/error')
  }
},
reportChat: async(req,res)=>{
  const {chat_id}=req.body
 
  const userId=req.session.user_Id 
  const uri = "mongodb+srv://farjanaSultana:farjana123@chatbot.rnetqs2.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("chatbot").collection("chat_history");

          collection.find({ chat_id:parseInt(chat_id) ,userId:parseInt(userId)}).toArray(async function (err, doc) {
            console.log(doc,'singlw data');
            var createdDt = new Date()
            const values=[doc[0].chat_id,doc[0].chatbot,doc[0].user,doc[0].userId,createdDt]
            const data=await DataInsertModel.insertInvalidQuestion(values)
            res.send(doc)
           
            client.close();
    
  
        });
    });
}

};
module.exports = DatainsertController;
