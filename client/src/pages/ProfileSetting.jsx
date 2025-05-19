import { useState } from "react";
import { Navbar } from "../component/common/Navbar";
import { Button } from "../component/ui/button";
import { Input } from "../component/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../component/ui/card";
import { Label } from "../component/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../component/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../component/ui/tabs";
import { User, Mail, Lock, Camera, BadgeCheck, GraduationCap, Building, Settings2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changePassword } from "../services/operations/authAPI";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  console.log("User data:", user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.firstName + " " + user?.lastName || "",
    email: user?.email || "",
    branch: user?.branch || "",
    rollNo: user?.rollNo || "",
    year: user?.year || "",
    accountType: user?.accountType || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const dispatch = useDispatch();


  const getInitials = (name) => {
    if (!name) return "U"; // Fallback to 'U' if name is not provided'
    const names = name.split(" ");
    if (names.length === 1) return names[0][0].toUpperCase(); // Return first letter if only one name

    return names[0][0].toUpperCase() + names[1][0].toUpperCase(); // Return initials of first and last name
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Mock update - in a real app, this would call an API
    alert("Profile updated successfully!");
    // toast({
    //   title: "Profile updated",
    //   description: "Your profile information has been updated successfully.",
    // });
    setIsEditing(false);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match.");
      // toast({
      //   title: "Error",
      //   description: "New passwords do not match.",
      //   variant: "destructive",
      // });
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      alert("New password cannot be the same as the current password.");
      return;
    }
    dispatch(changePassword(formData.currentPassword, formData.newPassword, formData.confirmPassword, user.token));

    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar updates={[]}/>
      <div className="container mx-auto px-4 py-5 relative z-2">

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="border border-white rounded-2xl">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl bg-[#d22a2a] text-white">
                      {user ? getInitials(user.firstName) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user?.firstName} {user?.lastName}</CardTitle>
                <CardDescription className='text-gray-200'>{user?.email}</CardDescription>
                <CardDescription className="mt-2 capitalize">
                  {user?.role}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">

                 
                      
                        <Button variant="outline" className="justify-center " onClick={()=>{navigate("/update-password")}}>
                          <Settings2 className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                   


              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
          
                <Card>
                  <form onSubmit={handleProfileUpdate}>
                    <CardHeader>
                      <CardTitle>Profile Details</CardTitle>
                      <CardDescription className='text-gray-200'>
                        Update your profile information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-white">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Roll Number</Label>
                        <div className="relative">
                          <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="rollno"
                            name="rollno"
                            type="text"
                            value={formData.rollNo}
                            onChange={handleInputChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="branch">Branch</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="branch"
                            name="branch"
                            type="text"
                            value={formData.branch}
                            onChange={handleInputChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="year"
                            name="year"
                            type="text"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>


                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {isEditing ? (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Save Changes</Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="ml-auto"
                        >
                           <span className="absolute z- inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_60deg_at_50%_50%,#6A27FF_0%,#27E5FF_50%,#6A27FF_80%)]"></span>
                        <span className="inline-flex h-full w-[180px] cursor-pointer items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                         
                          Edit Profile
                        </span>
                        </Button>
                      )}
                    </CardFooter>
                  </form>
                </Card>
           

             
               
           
          </div>
        </div>
      </div>
    </div>
  );
}