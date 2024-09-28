import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/sonner";
import {
  Calendar03Icon,
  DashboardSpeed01Icon,
  DashboardSquare01Icon,
  LogoutSquare02Icon,
  Menu01Icon,
  Moon02Icon,
  MoreVerticalCircle02Icon,
  Settings02Icon,
  Sun03Icon,
} from "hugeicons-react";

import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import { useTheme } from "@/context/ThemeContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const optionsNav = [
  {
    path: "/",
    name: "Dashboard",
    icon: <DashboardSpeed01Icon size={20} />,
  },
  {
    path: "/user",
    name: "User",
    icon: <DashboardSquare01Icon size={20} />,
  },
  {
    path: "/rol",
    name: "Rol",
    icon: <DashboardSquare01Icon size={20} />,
  },
];

export const App: React.FC = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const logo = theme === "dark" ? logoDark : logoLight;

  return (
    <div>
      {/* z-[99999] */}
      <header className=" sticky top-0  bg-background py-4 flex justify-between items-center border-b px-10 shadow">
        {/* Logo y nombre */}
        <div className="flex-1 max-w-64 items-center justify-start space-x-2 hidden md:flex">
          <img src={logo} alt="Sakai Logo" className="w-14 md:w-20" />
          <span className="text-lg font-bold">CABANILLA</span>
        </div>
        {/* Menú de hamburguesa */}
        <div className="flex-1 flex justify-start md:ml-10">
          <div
            className="p-2  rounded-full hover:bg-gray-200 dark:hover:text-background cursor-pointer"
            onClick={toggleAside}
          >
            <Menu01Icon />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-start space-x-2 md:hidden">
          <img src={logo} alt="Sakai Logo" className="w-14" />
          <span className="text-lg font-bold">CABANILLA</span>
        </div>
        {/* Íconos a la derecha */}
        <div className="flex-1 hidden md:flex justify-end items-center">
          <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:text-background cursor-pointer">
            <Calendar03Icon />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:text-background cursor-pointer">
            <Settings02Icon />
          </div>
          <div
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:text-background cursor-pointer transition duration-500"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun03Icon /> : <Moon02Icon />}
          </div>

          {/* <div>
            <ThemeToggle />
          </div> */}
          <div
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:text-background cursor-pointer"
            onClick={logout}
          >
            <LogoutSquare02Icon />
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <MoreVerticalCircle02Icon />
                <span className="sr-only">Abrir menú de opciones</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="grid gap-2">
                <Button variant="ghost" className="w-full justify-start">
                  {/* <Edit className="mr-2 h-4 w-4" /> */}
                  Editar
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  {/* <Trash className="mr-2 h-4 w-4" /> */}
                  Eliminar
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  {/* <Share className="mr-2 h-4 w-4" /> */}
                  Compartir
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <main className="px-10 mx-auto flex mt-10">
        <nav
          className={`transition-all duration-300 rounded-xl max-w-64 ${
            isAsideOpen ? " p-4 border w-1/3" : " w-0 overflow-hidden"
          }`}
        >
          <ul className="space-y-2">
            {optionsNav.map((option) => (
              <li key={option.path}>
                <NavLink
                  to={option.path}
                  className={({ isActive, isPending }) =>
                    `flex items-center gap-2 w-full h-10 px-2 rounded-lg text-lg font-semibold cursor-pointer ${
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-accent"
                        : "hover:bg-accent"
                    }`
                  }
                >
                  {option.icon}
                  {option.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 mx-2">
          <Outlet />
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                error: "bg-red-400 text-white",
                success: "bg-green-400 text-white",
                warning: "text-yellow-400",
                info: "bg-blue-400",
                loading: "bg-blue-400 text-white",
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="flex justify-center items-center relative cursor-pointer text-[30px] select-none fill-[#a5a5b0]">
      <input
        checked={theme === "dark"}
        onChange={toggleTheme}
        type="checkbox"
        className="absolute opacity-0 cursor-pointer h-0 w-0"
      />
      <svg
        viewBox="0 0 384 512"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute ${
          theme === "light" ? "block" : "hidden"
        } animate-[keyframes-fill_0.5s]`}
        style={{
          animation: "keyframes-fill 0.5s",
        }}
      >
        <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
      </svg>
      <svg
        viewBox="0 0 512 512"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute ${
          theme === "dark" ? "block" : "hidden"
        } animate-[keyframes-fill_0.5s]`}
        style={{
          animation: "keyframes-fill 0.5s",
        }}
      >
        <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path>
      </svg>
      <style>{`
        @keyframes keyframes-fill {
          0% {
            transform: rotate(-360deg) scale(0);
            opacity: 0;
          }
          75% {
            transform: rotate(25deg);
          }
        }
      `}</style>
    </label>
  );
}
