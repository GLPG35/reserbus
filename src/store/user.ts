import { create } from 'zustand'

type State = {
	user?: User | null,
	reset: boolean,
	setUser: (user: User | null) => void,
	refreshReset: () => void
}

export const useUserStore = create<State>()((set) => {
	return {
		user: undefined,
		reset: false,
		setUser: (user) => {
			set({ user })
		},
		refreshReset: () => {
			set({ reset: true })

			setTimeout(() => {
				set({ reset: false })
			}, 2000)
		} 
	}
})