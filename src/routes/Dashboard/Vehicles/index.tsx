import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Api from '../../../utils/api'
import Spinner from '../../../components/Spinner'
import { AnimatePresence, motion } from 'framer-motion'
import { PiCaretLeftBold, PiClockBold, PiUsersBold, PiVanBold } from 'react-icons/pi'

const Vehicles = () => {
	const [vehicles, setVehicles] = useState<GetVehicle[]>()
	const [addForm, setAddForm] = useState(false)
	const [vehicle, setVehicle] = useState<string>('')
	const [vehicleActive, setVehicleActive] = useState(false)
	const [buttonHover, setButtonHover] = useState(false)

	useEffect(() => {
		if (!vehicles) Api.getVehicles().then(setVehicles)
	}, [])

	const vehicleOptions = [
		'bus',
		'minibus',
		'microbus'
	]

	const parseVehicle = {
		'bus': 'Ómnibus',
		'minibus': 'Minibus',
		'microbus': 'Microbus'
	}

	const parseImg = {
		'bus': '/Bus.svg',
		'minibus': '/Minibus.svg',
		'microbus': '/Microbus.svg'
	}

	const handleVehicle = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget

		setVehicle(value)
	}

	const handleClose = () => {
		setAddForm(false)
		setVehicle('')
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const { vehicle, capacity, availableTime } = e.currentTarget

		const newVehicle = {
			type: vehicle.value,
			capacity: capacity.value,
			availableTime: `${availableTime.value}:00`
		}

		Api.addVehicle(newVehicle).then(data => {
			handleClose()

			setVehicles(prev => !prev ? [data] : [...prev, data])
		})
	}
	
	return (
		<div className={styles.vehicles}>
			<div className={styles.title}>
				<h2>Vehículos</h2>
				<div className={styles.controls}>
					<button onClick={() => setAddForm(!addForm)}>
						Añadir
					</button>
				</div>
			</div>
			{vehicles === undefined ?
				<Spinner size='3em' />
			:
				<div className={styles.list}>
					<AnimatePresence>
						{addForm &&
							<motion.div className={styles.wrapper} initial={{ backgroundColor: '#FFEBEB00' }} animate={{ backgroundColor: '#FFEBEBCC' }} exit={{ backgroundColor: '#FFEBEB00' }} onClick={handleClose}>
								<motion.form onSubmit={handleSubmit} onClick={e => e.stopPropagation()} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
									<fieldset>
										<label htmlFor="vehicle">Tipo de vehículo</label>
										<div className={styles.select}>
											<select name="vehicle" required id="vehicle" value={vehicle} onChange={handleVehicle} onFocus={() => setVehicleActive(true)} onBlur={() => setVehicleActive(false)}>
												<option key='default' value="" disabled>Elija un vehículo</option>
												{vehicleOptions.map(name => {
													return (
														<option key={name} value={name}>{parseVehicle[name as 'bus'|'minibus'|'microbus']}</option>
													)
												})}
											</select>
											<motion.div className={styles.icon} animate={{ rotate: vehicleActive ? -90 : 0 }}>
												<PiCaretLeftBold strokeWidth={8} />
											</motion.div>
										</div>
									</fieldset>
									<fieldset>
										<label htmlFor="capacity">Capacidad</label>
										<input type="number" id='capacity' name='capacity' required />
									</fieldset>
									<fieldset>
										<label htmlFor="availableTime">Disponibilidad horaria</label>
										<input type="time" name='availableTime' id='availableTime' required />
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
								</motion.form>
							</motion.div>
						}
					</AnimatePresence>
					{vehicles.length > 0 ?
						vehicles.map(({ id, type, capacity, availableTime }) => {
							const splitTime = availableTime.split(':')
							splitTime.pop()
							const parseTime = splitTime.join(':')
							
							return (
								<div className={styles.vehicle} key={id}>
									<div className={styles.titleInfo}>
										<div className={styles.type}>
											{parseVehicle[type as 'bus'|'minibus'|'microbus']} #{id.split('-')[1]}
										</div>
										<div className={styles.capacity}>
											<div className={styles.icon}>
												<PiUsersBold />
											</div>
											{capacity} personas máx.
										</div>
										<div className={styles.time}>
											<div className={styles.icon}>
												<PiClockBold />
											</div>
											Disponible a las {parseTime}
										</div>
									</div>
									<div className={styles.vehicleImg}>
										<img src={parseImg[type]} alt="" />
									</div>
								</div>
							)
						})
					:
						'No hay vehículos disponibles'
					}
				</div>
			}
			
		</div>
	)
}

export default Vehicles