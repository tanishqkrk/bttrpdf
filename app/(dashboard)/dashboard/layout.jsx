import Navbar from "@/components/dashboard/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar /> {children}
    </>
  );
}
