'use client'

import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/toaster"
// all the providers which we want our whole program to be wrapped in(for ex. toast), will be used here

function Providers({children} : {children:React.ReactNode}) {
  return (
    <>
    <Toaster/>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
    </ThemeProvider>
    </>
  )
}
export default Providers