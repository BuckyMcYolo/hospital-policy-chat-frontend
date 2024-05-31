"use client"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import React from "react"
import { toast } from "sonner"

const Page = () => {
	return (
		<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
				<h1 className="text-3xl font-semibold">Settings</h1>
			</div>
			<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
				<nav
					className="grid gap-4 text-sm text-muted-foreground"
					x-chunk="dashboard-04-chunk-0"
				>
					<Link href="#" className="font-semibold text-primary">
						Account
					</Link>
					<Link href="#">Security</Link>
					<Link href="#">Integrations</Link>
					<Link href="#">Support</Link>
					<Link href="#">Organizations</Link>
					<Link href="#">Advanced</Link>
				</nav>
				<div className="grid gap-6">
					<Card x-chunk="dashboard-04-chunk-1">
						<CardHeader>
							<CardTitle>Your Email</CardTitle>
							<CardDescription>
								Used to identify your account and send you
								important notifications.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<Input placeholder="Email" />
							</form>
						</CardContent>
						<CardFooter className="border-t px-6 py-4">
							<Button
								onClick={() => {
									toast.success(" This doesn't do anything!")
								}}
							>
								Save
							</Button>
						</CardFooter>
					</Card>
					<Card x-chunk="dashboard-04-chunk-2">
						<CardHeader>
							<CardTitle>
								I volunteer to sell my data and soul
							</CardTitle>
							<CardDescription>
								We will sell your data to the highest bidder.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="flex flex-col gap-4">
								{/* <Input
									placeholder="Project Name"
									defaultValue="/content/plugins"
								/> */}
								<div className="flex items-center space-x-2">
									<Checkbox id="include" />
									<label
										htmlFor="include"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Please sell all of my data
									</label>
								</div>
							</form>
						</CardContent>
						<CardFooter className="border-t px-6 py-4">
							<Button
								onClick={() => {
									// funnier face
									toast.success("Data sold! ( ͡° ͜ʖ ͡°)")
								}}
							>
								Save
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</main>
	)
}

export default Page
