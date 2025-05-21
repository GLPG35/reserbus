import { useEffect, useState } from "react"
import { animate, svg } from 'animejs'

type BusType = 'bus'|'minibus'|'microbus'

const animateBus = (mode: 'in'|'out', type: BusType) => {
	const types = {
		'bus': '.busLine',
		'minibus': '.miniLine',
		'microbus': '.microLine'
	}

	animate(svg.createDrawable(types[type]), {
		draw: mode == 'in' ? ['0 0', '0 1'] : ['0 1', '0 0'],
		ease: 'inOutQuad',
		duration: 1000,
		loop: false
	})
}

const Svg = ({ strokeWidth, type }: { strokeWidth: number, type: BusType }) => {
	const [firstTime, setFirstTime] = useState(true)
	const [renderType, setRenderType] = useState(type)
	const [unmounting, setUnmounting] = useState(false)
	const [unmounted, setUnmounted] = useState(false)

	useEffect(() => {
		if (firstTime) {
			setFirstTime(false)
		} else {
			setUnmounting(true)
		}
	}, [type])

	useEffect(() => {
		if (unmounted) {
			setUnmounting(false)
			setUnmounted(false)
			setRenderType(type)
		}
	}, [unmounted])
	
	const busList = {
		'bus': <BusSVG {...{strokeWidth, unmounting, setUnmounted}} />,
		'minibus': <MiniSVG {...{strokeWidth, unmounting, setUnmounted}} />,
		'microbus': <MicroSVG {...{strokeWidth, unmounting, setUnmounted}} />
	}

	return busList[renderType]
}

