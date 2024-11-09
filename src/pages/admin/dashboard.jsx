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
  CardHeader,
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
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { adminService } from '../../services/admin.service';
import { Mail, Loader2 } from "lucide-react";
import { authService } from '../../services/auth.service';
import { commonService } from '../../services/common';

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [keyID, setkeyID] = useState(null);

  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
    getKeys();
  }, []);

  // Mock data - replace with your actual data
  const [apiKeys, setApiKeys] = useState([]);

  const getKeys = async () => {
    setLoading(true)
    try {
      const result = await adminService.getAllKeys();
      if (result?.data) {
        setApiKeys(result.data);
      }
    } catch (err) {
      toast({
        description: err?.message || "Failed to fetch keys",
        variant: "destructive"
      });
    }
    finally {
      setLoading(false)

    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    toast({
      description: "Logged out successfully",
    });
    navigate('/login');
  };

  const handleKeyAction = (keyId, action, keyName) => {
    toast({
      description: `${action} ${keyName} successfully`,
    });
  };


  const handleRevoke = async (keyId) => {
    setLoading(true)
    try {

      const result = await adminService.revoke({
        keyId
      });
      if (result?.data) {
        await getKeys()

        toast({
          description: "Key Revoked"
        });
      }
    } catch (err) {
      toast({
        description: err?.message || "Failed to revoke key",
        variant: "destructive"
      });
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (isModalOpen == false) {
      setLoading(false)
    }
  }, [isModalOpen])

  const handleAssign = async (keyId) => {
    setIsModalOpen(true)
    setkeyID(keyId)
  };

  const handleAssignClick = async () => {
    setLoading(true)
    try {
      const result = await adminService.assign({
        keyId: keyID,
        email
      });
      if (result?.data) {
        await getKeys()

        toast({
          description: "Key Assigned"
        });
        setIsModalOpen(false)

      }
    } catch (err) {
      toast({
        description: err?.message || "Failed to assign key",
        variant: "destructive"
      });
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">FIDO2 Keys Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your FIDO keys and access</p>
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
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex justify-center items-center">
                            <RefreshCcw className="h-6 w-6 animate-spin" />
                            <span className="ml-2">Loading...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : apiKeys.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No keys found
                        </TableCell>
                      </TableRow>
                    ) : (
                      apiKeys.map((key) => (
                        <TableRow key={key.id}>
                          <TableCell className="font-medium text-left">{key.serialNumber}</TableCell>
                          <TableCell className="text-left">{key?.currentAssignment?.userId?.email}</TableCell>
                          <TableCell className="text-left">

                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {key?.status.toUpperCase()}
                            </Badge>

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
                                {key.status === 'assigned' ? (
                                  <DropdownMenuItem
                                    onClick={() => handleRevoke(key._id)}
                                    className="text-red-600"
                                  >
                                    <Ban className="w-4 h-4 mr-2" />
                                    Revoke Key
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={() => handleAssign(key._id)}
                                    className="text-green-600"
                                  >
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                    Assign Key
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Key</DialogTitle>
            <DialogDescription>
              Enter the email address to assign this key.
            </DialogDescription>
          </DialogHeader>
          <form >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={loading}
                    required
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} onClick={handleAssignClick}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  'Assign Key'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;