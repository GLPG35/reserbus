import { Link, useParams } from 'wouter'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import Api from '../../../utils/api'
import Spinner from '../../../components/Spinner'
import { PiArrowLeftBold, PiBusBold, PiCalendarBold, PiCheckBold, PiClockBold, PiCurrencyDollarBold, PiFlagBold, PiHashBold, PiMapPinBold, PiVanBold, PiXBold } from 'react-icons/pi'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../../../store/user'
import { navigate } from 'wouter/use-browser-location'

const Reservation = () => {
	const { id } = useParams()
	const user = useUserStore(state => state.user)
	const [reservation, setReservation] = useState<GetReservation|null>()
	const [buttonHover, setButtonHover] = useState(false)

	useEffect(() => {
		if (!reservation) Api.getReservation(id as string).then(setReservation).catch(() => setReservation(null))
	}, [])

	useEffect(() => {
		if (user === null) navigate('/')
	}, [user])
	
	const intl = Intl.DateTimeFormat('es-UY', { dateStyle: 'medium', timeStyle: 'short', hour12: false })

	const intl2 = Intl.DateTimeFormat('es-UY', { dateStyle: 'long', timeStyle: 'short', hour12: false })

	const parseVehicle = {
		'bus': 'Ómnibus',
		'minibus': 'Minibus',
		'microbus': 'Microbus'
	}

	const handlePayment = () => {
		if (id) Api.makePayment(id).then(success => {
			if (success) {
				setReservation(prev => ({ ...prev, status: 'confirmada' } as GetReservation))
			}
		})
	}
	
	return (
		<div className={styles.reservation}>
			{reservation === undefined ?
				<Spinner size='3em' />
			: reservation ?
				<div className={styles.wrapper}>
					<Link to='/reservations' className={styles.back}>
						<div className={styles.icon}>
							<PiArrowLeftBold />
						</div>
						Volver a tus reservas
					</Link>
					<div className={styles.info}>
						<div className={styles.title}>
							<div className={styles.id}>
								Reserva #{reservation.id.split('-')[0]}
							</div>
							<div className={styles.createdAt}>
								{intl.format(new Date(reservation.createdAt.replace(/ /, 'T')))}
							</div>
						</div>
						<div className={styles.data}>
							<div className={styles.route}>
								<div className={styles.trayectory}>
									<div className={styles.icon}>
										<PiVanBold />
									</div>
									<div className={styles.path}></div>
									<div className={styles.icon}>
										<PiFlagBold />
									</div>
								</div>
								<div className={styles.originDestination}>
									<span>{reservation.origin}</span>
									<span>{reservation.destination}</span>
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.itemTitle}>
									Paradas
									<div className={styles.icon}>
										<PiMapPinBold />
									</div>
								</div>
								<div className={styles.description}>
									{reservation.stops && reservation.stops.length > 0 ?
										reservation.stops.map(x => x.name).join(' • ')
									:
										<div className={styles.noStops}>
											No hay paradas seleccionadas para este viaje
										</div>
									}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.itemTitle}>
									Tipo de vehículo
									<div className={styles.icon}>
										<PiBusBold />
									</div>
								</div>
								<div className={styles.description}>
									{parseVehicle[reservation.vehicleType]}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.itemTitle}>
									Fecha y hora del viaje
									<div className={styles.icon}>
										<PiCalendarBold />
									</div>
								</div>
								<div className={styles.description}>
									{intl2.format(new Date(reservation.tripDate.replace(/ /g, 'T')))}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.itemTitle}>
									N° de vehículo
									<div className={styles.icon}>
										<PiHashBold	/>
									</div>
								</div>
								<div className={styles.description}>
									{reservation.vehicleId == null ?
										'Vehículo pendiente a ser asignado'
									:
										reservation.vehicleId.split('-')[1]
									}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.itemTitle}>
									Estado
									<div className={styles.icon}>
										<PiClockBold />
									</div>
								</div>
								<div className={styles.description}>
									{reservation.status !== 'pendiente' ?
										<span className={styles.capitalize}>
											<div className={styles.icon}>
												{reservation.status === 'confirmada' ? <PiCheckBold /> : <PiXBold />}
											</div>
											{reservation.status}
										</span>
									: reservation.amount === undefined || reservation.amount === null ?
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
									}
								</div>
							</div>
						</div>
					</div>
					{reservation.amount != null &&
						<div className={styles.payment}>
							<div className={styles.title}>
								Pago
							</div>
							<div className={styles.data}>
								<div className={styles.item}>
									<div className={styles.itemTitle}>
										{reservation.status == 'pendiente' ? 'Total a pagar' : 'Total pagado'}
										<div className={styles.icon}>
											<PiCurrencyDollarBold />
										</div>
									</div>
									<div className={styles.amount}>
										UYU {reservation.amount}
									</div>
								</div>
								{reservation.status == 'pendiente' &&
									<motion.button whileTap={{ scale: 0.9 }} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={handlePayment}>
										<AnimatePresence initial={false} mode='popLayout'>
											{buttonHover &&
												<motion.div className={styles.icon} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
													<PiCurrencyDollarBold />
												</motion.div>
											}
										</AnimatePresence>
										<motion.span layout='position'>Pagar</motion.span>
									</motion.button>
								}
							</div>
						</div>
					}
				</div>
			:
				<div className={styles.notFound}></div>
			}
		</div>
	)
}

export default Reservation