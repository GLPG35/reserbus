import { useState } from 'react'
import { useUserStore } from '../../../store/user'
import User from '../../../utils/user'
import styles from '../styles.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { PiLockBold } from 'react-icons/pi'

type Props = {
	email: string
}

const LoginForm = ({ email }: Props) => {
	const setUser = useUserStore(state => state.setUser)
	const [buttonHover, setButtonHover] = useState(false)

	const handleSubmit2Login = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const { password: { value: password } } = e.currentTarget

		User.login(email, password)
		.then(setUser)
	}
	
	return (
		<form onSubmit={handleSubmit2Login}>
			<div className={styles.group}>
				<div className={styles.message}>
					<p>Bienvenido {email}.</p>
					<p>Por favor ingrese su contraseña para iniciar sesión.</p>
				</div>
			</div>
			<div className={styles.group}>
				<fieldset>
					<label htmlFor="password">Contraseña</label>
					<input type="password" name='password' id='password' required />
				</fieldset>
			</div>
			<div className={styles.group}>
				<motion.button whileTap={{ scale: 0.9 }} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)}>
					<AnimatePresence initial={false} mode='popLayout'>
						{buttonHover &&
							<motion.div className={styles.icon} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
								<PiLockBold />
							</motion.div>
						}
					</AnimatePresence>
					<motion.span layout='position' key='form2'>Iniciar sesión</motion.span>
				</motion.button>
			</div>
		</form>
	)
}

export default LoginForm