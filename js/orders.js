$(document).ready(() => {

	let urlCors = 'https://cors-anywhere.herokuapp.com/',
		urlList = 'https://ros.devpreview.info/api/v1/order/list',
		urlPayment = 'https://ros.devpreview.info/api/v1/order/payment',
		urlCancel = 'https://ros.devpreview.info/api/v1/order/cancel',
		userEmail = null;

	let getUserEmail = () => {
		let email = JSON.parse(localStorage.getItem("email"));
		if (email !== null && email.length !== 0) {
			userEmail = email;
		} else {
			userEmail = null;
		}
	}

	let getDataOrders = () => {
		if (userEmail === null) return;
		showPopupLoader();
		getDataAPI(urlCors + urlList + '?email=' + userEmail, optionsGET)
			.then((response) => {
				if (response.success) {
					analysisResponseFromServer(response.data);
				} else {
					showErrorMessage('errorUnknown', result.data.message)
				}
			})
			.catch(error => showErrorMessage('errorUnknown'))
			.finally(() => hidePopupLoader());
	}

	let payForOrder = (id) => {
		showPopupLoader();
		getDataAPI(urlCors + urlPayment + '?email=' + userEmail + '&id=' + id, optionsGET)
			.then((response) => {
				if (response.success) {
					location.href = response.data.payment_url;
				} else {
					showErrorMessage('errorUnknown', result.data.message)
				}
			})
			.catch(error => showErrorMessage('errorUnknown'))
			.finally(() => hidePopupLoader());
	}

	let deleteOrder = (id) => {
		optionsPOST.body = JSON.stringify({
			id: id,
			email: userEmail
		});
		showPopupLoader();
		getDataAPI(urlCors + urlCancel, optionsPOST)
			.then((response) => {
				if (response.success) {
					addClassElem($(`.order${response.data.cart_id}`), 'dn');
				} else {
					showErrorMessage('errorUnknown', result.data.message)
				}
			})
			.catch(error => showErrorMessage('errorUnknown'))
			.finally(() => hidePopupLoader());
	}

	let saveDataLocalStorage = (key, data) => {
		let updateData = new UpdateDataLocalStorage(key, data);
		updateData.saveData();
	}


	let orderLoginForm = $('.order-login__form'),
		orderLoginInput = $('.order-login__input'),
		orderLoginButton = $('.order-login__button');

	let validate = validateEmail(orderLoginForm);

	orderLoginButton.on('click', function (e) {

		let value = orderLoginInput.val().trim();
		validate = validateEmail(orderLoginForm);
		if (+validate === 1 && value !== '') {
			e.preventDefault();
			saveDataLocalStorage('email', value);
			updatePageOrders();
		}
	});

	let boxs = $('.js-box');

	let updateBoxPage = () => {

		addClassElem(boxs, 'dn');
		if (userEmail === null) {
			removeClassElem(boxs.eq(0), 'dn')
		} else if (userEmail !== null) {
			removeClassElem(boxs.eq(1), 'dn')
		}
	}

	let popupLoader = $('.popup-loader'),
		popupLoaderTitle = $('.popup-loader-title');

	let showPopupLoader = () => {
		popupLoader.fadeIn(400).css('display', 'flex');
	}

	let hidePopupLoader = () => {
		popupLoader.fadeOut(400);
	}

	let refEmailUser = $('.email-user');

	let updateTitleEmail = () => {
		if (userEmail !== null) refEmailUser.text(userEmail);
	}

	let analysisResponseFromServer = (data) => {
		if (data.carts.length === 0) {
			addClassElem(boxs, 'dn');
			removeClassElem(boxs.eq(2), 'dn');
		} else {
			createMarkup(data.carts);
		}
	}

	let ordersInner = $('.orders__inner');

	let createMarkup = (data) => {
		let arrayHTML = data.map(elem => {
			let item = '';
			if (+elem.status === 10) {
				item = $(`<div class="order-item orders__item order-item--wait order${elem.id}">
                            <div class="order-item__text-block">
                                <div class="order-item__title">
                                    Заказ № ${elem.id} <br>
                                    <span class="order-item__title-date">
										${elem.created_at}
									</span>
                                    <span class="order-item__title-status">
										${elem.status_label}
									</span>
                                </div>
                                <div class="order-item__button-block">
                                    <button class="button button--blue order-item__payment"
									data-id="${elem.id}">
                                        оплатить
                                    </button>
                                    <button class="button order-item__delete"
									data-id="${elem.id}">
                                        удалить
                                    </button>
                                </div>
                            </div>
                            <div class="order-item__info">
                                <div class="order-item__info-title">
                                    ${elem.orders[0].cad_num} br <span class="order-item__info-title--type">
									</span>
                                </div>
                                <div class="order-item__address">
                                     ${elem.orders[0].address}
                                </div>
                                <div class="order-item__list">
                                </div>
                            </div>
                        </div>`)
				elem.orders[0].order_items.forEach(obj => {
					item.find('.order-item__list').append($(`
								<div class="order-item__list-item">
									${obj.doc_type_label}
								 </div>`));
				});
			} else if (+elem.status === 20 || +elem.status === 30) {
				item = $(`<div class="order-item orders__item order-item--completed order${elem.id}">
                            <div class="order-item__text-block">
                                <div class="order-item__title">
                                    Заказ № ${elem.id} <br>
                                    <span class="order-item__title-date">
										${elem.created_at}
									</span>
                                    <span class="order-item__title-status">
										${elem.status_label}
									</span>
                                </div>
                                <div class="order-item__button-block">
                                    <button class="button order-item__download-all download-all" data-order="">
                                        скачать все выписки
                                    </button>
                                </div>
                            </div>
                            <div class="order-item__info">
                                <div class="order-item__info-title">
                                    ${elem.orders[0].cad_num} br 
									<span class="order-item__info-title--type">
									</span>
                                </div>
                                <div class="order-item__address">
                                    ${elem.orders[0].address}
                                </div>
                                <div class="order-item__list">
                                </div>
                            </div>
                        </div>`);
				elem.orders[0].order_items.forEach(obj => {
					item.find('.order-item__list').append($(`
								<div class="order-item__list-item">
									${obj.doc_type_label}
									<div class="order-item__list-item-buttons">
										<a href="${obj.result_pdf}" class="order-item__list-item-download" download>
											pdf
										 </a>
										 <a href="${obj.result_zip}" class="order-item__list-item-download" download>
											Zip
										 </a>
									  </div>
								   </div>`));
				});
			} else if (+elem.status === 40) {
				let arrayLinks = [];
				elem.orders[0].order_items.forEach(obj => {
					arrayLinks.push(obj.result_pdf, obj.result_zip);
				});
				item = `<div class="order-item orders__item order-item--closed order${elem.id}">
                            <div class="order-item__text-block">
                                <div class="order-item__title">
                                    Заказ № ${elem.id} <br>
                                    <span class="order-item__title-date">${elem.created_at}</span>
                                    <span class="order-item__title-status">${elem.status_label}</span>
                                </div>
                                <div class="order-item__button-block">
                                    <button class="button order-item__download-all download-all-links" data-links="${arrayLinks}">
                                        скачать все выписки
                                    </button>
                                </div>
                            </div>
                            <div class="order-item__info">
                                <div class="order-item__info-title">
                                    ${elem.orders[0].id} br <span class="order-item__info-title--type"></span>
                                </div>
                                <div class="order-item__address">
                                    ${elem.orders[0].address}
                                </div>
                            </div>
                        </div>`;
			}
			return item;
		});
		ordersInner.empty().append(...arrayHTML);
	}

	ordersInner.on('click', '.order-item__payment', function () {
		payForOrder(this.dataset.id);
	});

	ordersInner.on('click', '.order-item__delete', function () {
		deleteOrder(this.dataset.id);
	});

	ordersInner.on('click', '.download-all', function () {
		let orderItem = $(this).parents('.order-item--completed').get(0),
			links = orderItem.querySelectorAll('.order-item__list-item-download'),
			array = [];
		links.forEach(elem => array.push(elem.getAttribute('href')));
		saveFiles(array);
	});

	ordersInner.on('click', '.download-all-links', function () {
		let array = this.dataset.links.split(",");
		saveFiles(array);
	});

	let saveFiles = (array) => {
		array.forEach(item => {
			let link = document.createElement('a');
			link.href = item;
			link.setAttribute('download', 'download');
			link.click();
		})
	}

	let ordersLogOut = $('.orders__log-out');

	ordersLogOut.on('click', (e) => {
		e.preventDefault();
		saveDataLocalStorage('email', []);
		ordersInner.empty();
		updatePageOrders();
	})


	let addClassElem = (elem, addClassElem) => elem.addClass(addClassElem);

	let removeClassElem = (elem, remClassElem) => elem.removeClass(remClassElem);

	let updatePageOrders = () => {
		getUserEmail();
		updateBoxPage();
		getDataOrders();
		updateTitleEmail();
	}

	updatePageOrders();

});