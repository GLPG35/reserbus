type User = {
	id: string,
	ci: string
	name: string,
	lastname: string,
	email: string
}

type NewUser = {
	ci: string,
	name: string,
	lastname: string,
	tel: string,
	email: string,
	password: string
}

type Reservation = {
	origin: string,
	destination: string,
	stops?: string[],
	busType: string,
	date: string
}

type ReservationUser = {
	user: NewUser,
	origin: string,
	destination: string,
	stops?: string[],
	busType: string,
	date: string
}

type GetReservation = {
	id: string,
	routeId: string,
	vehicleId: null|string,
	vehicleType: 'bus'|'microbus'|'minibus',
	createdAt: string,
	tripDate: string,
	status: 'pendiente'|'confirmada'|'cancelada',
	amount: null|number,
	origin: string,
	destination: string,
	duration: null|number,
	stops?: { id: string, name: string }[]
}