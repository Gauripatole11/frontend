import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast"

import { 
  MoreVertical, 
  Key, 
  Shield, 
  LogOut,
  CheckCircle,
  XCircle,
  RefreshCcw,
  Ban,
  User
} from "lucide-react";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  // Mock data - replace with your actual data
  const [apiKeys] = useState([
    {
      id: 'key_1',
      keyName: 'Production API Key',
      assignedTo: 'John Doe',
      status: 'active',
      createdAt: '2024-03-15',
    },
    {
      id: 'key_2',
      keyName: 'Development API Key',
      assignedTo: 'Jane Smith',
      status: 'revoked',
      createdAt: '2024-03-10',
    },
    {
      id: 'key_3',
      keyName: 'Testing API Key',
      assignedTo: 'Mike Johnson',
      status: 'active',
      createdAt: '2024-03-05',
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
    navigate('/login');
  };

  const handleKeyAction = (keyId, action, keyName) => {
    toast({
      title: "Success",
      description: `${action} ${keyName} successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">API Keys Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your API keys and access</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="destructive" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-4 mb-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl flex items-center">
                    <Key className="h-5 w-5 mr-2" />
                    API Keys
                  </CardTitle>
                  <CardDescription>
                    View and manage all API keys
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key Name</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium text-left">{key.keyName}</TableCell>
                        <TableCell className="text-left">{key.assignedTo}</TableCell>
                        <TableCell className="text-left">
                          {key.status === 'active' ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                              <XCircle className="w-3 h-3 mr-1" />
                              Revoked
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-left">{new Date(key.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {key.status === 'active' ? (
                                <DropdownMenuItem
                                  onClick={() => handleKeyAction(key.id, 'Revoked', key.keyName)}
                                  className="text-red-600"
                                >
                                  <Ban className="w-4 h-4 mr-2" />
                                  Revoke Key
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleKeyAction(key.id, 'Reactivated', key.keyName)}
                                  className="text-green-600"
                                >
                                  <RefreshCcw className="w-4 h-4 mr-2" />
                                  Reactivate Key
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;