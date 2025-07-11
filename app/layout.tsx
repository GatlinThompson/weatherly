import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar/Navbar";
import Footer from "./ui/footer/Footer";
import { WeatherProvider } from "./context/WeatherContext";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weatherly",
  description:
    "Weatherly is a weather app that allows you to check the weather in any city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <WeatherProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </WeatherProvider>
      </body>
    </html>
  );
}
