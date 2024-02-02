import Navbar from "@/components/company/Navbar";
import "../globals.css";
import "../../styles/theme.css";
import { AuthProvider } from "@/context/AuthContext";
export const metadata = {
  title: "BttrPdf",
  description: "Generate Better PDFs",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayoput({ children }) {
  return (
    <html lang="en">
      <body className="bg-base">
        <AuthProvider>
          <Navbar />
          <>{children}</>
        </AuthProvider>
      </body>
    </html>
  );
}
