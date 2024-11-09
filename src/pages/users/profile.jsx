// User Profile Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const UserProfile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">User Profile</h1>
                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {/* Add profile information here */}
                        <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 rounded-full bg-gray-200" />
                            <div>
                                <h2 className="text-xl font-semibold">John Doe</h2>
                                <p className="text-gray-600">john.doe@example.com</p>
                            </div>
                        </div>
                        {/* Add more profile details as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;