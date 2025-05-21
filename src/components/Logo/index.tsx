const Logo = ({ stroke }: { stroke: number }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		id="Layer_1"
		x={0}
		y={0}
		viewBox="0 0 1000 1000"
		width="1em"
		height="1em"
	>
		<style>
		{
			`.st1{fill:none;stroke:#f55;stroke-width:${stroke};stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}`
		}
		</style>
		<path
		d="M810.8 854.6v124.9H680.4V856.6h107.4c7.9 0 15.5-.7 23-2zM319.6 856.6v122.8H189.2V854.6c7.4 1.3 15.1 2 22.9 2h107.5z"
		className="st1"
		/>
		<path
		d="M918 150.7v575.7c0 71.9-58.3 130.2-130.2 130.2H212.2C140.3 856.6 82 798.3 82 726.4V150.7c0-71.9 58.3-130.2 130.2-130.2h575.7c71.9.1 130.1 58.3 130.1 130.2z"
		className="st1"
		/>
		<path
		d="M918 150.7v25.7H82v-25.7c0-71.9 58.3-130.2 130.2-130.2h575.7c71.9.1 130.1 58.3 130.1 130.2zM918 499.1v227.3c0 64.1-46.3 117.3-107.2 128.2-7.5 1.3-15.1 2-22.9 2H212.2c-7.8 0-15.5-.7-22.9-2C128.3 843.7 82 790.5 82 726.4V499.1h836z"
		className="st1"
		/>
		<circle cx={723.3} cy={687.6} r={74.8} className="st1" />
		<circle cx={276.1} cy={687.6} r={74.8} className="st1" />
		<path
		d="M810.8 494.4c0 1.6 0 3.1-.1 4.7H578.9c-.1-1.6-.1-3.1-.1-4.7 0-64.1 52-116 116-116s116 51.9 116 116zM320.7 98.5h358.6"
		className="st1"
		/>
	</svg>
)

export default Logo
