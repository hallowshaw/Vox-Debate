import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser(props) {
  const { user } = props;
  const { isMobile } = useSidebar();

  // Function to extract initials from the user's name
  const getInitials = (name) => {
    if (!name) return "G"; // Default fallback to "G" for Guest
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  const initials = getInitials(user?.username); // Safely get initials
  const avatarSrc = user?.avatar || ""; // Fallback to an empty string
  const displayName = user?.username || "Guest"; // Fallback to "Guest"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Avatar and Greeting */}
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarSrc} alt={displayName} />
                  <AvatarFallback className="bg-purple-200 dark:bg-purple-950 rounded-full">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid text-left text-sm leading-tight">
                  <span className="truncate font-semibold hover:text-purple-800 hover:drop-shadow-xl">
                    Hello, {displayName}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
