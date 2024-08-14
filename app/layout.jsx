import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { MotionProvider } from "@/context/MotionContext";

const inter = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "BttrPdf",
  description: "...",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          
        </ThemeProvider> */}
        <AuthProvider>
          <DataProvider>
            <MotionProvider>{children}</MotionProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