const BusSVG = ({ strokeWidth, setUnmounted, unmounting }: { strokeWidth: number, unmounting: boolean, setUnmounted: (bool: boolean) => void }) => {
	const unmountSVG = () => {
		setUnmounted(true)
	}
	
	useEffect(() => {
		if (!unmounting) {
			animateBus('in', 'bus')
		} else {
			animateBus('out', 'bus')
			setTimeout(unmountSVG, 900)
		}
	}, [unmounting])
	
	return <svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 237.28 809.48"
	>
		<g xmlns="http://www.w3.org/2000/svg" transform="rotate(-90 404.74 404.74)">
		<defs>
			<style>
			{
				`.b,.c{fill:#f55;stroke:#f55;stroke-linecap:round;stroke-linejoin:round;stroke-width:${strokeWidth}px}.c{fill:none}`
			}
			</style>
		</defs>
		<path
			d="M757.63 210.61h-734c-6 0-10.87-4.87-10.87-10.87V37.54c0-6 4.87-10.87 10.87-10.87h734c2.61 0 5.09.86 7.05 2.35 2.16 1.63 3.77 3.98 4.39 6.76 5.35 24.25 8.42 52.58 8.42 82.86s-3.07 58.6-8.42 82.86c-.62 2.78-2.23 5.13-4.39 6.76a11.693 11.693 0 0 1-7.05 2.35Z"
			className="c busLine"
		/>
		<path
			d="M785.72 29.02h-21.04a11.693 11.693 0 0 0-7.05-2.35l26.39-3.19 1.7 5.54Z"
			className="c busLine"
		/>
		<path
			d="M792.25 40.74c10.3-8.09.87-28.26-8.91-28.31-1.35 0-2.33 1.31-1.93 2.6l7.65 24.77c.42 1.36 2.07 1.82 3.2.94ZM784.02 213.8l-26.39-3.19c2.61 0 5.09-.86 7.05-2.35h21.04l-1.7 5.54Z"
			className="c busLine"
		/>
		<path
			d="M792.25 196.54c10.3 8.09.87 28.26-8.91 28.31-1.35 0-2.33-1.31-1.93-2.6l7.65-24.77c.42-1.36 2.07-1.82 3.2-.94ZM754.1 206.87h-3.24c-1.89 0-3.37-1.59-3.23-3.47 1.68-22.47 1.68-147.04 0-169.51a3.226 3.226 0 0 1 3.23-3.47h3.24c5.77 0 10.73 4.15 11.67 9.85 3.75 22.91 5.92 49.73 5.92 78.38s-2.17 55.48-5.92 78.38c-.93 5.7-5.89 9.85-11.67 9.85ZM745.44 196.1c0 1.51-1.45 2.59-2.89 2.15l-32.36-9.7h0a14.548 14.548 0 0 1-10.37-13.94V62.66c0-6.43 4.22-12.09 10.37-13.94h0l32.36-9.7c1.44-.43 2.89.65 2.89 2.15v154.92ZM739.39 30.41l-22.35 8.42a59.633 59.633 0 0 1-35.11 2.15l-43.57-10.57h101.02ZM739.39 206.87l-22.35-8.42a59.633 59.633 0 0 0-35.11-2.15l-43.57 10.57h101.02Z"
			className="c busLine"
		/>
		<circle cx={52.3} cy={146.3} r={3.22} className="b busLine" />
		<path d="M42.93 138.52v15.56l-14.04-7.78 14.04-7.78z" className="c busLine" />
		<circle cx={52.3} cy={180.3} r={3.22} className="b busLine" />
		<path
			d="M28.89 188.08v-15.56l14.04 7.78-14.04 7.78zM52.9 163.3H31.5M338.76 188.86v21.75h-37.93v-21.75zM338.76 176.07v12.79h-37.93v-12.79zM338.76 163.28v12.79h-37.93v-12.79zM338.76 150.49v12.79h-37.93v-12.79zM338.76 137.7v12.79h-37.93V137.7zM626.08 66.8h-15.89V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={591.78}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 604.535 58.005)"
		/>
		<path
			d="M610.19 70.76h13.88M610.19 45.25h13.88M626.08 101.11h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={591.78}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 604.535 92.315)"
		/>
		<path
			d="M610.19 105.07h13.88M610.19 79.56h13.88M626.08 153.77h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={591.78}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 604.53 144.97)"
		/>
		<path
			d="M610.19 157.72h13.88M610.19 132.21h13.88M626.08 188.08h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={591.78}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 604.53 179.28)"
		/>
		<path
			d="M610.19 192.04h13.88M610.19 166.52h13.88M565.5 153.77h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={531.2}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 543.955 144.965)"
		/>
		<path
			d="M549.61 157.72h13.89M549.61 132.21h13.89M565.5 188.08h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={531.2}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 543.96 179.28)"
		/>
		<path
			d="M549.61 192.04h13.89M549.61 166.52h13.89M504.92 153.77h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={470.62}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 483.38 144.97)"
		/>
		<path
			d="M489.03 157.72h13.89M489.03 132.21h13.89M504.92 188.08h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={470.62}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 483.38 179.28)"
		/>
		<path
			d="M489.03 192.04h13.89M489.03 166.52h13.89M444.34 153.77h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={410.04}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 422.8 144.97)"
		/>
		<path
			d="M428.46 157.72h13.88M428.46 132.21h13.88M444.34 188.08h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={410.04}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 422.8 179.28)"
		/>
		<path
			d="M428.46 192.04h13.88M428.46 166.52h13.88M383.77 153.77h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={349.47}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 362.22 144.97)"
		/>
		<path
			d="M367.88 157.72h13.88M367.88 132.21h13.88M383.77 188.08h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={349.47}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 362.22 179.28)"
		/>
		<path
			d="M367.88 192.04h13.88M367.88 166.52h13.88M383.77 66.8h-15.89V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={349.47}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 362.225 58.005)"
		/>
		<path
			d="M367.88 70.76h13.88M367.88 45.25h13.88M383.77 101.11h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={349.47}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 362.225 92.315)"
		/>
		<path
			d="M367.88 105.07h13.88M367.88 79.56h13.88M444.34 66.8h-15.89V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={410.04}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 422.8 58)"
		/>
		<path
			d="M428.46 70.76h13.88M428.46 45.25h13.88M444.34 101.11h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={410.04}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 422.8 92.31)"
		/>
		<path
			d="M428.46 105.07h13.88M428.46 79.56h13.88M504.92 66.8h-15.89V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={470.62}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 483.375 58.005)"
		/>
		<path
			d="M489.03 70.76h13.89M489.03 45.25h13.89M504.92 101.11h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={470.62}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 483.375 92.315)"
		/>
		<path
			d="M489.03 105.07h13.89M489.03 79.56h13.89M565.5 66.8h-15.89V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={531.2}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 543.955 58.005)"
		/>
		<path
			d="M549.61 70.76h13.89M549.61 45.25h13.89M565.5 101.11h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={531.2}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 543.955 92.315)"
		/>
		<path
			d="M549.61 105.07h13.89M549.61 79.56h13.89M281.35 153.77h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={247.05}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 259.81 144.97)"
		/>
		<path
			d="M265.46 157.72h13.89M265.46 132.21h13.89M281.35 188.08h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={247.05}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 259.81 179.28)"
		/>
		<path
			d="M265.46 192.04h13.89M265.46 166.52h13.89M220.77 153.77h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={186.47}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 199.23 144.97)"
		/>
		<path
			d="M204.88 157.72h13.89M204.88 132.21h13.89M220.77 188.08h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={186.47}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 199.23 179.28)"
		/>
		<path
			d="M204.88 192.04h13.89M204.88 166.52h13.89M160.19 153.77H144.3v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={125.9}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 138.65 144.97)"
		/>
		<path
			d="M144.31 157.72h13.88M144.31 132.21h13.88M160.19 188.08H144.3v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={125.9}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 138.65 179.28)"
		/>
		<path
			d="M144.31 192.04h13.88M144.31 166.52h13.88M99.62 153.77H83.73v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={65.32}
			y={139.31}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 78.07 144.97)"
		/>
		<path
			d="M83.73 157.72h13.88M83.73 132.21h13.88M99.62 188.08H83.73v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={65.32}
			y={173.62}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 78.07 179.28)"
		/>
		<path
			d="M83.73 192.04h13.88M83.73 166.52h13.88M99.62 66.8H83.73V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={65.32}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 78.075 58.005)"
		/>
		<path
			d="M83.73 70.76h13.88M83.73 45.25h13.88M99.62 101.11H83.73v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={65.32}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 78.075 92.315)"
		/>
		<path
			d="M83.73 105.07h13.88M83.73 79.56h13.88M160.19 66.8H144.3V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={125.9}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 138.65 58)"
		/>
		<path
			d="M144.31 70.76h13.88M144.31 45.25h13.88M160.19 101.11H144.3v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={125.9}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 138.65 92.31)"
		/>
		<path
			d="M144.31 105.07h13.88M144.31 79.56h13.88M220.77 66.8h-15.89V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={186.47}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 199.23 58)"
		/>
		<path
			d="M204.88 70.76h13.89M204.88 45.25h13.89M220.77 101.11h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={186.47}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 199.225 92.315)"
		/>
		<path
			d="M204.88 105.07h13.89M204.88 79.56h13.89M281.35 66.8h-15.89V49.2h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={247.05}
			y={52.35}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 259.805 58.005)"
		/>
		<path
			d="M265.46 70.76h13.89M265.46 45.25h13.89M281.35 101.11h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="c busLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={247.05}
			y={86.66}
			className="c busLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 259.805 92.315)"
		/>
		<path d="M265.46 105.07h13.89M265.46 79.56h13.89" className="c busLine" />
		</g>
	</svg>
}

