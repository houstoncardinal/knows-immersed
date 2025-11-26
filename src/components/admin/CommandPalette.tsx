import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  Package,
  BarChart3,
  Settings,
  Plus,
  Search,
  FileText,
  Mail,
  Phone,
  Download,
} from "lucide-react";

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <>
      <div className="hidden lg:block">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-muted/50 rounded-lg hover:bg-muted transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          className="placeholder:text-white/70"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => navigate("/admin/dashboard"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/admin/bookings"))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Bookings</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/admin/clients"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Clients</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/admin/projects"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/admin/equipment"))}>
              <Package className="mr-2 h-4 w-4" />
              <span>Equipment</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/admin/analytics"))}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/admin/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => runCommand(() => console.log("Create booking"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New Booking</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Add client"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add New Client</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Create project"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New Project</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Export data"))}>
              <Download className="mr-2 h-4 w-4" />
              <span>Export Data</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent Searches">
            <CommandItem>
              <Search className="mr-2 h-4 w-4" />
              <span>Sarah Martinez</span>
            </CommandItem>
            <CommandItem>
              <Search className="mr-2 h-4 w-4" />
              <span>BK-001</span>
            </CommandItem>
            <CommandItem>
              <Search className="mr-2 h-4 w-4" />
              <span>December bookings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
