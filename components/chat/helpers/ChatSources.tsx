import {
	ArrowUpRightSquare,
	Check,
	ChevronDown,
	ChevronRight,
	Copy,
} from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "../../ui/button"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../../ui/hover-card"
import { SourceData, SourceNode } from "./types"
import { useCopyToClipboard } from "../../misc/use-copy-to-clipboard"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { motion, AnimatePresence } from "framer-motion"

const SCORE_THRESHOLD = 0.5

export function ChatSources({ data }: { data: SourceData }) {
	const sources = useMemo(() => {
		return (
			data.nodes
				?.filter((node) => Object.keys(node.metadata).length > 0)
				// ?.filter((node) => (node.score ?? 1) > SCORE_THRESHOLD)
				.sort((a, b) => (b.score ?? 1) - (a.score ?? 1)) || []
		)
	}, [data.nodes])

	if (sources.length === 0) return null

	return (
		<div className="space-x-2 text-sm">
			<span className="font-semibold">Sources:</span>
			<div className="inline-flex gap-1.5 items-center">
				{sources.map((node: SourceNode, index: number) => (
					<div key={node.id}>
						<HoverCard openDelay={350} closeDelay={200}>
							<HoverCardTrigger>
								<div className="text-xs w-5 h-5 rounded bg-gray-100 dark:bg-neutral-800 mb-2 flex items-center justify-center hover:text-white hover:bg-primary dark:hover:bg-neutral-100 hover:cursor-pointer dark:hover:text-neutral-950">
									{index + 1}
								</div>
							</HoverCardTrigger>
							<HoverCardContent
								side="top"
								className=" max-w-lg w-fit"
							>
								<NodeInfo node={node} />
							</HoverCardContent>
						</HoverCard>
					</div>
				))}
			</div>
		</div>
	)
}

function NodeInfo({ node }: { node: SourceNode }) {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 1000 })

	const [isOpen, setIsOpen] = useState(false)

	const buttonLabel = isOpen ? "Hide source details" : "Show source details"

	const EventIcon = isOpen ? (
		<ChevronDown className="h-4 w-4" />
	) : (
		<ChevronRight className="h-4 w-4" />
	)

	console.log("Node metadata", node)

	if (typeof node.metadata["URL"] === "string") {
		// this is a node generated by the web loader, it contains an external URL
		// add a link to view this URL
		return (
			<a
				className="space-x-2 flex items-center my-2 hover:text-blue-900"
				href={node.metadata["URL"]}
				target="_blank"
			>
				<span>{node.metadata["URL"]}</span>
				<ArrowUpRightSquare className="w-4 h-4" />
			</a>
		)
	}

	if (typeof node.metadata["file_name"] === "string") {
		// this is a node generated by the file loader, it contains file path
		// add a button to copy the path to the clipboard
		const filePath = node.metadata["file_name"]
		return (
			<div className="my-2 flex flex-col">
				<span>
					<strong>Source:</strong> {filePath}
				</span>
				{/* <Collapsible open={isOpen} onOpenChange={setIsOpen}>
					<CollapsibleTrigger asChild>
						<Button variant="secondary" className="space-x-2 mt-2">
							{buttonLabel} {EventIcon}
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent asChild>
						<div className="mt-4 text-sm space-y-2">
							{node.text}
						</div>
					</CollapsibleContent>
				</Collapsible> */}
				<Button
					onClick={() => {
						setIsOpen(!isOpen)
					}}
					variant="secondary"
					className="space-x-2 mt-2"
				>
					{buttonLabel} {EventIcon}
				</Button>
				<AnimatePresence mode="wait" initial={false}>
					{isOpen && (
						<motion.div
							key={node.id}
							initial={{
								y: -10,
								opacity: 0,
							}}
							animate={{
								//needs to be y scrolling type behavior
								y: 0,
								opacity: 1,
								transition: {
									duration: 0.5,
								},
							}}
							exit={{
								opacity: 0,
								transition: {
									duration: 0.25,
								},
							}}
						>
							<div className="mt-4 text-sm space-y-2">
								{node.text}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		)
	}

	if (
		typeof node.metadata["loc.pageNumber"] === "number" &&
		typeof node.metadata["source"] === "string" &&
		typeof node.metadata["loc.lines.from"] === "number" &&
		typeof node.metadata["loc.lines.to"] === "number"
	) {
		return (
			<div className="my-2 flex flex-col">
				<p>
					{" "}
					<strong>Source: </strong>
					{node.metadata["source"].replace("docs/", "")}
				</p>
				<p>
					<strong>Page </strong> {node.metadata["loc.pageNumber"]},{" "}
					<strong>Lines</strong> {node.metadata["loc.lines.from"]} -{" "}
					{node.metadata["loc.lines.to"]}
				</p>
				<Button
					onClick={() => {
						setIsOpen(!isOpen)
					}}
					variant="secondary"
					className="space-x-2 mt-2"
				>
					{buttonLabel} {EventIcon}
				</Button>
				<AnimatePresence mode="wait" initial={false}>
					{isOpen && (
						<motion.div
							key={node.id}
							initial={{
								y: -10,
								opacity: 0,
							}}
							animate={{
								//needs to be y scrolling type behavior
								y: 0,
								opacity: 1,
								transition: {
									duration: 0.5,
								},
							}}
							exit={{
								opacity: 0,
								transition: {
									duration: 0.25,
								},
							}}
						>
							<div className="mt-4 text-sm space-y-2">
								{node.text}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		)
	}

	// node generated by unknown loader, implement renderer by analyzing logged out metadata
	console.log("Node metadata", node.metadata)
	return (
		<p>
			Sorry, unknown node type.
			{/* Please add a new renderer in the NodeInfo
			component. */}
		</p>
	)
}
