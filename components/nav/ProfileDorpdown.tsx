"use client"

import React from "react"
import { CircleUser, Laptop, LogOut, Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const ProfileDropdown = () => {
	const { setTheme, systemTheme, theme } = useTheme()

	const router = useRouter()

	async function logout() {
		const res = await fetch("/password/remove", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})

		if (res.ok) {
			window.location.reload()
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full ring-0"
				>
					<CircleUser className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="py-2"
					onClick={() => {
						router.push("/settings")
					}}
				>
					Settings
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						toast("We don't actually have support! This is a demo!")
					}}
					className="py-2"
				>
					Support
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-default"
					onClick={(e) => {
						e.preventDefault()
					}}
				>
					Theme
					<ToggleGroup
						size={"sm"}
						type="single"
						className="bg-background flex items-center border border-muted-background rounded-xl px-1 ml-2 h-8"
						value={theme}
						onValueChange={(value) => setTheme(value)}
					>
						<ToggleGroupItem
							className="h-6 w-6 p-1.5"
							value="light"
						>
							<Sun className="h-5 w-5" />
						</ToggleGroupItem>
						<ToggleGroupItem className="h-6 w-6 p-1.5" value="dark">
							<Moon className="h-5 w-5" />
						</ToggleGroupItem>
						<ToggleGroupItem
							className="h-6 w-6 p-1.5"
							value="system"
						>
							<Laptop className="h-5 w-5" />
						</ToggleGroupItem>
					</ToggleGroup>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={logout}
					className="flex items-center gap-3"
				>
					Logout <LogOut size={17} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ProfileDropdown
