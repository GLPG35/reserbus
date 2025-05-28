import { useEffect, useState } from 'react'
import Bus from '../../components/Bus'
import Reservation from '../../components/Reservation'
import styles from './styles.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { PiBusBold, PiCalendarBold, PiCheckCircle, PiCheckCircleBold, PiClockBold, PiCurrencyDollarBold, PiFlagBold, PiMapPinBold, PiTicketBold, PiVanBold, PiXCircleBold } from 'react-icons/pi'
import { useUserStore } from '../../store/user'
import { useLocation } from 'wouter'
import Api from '../../utils/api'

const Home = () => {
	const refreshReset = useUserStore(state => state.refreshReset)
	const reset = useUserStore(state => state.reset)
	const [busType, setBusType] = useState<'bus'|'minibus'|'microbus'>('bus')
	const [reservation, setReservation] = useState<GetReservation>()
	const [finish, setFinish] = useState(true)
	const [, navigate] = useLocation()

	useEffect(() => {
		if (reset) setFinish(false)
	}, [reset])

	const finishPayment = (rid: string) => {
		Api.getReservation(rid).then(setReservation)
		
		setFinish(true)
	}
	
	const reservationProps = {
		busType,
		setBusType,
		finishPayment
	}

	const busTypes = {
		'bus': 'Ómnibus',
		'minibus': 'Minibus',
		'microbus': 'Microbus'
	}

	const status = {
		'pendiente': {
			icon: <PiClockBold />,
			name: 'Pendiente'
		},
		'confirmada': {
			icon: <PiCheckCircleBold />,
			name: 'Completada'
		},
		'cancelada': {
			icon: <PiXCircleBold />,
			name: 'Cancelada'
		}
	}

	return (
		<div className={styles.home}>
			<AnimatePresence>
				{finish && reservation &&
					<motion.div className={styles.finishPayment} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						<div className={styles.successMessage}>
							<motion.div className={styles.iconTitle} initial={{ scale: 0 }} animate={{ scale: 1 }}>
								<PiCheckCircle />
							</motion.div>
							<h2>Reserva hecha correctamente</h2>
							<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => navigate('/reservations')}>
								<div className={styles.icon}>
									<PiTicketBold />
								</div>
								Ver reservaciones
							</motion.button>
							<p>o</p>
							<span onClick={refreshReset}>Ir al inicio</span>
						</div>
						<div className={styles.summary}>
							<div className={styles.title}>
								<h2>Reserva #{reservation.id.split('-')[0]}</h2>
								<div className={styles.id}>
									{Intl.DateTimeFormat('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(reservation.createdAt.replace(/ /g, 'T')))}
								</div>
							</div>
							<div className={styles.info}>
								<div className={styles.trayectory}>
									<div className={styles.path}>
										<div className={styles.origin}>
											<PiVanBold />
										</div>
										<div className={styles.road}></div>
										<div className={styles.destination}>
											<PiFlagBold />
										</div>
									</div>
									<div className={styles.originDestination}>
										<div className={styles.item}>{reservation.origin}</div>
										<div className={styles.item}>{reservation.destination}</div>
									</div>
								</div>
								<div className={styles.stops}>
									<div className={styles.title}>
										Paradas
										<div className={styles.icon}>
											<PiMapPinBold />
										</div>
									</div>
									<div className={styles.text}>
										{reservation.stops && reservation.stops.length > 0 ?
											reservation.stops.map(x => x.name).join(' • ')
										:
											<div className={styles.noStops}>
												No hay paradas seleccionadas para este viaje
											</div>
										}
									</div>
								</div>
								<div className={styles.element}>
									<div className={styles.title}>
										Tipo de vehículo
										<div className={styles.icon}>
											<PiBusBold />
										</div>
									</div>
									<div className={styles.text}>
										{busTypes[reservation.vehicleType]}
									</div>
								</div>
								<div className={styles.element}>
									<div className={styles.title}>
										Fecha y hora del viaje
										<div className={styles.icon}>
											<PiCalendarBold />
										</div>
									</div>
									<div className={styles.text}>
										{Intl.DateTimeFormat('es-UY', { dateStyle: 'long', timeStyle: 'short', hour12: false }).format(new Date(reservation.tripDate.replace(/ /g, 'T')))}
									</div>
								</div>
								<div className={styles.element}>
									<div className={styles.title}>
										Estado
										<div className={styles.icon}>
											{status[reservation.status].icon}
										</div>
									</div>
									<div className={styles.text}>
										{status[reservation.status].name}
									</div>
								</div>
								<div className={styles.element}>
									<div className={styles.title}>
										Monto
										<div className={styles.icon}>
											<PiCurrencyDollarBold />
										</div>
									</div>
									<div className={styles.text}>
										{reservation.amount == undefined ?
											<div className={styles.null}>
												Pendiente a confirmar
											</div>
										:
											`$${reservation.amount}`
										}
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				}
			</AnimatePresence>
			<Reservation {...reservationProps} />
			<Bus type={busType} />
		</div>
	)
}

export default Home