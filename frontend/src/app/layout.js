import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../styles/globals.css";
import ScrollProgress from "../common/ScrollProgress";
import Header from "../components/Header/index.jsx";
import Footer from "../components/footer/Footer.jsx"; 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "NextGen Tech club",
  description: "NextGen Tech club official website",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}>
        <ScrollProgress />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
