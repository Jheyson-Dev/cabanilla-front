import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
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
    path: "/person",
    name: "Persons",
    icon: <DashboardSquare01Icon size={20} />,
  },
  {
    path: "/user",
    name: "User",
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
      <header className=" sticky top-0 z-[99999] bg-background py-4 flex justify-between items-center border-b px-10 shadow">
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
              <li>
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