const MiniSVG = ({ strokeWidth, setUnmounted, unmounting }: { strokeWidth: number, unmounting: boolean, setUnmounted: (bool: boolean) => void }) => {
	const unmountSVG = () => {
		setUnmounted(true)
	}
	
	useEffect(() => {
		if (!unmounting) {
			animateBus('in', 'minibus')
		} else {
			animateBus('out', 'minibus')
			setTimeout(unmountSVG, 900)
		}
	}, [unmounting])

	return <svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 233.66 577.31"
	>
		<g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 -1 1 0 0 577.31)">
		<defs>
			<style>
			{
				`.b{fill:none;stroke:#f55;stroke-linecap:round;stroke-linejoin:round;stroke-width:${strokeWidth}px}`
			}
			</style>
		</defs>
		<path
			d="m490.86 186.63-25.02-3.15-32.71-4.12c3.9-11.31 6.77-25.66 8.08-41.69.06-.33.08-.67.08-1 .64-6.33.98-12.98.98-19.84 0-7.5-.39-14.74-1.14-21.6 0-.11-.03-.22-.03-.33-1.42-15.6-4.26-29.54-8.14-40.57l32.88-4.15 25.02-3.15c9.86 11.87 16.72 38.65 16.72 69.8s-6.85 57.93-16.72 69.8ZM564.07 164.85h-1.96c-3.67 0-7.06 1.97-8.87 5.16l-12.6 22.12c-.1.18.03.41.24.41h7.84M564.07 68.81h-1.96c-3.67 0-7.06-1.97-8.87-5.16l-12.6-22.12c-.1-.18.03-.41.24-.41h7.84M462.35 199.48l-7.52 18.94c-.15.37-.5.61-.9.61h0c-3.2 0-5.3-3.34-3.91-6.22l6.43-13.33M462.35 34.18l-7.52-18.94a.966.966 0 0 0-.9-.61h0c-3.2 0-5.3 3.34-3.91 6.22l6.43 13.33"
			className="b miniLine"
		/>
		<path
			d="M527.67 199.48H25.31c-5.04 0-9.46-3.45-10.58-8.37-4.21-18.49-6.82-44.92-6.82-74.28s2.62-55.79 6.82-74.28c1.12-4.92 5.53-8.37 10.58-8.37h502.36c15.52 0 29.2 10.11 33.77 24.94 5.02 16.3 7.97 36.22 7.97 57.71 0 21.48-2.95 41.38-7.97 57.71-4.57 14.82-18.25 24.94-33.77 24.94Z"
			className="b miniLine"
		/>
		<path
			d="M390.24 44.06h46.27l18.08-5.05h-60.14l-4.21 5.05zM362.06 44.06l-5.47-5.05H41.98l5.05 5.05h315.03zM390.24 189.6h46.27l18.08 5.05h-60.14l-4.21-5.05zM362.06 189.6l-5.47 5.05H41.98l5.05-5.05h315.03zM18.32 58.78v116.08l-3.62 4.42V54.15l3.62 4.63zM372.58 59.72V34.18"
			className="b miniLine"
		/>
		<path
			d="m432.51 179.28-59.93-5.34H36.94l-22.21 17.17M432.51 54.38l-59.93 5.34H36.94L14.73 42.55M372.58 173.94v25.54M36.94 173.94V59.72M367.62 104.07h13.89M383.51 125.63h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={349.21}
			y={111.17}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 361.97 116.83)"
		/>
		<path
			d="M367.62 129.59h13.89M307.2 104.07h13.89M323.09 125.63H307.2v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={288.79}
			y={111.17}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 301.55 116.83)"
		/>
		<path
			d="M307.2 129.59h13.89M246.78 104.07h13.88M262.67 125.63h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={228.37}
			y={111.17}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 241.125 116.835)"
		/>
		<path
			d="M246.78 129.59h13.88M186.36 104.07h13.88M202.25 125.63h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={167.95}
			y={111.17}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 180.7 116.83)"
		/>
		<path
			d="M186.36 129.59h13.88M125.94 104.07h13.88M141.83 125.63h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={107.53}
			y={111.17}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 120.28 116.83)"
		/>
		<path
			d="M125.94 129.59h13.88M65.52 104.07H79.4M81.41 125.63H65.52v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={47.11}
			y={111.17}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 59.86 116.83)"
		/>
		<path
			d="M65.52 129.59H79.4M383.51 92.75h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={349.21}
			y={78.3}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 361.965 83.955)"
		/>
		<path
			d="M367.62 96.71h13.89M367.62 71.2h13.89M383.51 158.51h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={349.21}
			y={144.05}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 361.965 149.705)"
		/>
		<path
			d="M367.62 162.46h13.89M367.62 136.95h13.89M323.09 92.75H307.2v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={288.79}
			y={78.3}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 301.545 83.955)"
		/>
		<path
			d="M307.2 96.71h13.89M307.2 71.2h13.89M323.09 158.51H307.2v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={288.79}
			y={144.05}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 301.545 149.705)"
		/>
		<path
			d="M307.2 162.46h13.89M307.2 136.95h13.89M262.67 158.51h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={228.37}
			y={144.05}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 241.125 149.705)"
		/>
		<path
			d="M246.78 162.46h13.88M246.78 136.95h13.88M262.67 92.75h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={228.37}
			y={78.3}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 241.125 83.955)"
		/>
		<path
			d="M246.78 96.71h13.88M246.78 71.2h13.88M202.25 92.75h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={167.95}
			y={78.3}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 180.705 83.955)"
		/>
		<path
			d="M186.36 96.71h13.88M186.36 71.2h13.88M202.25 158.51h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={167.95}
			y={144.05}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 180.705 149.705)"
		/>
		<path
			d="M186.36 162.46h13.88M186.36 136.95h13.88M141.83 92.75h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={107.53}
			y={78.3}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 120.285 83.955)"
		/>
		<path
			d="M125.94 96.71h13.88M125.94 71.2h13.88M141.83 158.51h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={107.53}
			y={144.05}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 120.285 149.705)"
		/>
		<path
			d="M125.94 162.46h13.88M125.94 136.95h13.88M81.41 92.75H65.52v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={47.11}
			y={78.3}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 59.86 83.95)"
		/>
		<path
			d="M65.52 96.71H79.4M65.52 71.2H79.4M81.41 158.51H65.52v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
			className="b miniLine"
		/>
		<rect
			width={25.51}
			height={11.31}
			x={47.11}
			y={144.05}
			className="b miniLine"
			rx={5.66}
			ry={5.66}
			transform="rotate(90 59.86 149.71)"
		/>
		<path d="M65.52 162.46H79.4M65.52 136.95H79.4" className="b miniLine" />
		</g>
	</svg>
}

