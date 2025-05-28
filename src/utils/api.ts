const apiURL = import.meta.env.VITE_BACK_API

class Api {
	private static newFetch = (url: string, options: RequestInit) => (
		fetch(url, options)
		.then(res => res.json().then(json => {
			if (!res.ok) throw new Error(json.message)
	
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

	static getReservations = (all = false) => {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}

		return this.newFetch(`${apiURL}/reservation${all ? '/all' : ''}`, options)
		.then(data => data.data)
	}

	static confirmReservation = (id: string, confirmData: ConfirmReservation) => {
		const options: RequestInit = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(confirmData),
			credentials: 'include'
		}

		return this.newFetch(`${apiURL}/reservation/confirm/${id}`, options)
		.then(data => data.success)
	}

	static makePayment = (id: string) => {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		}

		return this.newFetch(`${apiURL}/reservation/payment/${id}`, options)
		.then(data => data.success)
	}

	static getVehicles = () => {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		}

		return this.newFetch(`${apiURL}/vehicle`, options)
		.then(data => data.data)
	}

	static addVehicle = (newVehicle: AddVehicle) => {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newVehicle),
			credentials: 'include'
		}

		return this.newFetch(`${apiURL}/vehicle`, options)
		.then(data => data.data)
	}
}

export default Api