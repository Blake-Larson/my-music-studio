import * as React from 'react';

function useStringHook() {
	return {
		capitolizeFirst(str) {
			str.toLowerCase();
			let stringArr = str.split('');
			stringArr.splice(0, 1, stringArr[0].toUpperCase());
			return stringArr.join('');
		},
	};
}

export default useStringHook;
