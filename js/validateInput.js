let validateEmail = (input) => {
	let valid = input.validate({
		rules: {
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			email: {
				required: "Это поле обязательно для заполнения",
				email: "Не соответствует шаблону email"
			}
		}
	});
	return valid.currentElements.length;
}