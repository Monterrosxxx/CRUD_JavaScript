const employeeController = {};
import Employee from '../models/Employee.js';

//SELECT
employeeController.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

//INSERT
employeeController.createEmployee = async (req, res) => {
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body; 
    const newEmployee = new Employee({name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified});

    await newEmployee.save();
    res.json({ message: 'Employee saved' });
}

//DELETE
employeeController.deleteEmployee = async (req, res) => {
    const deleteEmployee = await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
}

//UPDATE
employeeController.updateEmployee = async (req, res) => {
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified}, {new: true});
    res.json({ message: 'Employee updated' });
}

export default employeeController;