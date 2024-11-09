import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  LogOut, 
  IdCard,
  UserCircle 
} from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-6">
          <p>Loading profile...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="h-6 w-6" />
              <h1 className="text-2xl font-bold">User Profile</h1>
            </div>
            <Button onClick={handleLogout} variant="destructive" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h2 className="text-2xl font-semibold flex items-center justify-center md:justify-start space-x-2">
                      <span>{user.firstName} {user.lastName}</span>
                      <Badge variant="outline" className="ml-2">
                        {user.role}
                      </Badge>
                    </h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <IdCard className="h-4 w-4" />
                      <span>ID: {user.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Account Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{user.firstName} {user.lastName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2">{user.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Role:</span>
                      <span className="ml-2 capitalize">{user.role}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;