const MicroSVG = ({ strokeWidth, setUnmounted, unmounting }: { strokeWidth: number, unmounting: boolean, setUnmounted: (bool: boolean) => void }) => {
	const unmountSVG = () => {
		setUnmounted(true)
	}
	
	useEffect(() => {
		if (!unmounting) {
			animateBus('in', 'microbus')
		} else {
			animateBus('out', 'microbus')
			setTimeout(unmountSVG, 900)
		}
	}, [unmounting])
	
	return <svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 222.55 417.32"
	>
	<g xmlns="http://www.w3.org/2000/svg" transform="rotate(-90 208.66 208.66)">
		<defs>
		<style>
			{
			`.b{fill:none;stroke:#f55;stroke-linecap:round;stroke-linejoin:round;stroke-width:${strokeWidth}px}`
			}
		</style>
		</defs>
		<path
		d="M382.77 187.45H20.4c-3.88 0-7.02-3.14-7.02-7.02V42.14c0-3.88 3.14-7.02 7.02-7.02h362.35c12.54 13.8 21.19 42.73 21.19 76.15s-8.64 62.36-21.17 76.17ZM355.38 187.45l-4.93 19.98-10.26 2.16 3.78-22.14M355.38 35.11l-4.93-19.99-10.26-2.16 3.78 22.15"
		className="b microLine"
		/>
		<path
		d="m375.74 177-31.72-6.1-13.55-2.61v-3.33c2.77-9.68 4.81-21.49 5.83-34.55.5-6.21.75-12.7.75-19.38s-.25-13.17-.75-19.38c-1.02-13.06-3.06-24.85-5.83-34.53v-2.81l13.37-2.56 32.12-6.17c6.48 14.6 10.68 38.47 10.68 65.45s-4.31 51.43-10.9 65.97ZM362.33 39.98l-36.19 8.1h-50.23l10.04-8.1h76.38zM251.6 48.08l-11.34-8.1H41.47l12.43 8.1h197.7zM362.33 182.08l-36.19-8.11h-50.23l10.04 8.11h76.38zM251.6 173.97l-11.34 8.11H41.47l12.43-8.11h197.7zM30.94 187.45c-3.68-1.49-6.64-6.49-9.18-13.48-.69 5.01-.42 9.66 2.16 13.48M21.75 48.58c-.69-5.01-.42-9.66 2.16-13.48M30.94 35.11c-3.68 1.49-6.64 6.49-9.18 13.48M25.05 162.81c-2.22-13.08-3.61-32.23-3.61-53.55 0-19.77 1.2-37.67 3.15-50.6l4.35 2.63c-1.7 12.69-2.76 29.51-2.76 47.97 0 19.95 1.22 37.99 3.2 50.94l-4.33 2.61Z"
		className="b microLine"
		/>
		<path
		d="M330.47 54.31h0a93.797 93.797 0 0 1-23.05 2.88H41.47L30.94 35.11M330.47 168.25h0a93.797 93.797 0 0 0-23.05-2.88H41.47l-10.53 22.08M41.47 165.37V57.19M259.69 87.21H243.8v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={225.39}
		y={72.75}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 238.15 78.41)"
		/>
		<path
		d="M243.81 91.16h13.88M243.81 65.65h13.88M243.81 98.53h13.88M259.69 120.09H243.8v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={225.39}
		y={105.63}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 238.15 111.29)"
		/>
		<path
		d="M243.81 124.04h13.88M259.69 152.96H243.8v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={225.39}
		y={138.51}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 238.145 144.165)"
		/>
		<path
		d="M243.81 156.92h13.88M243.81 131.41h13.88M202.66 87.21h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={168.36}
		y={72.75}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 181.115 78.405)"
		/>
		<path
		d="M186.77 91.16h13.88M186.77 65.65h13.88M202.66 120.09h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={168.36}
		y={105.63}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 181.115 111.285)"
		/>
		<path
		d="M186.77 124.04h13.88M186.77 98.53h13.88M202.66 152.96h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={168.36}
		y={138.51}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 181.115 144.165)"
		/>
		<path
		d="M186.77 156.92h13.88M186.77 131.41h13.88M145.62 87.21h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={111.32}
		y={72.75}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 124.08 78.41)"
		/>
		<path
		d="M129.74 91.16h13.88M129.74 65.65h13.88M145.62 120.09h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={111.32}
		y={105.63}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 124.08 111.29)"
		/>
		<path
		d="M129.74 124.04h13.88M129.74 98.53h13.88M145.62 152.96h-15.89v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={111.32}
		y={138.51}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 124.08 144.16)"
		/>
		<path
		d="M129.74 156.92h13.88M129.74 131.41h13.88M88.59 87.21H72.7v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={54.29}
		y={72.75}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 67.045 78.405)"
		/>
		<path
		d="M72.7 91.16h13.89M72.7 65.65h13.89M88.59 120.09H72.7v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={54.29}
		y={105.63}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 67.045 111.285)"
		/>
		<path
		d="M72.7 124.04h13.89M72.7 98.53h13.89M88.59 152.96H72.7v-17.6h15.89c1.63 0 2.95 1.58 2.95 3.53v10.54c0 1.95-1.32 3.53-2.95 3.53Z"
		className="b microLine"
		/>
		<rect
		width={25.51}
		height={11.31}
		x={54.29}
		y={138.51}
		className="b microLine"
		rx={5.66}
		ry={5.66}
		transform="rotate(90 67.045 144.165)"
		/>
		<path d="M72.7 156.92h13.89M72.7 131.41h13.89" className="b microLine" />
	</g>
	</svg>
}

export default Svg