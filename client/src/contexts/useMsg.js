import * as React from 'react';

const authContext = React.createContext();

function useMsg() {
	const [msg, setMsg] = React.useState({
		text: '',
		success: false,
	});
	const [clearMsg, setClearMsg] = React.useState(false);

	React.useEffect(() => {
		const clear = setTimeout(() => {
			setMsg({
				text: '',
				success: false,
			});
		}, 5000);

		return () => clearTimeout(clear);
	}, [clearMsg]);

	return {
		msg,
		setMsg,
		clearMsg,
		setClearMsg,
	};
}

export function MsgProvider({ children }) {
	const auth = useMsg();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function MsgConsumer() {
	return React.useContext(authContext);
}
