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

export default function Nav({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
				<nav className="flex flex-col items-center gap-4 sm:py-2">
					<Link
						href="#"
						className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-background border border-foreground text-lg font-semibold text-foreground h-[31px] w-8 md:text-base translate-y-1"
					>
						<Triangle className="h-4 w-4 transition-all group-hover:scale-110" />
						<span className="sr-only">Acme Inc</span>
					</Link>
					<Separator className="h-[0.5px]" />
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Home className="h-5 w-5" />
								<span className="sr-only">Dashboard</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Dashboard</TooltipContent>
					</Tooltip>
					{/* <Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<ShoppingCart className="h-5 w-5" />
								<span className="sr-only">Orders</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Orders</TooltipContent>
					</Tooltip> */}
					{/* <Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Package className="h-5 w-5" />
								<span className="sr-only">Products</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Products</TooltipContent>
					</Tooltip> */}
					{/* <Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Users2 className="h-5 w-5" />
								<span className="sr-only">Customers</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Customers</TooltipContent>
					</Tooltip> */}
					{/* <Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<LineChart className="h-5 w-5" />
								<span className="sr-only">Analytics</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Analytics</TooltipContent>
					</Tooltip> */}
				</nav>
				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Settings className="h-5 w-5" />
								<span className="sr-only">Settings</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Settings</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
			<div className="flex flex-col sm:gap-4 sm:pl-14">
				<header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								size="icon"
								variant="outline"
								className="sm:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="sm:max-w-xs">
							<nav className="grid gap-6 text-lg font-medium">
								<Link
									href="#"
									className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
								>
									<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
									<span className="sr-only">Acme Inc</span>
								</Link>
								<Link
									href="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Home className="h-5 w-5" />
									Dashboard
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
									href="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<LineChart className="h-5 w-5" />
									Settings
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<PathBreadcrumbs />
					<ProfileDropdown />
				</header>
			</div>
			<main className="flex-1 w-full">{children}</main>
		</div>
	)
}
