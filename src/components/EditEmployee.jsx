// EditEmployee.jsx
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {

    const { employeeId } = useParams()
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        phoneNumber: '',
        gender: '',
        address: '',
        country: '',
        city: '',
        skills: ''
    });

    const history = useHistory();

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`/api/employees/${employeeId}`);
            setEmployeeData(response.data);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/employees/${employeeId}`, employeeData);
            history.push('/employees'); // Redirect to employee list page after edit
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={employeeData.firstName} onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" value={employeeData.lastName} onChange={handleChange} placeholder="Last Name" />
                <input type="email" name="email" value={employeeData.email} onChange={handleChange} placeholder="Email" />
                <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} placeholder="Date of Birth" />
                <input type="text" name="phoneNumber" value={employeeData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                <select name="gender" value={employeeData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <input type="text" name="address" value={employeeData.address} onChange={handleChange} placeholder="Address" />
                <input type="text" name="country" value={employeeData.country} onChange={handleChange} placeholder="Country" />
                <input type="text" name="city" value={employeeData.city} onChange={handleChange} placeholder="City" />
                <input type="text" name="skills" value={employeeData.skills} onChange={handleChange} placeholder="Skills" />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditEmployee;
