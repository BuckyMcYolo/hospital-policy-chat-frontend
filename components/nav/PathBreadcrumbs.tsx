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
					{/* <Breadcrumb className="hidden sm:flex">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="#">{pathname}</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="#">Orders</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Recent Orders</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb> */}
					{/* {pathnames.map((path, index) => (
						<BreadcrumbItem key={index}>
							<BreadcrumbLink asChild>
								<Link href="#">{path}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					))} */}
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
										<BreadcrumbPage>{path}</BreadcrumbPage>
									</BreadcrumbItem>
								) : (
									<BreadcrumbItem className="text-lg">
										<BreadcrumbLink asChild>
											<Link href="#">{path}</Link>
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
