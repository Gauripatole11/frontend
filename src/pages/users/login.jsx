import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"
import { authService } from '../../services/auth.service';
import { commonService } from '../../services/common';

const LoginPage = () => {
  const { toast } = useToast()
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with email:', email);

    try {
      let result = await authService.loginBegin({
        email
      });

      if (result && result.data) {
        const { data } = result;
        // Convert challenge and credential IDs
        const options = {
          ...data.options,
          challenge: commonService.base64urlToBuffer(data.options.challenge),
          allowCredentials: data.options.allowCredentials?.map(cred => ({
            ...cred,
            id: commonService.base64urlToBuffer(cred.id)
          }))
        };


        // Get credential
        const credential = await navigator.credentials.get({
          publicKey: options
        });

        const assertionResponse = {
          id: credential.id,
          rawId: commonService.bufferToBase64url(credential.rawId),
          response: {
            clientDataJSON: commonService.bufferToBase64url(
              credential.response.clientDataJSON
            ),
            authenticatorData: commonService.bufferToBase64url(
              credential.response.authenticatorData
            ),
            signature: commonService.bufferToBase64url(
              credential.response.signature
            ),
            userHandle: credential.response.userHandle ?
              commonService.bufferToBase64url(credential.response.userHandle) : null
          },
          type: credential.type
        };

        const completeResponse = await authService.loginComplete({
          email,
          assertionResponse
        });

        if (completeResponse && completeResponse.data) {
          const { data } = completeResponse;
          console.log(data)

          localStorage.setItem("token", data.token)
          localStorage.setItem("role", data.user?.role)
          localStorage.setItem("user", JSON.stringify(data.user))


        }

      }
    }
    catch (err) {
      toast({
        description: err?.message
      })
    }



  };

  const hangleRegisterClick = async (e) => {
    if (!email || email == '') {
      toast({
        description: "Invalid Email"
      })
      return null;
    }

    try {
      let result = await authService.registerBegin({
        email
      });
      if (result && result.data) {
        let { data } = result;
        const publicKeyCredentialCreationOptions = {
          challenge: commonService.base64urlToBuffer(data.options.challenge),
          rp: data.options.rp,
          user: {
            id: commonService.base64urlToBuffer(data.options.user.id),
            name: email,
            displayName: data.options.user.displayName
          },
          pubKeyCredParams: data.options.pubKeyCredParams,
          timeout: data.options.timeout,
          attestation: data.options.attestation,
          authenticatorSelection: data.options.authenticatorSelection
        }

        const credential = await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions
        });

        const attestationResponse = {
          id: commonService.bufferToBase64url(credential.rawId),
          rawId: commonService.bufferToBase64url(credential.rawId),
          response: {
            clientDataJSON: commonService.bufferToBase64url(
              credential.response.clientDataJSON
            ),
            attestationObject: commonService.bufferToBase64url(
              credential.response.attestationObject
            )
          },
          type: credential.type
        };

        let resultReg = await authService.registerComplete({
          userId: data.userId,
          attestationResponse
        });

        if (resultReg) {
          toast({
            description: "passkey registered Success Please Login"
          })
        }



      }
    }
    catch (err) {
      toast({
        description: err?.message
      })
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-2"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={hangleRegisterClick}>
            Register Passkey
          </Button>
          <div className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;