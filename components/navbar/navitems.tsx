'use client';

import { cn } from "@/lib/utils";
import Link  from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    {label: 'Home', href : '/'},
    {label: 'Companions', href : '/companions'},
    {label: 'My Journey', href : '/my-journey'},
]

const Navitems = () => {
    const pathname = usePathname();

  return (
    <div>
        <nav className='flex items-center gap-4'>
            {navItems.map(({label,href }) => (
                <Link
                 href={href} 
                 key={label}
                 className={cn(pathname === href ? 'text-primary' : 'text-muted-foreground', 'text-sm font-medium transition-colors hover:text-primary')}
                 >
                    {label}
                </Link>
            ))}
        </nav>   
    </div>
  )
}

export default Navitems
