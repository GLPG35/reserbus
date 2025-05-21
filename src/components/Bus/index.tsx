import Svg from '../SVG'
import styles from './styles.module.scss'

const Bus = ({ type }: { type: 'bus' | 'microbus' | 'minibus' }) => {
	return (
		<div className={styles.bus}>
			<Svg strokeWidth={3} type={type} />
		</div>
	)
}

export default Bus