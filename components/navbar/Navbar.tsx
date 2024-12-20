import { Suspense } from "react"
import Container from "../global/Container"
import CartButton from "./CartButton"
import DarkMode from "./DarkMode"
import LinksDropdown from "./LinksDropdown"
import Logo from "./Logo"
import NavSearch from "./NavSearch"

// during development nextjs renders all the pages dynamically everytime, but this is not the case on the deployed, that's why a suspense is reqd

// The reason for putting the NavSearch in the Suspense is that as we know that Next.js preloads the pages, and the aboutPage is a static use client page, so it doesn't reload again and again in production, but the NavSearch component which is used inside it has to be loaded everytime, that is why we put it in suspense, more about it in README.md line 1347

// the issue is that in static pages like about, the next.js considers them to be client side rendered whole but we want the functionalities like the search,etc. due to NavSearch so we want it to be server side rendered, that's why an extra suspense here to avoid these deploy errors that are caused due to this, video 598 14:00 minutes

function Navbar() {
  return (
    <nav className="border-b">
        <Container className="flex flex-col sm:flex-row sm:justify-between flex-wrap py-8 gap-4">
            <Logo/>
            <Suspense>
              <NavSearch/>
            </Suspense>
            <div className="flex gap-4 items-center">
                <CartButton/>
                <DarkMode/>
                <LinksDropdown/>
            </div>
        </Container>
    </nav>
  )
}
export default Navbar