import type { Metadata } from "next";
import { Poppins, Outfit, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import ToastContainer from '../components/ui-components/toast/ToastContainer';
import { ToastProvider } from '../context/ToastContext';
import { AuthProvider } from "@/context/AuthContext";
import { LayoutWrapper } from '@/components/LayoutWrapper';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Upzella - AI-Powered HR Assistant Platform",
  description: "Secure employer authentication and company setup for HR professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${outfit.variable} ${inter.variable} ${montserrat.variable} relative antialiased`}
      >

        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative">
          <ToastProvider>
            <AuthProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </AuthProvider>
            <ToastContainer />
          </ToastProvider>
        </main>


        {/* Scripts for enhanced functionality */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            
            `,
          }}
        />


      </body>
    </html>
  );
}
