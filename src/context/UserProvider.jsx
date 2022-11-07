import React from 'react'
import { useState, useEffect } from 'react'
import { UserContext } from './UserContext'

// ========================== services ========================== //
import whoami from '../services/auth/whoami'

// Todos los componentes hijos del siguiente componente tendran acceso a sus propiedades:
export const UserProvider = ({ children }) => {

	const [user, setUser] = useState(() => JSON.parse(window.sessionStorage.getItem('user')))
	const [token, setToken] = useState(() => window.sessionStorage.getItem('jwt'));



	useEffect(() => {
		if (token && !user) whoami(token).then(whoAreYou => setUser(whoAreYou.user))
		if(user && !user.image) setUser({...user, image: 'https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666576906/default-avatar_k1zdop.png'})
	}, [token]);


	return (
		<UserContext.Provider value={{ user, setUser, token, setToken }}>
			{children}
		</UserContext.Provider>
	)
}
