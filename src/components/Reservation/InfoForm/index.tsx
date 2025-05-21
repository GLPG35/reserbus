import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles.module.scss'
import { useState } from 'react'
import { PiVanBold } from 'react-icons/pi'

type Props = {
	secondBody?: { firstname: string, lastname: string, ci: number, tel: number, password: string },
	setSecondBody: (state?: { firstname: string, lastname: string, ci: number, tel: number, password: string }) => void,
	nextStep: () => void
}

const InfoForm = ({ secondBody, setSecondBody, nextStep }: Props) => {
	const [name, setName] = useState(secondBody?.firstname ?? '')
	const [lastname, setLastname] = useState(secondBody?.lastname ?? '')
	const [ci, setCi] = useState(secondBody?.ci ?? '')
	const [tel, setTel] = useState(secondBody?.tel ?? '')
	const [password, setPassword] = useState(secondBody?.password ?? '')
	const [cPassword, setCPassword] = useState(secondBody?.password ?? '')
	const [buttonHover, setButtonHover] = useState(false)

	const changeValues = {
		'password': setPassword,
		'cPassword': setCPassword,
		'name': setName,
		'lastname': setLastname,
		'ci': setCi,
		'tel': setTel,
	}

	const handleChange = (type: keyof typeof changeValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget

		changeValues[type](value)

		if (secondBody) setSecondBody(undefined)
	}
	
	const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const { firstname: { value: firstname }, lastname: { value: lastname }, ci: { value: ci }, tel: { value: tel }, password: { value: password }, cPassword: { value: cPassword } } = e.currentTarget

		if (password !== cPassword) return

		setSecondBody({
			firstname,
			lastname,
			ci,
			tel,
			password
		})

		nextStep()
		setButtonHover(false)
	}
	
	return (
		<form onSubmit={handleSubmit2}>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="firstname">Nombre</label>
					<input type="text" name='firstname' id='firstname' required value={name} onChange={handleChange('name')} />
				</fieldset>
				<fieldset>
					<label htmlFor="lastname">Apellido</label>
					<input type="text" name='lastname' id='lastname' required value={lastname} onChange={handleChange('lastname')} />
				</fieldset>
			</div>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="ci">C.I.</label>
					<input type="number" name='ci' id='ci' required value={ci} onChange={handleChange('ci')} />
				</fieldset>
				<fieldset>
					<label htmlFor="tel">Teléfono</label>
					<input type="tel" name='tel' id='tel' required value={tel} onChange={handleChange('tel')} />
				</fieldset>
			</div>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="password">Contraseña</label>
					<input type="password" name='password' id='password' value={password} onChange={handleChange('password')} required />
				</fieldset>
			</div>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="cPassword">Confirmar contraseña</label>
					<input type="password" name='cPassword' id='cPassword' value={cPassword} onChange={handleChange('cPassword')} required />
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
					<motion.span layout='position' key='form2'>Ir al siguiente paso</motion.span>
				</motion.button>
			</div>
		</form>
	)
}

export default InfoForm