let error = {
	serverError: {
		icon: 'error',
	    title: 'Ошибка сервера.',
	    text: 'Повторите попытку позже!'
	},
	errorUser: {
		icon: 'error',
	    //title: 'Ошибка.',
	    text: 'По адресу/кадастру не найдено никаких объектов!'
	},
	errorUnknown: {
		icon: 'error',
	    title: 'Ошибка! Что то пошло не так.',
	    text: 'Повторите попытку позже!'
	}
}

let showErrorMessage = (key, message = '') => {
	if ( message !== '') error[key].text = message;
	Swal.fire(error[key]);
}
