'use client'
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation"

function SideBar() {
    const pathname = usePathname();

  return (
    <aside>
        {adminLinks.map((link)=>{
            const isActivePage = pathname === link.href;
            const variant = isActivePage? 'default' : 'ghost';
            return(
                <Button asChild className="w-full mb-2 capitalize font-normal justify-start" variant={variant} key={link.href}>
                    <Link key={link.href} href={link.href}>
                        {link.label}
                    </Link>
                </Button>
            )
        })}
    </aside>
  )
}
export default SideBar