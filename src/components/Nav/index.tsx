import { useUserStore } from '../../store/user'
import UserNav from '../UserNav'
import styles from './styles.module.scss'
import LoginNav from '../LoginNav'
import { AnimatePresence } from 'framer-motion'
import Spinner from '../Spinner'

const Nav = () => {
	const user = useUserStore(state => state.user)
	
	return (
		<div className={styles.nav}>
			<AnimatePresence>
				{user === undefined ?
					<Spinner />
				: user === null ?
					<LoginNav />
				: user &&
					<UserNav />
				}
			</AnimatePresence>
		</div>
	)
}

export default Nav