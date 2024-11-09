import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"

import { authService } from '../../services/auth.service'

// Admin Login Component
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfa, setMfa] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your admin login logic here
    // On successful login:

    const raw = JSON.stringify({
      "email": email,
      "password": password,
      "mfaCode": mfa
    });
    try{
      let result = await authService.adminLogin(raw);
      if(result && result.data){
        let token = result.data.token;
        let admin = result.data.admin;
  
        await localStorage.setItem('token', token);
        await localStorage.setItem('user', JSON.stringify(admin))
        await localStorage.setItem('role', 'admin')
        navigate('/admin/dashboard');
      }
    }
    catch(er){
      toast({
        description: er?.message,
      })
      console.log(er)
    }
    
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                type="string"
                placeholder="MFA"
                value={mfa}
                onChange={(e) => setMfa(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login as Admin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;