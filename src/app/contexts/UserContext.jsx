'use client';
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookies';

export const CurrentUserContext = createContext(undefined);

export default function UserContext(props) {
	const [user, setUser] = useState(undefined);
	useEffect(() => {
		setUser(JSON.parse(Cookies.getItem('user')));
	}, []);

	const providerObject = {
		user,
		setUser,
	};

	return (
		<>
			<CurrentUserContext.Provider value={providerObject}>
				{props.children}
			</CurrentUserContext.Provider>
		</>
	);
}
