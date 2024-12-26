import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SidebarButtons({ collapsed }) {
  return (
    <Card
      className={`shadow-xl transition-all duration-300 ${
        collapsed ? "w-14" : "w-[90%]"
      } mx-auto rounded-lg border-none`}
    >
      {!collapsed && ( // Hide the buttons when sidebar is collapsed
        <div className="grid gap-3 p-4">
          <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none transition-colors duration-200 hover:bg-sidebar-primary-foreground hover:text-sidebar-primary rounded-lg px-4 py-2 text-base"
            size="sm"
          >
            Log in
          </Button>
          <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none transition-colors duration-200 hover:bg-sidebar-primary-foreground hover:text-sidebar-primary rounded-lg px-4 py-2 text-base"
            size="sm"
          >
            Sign up
          </Button>
        </div>
      )}
    </Card>
  );
}
