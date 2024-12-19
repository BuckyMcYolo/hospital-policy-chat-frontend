import React, { useState, useRef, useEffect } from "react"
import { SelectItem as OriginalSelectItem } from "./select"
import { Tooltip, TooltipContent, TooltipProvider } from "./tooltip"
import { createPortal } from "react-dom"

interface CustomSelectItemProps
	extends React.ComponentProps<typeof OriginalSelectItem> {
	tooltip: React.ReactNode
}

const CustomSelectItem: React.FC<CustomSelectItemProps> = ({
	children,
	tooltip,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [position, setPosition] = useState({ top: 0, left: 0 })
	const itemRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isOpen && itemRef.current) {
			const rect = itemRef.current.getBoundingClientRect()
			setPosition({
				top: rect.top - rect.height, // 10px above the item
				left: rect.right + 5
				// 5px offset from the right of the item
			})
		}
	}, [isOpen])

	return (
		<>
			<div
				ref={itemRef}
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				<OriginalSelectItem {...props}>{children}</OriginalSelectItem>
			</div>
			{isOpen &&
				createPortal(
					<TooltipProvider>
						<Tooltip open={true}>
							<TooltipContent
								style={{
									position: "fixed",
									display:
										position.top === 0 ? "none" : "block",
									top: `${position.top}px`,
									left: `${position.left}px`
								}}
								className="max-w-xs dark:bg-neutral-900"
							>
								<p>{tooltip}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>,
					document.body
				)}
		</>
	)
}

export default CustomSelectItem
