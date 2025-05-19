import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button";
import { Input } from "../component/ui/input";
import { toast } from "sonner";
import { Lock, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Eye, EyeOff } from "lucide-react";
import { setLoading } from "../slice/authSlice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../component/ui/card";
import { Label } from "../component/ui/label";
import { changePassword } from "../services/operations/authAPI";



export default function ForgotPassword() {
    const user = useSelector((state) => state.profile.user);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


   const handleInputChange = (e) => {
       const { name, value } = e.target;
       setFormData((prev) => ({
         ...prev,
         [name]: value,
       }));
     };
   
     
     const handlePasswordUpdate = (e) => {
       e.preventDefault();
   
       if (formData.newPassword !== formData.confirmPassword) {
         alert("New passwords do not match.");
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
        <Card className="mt-5 w-[60%] mx-auto">
        <form onSubmit={handlePasswordUpdate}>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="block text-white font-medium">Current Password</label>

              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  name="currentPassword"
                  className="text-white bg-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-white font-medium">New Password</label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="text-white bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="block text-white font-medium">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmNewPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="text-white bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showConfirmNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              <span className="absolute z- inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_60deg_at_50%_50%,#6A27FF_0%,#27E5FF_50%,#6A27FF_80%)]"></span>
              <span className="inline-flex h-full w-[180px] cursor-pointer items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Update Password
              </span></Button>
          </CardFooter>
        </form>
      </Card>
    );
}