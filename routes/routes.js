const router=require('express').Router()
const AppDataController=require('../controllers/AppDataControllers')
const DatainsertController=require('../controllers/DataInsertControllers')
const DataFetchControllers=require('../controllers/DataFetchControllers')
const DataFetchModel = require('../models/DataFetchModel')



router.get('/',AppDataController.Main)
router.get('/register',AppDataController.register)
router.post('/createAccount',DatainsertController.createAccount)

router.post('/checkAdmin',DataFetchControllers.checkAdminLogin)
router.post('/checkUser',DataFetchControllers.checkUserLogin)
router.post('/chatHistory',DatainsertController.chatHistory)
router.post('/addQuery',DatainsertController.addQuery)
router.post('/editQuery/:id',DatainsertController.editQuery)
router.post('/reportChat',DatainsertController.reportChat)

router.get('/home',AppDataController.home)
router.get('/dashboard',AppDataController.dashboard)
router.get('/viewStudentsQuery/:id',AppDataController.queryList)
router.get('/allQuery',AppDataController.allQuery)
router.get('/addQueryList',AppDataController.addQueryList)
router.get('/viewPredefined',AppDataController.viewPredefined)
//fetch


router.get('/accountCreated',AppDataController.accountCreated)
router.get('/getData',DataFetchControllers.getData)
router.get('/getChatHistory',DataFetchControllers.getChatHistory)
router.get('/getAllChatHistory',DataFetchControllers.getAllChatHistory)
router.get('/getUsersData',DataFetchControllers.getUsersData)
router.get('/invalidQuestion',AppDataController.getInvalidQues)
router.get('/getSingleUsersData/:id',DataFetchControllers.getSingleUsersData)
router.get('/getPredefinedQues',DataFetchControllers.getPredefinedQues)
router.get('/getPredefinedQues/:id',AppDataController.getSinglePredefinedQues)
router.get('/deletePredefinedQues/:id',AppDataController.deletePredefinedQues)

router.get("/logout", AppDataController.logout);
module.exports = router