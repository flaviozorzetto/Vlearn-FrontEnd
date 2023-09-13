import { createContext, useState } from 'react';
import Cookies from 'js-cookies';

export const CurrentUserContext = createContext(null);

export default function UserContext(props) {
	const [user, setUser] = useState(JSON.parse(Cookies.getItem('user')));

	const providerObject = {
		user,
		setUser,
	};

	return (
		<CurrentUserContext.Provider value={providerObject}>
			{props.children}
		</CurrentUserContext.Provider>
	);
}
