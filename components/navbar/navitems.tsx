'use client';

import { cn } from "@/lib/utils";
import Link  from "next/link"
import { usePathname } from "next/navigation"
import { Label } from "../ui/label";

const navItems = [
    {label: 'Home', href : '/'},
    {label: 'News', href : '/news'},
    {label: 'Scores', href : '/scores'},
    {label: 'Teams', href : '/teams'},
    {label: 'Leagues', href : '/leagues'},
    {label: 'Transfers', href : '/transfers'}
    // {label: 'About', href : '/about'},
    // {label: 'Contact', href : '/contact'}
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
