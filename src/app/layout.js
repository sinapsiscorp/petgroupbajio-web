import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pet Group Bajío — Consorcio Integral de Bienestar Animal",
  description:
    "Todo el ciclo de cuidado para tu mascota en un solo lugar: estética a domicilio, clínica veterinaria, hospedaje campestre y servicios conmemorativos en León, Gto.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
