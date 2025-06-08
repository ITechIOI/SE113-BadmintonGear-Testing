import { Poppins, Montserrat } from "next/font/google";
import "../../styles/globals.css";
import Header from "../../components/Header"
import Footer from "../../components/Footer"

// Cấu hình phông chữ Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Chọn các trọng lượng cần thiết
  variable: "--font-poppins", // Tạo biến CSS để sử dụng
});

// Cấu hình phông chữ Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // Chọn các trọng lượng cần thiết
  variable: "--font-montserrat", // Tạo biến CSS để sử dụng
});

export const metadata = {
  title: "BadmintonGear",
  description: "BadmintonGear Store",
  icons: {
    icon: "/images/logo.ico",
    shortcut: "/images/logo.ico",
    apple: "/images/logo.ico",
  },
};

export default function UserLayout({ children }) {
  return (
    <>
      <div className={`${poppins.variable} ${montserrat.variable}`}>
        <Header />
        <div className="mt-10 mb-10 pt-10">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
