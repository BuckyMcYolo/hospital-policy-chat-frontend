"use client"

import React, { useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import {
	FileText,
	Home,
	LineChart,
	Menu,
	Package2,
	Settings,
	ShoppingCart,
	Stethoscope,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MobileDrawerLinks = () => {
	const pathname = usePathname()

	const [isOpen, setIsOpen] = React.useState(false)

	useEffect(() => {
		setIsOpen(false)
	}, [pathname])

	return (
		<Sheet
			open={isOpen}
			onOpenChange={() => {
				setIsOpen((prev) => !prev)
			}}
		>
			<SheetTrigger asChild>
				<Button
					size="icon"
					variant="outline"
					className="sm:hidden"
					onMouseDown={(e) => {
						e.preventDefault()
						setIsOpen((prev) => !prev)
					}}
				>
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-xs">
				<nav className="grid gap-6 text-lg font-medium">
					<Link
						href="#"
						className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-background border border-foreground text-lg font-semibold text-foreground h-[31px] w-8 md:text-base translate-y-1"
					>
						<Stethoscope className="h-4 w-4 transition-all group-hover:scale-110" />
						<span className="sr-only">Acme Inc</span>
					</Link>
					<Link
						href="/"
						className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${
							pathname === "/" ? "text-foreground" : ""
						}`}
					>
						<Home className="h-5 w-5" />
						Dashboard
					</Link>
					<Link
						href="/policies-and-supplies"
						className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${
							pathname === "/policies-and-supplies"
								? "text-foreground"
								: ""
						}`}
					>
						<FileText className="h-5 w-5" />
						Policies and Supplies Chat
					</Link>
					{/* <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-foreground"
            >
                <ShoppingCart className="h-5 w-5" />
                Orders
            </Link>
            <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
                <Package className="h-5 w-5" />
                Products
            </Link>
            <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
                <Users2 className="h-5 w-5" />
                Customers
            </Link> */}
					<Link
						href="/settings"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Settings className="h-5 w-5" />
						Settings
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	)
}

export default MobileDrawerLinks
