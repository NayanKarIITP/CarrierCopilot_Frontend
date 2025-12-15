// import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
// import './globals.css'

// const _geist = Geist({ subsets: ["latin"] });
// const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'v0 App',
//   description: 'Created with v0',
//   generator: 'v0.app',
//   icons: {
//     icon: [
//       {
//         url: '/icon-light-32x32.png',
//         media: '(prefers-color-scheme: light)',
//       },
//       {
//         url: '/icon-dark-32x32.png',
//         media: '(prefers-color-scheme: dark)',
//       },
//       {
//         url: '/icon.svg',
//         type: 'image/svg+xml',
//       },
//     ],
//     apple: '/apple-icon.png',
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={`font-sans antialiased`}>
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   )
// }






// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import "./globals.css"
// import Providers from "@/components/providers"
// import Navbar from "@/components/ui/navbar" // ✅ Only Navbar is needed

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// })

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// })

// export const metadata: Metadata = {
//   title: "NK",
//   description: "Created with NK",
//   generator: "NK",
//   icons: {
//     icon: [
//       { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
//       { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
//       { url: "/icon.svg", type: "image/svg+xml" },
//     ],
//     apple: "/apple-icon.png",
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
//         {/* ✅ Wrapped inside Providers */}
//         <Providers>
//           <div className="flex min-h-screen flex-col bg-background">
//             {/* 1. Global Navbar */}
//             <Navbar />
            
//             {/* 2. Main Page Content */}
//             <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 md:p-6">
//               {children}
//             </main>
//           </div>
//         </Providers>
//         <Analytics />
//       </body>
//     </html>
//   )
// }






// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import "./globals.css"
// import Providers from "@/components/providers"
// import Navbar from "@/components/ui/navbar" // ✅ Only Navbar is needed

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// })

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// })

// export const metadata: Metadata = {
//   title: "NK",
//   description: "Created with NK",
//   generator: "NK",
//   icons: {
//     icon: [
//       { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
//       { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
//       { url: "/icon.svg", type: "image/svg+xml" },
//     ],
//     apple: "/apple-icon.png",
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
//         {/* ✅ Wrapped inside Providers */}
//         <Providers>
//           <div className="flex min-h-screen flex-col bg-background">
//             {/* 1. Global Navbar */}
//             <Navbar />
            
//             {/* 2. Main Page Content with GLOBAL PADDING */}
//             {/* Added: max-w-7xl, centering, and the responsive padding you requested */}
//             <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-20 py-8">
//               {children}
//             </main>
//           </div>
//         </Providers>
//         <Analytics />
//       </body>
//     </html>
//   )
// }





import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Providers from "@/components/providers"
import Navbar from "@/components/ui/navbar"
import { AuthProvider } from "@/contexts/auth-context" // 👈 1. IMPORT THIS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NK",
  description: "Created with NK",
  generator: "NK",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        
        {/* 👈 2. WRAP EVERYTHING IN AUTH PROVIDER */}
        <AuthProvider>
          <Providers>
            <div className="flex min-h-screen flex-col bg-background">
              
              {/* Navbar now has access to useAuth() to show Login/Logout buttons */}
              <Navbar />
              
              <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-20 py-8">
                {children}
              </main>
            </div>
          </Providers>
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  )
}