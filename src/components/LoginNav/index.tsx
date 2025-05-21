import styles from './styles.module.scss'
import { PiSignInBold } from 'react-icons/pi'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import User from '../../utils/user'
import { useUserStore } from '../../store/user'

const LoginNav = () => {
	const setUser = useUserStore(state => state.setUser)
	const [login, setLogin] = useState(false)
	const [hover, setHover] = useState(false)
	const [hoverButton, setHoverButton] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const loginRef = useRef<HTMLFormElement>(null)

	const clickOutside = (e: globalThis.MouseEvent) => {
		if (buttonRef.current && buttonRef.current.contains(e.target as Node)) return

		if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
			setLogin(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', clickOutside, { capture: true })

		return () => {
			document.removeEventListener('click', clickOutside, { capture: true })
		}
	}, [])
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const { email: { value: email }, password: { value: password } } = e.currentTarget

		await User.login(email, password).then(setUser)
		
		setLogin(false)
		setHoverButton(false)
	}
	
	return (
		<motion.div className={styles.loginNav} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
			<motion.button whileTap={{ scale: 0.9 }} onClick={() => setLogin(!login)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} ref={buttonRef}>
				<AnimatePresence initial={false} mode='popLayout'>
					{hover &&
						<motion.div className={styles.icon} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
							<PiSignInBold />
						</motion.div>
					}
				</AnimatePresence>
				<motion.span layout='position'>Entrar</motion.span>
			</motion.button>
			<AnimatePresence>
				{login &&
					<motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} ref={loginRef}>
						<fieldset>
							<input type="email" id='email' name='email' required placeholder='Email' />
						</fieldset>
						<fieldset>
							<input type="password" id='password' name='password' required placeholder='Contraseña' />
						</fieldset>
						<motion.button whileTap={{ scale: 0.9 }} onMouseEnter={() => setHoverButton(true)} onMouseLeave={() => setHoverButton(false)}>
							<AnimatePresence initial={false} mode='popLayout'>
								{hoverButton &&
									<motion.div className={styles.icon} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
										<PiSignInBold />
									</motion.div>
								}
							</AnimatePresence>
							<motion.span layout='position'>Iniciar sesión</motion.span>
						</motion.button>
					</motion.form>
				}
			</AnimatePresence>
		</motion.div>
	)
}

export default LoginNav