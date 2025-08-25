"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Settings, CreditCard, FileText, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Gemini from "./gemini";

interface Profile {
  name: string;
  email: string;
  avatar: string;
  subscription?: string;
  model?: string;
}

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

const SAMPLE_PROFILE_DATA: Profile = {
  name: "Julius Caezar",
  email: "juliuscaezarff@gmail.com",
  avatar: "/perfil.webp",
  subscription: "PRO",
  model: "Gemini 2.0 Flash",
};

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Profile;
  showTopbar?: boolean;
}

export default function ProfileDropdown({
  data = SAMPLE_PROFILE_DATA,
  className,
  ...props
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuItems: MenuItem[] = [
    {
      label: "Profile",
      href: "#",
      icon: (
        <User className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
      ),
    },
    {
      label: "Model",
      value: data.model,
      href: "#",
      icon: (
        <Gemini className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
      ),
    },
    {
      label: "Subscription",
      value: data.subscription,
      href: "#",
      icon: (
        <CreditCard className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
      ),
    },
    {
      label: "Terms & Policies",
      href: "#",
      icon: (
        <FileText className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
      ),
      external: true,
    },
  ];

  return (
    <div className={cn("relative", className)} {...props}>
      <DropdownMenu onOpenChange={setIsOpen}>
        <div className="group relative">
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-16 p-2 rounded-2xl bg-zinc-900/80 border border-zinc-700/60 hover:border-zinc-600 hover:bg-zinc-800/60 hover:shadow-sm transition-all duration-200 focus:outline-none backdrop-blur-sm"
            >
              <div className="text-left flex-1">
                <div className="text-sm font-medium text-zinc-100 tracking-tight leading-tight">
                  {data.name}
                </div>
                <div className="text-xs text-zinc-400 tracking-tight leading-tight">
                  {data.email}
                </div>
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-full p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                    <Image
                      src={data.avatar}
                      alt={data.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>

          {/* Bending line indicator on the right */}
          <div
            className={cn(
              "absolute -right-3 top-1/2 -translate-y-1/2 transition-all duration-200",
              isOpen ? "opacity-100" : "opacity-60 group-hover:opacity-100"
            )}
          >
            <svg
              width="12"
              height="24"
              viewBox="0 0 12 24"
              fill="none"
              className={cn(
                "transition-all duration-200",
                isOpen
                  ? "text-blue-400 scale-110"
                  : "text-zinc-500 group-hover:text-zinc-300"
              )}
              aria-hidden="true"
            >
              <path
                d="M2 4C6 8 6 16 2 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="w-64 p-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-2xl shadow-xl shadow-zinc-950/20 
                    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-top-right"
          >
            <div className="space-y-1">
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  asChild
                  className="focus:bg-transparent hover:bg-transparent"
                >
                  <Link
                    href={item.href}
                    className="flex items-center p-3 hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group hover:shadow-sm border border-transparent hover:border-zinc-700/50"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {item.icon}
                      <span className="text-sm font-medium text-zinc-100 tracking-tight leading-tight whitespace-nowrap group-hover:text-zinc-600 transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex-shrink-0 ml-auto">
                      {item.value && (
                        <span
                          className={cn(
                            "text-xs font-medium rounded-md py-1 px-2 tracking-tight",
                            item.label === "Model"
                              ? "text-blue-400 bg-blue-500/10 border border-blue-500/10"
                              : "text-purple-400 bg-purple-500/10 border border-purple-500/10"
                          )}
                        >
                          {item.value}
                        </span>
                      )}
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator className="my-3 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <DropdownMenuItem
              asChild
              className="focus:bg-transparent hover:bg-transparent"
            >
              <button
                type="button"
                className="w-full flex items-center gap-3 p-3 duration-200 bg-red-500/10 rounded-xl hover:bg-red-500/20 cursor-pointer border border-transparent hover:border-red-500/30 transition-all group"
              >
                <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                <span className="text-sm font-medium text-red-400 group-hover:text-red-300">
                  Sign Out
                </span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
}
