import styles from './styles.module.scss'
import { PiCurrencyDollarBold, PiUserBold, PiVanBold } from 'react-icons/pi'
import { useUserStore } from '../../store/user'
import { useEffect, useState } from 'react'
import TripForm from './TripForm'
import InfoForm from './InfoForm'
import LoginForm from './LoginForm'
import PaymentForm from './PaymentForm'

type Props = {
	busType: 'bus'|'minibus'|'microbus',
	setBusType: (busType: 'bus'|'minibus'|'microbus') => void,
	finishPayment: (rid: string) => void
}

const Reservation = ({ busType, setBusType, finishPayment }: Props) => {
	const user = useUserStore(state => state.user)
	const reset = useUserStore(state => state.reset)
	const [userRegistered, setUserRegistered] = useState(false)
	const [step, setStep] = useState<0|1|2>(0)
	const [email, setEmail] = useState('')
	const [disableEmail, setDisableEmail] = useState(false)
	const [firstBody, setFirstBody] = useState<{ origin: string, destination: string, date: string, busType: 'bus'|'minibus'|'microbus', email: string, stops?: string[] }>()
	const [secondBody, setSecondBody] = useState<{ firstname: string, lastname: string, ci: number, tel: number, password: string }>()

	useEffect(() => {
		if (user) {
			setEmail(user.email)
			setDisableEmail(true)

			if (step == 1) setStep(2)
			
		} else {
			setEmail('')
			setDisableEmail(false)
			setStep(0)
			setFirstBody(undefined)
		}
	}, [user])

	useEffect(() => {
		if (reset) {
			setFirstBody(undefined)
			setSecondBody(undefined)
			setStep(0)
		}
	}, [reset])

	const canNextStep = (step: 0|1|2) => {
		if (step == 0) {
			setStep(0)
			
			return
		}
		
		if (step == 1 && firstBody && !user) {
			setStep(1)
		}

		if (step == 2 && (user || secondBody) && firstBody) {
			setStep(2)
		}
	}

	const tripFormProps = {
		email,
		setEmail,
		disableEmail,
		setDisableEmail,
		firstBody,
		setFirstBody,
		busType,
		setBusType,
		setUserRegistered,
		nextStep: () => setStep(user ? 2 : 1)
	}

	const infoFormProps = {
		secondBody,
		setSecondBody,
		nextStep: () => setStep(2)
	}

	const loginFormProps = {
		email
	}
	
	return (
		<div className={styles.reservation}>
			<div className={styles.steps}>
				<div className={`${styles.step} ${step >= 0 ? styles.active : ''}`} onClick={() => setStep(0)}>
					<div className={styles.icon}>
						<PiVanBold />
					</div>
					Viaje
				</div>
				<div className={`${styles.separator} ${step > 0 ? styles.active : ''} ${!firstBody ? styles.disabled : ''}`}></div>
				<div className={`${styles.step} ${step >= 1 ? styles.active : ''} ${!firstBody || user ? styles.disabled : ''}`} onClick={() => canNextStep(1)}>
					<div className={styles.icon}>
						<PiUserBold />
					</div>
					Datos
				</div>
				<div className={`${styles.separator} ${step > 1 ? styles.active : ''} ${!(firstBody && (user || secondBody)) ? styles.disabled : ''}`}></div>
				<div className={`${styles.step} ${step >= 2 ? styles.active : ''} ${!(firstBody && (user || secondBody)) ? styles.disabled : ''}`} onClick={() => canNextStep(2)}>
					<div className={styles.icon}>
						<PiCurrencyDollarBold />
					</div>
					Pago
				</div>
			</div>
			{step == 0 ?
				<TripForm {...tripFormProps} />
			: step == 1 ?
			userRegistered ?
				<LoginForm {...loginFormProps} />
			:
				<InfoForm {...infoFormProps} />
			: step == 2 && firstBody && (user || secondBody) &&
				<PaymentForm firstBody={firstBody} secondBody={secondBody} nextStep={finishPayment} />
			}
		</div>
	)
}

export default Reservation