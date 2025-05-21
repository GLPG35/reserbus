const authURL = import.meta.env.VITE_BACK_AUTH

class User {
	private static newFetch = (url: string, options: RequestInit) => (
		fetch(url, options)
		.then(res => res.json().then(json => {
			if (!res.ok) throw new Error(json.message)
	
			return json
		}))
	)

	static getUser = () => {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}
		
		return this.newFetch(`${authURL}`, options)
		.then(data => data.user)
	}

	static login = (email: string, password: string) => {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			}),
			credentials: 'include'
		}
	
		return this.newFetch(`${authURL}`, options)
		.then(data => data.user)
	}

	static checkEmail = (email: string) => {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email
			})
		}
	
		return this.newFetch(`${authURL}/email`, options)
		.then(data => data.success)
	}

	static createUser = (user: User) => {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user),
			credentials: 'include'
		}
	
		return this.newFetch(`${authURL}/register`, options)
		.then(data => data.user)
	}

	static createTripUser = (reservation: Reservation) => {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(reservation),
			credentials: 'include'
		}

		return this.newFetch(`${authURL}/register/reservation`, options)
		.then(data => ({ user: data.user, rid: data.rid }))
	}

	static logout = () => {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}
	
		return this.newFetch(`${authURL}/logout`, options)
		.then(data => data.success)
	}
}

export default User