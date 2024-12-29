import * as React from "react";
import PropTypes from 'prop-types';
import { Icons } from "@/components/AdminPage/icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function AdminNav({ onNavigate, activeView }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Icons.logo },
          { id: 'users', label: 'User Management', icon: Icons.users },
          { id: 'events', label: 'Event Management', icon: Icons.events },
        ].map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'cursor-pointer',
                activeView === item.id && 'bg-accent'
              )}
              onClick={() => onNavigate(item.id)}
            >
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

AdminNav.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  activeView: PropTypes.string.isRequired,
}; 