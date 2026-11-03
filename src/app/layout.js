import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ToasterProvider from "@/components/common/ToasterProvider";

const displayFont = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const bodyFont = Public_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: {
    default: "HelpHive | Community service events near you",
    template: "%s | HelpHive",
  },
  description:
    "HelpHive helps neighbours organise, join and track social service events like clothes distribution, plantation drives and cleanups.",
};


const themeScript = `
try {
  var theme = localStorage.getItem("theme");
  if (!theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "helphive-dark" : "helphive";
  }
  document.documentElement.setAttribute("data-theme", theme);
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="helphive" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-base-100 text-base-content antialiased`}>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
