"use client"

import React from "react"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { LucideBadgeInfo } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const PathBreadcrumbs = () => {
	const pathname = usePathname()

	const pathnames = pathname.split("/").splice(1)

	const isOnlyOnePath = pathnames.length === 1

	return (
		<div className="flex items-center gap-4">
			<Breadcrumb className="hidden sm:flex">
				<BreadcrumbList>
					{pathname === "/" && (
						<BreadcrumbItem className="text-lg">
							<BreadcrumbPage>Home</BreadcrumbPage>
						</BreadcrumbItem>
					)}
					{isOnlyOnePath ? (
						<BreadcrumbItem className="text-lg">
							<BreadcrumbPage>{pathnames[0]}</BreadcrumbPage>
						</BreadcrumbItem>
					) : (
						pathnames.map((path, index) => (
							<React.Fragment key={path + index}>
								{index === pathnames.length - 1 ? (
									<BreadcrumbItem className="text-lg">
										<BreadcrumbPage>
											{path.replace("%20", " ")}
										</BreadcrumbPage>
									</BreadcrumbItem>
								) : (
									<BreadcrumbItem className="text-lg">
										<BreadcrumbLink asChild>
											<Link href={`/${path}`}>
												{path.replace("%20", " ")}
											</Link>
										</BreadcrumbLink>
									</BreadcrumbItem>
								)}
								{index !== pathnames.length - 1 && (
									<BreadcrumbSeparator />
								)}
							</React.Fragment>
						))
					)}
				</BreadcrumbList>
			</Breadcrumb>
			{pathname === "/policies-and-supplies" && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon">
							<LucideBadgeInfo className="size-5" />
							<span className="sr-only">Use Microphone</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<h1 className="text-lg pb-1">What can I ask?</h1>
						<h2 className="font-bold">
							Policies and procedures for the following:
						</h2>
						<ul className=" list-inside list-disc">
							<li>
								Care of patients with indwelling urinary
								catheters
							</li>
							<li>Chest tube Management</li>
							<li>Chest Tube Removal</li>
							<li>Chest tube Pigtail flushing</li>
							<li>Nasogastric/Orogastric Tube Management</li>
							<li>Tracheostomy Management</li>
							<li>Central Venous Therapy </li>
							<li>Intracardiac Line Removal </li>
							<li>External Pacemaker Management</li>
							<li>
								Preparation & Transfer of a Pre-Op Cardiac
								Surgery Patient to the OR
							</li>
						</ul>
						<h2 className="font-bold pt-2">
							Supplies and equipment for the following locations:
						</h2>
						<ul className=" list-inside list-disc">
							<li>Clean supply North</li>
							<li>North Bear Bins</li>
						</ul>
					</TooltipContent>
				</Tooltip>
			)}
		</div>
	)
}

export default PathBreadcrumbs
