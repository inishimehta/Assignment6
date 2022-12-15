const express = require('express')
const multer = require('multer')
const path = require('path')
const   {homeView, aboutView, employeesView, managersView, 
        departmentsView, addEmployeesView, addImageView, 
        imagesView, redirectToImagesRoute, addEmployees,
        getEmployee, updateEmployeeController, addDepartmentsView,
        addDepartments, updateDepartmentController, getDepartment,
        deleteEmployee, ensureLogin, loginView, registerView,
        register, login, logout, userHistoryView
      } 
        = require('../controllers/routeControllers')

const router = express.Router()

const storage = multer.diskStorage({
  destination: "./public/images/uploaded",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({ storage: storage })

router.get('/', homeView)
router.get('/about', aboutView)

router.get('/images/add', ensureLogin, addImageView)
router.post('/images/add', ensureLogin, upload.single("imageFile"), redirectToImagesRoute)
router.get('/images', ensureLogin, imagesView)

router.get('/employees', ensureLogin, employeesView)
router.get('/employee/:empNum', ensureLogin, getEmployee)
router.get('/employees/add', ensureLogin, addEmployeesView)
router.post('/employees/add', ensureLogin, addEmployees)
router.post('/employee/update', ensureLogin, updateEmployeeController)
router.get('/employees/delete/:empNum', ensureLogin, deleteEmployee)

router.get('/departments', ensureLogin, departmentsView)
router.get('/departments/add', ensureLogin, addDepartmentsView)
router.post('/departments/add', ensureLogin, addDepartments)
router.post('/department/update', ensureLogin, updateDepartmentController)
router.get('/department/:departmentId', ensureLogin, getDepartment)

router.get('/userHistory', ensureLogin, userHistoryView)
router.get('/login', loginView)
router.get('/register', registerView)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

//router.get('/managers', managersView)

module.exports = router