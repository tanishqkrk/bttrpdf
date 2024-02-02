import Navbar from "@/components/company/Navbar";
import "../globals.css";

export const metadata = {
  title: "BttrPdf",
  description: "Generate Better PDFs",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayoput({ children }) {
  return (
    <html lang="en">
      <body className="bg-base">
        <Navbar />
        <>{children}</>
      </body>
    </html>
  );
}
