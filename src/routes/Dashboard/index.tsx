import { useEffect } from 'react'
import { useUserStore } from '../../store/user'
import styles from './styles.module.scss'
import { Link, useLocation } from 'wouter'
import { PiBusBold, PiTicketBold, PiUsersBold } from 'react-icons/pi'
import Reservations from './Reservations'
import Vehicles from './Vehicles'
import Users from './Users'
import { navigate } from 'wouter/use-browser-location'
import Spinner from '../../components/Spinner'

const Dashboard = () => {
	const user = useUserStore(state => state.user)
	const [location] = useLocation()

	useEffect(() => {
		if (user === null) navigate('/', { replace: true })
	}, [user])

	const options = [
		{
			name: 'Reservas',
			icon: <PiTicketBold />,
			link: '/reservations'
		},
		{
			name: 'Vehículos',
			icon: <PiBusBold />,
			link: '/vehicles'
		},
		{
			name: 'Usuarios',
			icon: <PiUsersBold />,
			link: '/users'
		}
	]

	const routes = {
		'/reservations': <Reservations />,
		'/vehicles': <Vehicles />,
		'/users': <Users />
	}

	const parseLocation = Object.keys(routes).includes(location) ? location as keyof typeof routes : '/reservations'

	if (user === null) return
	
	return (
		<div className={styles.dashboard}>
			{user === undefined ?
				<Spinner size='3em' />
			:
				<>
					<div className={styles.leftBar}>
						{options.map(({ name, icon, link }) => {
							const isActive  = parseLocation == link
							
							return (
								<Link to={link} className={`${styles.option} ${isActive ? styles.active : ''}`} key={name}>
									<div className={styles.icon}>
										{icon}
									</div>
									<div className={styles.text}>
										{name}
									</div>
								</Link>
							)
						})}
					</div>
					<div className={styles.action}>
						{routes[parseLocation]}
					</div>
				</>
			}
		</div>
	)
}

export default Dashboard