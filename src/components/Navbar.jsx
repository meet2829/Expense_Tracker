import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  LogIn,
  UserPlus,
  TrendingUp
} from "lucide-react";
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setExpenses } from '../redux/expenesSlice';

const Navbar = () => {


  const dispatch=useDispatch();
  const [user, setuser] = useState(null)
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentuser) => {
      setuser(currentuser);
    })
    return () => unsub();
  }, [])

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/expenses", label: "Expenses", icon: Receipt },
    { path: "/report", label: "Reports", icon: FileText },
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/register", label: "Register", icon: UserPlus },
  ];

  const HandleLogOut= async()=>{

    try {
      await signOut(auth);
      dispatch(setExpenses([]));
      console.log("user is Log Out")
      
    } catch (error) {
    console.log("somt thing went wrong",error)
      
    }

  }

  return (
    <nav className=" top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <TrendingUp className="h-8 w-8 text-primary animate-glow-pulse" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-glow-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text">
              Expense-Tracker
            </span>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300
                    ${isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }
                    group
                  `}
                >
                  <Icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                  <span className="text-sm">{item.label}</span>

                  {/* Hover glow effect */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              );
            })}

            {user ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Hello, {user.displayName || user.email.split('@')[0]}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-400">Not Logged In</span>
            )}

            <button onClick={HandleLogOut} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-5">
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (hidden by default) */}
      <div className="md:hidden bg-card/95 backdrop-blur-sm border-t border-border/50">
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-300
                  ${isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};


export default Navbar
