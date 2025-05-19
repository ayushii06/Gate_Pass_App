
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings2 } from "lucide-react";
import { Button } from "../../component/ui/button";
import { logout } from "../../services/operations/authAPI";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../component/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import bg_gradient from '../../assets/background_gradient.png'
import Notifications from "./Notifications";

export function Navbar({updates}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
 

  if (!user) return null;

  return (
    <nav className="bg-background border-b border-border py-2">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={bg_gradient} alt="hero" className="w-full md:w-[70vw] h-[40vh] md:h-[50vh] absolute top-0 left-0 right-0 z-0 mx-auto" />
            <img src={logo} alt="Logo" className="h-10 w-10 inline-block " />
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Notifications  userType={user?.role||"HOD"} updates={updates} />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings2 className="h-10 w-10 py-2 px-2 border rounded-full  border-white text-white">
                  </Settings2>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      dispatch(logout(navigate));
                      // logout(navigate);
                    }}
                    className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>

              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 border-t border-border py-2 rounded-md text-base font-medium  ${location.pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}

              </Link>
            ))}
            <div className="border-t border-border pt-4 pb-3">
              <div className="px-3 space-y-1">
                <div className="flex items-center">
                  <Settings2 className="h-8 w-8 mr-3" />

                  <div>
                    <div className="text-base font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-foreground hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start px-3 py-2 rounded-md  font-medium "
                  onClick={() => {
                    dispatch(logout(navigate));
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
