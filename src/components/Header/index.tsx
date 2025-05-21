import { useLocation } from 'wouter'
import Logo from '../Logo'
import Nav from '../Nav'
import styles from './styles.module.scss'

const Header = () => {
	const [, navigate] = useLocation()
	
	return (
		<div className={styles.header}>
			<div className={styles.logo} onClick={() => navigate('/')}>
				<div className={styles.icon}>
					<Logo stroke={50} />
				</div>
			</div>
			<div className={styles.title}>
				ReserBus
			</div>
			<Nav />
		</div>
	)
}

export default Header