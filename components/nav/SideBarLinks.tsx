"use client"

import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Link from "next/link"
import {
	AudioLines,
	FileText,
	Home,
	Hospital,
	Settings,
	ShoppingCart,
	Stethoscope,
} from "lucide-react"
import { Separator } from "../ui/separator"
import { usePathname } from "next/navigation"

const SideBarLinks = () => {
	const pathname = usePathname()
	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 sm:py-2">
				<Link
					href="#"
					className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-background border border-foreground text-lg font-semibold text-foreground h-[31px] w-8 md:text-base translate-y-1"
				>
					<Stethoscope className="h-4 w-4 transition-all group-hover:scale-110" />
					<span className="sr-only">Acme Inc</span>
				</Link>
				<Separator className="h-[0.5px]" />
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/"
							className={`flex h-9 w-9 items-center justify-center rounded-lg ${
								pathname === "/"
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground"
							} transition-colors hover:text-foreground md:h-8 md:w-8`}
						>
							<Home className="h-5 w-5" />
							<span className="sr-only">Home</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Home</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/policies-and-supplies"
							className={`flex h-9 w-9 items-center justify-center rounded-lg ${
								pathname.includes("/policies-and-supplies")
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground"
							} transition-colors hover:text-foreground md:h-8 md:w-8`}
						>
							<FileText className="h-5 w-5" />
							<span className="sr-only">
								Policies and Supplies Chat
							</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">
						Policies and Supplies Chat
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/patients"
							className={`flex h-9 w-9 items-center justify-center rounded-lg ${
								pathname.includes("/patients")
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground"
							} transition-colors hover:text-foreground md:h-8 md:w-8`}
						>
							<Hospital className="h-5 w-5" />
							<span className="sr-only">Patient Chart Chat</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">
						Patient Chart Chat
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/unit-voice-chat"
							className={`flex h-9 w-9 items-center justify-center rounded-lg ${
								pathname.includes("/unit-voice-chat")
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground"
							} transition-colors hover:text-foreground md:h-8 md:w-8`}
						>
							<AudioLines className="h-5 w-5" />
							<span className="sr-only">Voice Chat</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Voice Chat</TooltipContent>
				</Tooltip>
			</nav>
			<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/settings"
							className={`flex h-9 w-9 items-center justify-center rounded-lg ${
								pathname.includes("/settings")
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground"
							} transition-colors hover:text-foreground md:h-8 md:w-8`}
						>
							<Settings className="h-5 w-5" />
							<span className="sr-only">Settings</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Settings</TooltipContent>
				</Tooltip>
			</nav>
		</aside>
	)
}

export default SideBarLinks
