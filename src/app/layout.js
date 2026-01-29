import { Geist, Geist_Mono ,Nosifer ,Rye,Rubik_Distressed,Fjalla_One} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nosifer = Nosifer({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-nosifer',
});
const rye = Rye({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rye',
});
const rubikDistressed = Rubik_Distressed({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-embed_code',
});
const rubikFjalla_One = Fjalla_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-_code',
});





export const metadata = {
  title: "Güzellik Dünyası – Kozmetik ve Cilt Bakımı",
  description: "Profesyonel kozmetik ürünleri ve cilt bakımı tavsiyeleri. Makyaj, bakım ve güzellik trendlerini keşfedin.",
  openGraph: {
    type: "website",
    url: "https://musical-blini-3572ed.netlify.app",
    title: "Güzellik Dünyası – Kozmetik ve Cilt Bakımı",
    description: "Profesyonel kozmetik ürünleri ve cilt bakımı tavsiyeleri. Makyaj, bakım ve güzellik trendlerini keşfedin.",
    images: [
      "https://opengraph.b-cdn.net/production/images/96d9c978-ae8f-4961-acf6-56acff57b3e9.png?token=Y_tuAU04RM3XjBYiyX6MWX5f_bZwVRGjFYJLkwpGp4g&height=667&width=854&expires=33294746290",
    ],
  },
  twitter: {
    card: "summary_large_image",
    domain: "musical-blini-3572ed.netlify.app",
    url: "https://musical-blini-3572ed.netlify.app",
    title: "Güzellik Dünyası – Kozmetik ve Cilt Bakımı",
    description: "Profesyonel kozmetik ürünleri ve cilt bakımı tavsiyeleri. Makyaj, bakım ve güzellik trendlerini keşfedin.",
    images: [
      "https://opengraph.b-cdn.net/production/images/96d9c978-ae8f-4961-acf6-56acff57b3e9.png?token=Y_tuAU04RM3XjBYiyX6MWX5f_bZwVRGjFYJLkwpGp4g&height=667&width=854&expires=33294746290",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nosifer.variable}  ${rye.variable} ${rubikDistressed.variable} ${rubikFjalla_One.variable}antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
