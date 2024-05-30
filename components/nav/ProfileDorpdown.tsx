"use client"

import React from "react"
import { CircleUser, Laptop, Moon, Sun } from "lucide-react"
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

const ProfileDropdown = () => {
	const { setTheme, systemTheme, theme } = useTheme()

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
				<DropdownMenuItem className="py-2">Settings</DropdownMenuItem>
				<DropdownMenuItem className="py-2">Support</DropdownMenuItem>
				<DropdownMenuItem
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
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ProfileDropdown
