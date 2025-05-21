const apiURL = import.meta.env.VITE_BACK_API

class Api {
	private static newFetch = (url: string, options: RequestInit) => (
		fetch(url, options)
		.then(res => res.json().then(json => {
			if (!res.ok) throw new Error(json)
	
			return json
		}))
	)
	
	static newReservation = (reservation: Reservation) => {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(reservation)
		}
		
		return this.newFetch(`${apiURL}/reservation`, options)
		.then(data => data.rid)
	}

	static getReservation = (id: string) => {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}

		return this.newFetch(`${apiURL}/reservation/${id}`, options)
		.then(data => data.data)
	}

	static getReservations = () => {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}

		return this.newFetch(`${apiURL}/reservation`, options)
		.then(data => data.data)
	}
}

export default Api