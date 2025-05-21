import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '../../store/user'
import styles from './styles.module.scss'
import User from '../../utils/user'
import { PiSignOutBold, PiTicketBold } from 'react-icons/pi'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'wouter'

const UserNav = () => {
	const user = useUserStore(state => state.user)
	const setUser = useUserStore(state => state.setUser)
	const [active, setActive] = useState(false)
	const profileRef = useRef<HTMLDivElement>(null)
	const picRef = useRef<HTMLDivElement>(null)
	const [, navigate] = useLocation()

	const clickOutside = (e: globalThis.MouseEvent) => {
		if (picRef.current && picRef.current.contains(e.target as Node)) return

		if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
			setActive(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', clickOutside, { capture: true })

		return () => {
			document.removeEventListener('click', clickOutside, { capture: true })
		}
	}, [])

	const options = [
		{
			icon: <PiTicketBold />,
			name: 'Reservaciones',
			link: '/reservations'
		},
		{
			icon: <PiSignOutBold />,
			name: 'Cerrar sesión',
			action: () => User.logout().then(() => setUser(null))
		}
	]

	if (!user) return
	
	return (
		<motion.div className={styles.user} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
			<motion.div className={styles.profilePic} onClick={() => setActive(!active)} ref={picRef} whileTap={{ scale: 0.9 }}>
				<div className={styles.name}>
					{user.name.substring(0, 1)}{user.lastname.substring(0, 1)}
				</div>
			</motion.div>
			<AnimatePresence>
				{active &&
					<motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={styles.options} ref={profileRef}>
						{options.map(({ icon, name, link, action }) => {
							const handleClick = () => {
								if (action) {
									action()
									setActive(false)
								}

								if (link) {
									setActive(false)
									navigate(link)
								}
							}
							
							return (
								<div className={styles.option} key={name} onClick={handleClick}>
									<div className={styles.icon}>
										{icon}
									</div>
									{name}
								</div>
							)
						})}
					</motion.div>
				}
			</AnimatePresence>
		</motion.div>
	)
}

export default UserNav