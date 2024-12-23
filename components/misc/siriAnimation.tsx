import React from "react"

const shapes = [
	"M 100 600 q 0 -500, 500 -500 t 500 500 t -500 500 T 100 600 z",
	"M 100 600 q -50 -400, 500 -500 t 450 550 t -500 500 T 100 600 z",
	"M 100 600 q 0 -400, 500 -500 t 400 500 t -500 500 T 100 600 z",
	"M 150 600 q 0 -600, 500 -500 t 500 550 t -500 500 T 150 600 z",
	"M 150 600 q 0 -600, 500 -500 t 500 550 t -500 500 T 150 600 z",
	"M 100 600 q 100 -600, 500 -500 t 400 500 t -500 500 T 100 600 z",
]

const SiriAnimation = () => {
	return (
		<div className="relative flex items-center justify-center w-24 h-24 bg-gray-900 rounded-full">
			<div className="absolute w-20 h-20">
				<svg className="relative h-full">
					<g
						className="opacity-70 animate-[rotate_25s_infinite_alternate_ease-in-out]"
						style={{ transformOrigin: "50% 50%" }}
					>
						{shapes.map((shape, index) => (
							<path
								key={index}
								d={shape}
								className={`fill-current animate-[blobAnim${
									index + 1
								}_5s_infinite_alternate_cubic-bezier(0.45,0.2,0.55,0.8)] scale-80`}
								style={{ fill: `var(--blob-${index + 1})` }}
							/>
						))}
					</g>
				</svg>
			</div>
		</div>
	)
}

export default SiriAnimation
