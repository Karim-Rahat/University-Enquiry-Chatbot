const connection = require("../database/DB");
const DataFetchModel = require("../models/DataFetchModel");
const AppDataController = require("./AppDataControllers");
const MongoClient = require('mongodb').MongoClient;
const DataFetchControllers = {
    checkAdminLogin: async function (req, res) {
        


        const { email, password } = req.body
     
        let flag = false
        
        let sqlquery = "SELECT * FROM `admin`";
        let rows = await connection.promise().execute(sqlquery);


        await rows[0].map(function (item) { 

        console.log(item.email,email ,'&',item.password,password);

                if (item.email == email && item.password == password) {
                    req.session.adminName = item.first_name + " " + item.last_name;
                    req.session.adminLogin = true;
        
                    req.session.admin_Id = item.user_id;
                    req.session.admin_email=item.email
                    flag = true;
                }

            })

        if (flag == true) {
            console.log('login hoise');
            res.redirect('/dashboard');
        }
        else {
            res.render('template/error')
        }



    },
    checkUserLogin: async function (req, res) {
        
        const { email, password } = req.body
     
        let flag = false
        
        let sqlquery = "SELECT * FROM `users`";
        let rows = await connection.promise().execute(sqlquery);


        await rows[0].map(function (item) { 



                if (item.email == email && item.password == password) {
                    req.session.userName = item.first_name + " " + item.last_name;
                    req.session.userLogin = true;
        
                    req.session.user_Id = item.user_id;
                    req.session.email=item.email
        
                    flag = true;
                }

            })

        if (flag == true) {
            console.log('login hoise');
            res.redirect('/home');
        }
        else {
            res.render('template/error')
        }


    },

getData: async (req,res)=>{
    const data=await DataFetchModel.getCourseList()
    res.send(data)
},

getChatHistory:async (req,res)=>{
    const uri = "mongodb+srv://farjanaSultana:farjana123@chatbot.rnetqs2.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("chatbot").collection("chat_history");
       
            collection.find({ userId: req.session.user_Id }).toArray(function (err, docs) {
        
             
              res.send(docs)
              client.close();
      
    
          });
      });
},
getAllChatHistory:async (req,res)=>{
    const uri = "mongodb+srv://farjanaSultana:farjana123@chatbot.rnetqs2.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("chatbot").collection("chat_history");
       
            collection.find().toArray(function (err, docs) {
        
             
              res.send(docs)
              client.close();
      
    
          });
      });
},

getUsersData: async(req,res)=>{
    const userData= await DataFetchModel.getUsersData()
    res.send(userData)
},
getSingleUsersData: async(req,res)=>{
    const id=req.params.id
    const singleUserData= await DataFetchModel.getSingleUsersData(id)
    console.log(singleUserData);
    const uri = "mongodb+srv://farjanaSultana:farjana123@chatbot.rnetqs2.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("chatbot").collection("chat_history");
       console.log(id);
            collection.find({ userId:parseInt(id) }).toArray(function (err, docs) {
              console.log(docs,'singlw data');
              res.send(docs)
             
              client.close();
      
    
          });
      });
   
},
getPredefinedQues: async(req,res)=>{
    const data= await DataFetchModel.getPredefinedQues()
    res.send(data)
},


}
module.exports = DataFetchControllers;
