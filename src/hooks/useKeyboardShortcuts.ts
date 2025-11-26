import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ShortcutAction {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutAction[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const matchingShortcut = shortcuts.find((shortcut) => {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = !shortcut.ctrl || event.ctrlKey;
        const shiftMatches = !shortcut.shift || event.shiftKey;
        const altMatches = !shortcut.alt || event.altKey;
        const metaMatches = !shortcut.meta || event.metaKey;

        return keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches;
      });

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};

export const useAdminShortcuts = () => {
  const navigate = useNavigate();

  const shortcuts: ShortcutAction[] = [
    {
      key: "d",
      ctrl: true,
      description: "Go to Dashboard",
      action: () => navigate("/admin/dashboard"),
    },
    {
      key: "b",
      ctrl: true,
      description: "Go to Bookings",
      action: () => navigate("/admin/bookings"),
    },
    {
      key: "c",
      ctrl: true,
      shift: true,
      description: "Go to Clients",
      action: () => navigate("/admin/clients"),
    },
    {
      key: "p",
      ctrl: true,
      description: "Go to Projects",
      action: () => navigate("/admin/projects"),
    },
    {
      key: "e",
      ctrl: true,
      shift: true,
      description: "Go to Equipment",
      action: () => navigate("/admin/equipment"),
    },
    {
      key: "a",
      ctrl: true,
      shift: true,
      description: "Go to Analytics",
      action: () => navigate("/admin/analytics"),
    },
    {
      key: "n",
      ctrl: true,
      description: "Create New Booking",
      action: () => toast.info("New Booking Modal - Coming Soon"),
    },
    {
      key: "s",
      ctrl: true,
      description: "Save Changes",
      action: () => toast.success("Changes Saved"),
    },
    {
      key: "?",
      shift: true,
      description: "Show Keyboard Shortcuts",
      action: () => toast.info("Keyboard Shortcuts Guide", {
        description: "Press Ctrl+K to open command palette",
      }),
    },
  ];

  useKeyboardShortcuts(shortcuts);

  return shortcuts;
};
