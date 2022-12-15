const { Employee } = require("./models/employee");
const { Department } = require("./models/department");
const { sequelize } = require("./dbConnection/dbConn");

function initialize() {
  return new Promise(function (resolve, reject) {
    sequelize
      .sync()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("Unable to sync to the database");
      });
  });
}
function getManagers() {
  return new Promise(function (resolve, reject) {
    reject();
  });
}

//employees data service functions
function getAllEmployees() {
  return new Promise(function (resolve, reject) {
    Employee.findAll()
      .then((employees) => {
        resolve(employees);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
}

function addEmployee(employeeData) {
  employeeData.isManager = employeeData.isManager ? true : false;

  for (const key in employeeData) {
    if (employeeData[key] === "") {
      employeeData[key] = null;
    }
  }

  return new Promise(function (resolve, reject) {
    Employee.create(employeeData)
      .then((employee) => {
        resolve();
      })
      .catch((err) => {
        reject("unable to create employee");
      });
  });
}

function getEmployeeByNum(empNum) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { employeeNum: empNum },
    })
      .then((employees) => {
        resolve(employees[0]);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
}

function getEmployeesByStatus(status) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { status: status },
    })
      .then((employees) => {
        resolve(employees);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
}

function getEmployeesByDepartment(department) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { department: department },
    })
      .then((employees) => {
        resolve(employees);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
}

function getEmployeesByManager(manager) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: { employeeManagerNum: manager },
    })
      .then((employees) => {
        resolve(employees);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
}

function updateEmployee(employeeData) {
  return new Promise(function (resolve, reject) {
    employeeData.isManager = employeeData.isManager ? true : false;

    for (const key in employeeData) {
      if (employeeData[key] === "") {
        employeeData[key] = null;
      }
    }

    Employee.update(employeeData, {
      where: { employeeNum: employeeData.employeeNum },
    })
      .then((employee) => {
        resolve();
      })
      .catch((err) => {
        reject("unable to update employee");
      });
  });
}

function deleteEmployeeByNum(empNum) {
  return new Promise(function (resolve, reject) {
    Employee.destroy({
      where: { employeeNum: empNum },
    })
      .then((employee) => {
        resolve();
      })
      .catch((err) => {
        reject("unable to delete employee");
      });
  });
}

// departments data service functions
function getDepartments() {
  return new Promise(function (resolve, reject) {
    Department.findAll({})
      .then((departments) => {
        resolve(departments);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
}

function addDepartment(departmentData) {
  for (const key in departmentData) {
    if (departmentData[key] === "") {
      departmentData[key] = null;
    }
  }

  return new Promise(function (resolve, reject) {
    Department.create(departmentData)
      .then((department) => {
        resolve();
      })
      .catch((err) => {
        reject("unable to create department");
      });
  });
}

function updateDepartment(departmentData) {
  for (const key in departmentData) {
    if (departmentData[key] === "") {
      departmentData[key] = null;
    }
  }

  return new Promise(function (resolve, reject) {
    Department.update(departmentData, {
      where: { departmentId: departmentData.departmentId },
    })
      .then((department) => {
        resolve();
      })
      .catch((err) => {
        reject("unable to update department");
      });
  });
}

function getDepartmentById(id) {
  return new Promise(function (resolve, reject) {
    Department.findAll({
      where: { departmentId: id },
    })
      .then((department) => {
        resolve(department[0]);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
}

module.exports = {
  initialize,
  getAllEmployees,
  getManagers,
  getDepartments,
  addEmployee,
  getEmployeeByNum,
  getEmployeesByStatus,
  getEmployeesByDepartment,
  getEmployeesByManager,
  updateEmployee,
  addDepartment,
  updateDepartment,
  getDepartmentById,
  deleteEmployeeByNum,
};
