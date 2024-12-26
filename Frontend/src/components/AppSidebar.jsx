import React, { useState, useContext, useEffect } from "react";
import {
  House,
  Gamepad,
  Calendar,
  FileText,
  BookOpen,
  UserPlus,
  LogIn,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AppSidebar = (props) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Loading state for logout
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || profileFetched) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/profile",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          setUserInfo(null);
          toast.warn("Unable to load profile. Please log in.", {
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUserInfo(null);
      } finally {
        setProfileFetched(true);
      }
    };

    fetchProfile();
  }, [userInfo, profileFetched, setUserInfo]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 954);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = async () => {
    setIsLoggingOut(true); // Set loading state to true when logging out
    toast.info("Logging you out...", { autoClose: 3000 }); // Show loading toast immediately

    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/logout",
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          setUserInfo(null); // Clear user info
          toast.dismiss(); // Dismiss the loading toast
          toast.success("You have been logged out successfully!", {
            autoClose: 2000,
          });

          setProfileFetched(false);
          navigate("/");
        } else {
          toast.dismiss();
          toast.warn("Logout failed. Please try again.", { autoClose: 2000 });
        }
      } catch (error) {
        toast.dismiss();
        toast.error("An error occurred during logout. Please try again.", {
          autoClose: 2000,
        });
      } finally {
        setIsLoggingOut(false); // Set loading state to false after logout process
      }
    }, 1000); // Delay the API call by 1 second
  };

  const confirmLogout = () => {
    setShowLogoutConfirmation(false); // Hide the confirmation modal
    logout(); // Perform the logout
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false); // Hide the confirmation modal
  };

  const isLoggedIn = Boolean(userInfo?.data?.username);

  const handleClick = (path) => {
    if (userInfo) {
      navigate(path);
    } else {
      toast.info("Please log in to access this page!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <Sidebar
        collapsible="icon"
        {...props}
        className="bg-white bg-opacity-40 backdrop-blur-lg border-none shadow-xl rounded-r-xl rounded-l-none dark:bg-black dark:bg-opacity-60 dark:backdrop-blur-lg"
      >
        <SidebarContent>
          <SidebarGroup>
            {userInfo ? (
              <NavUser user={userInfo.data} />
            ) : (
              <NavUser user="Guest" />
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/">
                      <House />
                      <span>Home</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/playground"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick("/playground");
                      }}
                    >
                      <Gamepad />
                      <span>Playground</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/manual"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick("/manual");
                      }}
                    >
                      <FileText />
                      <span>Manual</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {isMobile && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/about">
                          <Calendar />
                          <span>About</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/testimonials">
                          <BookOpen />
                          <span>Testimonials</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/blogs">
                          <BookOpen />
                          <span>Blogs</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
                {isLoggedIn ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowLogoutConfirmation(true);
                        }}
                        className="w-full flex items-center"
                      >
                        <LogOut />
                        <span>Logout</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/login">
                          <LogIn />
                          <span>Login</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/signup">
                          <UserPlus />
                          <span>Signup</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Confirmation Modal for Logout (outside Sidebar) */}
      {showLogoutConfirmation && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white dark:bg-[#2a2a2a] p-6 rounded-lg shadow-xl w-96"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-[#eaeaea]">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={cancelLogout}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg dark:bg-red-600 dark:text-white"
              >
                Confirm Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default AppSidebar;
