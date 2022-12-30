const connection = require("../database/DB");
const AppDataModel = require("../models/AppDataModel");
const DataFetchModel = require("../models/DataFetchModel");
const MongoClient = require('mongodb').MongoClient;


const AppDataController = {
  Main: function (req, res) {
    if (req.session.userLogin && req.session.userName) {
      res.redirect("/dashboard");
    } else {
      res.render("admin/login");
    }
  },
  register: function (req, res) {
    if (req.session.userLogin && req.session.userName) {
      res.redirect("/dashboard");
    }

    res.render("admin/register");
  },

  home: async function (req, res) {
    if (req.session.userLogin && req.session.userName) {
      const data = await DataFetchModel.getCourseList();
      console.log(
        req.session.userName,
        req.session.userLogin,
        req.session.email
      );

      const userData = [req.session.userName, req.session.email];
      res.render("client/chatbot", { userData: userData });
    } else {
      res.redirect("/");
    }
  },
  dashboard: async function (req, res) {
    let flag = true;
    console.log(req.session, req.session.adminName);
    const userData = await DataFetchModel.getUsersData();
    console.log(userData);
    if (req.session.adminLogin && req.session.adminName) {
      const adminData = [req.session.adminName, req.session.admin_email];
      res.render("admin/dashboard", { adminData: adminData ,allUserData:userData});
    } else {
      flag = false;
    }
    if (flag == false) {
      res.redirect("/");
    }
  },

  accountCreated: async (req, res) => {
    res.render("template/success");
  },

  queryList: async (req,res)=>{
    const id = req.params.id
   
    const singleUserData= await DataFetchModel.getSingleUsersData(id)
      const adminData = [req.session.adminName, req.session.admin_email];
              
      res.render('admin/queryList',{ adminData: adminData,id:id,singleUserData:singleUserData})

  },
  allQuery: async (req,res)=>{
    const id = req.params.id
   
    
      const adminData = [req.session.adminName, req.session.admin_email];
              
      res.render('admin/allQuery',{ adminData: adminData})

  },
  addQueryList: async(req,res)=>{
    const adminData = [req.session.adminName, req.session.admin_email];
    res.render('admin/addQuery',{ adminData: adminData})
  },
  viewPredefined: async(req,res)=>{
    const data= await DataFetchModel.getPredefinedQues()
    const adminData = [req.session.adminName, req.session.admin_email];
    res.render('admin/viewPredefinedQuery',{ adminData: adminData,data: data})
  },

  getSinglePredefinedQues: async(req,res)=>{
    const id=req.params.id
   
    const data= await DataFetchModel.getSinglePredefinedQues(id)
    const adminData = [req.session.adminName, req.session.admin_email];
    console.log(data);
    res.render('admin/editPredefinedQuery',{adminData: adminData,data:data[0]})
},
deletePredefinedQues: async(req,res)=>{
  const id=req.params.id

  const data= await AppDataModel.deletePredefinedQues(id)
  console.log(data);
  if(data.affectedRows==1){
    res.redirect('/viewPredefined')
  }

},
getInvalidQues: async(req,res)=>{
  const data= await DataFetchModel.getInvalidQues()
  const adminData = [req.session.adminName, req.session.admin_email];
  res.render('admin/invalidQues',{ adminData: adminData,data: data})
},

  logout: async (req, res) => {
    res.clearCookie("user_cookie");
    req.session.destroy((err) => {
      res.redirect("/");
    });
  },

  removeConversation: async(req,res)=>{
    
  const userId=req.session.user_Id 
  const uri = "mongodb+srv://farjanaSultana:farjana123@chatbot.rnetqs2.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("chatbot").collection("chat_history");

        collection.deleteMany({ "userId" : userId } ,function (err, docs) {
          
          res.send(docs)
         
          client.close();
  
        });
   
  });
  }

};

module.exports = AppDataController;
