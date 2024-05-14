import  { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeView = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleRemoveEmployee = async (employeeId) => {
        try {
            await axios.delete(`/api/employees/${employeeId}`);
            fetchEmployees(); 
        } catch (error) {
            console.error('Error removing employee:', error);
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.firstName} {employee.lastName} - {employee.email}
                        <button onClick={() => handleRemoveEmployee(employee.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeView;
