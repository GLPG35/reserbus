import { useState } from 'react'
import styles from '../styles.module.scss'
import { useUserStore } from '../../../store/user'
import User from '../../../utils/user'
import { originOptions } from '../../../utils/options'
import { PiCaretLeftBold, PiVanBold, PiXBold } from 'react-icons/pi'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
	email: string,
	setEmail: (email: string) => void,
	disableEmail: boolean,
	firstBody?: { origin: string, destination: string, date: string, busType: 'bus'|'minibus'|'microbus', email: string, stops?: string[] },
	setFirstBody: (body?: { origin: string, destination: string, date: string, busType: 'bus'|'minibus'|'microbus', email: string, stops?: string[] }) => void,
	busType: 'bus'|'minibus'|'microbus',
	setBusType: (busType: 'bus'|'minibus'|'microbus') => void,
	setUserRegistered: (state: boolean) => void,
	nextStep: () => void
}

const TripForm = ({ email, setEmail, disableEmail, firstBody, setFirstBody, busType, setBusType, setUserRegistered, nextStep }: Props) => {
	const user = useUserStore(state => state.user)
	const [originActive, setOriginActive] = useState(false)
	const [destinationActive, setDestinationActive] = useState(false)
	const [origin, setOrigin] = useState(firstBody?.origin ?? '')
	const [destination, setDestination] = useState(firstBody?.destination ?? '')
	const newDate = new Date()
	newDate.setDate(newDate.getDate() + 2)
	const todayDate = Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(newDate)
	const minDate = `${todayDate}T00:00`
	const [date, setDate] = useState(firstBody?.date ?? '')
	const [stops, setStops] = useState<string[]>(firstBody?.stops ?? [])
	const [stopsActive, setStopsActive] = useState(false)
	const [buttonHover, setButtonHover] = useState(false)

	const handleOrigin = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget
		
		setOrigin(value)
		if (firstBody) setFirstBody(undefined)

		if (stops.length < 1) return

		if (stops.includes(value)) {
			setStops(prev => prev.filter(x => x !== value))
		}
	}

	const handleDestination = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget
		
		setDestination(value)
		if (firstBody) setFirstBody(undefined)

		if (stops.length < 1) return
		
		if (stops.includes(value)) {
			setStops(prev => prev.filter(x => x !== value))
		}
	}

	const handleStopsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget
		
		setStops(prev => [...prev, value])
		if (firstBody) setFirstBody(undefined)

		e.currentTarget.value = ''
	}

	const handleBusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBusType(e.currentTarget.value as typeof busType)

		if (firstBody) setFirstBody(undefined)
	}

	const changeValues = {
		'email': setEmail,
		'date': setDate
	}

	const handleChange = (type: keyof typeof changeValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget

		changeValues[type](value)
		if (firstBody) setFirstBody(undefined)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const { origin: { value: origin }, destination: { value: destination }, date: { value: date }, busType: { value: busType }, email: { value: email } } = e.currentTarget

		const parseStops = stops.length > 0 ? stops : undefined

		if (!user) {
			await User.checkEmail(email)
			.then(setUserRegistered)
		}

		setFirstBody({
			origin,
			destination,
			busType,
			email,
			stops: parseStops,
			date
		})

		nextStep()
		setButtonHover(false)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="origin">Origen</label>
					<div className={styles.select}>
						<select name="origin" required id="origin" value={origin} onChange={handleOrigin} onFocus={() => setOriginActive(true)} onBlur={() => setOriginActive(false)}>
							<option key='default' value="" disabled>Elija un origen</option>
							{originOptions.map(({ name, text }) => {
								return (
									<option key={name} value={text}>{text}</option>
								)
							})}
						</select>
						<motion.div className={styles.icon} animate={{ rotate: originActive ? -90 : 0 }}>
							<PiCaretLeftBold strokeWidth={8} />
						</motion.div>
					</div>
				</fieldset>
				<fieldset>
					<label htmlFor="destination">Destino</label>
					<div className={styles.select}>
						<select name="destination" required id="destination" value={destination} onChange={handleDestination} onFocus={() => setDestinationActive(true)} onBlur={() => setDestinationActive(false)} disabled={!origin}>
							<option key='default' value="" disabled>Elija un destino</option>
							{origin && originOptions.filter(x => x.text !== origin).map(({ name, text }) => {
								return (
									<option key={name} value={text}>{text}</option>
								)
							})}
						</select>
						<motion.div className={styles.icon} animate={{ rotate: destinationActive ? -90 : 0 }}>
							<PiCaretLeftBold strokeWidth={8} />
						</motion.div>
					</div>
				</fieldset>
			</div>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="stops">Paradas (opcional)</label>
					<div className={styles.multiSelect}>
						<div className={styles.select}>
							<select name="stops" id="stops" defaultValue='' onChange={handleStopsChange} onFocus={() => setStopsActive(true)} onBlur={() => setStopsActive(false)} disabled={!origin || !destination}>
								<option value="" disabled>Elija una parada</option>
								{origin && originOptions.filter(x => x.text !== origin && x.text !== destination && !stops.includes(x.text)).map(({ text, name }) => {
									return (
										<option value={text} key={name}>{text}</option>
									)
								})}
							</select>
							<motion.div className={styles.icon} animate={{ rotate: stopsActive ? -90 : 0 }}>
								<PiCaretLeftBold strokeWidth={8} />
							</motion.div>
						</div>
						<div className={styles.stopsList}>
							{stops.length < 1 && <div className={styles.empty}>No hay paradas seleccionadas</div>}
							<AnimatePresence mode='popLayout'>
								{stops.map((name) => {
									const handleRemove = () => {
										setStops(prev => prev.filter(x => x !== name))
										
										if (firstBody) setFirstBody(undefined)
									}
									
									return (
										<motion.div className={styles.stop} layout initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={handleRemove} key={name}>
											<div className={styles.name}>
												{name}
											</div>
											<div className={styles.icon}>
												<PiXBold strokeWidth={8} />
											</div>
										</motion.div>
									)
								})}
							</AnimatePresence>
						</div>
					</div>
				</fieldset>
			</div>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="date">Fecha y hora de salida</label>
					<input type="datetime-local" value={date} id='date' name='date' onChange={handleChange('date')} min={minDate} required />
				</fieldset>
			</div>
			<fieldset>
				<span>Tipo de vehículo a reservar</span>
				<div className={styles.fieldGroup}>
					<fieldset>
						<label htmlFor="bus" className={busType == 'bus' ? styles.active : ''}>Ómnibus (36)</label>
						<input type="radio" id='bus' name='busType' value='bus' checked={busType == 'bus'} onChange={handleBusChange} />
					</fieldset>
					<fieldset>
						<label htmlFor="minibus" className={busType == 'minibus' ? styles.active : ''}>Minibus (18)</label>
						<input type="radio" id='minibus' name='busType' value='minibus' checked={busType == 'minibus'} onChange={handleBusChange} />
					</fieldset>
					<fieldset>
						<label htmlFor="microbus" className={busType == 'microbus' ? styles.active : ''}>Microbus (12)</label>
						<input type="radio" id='microbus' name='busType' value='microbus' checked={busType == 'microbus'} onChange={handleBusChange} />
					</fieldset>
				</div>
			</fieldset>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="email">Email</label>
					<input type="email" name='email' id='email' value={email} onChange={handleChange('email')} required disabled={disableEmail} />
				</fieldset>
			</div>
			<div className={styles.group}>
				<motion.button whileTap={{ scale: 0.9 }} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)}>
					<AnimatePresence initial={false} mode='popLayout'>
						{buttonHover &&
							<motion.div className={styles.icon} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
								<PiVanBold />
							</motion.div>
						}
					</AnimatePresence>
					<motion.span layout='position' key='form1'>Ir al siguiente paso</motion.span>
				</motion.button>
			</div>
		</form>
	)
}

export default TripForm