import styles from './styles.module.scss'
import { useUserStore } from '../../store/user'
import { useEffect, useMemo, useState } from 'react'
import Api from '../../utils/api'
import Spinner from '../../components/Spinner'
import { PiCheckBold, PiClockBold, PiHouseLineBold, PiXBold } from 'react-icons/pi'
import { motion, AnimatePresence } from 'framer-motion'
import { navigate } from 'wouter/use-browser-location'

const units = [
	{
		unit: 'second',
		value: 60,
		division: 1
	},
	{
		unit: 'minute',
		value: 3600,
		division: 60
	},
	{
		unit: 'hour',
		value: 86400,
		division: 3600
	},
	{
		unit: 'day',
		value: 86400 * 7,
		division: 86400
	},
	{
		unit: 'week',
		value: 86400 * 7 * 4,
		division: 86400 * 7
	},
	{
		unit: 'month',
		value: 86400 * 7 * 4 * 12,
		division: 86400 * 7 * 4
	},
	{
		unit: 'year',
		value: Infinity,
		division: 86400 * 7 * 4 * 12
	}
]

const Reservations = () => {
	const user = useUserStore(state => state.user)
	const [reservations, setReservations] = useState<GetReservation[]>()
	const random = useMemo(() => Math.floor(Math.random() * 3), [reservations])
	const [buttonHover, setButtonHover] = useState(false)

	useEffect(() => {
		if (!reservations) Api.getReservations().then(setReservations)
	}, [])
	
	useEffect(() => {
		if (user === null) navigate('/')
	}, [user])

	const randomVehicles: ['bus', 'minibus', 'microbus'] = ['bus', 'minibus', 'microbus']
	
	const vehiclePaths = {
		'bus': '/Bus.svg',
		'minibus': '/Minibus.svg',
		'microbus': '/Microbus.svg'
	}

	return (
		<div className={styles.reservations}>
			<h2>Mis reservas</h2>
			{!reservations ?
				<Spinner size='3em' />
			: reservations.length > 0 ?
				<div className={styles.list}>
					{reservations.map(({ id, status, amount, createdAt, tripDate, vehicleType }) => {
						const parseId = id.replace(/-/g, '')
						const date = new Date(tripDate.replace(/ /g, 'T'))
						const timestamp = new Date(createdAt.replace(/ /g, 'T'))
						const today = Date.now()
						const diff = Math.ceil((date.getTime() - today) / 1000)
						
						const findUnit = units.find(x => Math.abs(diff) < x.value) as { unit: 'second'|'minute'|'hour'|'day', value: number, division: number }

						const daysUntil = new Intl.RelativeTimeFormat('es-UY', { style: 'long' }).format(Math.ceil(diff / findUnit.division), findUnit.unit)
						
						return (
							<div className={styles.reservation} key={parseId} onClick={() => navigate(`/reservations/${id}`)}>
								<div className={styles.info}>
									<div className={styles.title}>
										<div className={styles.order}>Reserva #{parseId.substring(0, 8)}</div>
										<div className={styles.date}>{Intl.DateTimeFormat('es-UY', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(timestamp)}</div>
									</div>
									<div className={styles.data}>
										<div className={styles.daysUntil}>
											{diff < 0 ?
												`Este viaje salió ${daysUntil}`
											:
												`Este viaje sale en ${daysUntil}`
											}
										</div>
										<div className={styles.status}>
											{status === 'pendiente' ?
												amount === undefined || amount === null ?
													<span>
														<div className={styles.icon}>
															<PiClockBold />
														</div>
														Cotización en proceso
													</span>
												:
													<span>
														<div className={styles.icon}>
															<PiClockBold />
														</div>
														Pendiente de pago
													</span>
											:
												<span className={styles.capitalize}>
													<div className={styles.icon}>
														{status === 'confirmada' ? <PiCheckBold /> : <PiXBold />}
													</div>
													{status}
												</span>
											}
										</div>
									</div>
								</div>
								<div className={styles.vehicle}>
									<img src={vehiclePaths[vehicleType]} alt="" />
								</div>
							</div>
						)
					})}
				</div>
			:
				<div className={styles.empty}>
					<div className={styles.randomBus}>
						<img src={vehiclePaths[randomVehicles[random]]} alt="" />
					</div>
					<div className={styles.message}>
						<div className={styles.title}>
							¡Aún no has hecho ninguna reserva!
						</div>
						<div className={styles.text}>
							Ve a la página de inicio para reservar tu viaje
						</div>
						<motion.button whileTap={{ scale: 0.9 }} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={() => navigate('/')}>
							<AnimatePresence initial={false} mode='popLayout'>
								{buttonHover &&
									<motion.div className={styles.icon} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
										<PiHouseLineBold />
									</motion.div>
								}
							</AnimatePresence>
							<motion.span layout='position' key='form1'>Ir al inicio</motion.span>
						</motion.button>
					</div>
				</div>
			}
		</div>
	)
}

export default Reservations