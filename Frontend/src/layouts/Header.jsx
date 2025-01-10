import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

// Define the ListItem component
const ListItem = ({ title, href, onClick, children }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        href={href}
        onClick={onClick}
        className="flex justify-between rounded-md p-3 text-sm font-medium text-muted-foreground hover:bg-muted focus:outline-none"
      >
        <span>{title}</span>
        <span className="text-xs text-muted-foreground">{children}</span>
      </a>
    </NavigationMenuLink>
  </li>
);

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 954);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return null; // Hide Header in mobile view
  }

  const handleLinkClick = (event, path) => {
    event.preventDefault(); // Prevent the default link behavior
    if (userInfo) {
      navigate(path);
    } else {
      toast.info("Please log in to access the playground!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-lg">
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Explore
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Why use Vox Debate?
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/about" title="About"></ListItem>
                <ListItem
                  onClick={(e) => handleLinkClick(e, "/manual")}
                  title="Guide"
                  style={{ cursor: "pointer" }}
                ></ListItem>
                <ListItem href="/testimonials" title="Testimonials"></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
            <NavigationMenuContent className="px-40 py-10 text-lg font-medium bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-lg">
              Coming Soon !
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Blogs</NavigationMenuTrigger>
            <NavigationMenuContent className="px-40 py-10 text-lg font-medium bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-lg">
              Coming Soon !
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ToastContainer />
    </>
  );
};

export default Header;
