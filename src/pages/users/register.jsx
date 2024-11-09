import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, User, BadgeCheck, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useToast } from "@/hooks/use-toast"


// Validation Schema
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  employeeId: Yup.string()
    .matches(/^EMP\d{3,}$/, 'Employee ID must start with EMP followed by at least 3 numbers')
    .required('Employee ID is required'),
  department: Yup.string()
    .required('Department is required')
});

const RegisterPage = () => {

  const { toast } = useToast()

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Operations",
    "Customer Support"
  ];

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
    department: ''
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to register your employee account
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // Handle registration logic here
            console.log('Registration attempted with:', values);
            setTimeout(() => {
              setSubmitting(false);
            }, 1000);

            try {
              let result = await authService.register(values);
              toast({
                description: result.data.messgae
              })
            }
            catch (err) {
              toast({
                description: err?.message
              })
            }
          }}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form>
              <CardContent className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className={`pl-10 ${errors.firstName && touched.firstName ? 'border-red-500' : ''}`}
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      {errors.firstName && touched.firstName && (
                        <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className={`pl-10 ${errors.lastName && touched.lastName ? 'border-red-500' : ''}`}
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      {errors.lastName && touched.lastName && (
                        <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john.doe@company.com"
                      className={`pl-10 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Employee ID Field */}
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="employeeId"
                      name="employeeId"
                      placeholder="EMP123"
                      className={`pl-10 ${errors.employeeId && touched.employeeId ? 'border-red-500' : ''}`}
                    />
                    <BadgeCheck className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    {errors.employeeId && touched.employeeId && (
                      <div className="text-red-500 text-sm mt-1">{errors.employeeId}</div>
                    )}
                  </div>
                </div>

                {/* Department Field */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={values.department}
                    onValueChange={(value) => setFieldValue('department', value)}
                  >
                    <SelectTrigger className={errors.department && touched.department ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase()}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && touched.department && (
                    <div className="text-red-500 text-sm mt-1">{errors.department}</div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register Account'
                  )}
                </Button>
              </CardContent>
            </Form>
          )}
        </Formik>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;