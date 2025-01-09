// app/layout.js (Server Component)

import { Geist, Geist_Mono } from "next/font/google";
import SessionProviderWrapper from "./SessionProviderWrapper";

import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";

export const metadata = {
  title: "Hackathon Management",
  description: "Manage your hackathons with ease",
};

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={`antialiased`}>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            limit={3}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
          {children}
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
