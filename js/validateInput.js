let validateEmail = (form) => {
	jQuery.validator.setDefaults({
		debug: true,
	});

	form.validate({
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
	
}