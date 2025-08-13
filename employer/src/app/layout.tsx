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

      <head>
        <script
          type="module"
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs"
        ></script>
        <script
          type="module"
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf_viewer.min.css"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs"
          type="module"
        ></script>
        <script src=
          "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js">
        </script>
      </head>

      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${outfit.variable} ${inter.variable} ${montserrat.variable} relative antialiased`}
      >

        <main className="min-h-screen relative">
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
          document.addEventListener("DOMContentLoaded", function() {
            document.querySelectorAll('input[type="number"]').forEach(function(input) {
          input.addEventListener("wheel", function(event) {
            this.blur();
          });
            });
          });

          $('input[type="number"]').on("wheel", function (e) {
                $(this).blur();
            });
        `,
          }}
        />
      </body>
    </html>
  );
}
