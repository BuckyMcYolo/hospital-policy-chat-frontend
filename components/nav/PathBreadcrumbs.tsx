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

const PathBreadcrumbs = () => {
	const pathname = usePathname()

	const pathnames = pathname.split("/").splice(1)

	const isOnlyOnePath = pathnames.length === 1

	return (
		<div>
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
		</div>
	)
}

export default PathBreadcrumbs
