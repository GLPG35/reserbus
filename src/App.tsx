import Header from './components/Header'
import { useEffect } from 'react'
import { useUserStore } from './store/user'
import User from './utils/user'
import { Switch, Route } from 'wouter'
import Home from './routes/Home'
import Page404 from './routes/404'
import Reservations from './routes/Reservations'
import Reservation from './routes/Reservations/Reservation'

const App = () => {
	const user = useUserStore(state => state.user)
	const setUser = useUserStore(state => state.setUser)

	useEffect(() => {
		if (user === undefined) {
			User.getUser()
			.then(setUser)
			.catch(() => setUser(null))
		}
	}, [])
	
	return (
		<>
			<Header />
			<Switch>
				<Route path='/' component={Home} />
				<Route path='/reservations' component={Reservations} />
				<Route path='/reservations/:id' component={Reservation} />
				<Route component={Page404} />
			</Switch>
		</>
	)
}

export default App
