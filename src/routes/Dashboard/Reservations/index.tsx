import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Api from '../../../utils/api'
import Spinner from '../../../components/Spinner'
import { PiBusBold, PiCaretLeftBold, PiCheckBold, PiClockBold, PiFlagBold, PiFunnelBold, PiMapPinBold, PiTrashBold, PiVanBold, PiXBold } from 'react-icons/pi'
import { AnimatePresence, motion } from 'framer-motion'

const Reservations = () => {
	const [reservations, setReservations] = useState<GetReservation[]>()
	const [filterActive, setFilterActive] = useState(false)
	const [filters, setFilters] = useState<'pendiente'|'confirmada'|'cancelada'>('pendiente')
	const [deleteActive, setDeleteActive] = useState(false)
	const [deleteList, setDeleteList] = useState<string[]>([])
	const [selected, setSelected] = useState<GetReservation>()
	const [vehicleActive, setVehicleActive] = useState(false)
	const [vehicle, setVehicle] = useState<string>('')
	const [vehicleOptions, setVehicleOptions] = useState<GetVehicle[]>()
	const [buttonHover, setButtonHover] = useState(false)

	useEffect(() => {
		if (!reservations) Api.getReservations(true).then(setReservations)
		
		if (!vehicleOptions) Api.getVehicles().then(setVehicleOptions)
	}, [])

	useEffect(() => {
		if (!deleteActive) setDeleteList([])
	}, [deleteActive])

	const intl = Intl.DateTimeFormat('es-UY', { dateStyle: 'medium', hour12: false, timeStyle: 'short' })

	const intl2 = Intl.DateTimeFormat('es-UY', { dateStyle: 'long', hour12: false, timeStyle: 'short' })

	const filterIcons = {
		'pendiente': <PiClockBold />,
		'confirmada': <PiCheckBold />,
		'cancelada': <PiXBold />
	}

	const vehicleTypes = {
		'bus': 'Ómnibus',
		'minibus': 'Minibus',
		'microbus': 'Microbus'
	}

	const handleDelete = () => {

	}

	const handleVehicle = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget

		setVehicle(value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!selected) return

		const { duration, vehicle, amount } = e.currentTarget

		const confirmData = {
			duration: +duration.value,
			vehicleId: vehicle.value,
			amount: +amount.value
		}

		Api.confirmReservation(selected.id, confirmData)
		.then(() => {
			const newReservation = selected
			newReservation.duration = confirmData.duration
			newReservation.vehicleId = confirmData.vehicleId
			newReservation.amount = confirmData.amount

			setReservations(prev => prev?.map(x => x.id == selected.id ? newReservation : x))
			setSelected(undefined)
		})
	}
	
	return (
		<div className={styles.reservations}>
			<div className={styles.title}>
				<h2>
					Reservas {filters}s
					<div className={styles.icon}>
						{filterIcons[filters]}
					</div>
				</h2>
				<div className={styles.controls}>
					<AnimatePresence>
						{deleteList.length > 0 &&
							<motion.div className={styles.button} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
								<button className={styles.wrapper2} onClick={handleDelete}>
									Eliminar
								</button>
							</motion.div>
						}
					</AnimatePresence>
					<div className={`${styles.button} ${filterActive ? styles.active : ''}`}>
						<button className={styles.wrapper} onClick={() => setFilterActive(!filterActive)}>
							<div className={styles.icon}>
								<PiFunnelBold />
							</div>
						</button>
						<AnimatePresence>
							{filterActive &&
								<motion.div className={styles.modal} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }}>
									{Object.entries(filterIcons).map(([option, icon]) => {
										const handleClick = () => {
											setFilters(option as keyof typeof filterIcons)
											setFilterActive(false)
										}
										
										return (
											<div className={`${styles.option} ${styles.capitalized}`} onClick={handleClick}>
												<div className={styles.icon}>
													{icon}
												</div>
												{option}s
											</div>
										)
									})}
								</motion.div>
							}
						</AnimatePresence>
					</div>
					<div className={`${styles.button} ${deleteActive ? styles.active : ''}`}>
						<button className={styles.wrapper} onClick={() => setDeleteActive(!deleteActive)}>
							{deleteActive ?
								<div className={styles.icon}>
									<PiXBold />
								</div>
							:
								<div className={styles.icon}>
									<PiTrashBold />
								</div>
							}
					</button>
					</div>
				</div>
			</div>
			{reservations === undefined ?
				<Spinner size='3em' />
			: reservations.filter(x => x.status == filters).length < 1 ?
				<div className={styles.empty}>
					<div className={styles.icon}></div>
					<div className={styles.description}>
						No hay solicitudes {filters}s
					</div>
				</div>
			:
				<div className={`${styles.list} ${deleteActive ? styles.deleting : ''}`}> 
					<AnimatePresence>
						{selected &&
							<motion.div className={styles.edit} initial={{ backgroundColor: '#FFEBEB00' }} animate={{ backgroundColor: '#FFEBEBCC' }} exit={{ backgroundColor: '#FFEBEB00' }} onClick={() => setSelected(undefined)}>
								<motion.div className={styles.wrapper} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
									<motion.div className={styles.reservationModal} onClick={e => e.stopPropagation()}>
										<div className={styles.reservationTitle}>
											<div className={styles.id}>#{selected.id.split('-')[0]}</div>
											<div className={styles.createdAt}>
												{intl.format(new Date(selected.createdAt.replace(/ /, 'T')))}
											</div>
										</div>
										<div className={styles.info}>
											{new Date(selected.tripDate.replace(/ /, 'T')).getTime() > Date.now() ? 'Sale el' : 'Salió el'} {intl2.format(new Date(selected.tripDate.replace(/ /, 'T')))}
										</div>
										<div className={styles.trip}>
											<div className={styles.route}>
												<div className={styles.icon}>
													<PiVanBold />
												</div>
												<div className={styles.path}></div>
												<div className={styles.icon}>
													<PiFlagBold />
												</div>
											</div>
											<div className={styles.originDestination}>
												<span>{selected.origin}</span>
												<span>{selected.destination}</span>
											</div>
										</div>
										<div className={styles.data}>
											<div className={styles.element}>
												<div className={styles.elementTitle}>
													Paradas
													<div className={styles.icon}>
														<PiMapPinBold />
													</div>
												</div>
												<div className={styles.text}>
													{selected.stops ? selected.stops.map(x => x.name).join(' • ') : 'No hay paradas seleccionadas para este viaje'}
												</div>
											</div>
											<div className={styles.element}>
												<div className={styles.elementTitle}>
													Tipo de vehículo
													<div className={styles.icon}>
														<PiBusBold />
													</div>
												</div>
												<div className={styles.text}>
													{vehicleTypes[selected.vehicleType]}
												</div>
											</div>
										</div>
									</motion.div>
									<form onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
										<fieldset>
											<label htmlFor="duration">Duración estimada</label>
											<div className={styles.input}>
												<input type="number" name='duration' id='duration' required min={1} />
												hs
											</div>
										</fieldset>
										<fieldset>
											<label htmlFor="vehicle">Vehículo</label>
											<div className={styles.select}>
												<select name="vehicle" required id="vehicle" value={vehicle} onChange={handleVehicle} onFocus={() => setVehicleActive(true)} onBlur={() => setVehicleActive(false)}>
													<option key='default' value="" disabled>Elija un vehículo</option>
													{vehicleOptions && vehicleOptions.filter(x => x.type == selected.vehicleType).map(({ id, type, capacity }) => {
														return (
															<option key={id} value={id}>{vehicleTypes[type]} #{id.split('-')[1]} ({capacity})</option>
														)
													})}
												</select>
												<motion.div className={styles.icon} animate={{ rotate: vehicleActive ? -90 : 0 }}>
													<PiCaretLeftBold strokeWidth={8} />
												</motion.div>
											</div>
										</fieldset>
										<fieldset>
											<label htmlFor="amount">Monto</label>
											<div className={styles.input2}>
												<span>$</span>
												<input type="number" required id='amount' name='amount' />
											</div>
										</fieldset>
										<motion.button whileTap={{ scale: 0.9 }} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)}>
											<AnimatePresence initial={false} mode='popLayout'>
												{buttonHover &&
													<motion.div className={styles.icon} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
														<PiVanBold />
													</motion.div>
												}
											</AnimatePresence>
											<motion.span layout='position'>Agregar vehículo</motion.span>
										</motion.button>
									</form>
								</motion.div>
							</motion.div>
						}
					</AnimatePresence>
					{reservations.filter(x => x.status === filters).map(reservation => {
						const { id, createdAt, tripDate, status } = reservation
						
						const handleClick = () => {
							if (deleteActive) {
								setDeleteList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

								return
							}

							if (status !== 'pendiente') return
							
							setSelected(reservation)
						}

						const isDeleting = deleteList.includes(id)
						
						return (
							<motion.div className={`${styles.reservation} ${isDeleting ? styles.deleting : ''}`} onClick={handleClick} key={id}>
								<div className={styles.delete}></div>
								<div className={styles.reservationTitle}>
									<div className={styles.id}>#{id.split('-')[0]}</div>
									<div className={styles.createdAt}>
										{intl.format(new Date(createdAt.replace(/ /, 'T')))}
									</div>
								</div>
								<div className={styles.info}>
									Sale el {intl2.format(new Date(tripDate.replace(/ /, 'T')))}
								</div>
							</motion.div>
						)
					})}
				</div>
			}
		</div>
	)
}

export default Reservations