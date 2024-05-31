import React from "react"
import {
	ChevronLeft,
	ChevronRight,
	Copy,
	CornerDownLeft,
	CreditCard,
	Mic,
	MoreVertical,
	Paperclip,
	TrashIcon,
	Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

const newCard = (
	<Card className="w-full">
		<CardHeader className="flex flex-row items-start bg-muted/50">
			<div className="grid gap-0.5">
				<CardTitle className="group flex items-center gap-2 text-lg">
					Order Oe31b70H
					<Button
						size="icon"
						variant="outline"
						className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<Copy className="h-3 w-3" />
						<span className="sr-only">Copy Order ID</span>
					</Button>
				</CardTitle>
				<CardDescription>Date: November 23, 2023</CardDescription>
			</div>
			<div className="ml-auto flex items-center gap-1">
				<Button size="sm" variant="outline" className="h-8 gap-1">
					<Truck className="h-3.5 w-3.5" />
					<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
						Track Order
					</span>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							className="h-8 w-8"
						>
							<MoreVertical className="h-3.5 w-3.5" />
							<span className="sr-only">More</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Export</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Trash</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="p-6 text-sm">
			<div className="grid gap-3">
				<div className="font-semibold">Order Details</div>
				<ul className="grid gap-3">
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">
							Glimmer Lamps x <span>2</span>
						</span>
						<span>$250.00</span>
					</li>
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">
							Aqua Filters x <span>1</span>
						</span>
						<span>$49.00</span>
					</li>
				</ul>
				<Separator className="my-2" />
				<ul className="grid gap-3">
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Subtotal</span>
						<span>$299.00</span>
					</li>
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Shipping</span>
						<span>$5.00</span>
					</li>
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Tax</span>
						<span>$25.00</span>
					</li>
					<li className="flex items-center justify-between font-semibold">
						<span className="text-muted-foreground">Total</span>
						<span>$329.00</span>
					</li>
				</ul>
			</div>
			<Separator className="my-4" />
			<div className="grid grid-cols-2 gap-4">
				<div className="grid gap-3">
					<div className="font-semibold">Shipping Information</div>
					<address className="grid gap-0.5 not-italic text-muted-foreground">
						<span>Liam Johnson</span>
						<span>1234 Main St.</span>
						<span>Anytown, CA 12345</span>
					</address>
				</div>
				<div className="grid auto-rows-max gap-3">
					<div className="font-semibold">Billing Information</div>
					<div className="text-muted-foreground">
						Same as shipping address
					</div>
				</div>
			</div>
			<Separator className="my-4" />
			<div className="grid gap-3">
				<div className="font-semibold">Customer Information</div>
				<dl className="grid gap-3">
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Customer</dt>
						<dd>Liam Johnson</dd>
					</div>
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Email</dt>
						<dd>
							<a href="mailto:">liam@acme.com</a>
						</dd>
					</div>
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Phone</dt>
						<dd>
							<a href="tel:">+1 234 567 890</a>
						</dd>
					</div>
				</dl>
			</div>
			<Separator className="my-4" />
			<div className="grid gap-3">
				<div className="font-semibold">Payment Information</div>
				<dl className="grid gap-3">
					<div className="flex items-center justify-between">
						<dt className="flex items-center gap-1 text-muted-foreground">
							<CreditCard className="h-4 w-4" />
							Visa
						</dt>
						<dd>**** **** **** 4532</dd>
					</div>
				</dl>
			</div>
		</CardContent>
		<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
			<div className="text-xs text-muted-foreground">
				Updated <time dateTime="2023-11-23">November 23, 2023</time>
			</div>
			<Pagination className="ml-auto mr-0 w-auto">
				<PaginationContent>
					<PaginationItem>
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6"
						>
							<ChevronLeft className="h-3.5 w-3.5" />
							<span className="sr-only">Previous Order</span>
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6"
						>
							<ChevronRight className="h-3.5 w-3.5" />
							<span className="sr-only">Next Order</span>
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</CardFooter>
	</Card>
)

export default function Page({ params }: { params: { slug: string } }) {
	return (
		<div className="flex flex-row h-full w-full items-center gap-4 p-4">
			<Tabs className="sm:hidden">
				<TabsList defaultValue="chart">
					<TabsTrigger value="chart">Chart</TabsTrigger>
					<TabsTrigger value="chat">Chat</TabsTrigger>
				</TabsList>
				<TabsContent value="chart">chart</TabsContent>
				<TabsContent value="chat">chat</TabsContent>
			</Tabs>
			<ScrollArea className="h-full w-2/3 flex flex-col">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-5">
					{Array.from([1, 2]).map((_, index) => (
						<Card key={index}>{newCard}</Card>
					))}
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-5 pt-4">
					{Array.from([1, 2]).map((_, index) => (
						<Card key={index}>{newCard}</Card>
					))}
				</div>
			</ScrollArea>

			<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted dark:bg-muted/50 lg:col-span-2 w-1/3">
				<Badge variant="outline" className="absolute right-3 top-3">
					Chat
				</Badge>
				<div className="flex-1" />
				<form
					className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
					x-chunk="dashboard-03-chunk-1"
				>
					<Label htmlFor="message" className="sr-only">
						Message
					</Label>
					<Textarea
						id="message"
						placeholder="Type your message here..."
						className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
					/>
					<div className="flex items-center p-3 pt-0">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon">
									<Mic className="size-5" />
									<span className="sr-only">
										Speech to Text
									</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="top">
								Use Speech to Text
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									// onClick={(e) => {
									// 	e.preventDefault()
									// 	setInput("")
									// 	setMessages([])
									// }}
									variant="ghost"
									size="icon"
								>
									<TrashIcon className="size-5" />
									<span className="sr-only">
										Clear Chat history
									</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="top">
								Clear Chat history
							</TooltipContent>
						</Tooltip>

						<Button
							type="submit"
							size="sm"
							className="ml-auto gap-1.5"
						>
							Send Message
							<CornerDownLeft className="size-3.5" />
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
