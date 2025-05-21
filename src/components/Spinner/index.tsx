import { PiCircleNotchBold } from 'react-icons/pi'
import styles from './styles.module.scss'

const Spinner = ({ size }: { size?: string }) => {
	return (
		<div className={styles.spinnerWrapper}>
			<div className={styles.spinner} style={{ fontSize: size }}>
				<PiCircleNotchBold />
			</div>
		</div>
	)
}

export default Spinner