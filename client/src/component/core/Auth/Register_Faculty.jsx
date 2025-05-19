import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slice/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { Button } from "../../../component/ui/button";
import { Input } from "../../../component/ui/input";
import { Label } from "../../../component/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../component/ui/Select";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const RegisterFaculty = () => {
  const isLoading = useSelector((state) => state.auth.setLoading);
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountType: ACCOUNT_TYPE.HOD,
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const accountTypes = Object.values(ACCOUNT_TYPE).map((type) => ({
    label: type.replaceAll('_', ' ').toLowerCase().replace(/(^\w|\s\w)/g, c => c.toUpperCase()),
    value: type
  }));

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Real-time validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@rgipt\.ac\.in$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Email must belong to the rgipt.ac.in domain" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== credentials.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleOnChange = (e) => {
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }))
  }
  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()

    validateEmail(credentials.email)
    validatePassword(credentials.password)
    validateConfirmPassword(credentials.confirmPassword)

    console.log(credentials)

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    const signupData = {
      ...credentials,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(credentials.email, navigate))

    // Reset
    setCredentials({
      firstName: "",
      lastName: "",
      email: "",
      role: ACCOUNT_TYPE.HOD,
      password: "",
      confirmPassword: "",
    })
  }


  return (
    <>

      <div className="min-h-screen flex flex-col bg-background grid-background dark">

        <div className="flex-1 flex flex-col items-center justify-center px-4 my-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
              <p className="text-gray-400">Create an account to continue using our system.</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="block text-white font-medium">First Name</Label>
                  <Input id="first-name" type="text" name='firstName' placeholder="John" value={credentials.firstName} onChange={(e) => handleOnChange(e)} required className="text-white bg-transparent" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name" className="block text-white font-medium">Last Name</Label>
                  <Input id="last-name" name='lastName' type="text" placeholder="Doe" value={credentials.lastName} onChange={(e) => handleOnChange(e)} required className="text-white bg-transparent" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="block text-white font-medium">Email</Label>
                <Input id="email" placeholder="john@rgipt.ac.in" value={credentials.email} onChange={(e) => {
                  handleOnChange(e)
                }
                } name='email' required className="text-white bg-transparent" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="block text-white font-medium">Role</Label>
                <Select
                  id="role" className="text-white bg-transparent"
                  value={credentials.accountType}
                  onValueChange={(value) =>
                    setCredentials({ ...credentials, accountType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((role) => {
                      return (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      );
                    })}

                  </SelectContent>
                </Select>
              </div>



              <div className="space-y-2">
                <Label htmlFor="password" className="block text-white font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => {
                      handleOnChange(e)
                    }} name='password'
                    required className="text-white bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}

                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="block text-white font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={credentials.confirmPassword}
                    onChange={(e) => {
                      handleOnChange(e)
                    }
                    } name='confirmPassword'
                    required className="text-white bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

              </div>


              <div className="flex flex-col space-y-4">
                              <button disabled={isLoading} style={{"backgroundColor":"#0060af"}} className=" relative group/btn block dark:bg-primary w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">
                                {isLoading ? (
                                  <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Creating account...
                                  </div>
                                ) : (
                                  "Create Account"
                                )}
                                <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span><span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></span></button>
              
                            
              
                              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"></div>
                              <div className="text-center text-sm text-white">
                                Already have an account?{" "}
                                <Link to="/login" className="text-cyan-400 hover:underline">
                                  Sign in
                                </Link>
                               
                              </div>
                              <p className="text-center text-sm text-white">or</p>
                              <div className="text-center text-sm text-white">
                                Are you Student ?{" "}
                                <Link to="/signup-student" className="text-cyan-400 hover:underline">
                                  Register Here
                                </Link>
                               
                              </div>
                            </div>
            </form>

          </div>
        </div>
      </div>


    </>
  )
}

export default RegisterFaculty