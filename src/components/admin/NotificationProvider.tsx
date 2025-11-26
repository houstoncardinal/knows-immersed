import { Toaster } from "sonner";

export const NotificationProvider = () => {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      theme="dark"
      toastOptions={{
        style: {
          background: "hsl(0 0% 8%)",
          border: "1px solid hsl(0 0% 20%)",
          color: "hsl(0 0% 98%)",
        },
        className: "backdrop-blur-xl",
      }}
    />
  );
};
