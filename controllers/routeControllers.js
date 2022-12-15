const path = require('path')
const fs = require('fs')
const {getAllEmployees, getManagers, 
        getDepartments, addEmployee, 
        getEmployeeByNum, getEmployeesByStatus,
        getEmployeesByDepartment, getEmployeesByManager,
        updateEmployee, addDepartment, updateDepartment, 
        getDepartmentById, deleteEmployeeByNum} = require('../data-service')

const {registerUser, checkUser} = require('../data-service-auth')

const ensureLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

const loginView = (req, res) => {
    res.render('login', {})
}

const login = (req, res) => {
    req.body.userAgent = req.get('User-Agent');

    checkUser(req.body)
    .then(user => {
        req.session.user = {
            userName: user.userName,
            email: user.email,
            loginHistory: user.loginHistory
        };
        res.redirect('/employees');
    })
    .catch(e => res.render('login', {errorMessage: e, userName: req.body.userName}))
}

const registerView = (req, res) => {
    res.render('register', {})
}

const register = (req, res) => {
    registerUser(req.body)
    .then(() =>  res.render('register', {successMessage: "User created"}))
    .catch(e =>  res.render('register', {errorMessage: e, userName: req.body.userName}))
}

const logout = (req,res) => {
    req.session.reset();
    res.redirect('/');
}

const userHistoryView = (req,res) => {
    res.render('userHistory', {})
}

const homeView = (req, res) => {
    //res.sendFile(path.join(__dirname,'../views/home.html'))
    res.render('home', {})
}

const aboutView = (req, res) => {
    //res.sendFile(path.join(__dirname,'../views/about.html'))
    res.render('about', {})
}

//images controllers
const addImageView = (req,res) => {
    res.render('addImage', {});
}

const redirectToImagesRoute = (req,res) => {
    res.redirect('/images')
}

const imagesView = (req,res) => {
    fs.readdir(__dirname + '/../public/images/uploaded', (err, items) => {
        if(err)
        return console.log('Unable to scan dir: ' + err)
        
        res.render('images',{items})
    })
}

const managersView = (req, res) => {
    getManagers()
    .then(data => res.json(data))
    .catch(e => res.json({message: e}))
}



//employees controllers
const employeesView = (req, res) => {

    if(req.query.status) {
        getEmployeesByStatus(req.query.status)
        .then(employees => {
            if(employees.length > 0) {
                res.render("employees", {employees})
            }
            else {
                res.render("employees", {message: 'No results'})
            }
        })
        .catch(errorMessage => res.render("employees", {message: "No results"}))
    }
    else if(req.query.department) {
        getEmployeesByDepartment(req.query.department)
        .then(employees => {
            if(employees.length > 0) {
                res.render("employees", {employees})
            }
            else {
                res.render("employees", {message: 'No results'})
            }
        })
        .catch(errorMessage => res.render("employees", {message: "No results"}))
    }
    else if(req.query.manager) {
        getEmployeesByManager(req.query.manager)
        .then(employees => {
            if(employees.length > 0) {
                res.render("employees", {employees})
            }
            else {
                res.render("employees", {message: 'No results'})
            }
        })
        .catch(errorMessage => res.render("employees", {message: "No results"}))
    }
    else {
        getAllEmployees()
        .then(employees => {
            if(employees.length > 0) {
                res.render("employees", {employees})
            }
            else {
                res.render("employees", {message: 'No results'})
            }
        })
        .catch(errorMessage => res.render("employees", {message: "No results"}))
    }
}

const addEmployeesView = (req,res) => {

    getDepartments()
    .then(departments => {
        if(departments.length > 0) {
            res.render("addEmployee", {departments})
        }
        else {
            res.render("addEmployee", {message : 'No results'})
        }
    })
    .catch(errorMessage => res.render("addEmployee", {departments: []}))
}

const addEmployees = (req,res) => {
    addEmployee(req.body)  
    .then(() => res.redirect('/employees'))
    .catch(e => res.json({message: e}))
}

const getEmployee = (req,res) => {
    let viewData = {};

    getEmployeeByNum(req.params.empNum)
    .then((data) => {
        if (data) {
            viewData.employee = data; 
        } else {
            viewData.employee = null;
        }
    })
    .catch(() => {
        viewData.employee = null;
    })
    .then(getDepartments)
    .then((data) => {
        viewData.departments = data; 
    for (let i = 0; i < viewData.departments.length; i++) {
        if (viewData.departments[i].departmentId == viewData.employee.department) {
            viewData.departments[i].selected = true;
        }
    }})
    .catch(() => {
        viewData.departments = [];
    }) 
    .then(() => {
        if (viewData.employee == null) {
            res.status(404).send("Employee Not Found");
        } 
        else {
            res.render("employee", { viewData });
        }
    });
}

const deleteEmployee = (req,res) => {
    deleteEmployeeByNum(req.params.empNum)
    .then(() => res.redirect('/employees'))
    .catch(e => res.status(500).send("Unable to Remove Employee / Employee not found"))
}

const updateEmployeeController = (req, res) => {
    updateEmployee(req.body)
    .then(res.redirect("/employees"))
    .catch(e => res.render("employees",{message:"No results"}))
}



//departments controllers
const departmentsView = (req, res) => {
    getDepartments()
    .then(departments => {
        if(departments.length > 0) {
            res.render("departments", {departments})
        }
        else {
            res.render("departments", {message : 'No results'})
        }
    })
    .catch(errorMessage => res.render("departments", {message: "No results"}))
}

const addDepartmentsView = (req,res) => {
    res.render('addDepartment', {})
}

const addDepartments = (req,res) => {
    addDepartment(req.body)
    .then(() => res.redirect('/departments'))
    .catch(e => res.status(500).send("Unable to add department"))
}

const updateDepartmentController = (req, res) => { 
    updateDepartment(req.body)
    .then(res.redirect("/departments"))
    .catch(e => res.status(500).send("Unable to update department"))
}

const getDepartment = (req,res) => {
    getDepartmentById(req.params.departmentId)
    .then(department => {
        if(department == undefined){
            res.status(404).send("Department Not Found");
        }
        else{
            res.render("department", {department})
        }
    })
    .catch(e => res.status(404).send("Department Not Found"))
}

module.exports = {homeView, aboutView, employeesView, 
                managersView, departmentsView, addEmployeesView, 
                addImageView, imagesView, redirectToImagesRoute, 
                addEmployees, getEmployee, updateEmployeeController,
                addDepartmentsView, addDepartments, 
                updateDepartmentController, getDepartment, deleteEmployee, ensureLogin, loginView, registerView, register, login, logout, userHistoryView}