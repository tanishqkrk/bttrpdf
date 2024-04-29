import Navbar from "@/components/home/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      {" "}
      <Navbar /> {children}
    </>
  );
}
