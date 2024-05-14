import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const history = useNavigate(); // Initialize useHistory hook

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to your backend with the form data
            const response = await axios.post('/api/signup', formData);
            console.log('Registration successful:', response.data);

            // Redirect to login page after successful registration
            history.push('/login');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
        }
    };

    return (
        <div className="bg-white h-screen">
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="max-w-md mx-auto">
                    <div className="mb-8 space-y-3">
                        <p className="text-xl font-semibold">Signup</p>
                        <p className="text-gray-500">Enter your details to create an account.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium leading-none">Username</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="border-input bg-background ring-offset-background placeholder-text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="angelina" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border-input bg-background ring-offset-background placeholder-text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="mail@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="border-input bg-background ring-offset-background placeholder-text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required />
                        </div>
                        <button type="submit" className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Signup</button>
                    </form>
                    <div className="py-3"> Already have one? <a className="text-blue-500" href="/login">Login here</a> </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
