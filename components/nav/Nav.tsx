import ProfileDropdown from "./ProfileDorpdown"
import PathBreadcrumbs from "./PathBreadcrumbs"
import SideBarLinks from "./SideBarLinks"
import MobileDrawerLinks from "./MobileDrawerLinks"
import { Button } from "../ui/button"
import { LucideBadgeInfo } from "lucide-react"

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
