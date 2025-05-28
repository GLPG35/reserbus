import { Fragment, useState } from 'react'
import styles from '../styles.module.scss'
import { useUserStore } from '../../../store/user'
import Api from '../../../utils/api'
import { PiBusBold, PiCalendarBold, PiCurrencyDollarBold, PiFlagBold, PiMapPinBold, PiVanBold } from 'react-icons/pi'
import { busOptions } from '../../../utils/options'
import { motion, AnimatePresence } from 'framer-motion'
import User from '../../../utils/user'
import Spinner from '../../Spinner'

type Props = {
	firstBody: { origin: string, destination: string, date: string, busType: 'bus'|'microbus'|'minibus', email: string, stops?: string[] },
	secondBody?: { firstname: string, lastname: string, ci: number, tel: number, password: string },
	nextStep: (rid: string) => void
}

const PaymentForm = ({ firstBody, secondBody, nextStep }: Props) => {
	const user = useUserStore(state => state.user)
	const setUser = useUserStore(state => state.setUser)
	const [buttonHover, setButtonHover] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		const { date, origin, destination, busType, email, stops } = firstBody

		const parseDate = `${date.replace(/T/, ' ')}:00`

		if (user) {
			const reservation: Reservation = {
				origin,
				destination,
				stops,
				busType,
				date: parseDate
			}

			return Api.newReservation(reservation).then(rid => {
				setLoading(false)
				nextStep(rid)
			})
		}

		const { firstname, lastname, ci, tel, password } = secondBody as { firstname: string, lastname: string, ci: number, tel: number, password: string }

		const reservation: ReservationUser = {
			user: {
				name: firstname,
				lastname,
				ci: `${ci}`,
				tel: `${tel}`,
				email,
				password
			},
			origin,
			destination,
			stops,
			busType,
			date: parseDate
		}

		return User.createTripUser(reservation)
		.then(({ user, rid }) => {
			setUser(user)
			setLoading(false)
			nextStep(rid)
		})
	}
	
	return (
		<form onSubmit={handleSubmit3}>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="">Resumen</label>
					<div className={styles.summary}>
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
								<div className={styles.item}>{firstBody.origin}</div>
								<div className={styles.item}>{firstBody.destination}</div>
							</div>
						</div>
						<div className={styles.stops}>
							<div className={styles.stopList}>
								<div className={styles.title}>
									Paradas
									<div className={styles.icon}>
										<PiMapPinBold />
									</div>
								</div>
								{firstBody.stops && firstBody.stops.length > 0 ?
									<div className={styles.list}>
										{firstBody.stops.map((stop, i) => {
											return (
												<Fragment key={stop}>
													<div className={styles.stop}>
														{stop}
													</div>
													{i + 1 !== (firstBody.stops as string[]).length &&
														<div className={styles.bullet}>•</div>
													}
												</Fragment>
											)
										})}
									</div>
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
							<div className={styles.bus}>
								{busOptions[firstBody.busType]}
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
								{Intl.DateTimeFormat('es-UY', { dateStyle: 'long', timeStyle: 'short', hour12: false }).format(new Date(firstBody.date))}
							</div>
						</div>
						
					</div>
				</fieldset>
			</div>
			<div className={styles.group}>
				<div className={styles.message}>
					<p>Por el momento sólo estamos procesando cotizaciones de forma manual.</p>
					<p>Una vez la cotización sea realizada, nos comunicaremos con usted a través del correo {firstBody.email}.</p>
				</div>
			</div>
			<div className={styles.group}>
				<motion.button whileTap={{ scale: 0.9 }} disabled={loading} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)}>
					{loading ?
						<Spinner />
					:
						<>
							<AnimatePresence initial={false} mode='popLayout'>
								{buttonHover &&
									<motion.div className={styles.icon} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
										<PiCurrencyDollarBold />
									</motion.div>
								}
							</AnimatePresence>
							<motion.span  layout='position'>Pedir cotización</motion.span>
						</>
					}
				</motion.button>
			</div>
		</form>
	)
}

export default PaymentForm