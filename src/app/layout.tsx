import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { UserProvider } from '@/app/context/UserContext';



export const metadata: Metadata = {
  title: "Sword Coin",
  description: "Sword Coin airdrop app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) 


{
  return (
    <html lang="en">
      <head>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      </head>
      <body
        className= "bg-gray-900" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px" }}
      >
        <UserProvider>
            {children}
        </UserProvider>
          
      </body>
    </html>
  );
}
