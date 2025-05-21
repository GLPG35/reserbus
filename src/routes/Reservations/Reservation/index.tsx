import { useParams } from 'wouter'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import Api from '../../../utils/api'
import Spinner from '../../../components/Spinner'
import { PiBusBold, PiCalendarBold, PiCheckBold, PiClockBold, PiFlagBold, PiHashBold, PiMapPinBold, PiVanBold, PiXBold } from 'react-icons/pi'

const Reservation = () => {
	const { id } = useParams()
	const [reservation, setReservation] = useState<GetReservation|null>()

	useEffect(() => {
		if (!reservation) Api.getReservation(id as string).then(setReservation).catch(() => setReservation(null))
	}, [])

	const intl = Intl.DateTimeFormat('es-UY', { dateStyle: 'medium', timeStyle: 'short', hour12: false })

	const intl2 = Intl.DateTimeFormat('es-UY', { dateStyle: 'long', timeStyle: 'short', hour12: false })

	const parseVehicle = {
		'bus': 'Ómnibus',
		'minibus': 'Minibus',
		'microbus': 'Microbus'
	}
	
	return (
		<div className={styles.reservation}>
			{reservation === undefined ?
				<Spinner size='3em' />
			: reservation ?
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
									'Vehículo pendiente a asignar'
								:
									reservation.vehicleId
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
			:
				<div className={styles.notFound}></div>
			}
		</div>
	)
}

export default Reservation