import AuthProvider from "./components/session-provider";
import "./globals.css";
export const metadata = {
  title: "School Portal",
  description: "Login and manage students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
