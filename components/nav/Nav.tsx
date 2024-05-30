import Image from "next/image"
import Link from "next/link"
import {
	ChevronLeft,
	ChevronRight,
	CircleUser,
	Copy,
	CreditCard,
	File,
	Home,
	Laptop,
	LineChart,
	ListFilter,
	Menu,
	Moon,
	MoreVertical,
	Package,
	Package2,
	PanelLeft,
	Search,
	Settings,
	ShoppingCart,
	SquareActivity,
	Stethoscope,
	Sun,
	Triangle,
	Truck,
	Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import ProfileDropdown from "./ProfileDorpdown"
import PathBreadcrumbs from "./PathBreadcrumbs"
import SideBarLinks from "./SideBarLinks"
import MobileDrawerLinks from "./MobileDrawerLinks"

export default function Nav({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex min-h-screen w-full flex-col">
			{/* side bar links */}
			<SideBarLinks />
			<div className="flex flex-col sm:gap-4 sm:pl-14">
				<header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:px-6">
					{/* mobile drawer links */}
					<MobileDrawerLinks />
					<PathBreadcrumbs />
					<ProfileDropdown />
				</header>
			</div>
			<main className="flex flex-col w-full h-[calc(100vh-5rem)] sm:pl-14">
				{children}
			</main>
		</div>
	)
}
