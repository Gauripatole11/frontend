import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

// Admin Components
const AdminDashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null)

    const handleLogout = () => {
        localStorage.clear();
        navigate('/admin/login');
    };

    useEffect(()=>{
        let user = localStorage.getItem('user')
        setUser(JSON.parse(user))
    },[])

    return (
        
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
                    <Button onClick={handleLogout} variant="destructive">
                        Logout
                    </Button>
                </div>
                {/* Add your dashboard content here */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Example dashboard cards */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                        <p className="text-3xl font-bold">1,234</p>
                    </div>
                    {/* Add more dashboard cards as needed */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard