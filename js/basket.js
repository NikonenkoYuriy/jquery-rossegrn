$(document).ready(()=>{
	
	let url = 'https://ros.devpreview.info/api/v1/order/create',
		urlCors = 'https://cors-anywhere.herokuapp.com/';
		arrayDataLocalStorage = [],
		userData = {
			email: '',
			orders: []
		},
		total = 0;
	
	let sendDataServer = () => {
		showPopupLoader ();
		getDataAPI( urlCors + url, optionsPOST )
		.then(result => {
			saveDataLocalStorage ( 'items', [] )
			setTimeout(() => {
				location.href = result.data.payment_url;
			},0);
		})
		.catch( error => showErrorMessage ('errorUnknown'))
		.finally(() => hidePopupLoader () );
	}
	
		let getDataLocalStorage = () => {
			let data = JSON.parse( localStorage.getItem('items') );
			if ( data !== null && data.length !== 0 ) {
				arrayDataLocalStorage = data;
			}
		}
		
			let getTheTotal = () => {
				arrayDataLocalStorage.forEach( elem => {
					total += elem.documents.length === 1 ? 249 : 400 ;
				})
			}
			
			let removeDoc = ( cadNumber, doc ) => {
				let array = arrayDataLocalStorage.map( elem => {
					if ( elem.cadastralNumber === cadNumber ) {
						let index = elem.documents.indexOf(doc);
						elem.documents.splice(index, 1);
					}
					return elem;
				})
				.filter( elem => {
					return elem.documents.length !== 0;
				});
				arrayDataLocalStorage = array;
			}
			
			let createNewObject = () => {
				let array = arrayDataLocalStorage.map( elem => {
					return {
						address: elem.address,
						cad_num: elem.cadastralNumber,
						documents: elem.documents
					};
				});
				userData.orders = array;
				optionsPOST.body = JSON.stringify(userData);
			}
			
			let saveDataLocalStorage = ( key, data ) => {
				let updateData = new UpdateDataLocalStorage(key, data );
				updateData.saveData();
			}

	let basketTotal = $('.basket-total__title-total'),	
		listBasketInner = $('.list-basket__inner');	
	
	let startBasketFunctionality = () => {
		getDataLocalStorage ();
		drawBasket ();
		updateTotal ();
		updatePaymentButton ();
		createNewObject ();
	}
	
	listBasketInner.on('click', '.basket-item__button', function (e){

		    removeDoc ( this.dataset.cadNumber, this.dataset.doc );
		    drawBasket ();
			total = 0;
			updateTotal ();
			saveDataLocalStorage ('items', arrayDataLocalStorage);
			updateOrderQuantity ();
			createNewObject ();
		
	});
	
	let updatePaymentButton = () => {
		getUserEmail ();
		updateClassActivePaymentButton();
	}
	
	let flagPaymentButton = false,
		basketTotalButton = $('.basket-total__button');
	
		let getUserEmail = () => {
			let email = JSON.parse( localStorage.getItem("email") );
			if ( email !== null && email.length !== 0 ) {
				flagPaymentButton = true;
				userData.email = email;
			}
		}

		let updateClassActivePaymentButton = () => {
			if (flagPaymentButton) {
				basketTotalButton.removeAttr('disabled')
			}	
		}	
		
		let updateTotal = () => {
			getTheTotal ();
			drawTotal ();
		}
		
			let drawTotal = () => {
				basketTotal.text( total + ' ₽')
			}
	
		let drawBasket = () => {
			let arrayHTMLElem = arrayDataLocalStorage.map( elem => {
				return `<div class="basket__inner">
                        <div class="search-result__number title--underline">
                            ${elem.cadastralNumber}
                            <span class="search-result__type">
                                ${elem.type}
                            </span>
                        </div>
                        <div class="basket__address">
                            ${elem.address}
                        </div>
                        <div class="basket__items">
							${elem.documents.includes('main_characteristics') ?
                            `<div class="basket-item basket__item">
                                <a href="images/extracs/1.jpg" class="basket-item__img-block fancybox" data-fancybox="">
                                    <img src="images/extracs/1.jpg" alt="" class="basket-item__img">
                                </a>
                                <div class="basket-item__text-block">
                                    <h5 class="basket-item__title">
                                        Об объекте недвижимости
                                    </h5>
                                    <span class="basket-item__subtitle">
                                        Основные данные, информация о наличии обременений, <br> ФИО владельца, если есть
                                    </span>
                                </div>
                                <div class="basket-item__container">
                                    <a href="#" class="basket-item__link">
                                        <img src="images/icons/list.svg" alt="" class="extract-form-item__link-img">
                                        Посмотреть <br> образец
                                    </a>
                                    <div class="basket-item__item">
                                        <div class="basket-item__price-block">
                                            <span class="basket-item__oldprice ${elem.documents.length === 2 ? '':'dn'}">
												249
											</span>
                                            <span class="basket-item__price basket-item__price--green">
												${elem.documents.length === 2?'200' : '249'} ₽
											</span>
                                        </div>
                                        <div class="basket-item__button-block">
                                            <button class="button basket-item__button"
											data-cad-number="${elem.cadastralNumber}"
											data-doc="main_characteristics">
                                                Убрать <br>
                                                из корзины
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`:''}
						
							${elem.documents.includes('transfer_rights') ?
                            `<div class="basket-item basket__item">
                                <a href="images/extracs/2.jpg" class="basket-item__img-block fancybox" data-fancybox="">
                                    <img src="images/extracs/2.jpg" alt="" class="basket-item__img">
                                </a>
                                <div class="basket-item__text-block">
                                    <h5 class="basket-item__title">
                                        О переходе прав
                                    </h5>
                                    <span class="basket-item__subtitle">
                                        История собственников (если есть) по сделкам, <br> совершенным с 1998 года
                                    </span>
                                </div>
                                <div class="basket-item__container">
                                    <a href="#" class="basket-item__link">
                                        <img src="images/icons/list.svg" alt="" class="extract-form-item__link-img">
                                        Посмотреть <br> образец
                                    </a>
                                    <div class="basket-item__item">
                                        <div class="basket-item__price-block">
                                            <span class="basket-item__oldprice ${elem.documents.length === 2 ? '':'dn'}">
												249 ₽
											</span>
                                            <span class="basket-item__price basket-item__price--green">
												${elem.documents.length === 2 ? '200':'249'} ₽
											</span>
                                        </div>
                                        <div class="basket-item__button-block">
                                            <button class="button basket-item__button"
											data-cad-number="${elem.cadastralNumber}"
											data-doc="transfer_rights">
                                                Убрать <br>
                                                из корзины
                                            </button>
                                        </div>
                                    </div>
                                </div>`: ''}
				
                            </div>
                        </div>
                    </div> `;
			});
			listBasketInner.empty();
			listBasketInner.append(...arrayHTMLElem);
		}

	
	let basketForm = $('.basket__form');
	let basketFormButton = $('.basket-form__button');
	let inputEmail = $('input[name="email"]');
	
	
	
	let validate = validateEmail( basketForm );	
	
	basketFormButton.on('click', function (e) {
		let value = inputEmail.val().trim();
		validate = validateEmail( basketForm );	
		if ( +validate === 1 && value !== '') {
			e.preventDefault();
			saveDataLocalStorage ('email', value );
			updatePaymentButton ();
		}
	});
	
	let popupLoader = $('.popup-loader'),
	popupLoaderTitle = $('.popup-loader-title');

	let showPopupLoader = () => {
		popupLoader.fadeIn(400).css('display', 'flex');
	}

	let hidePopupLoader = () => {
		popupLoader.fadeOut(400);
	}
	
	
	basketTotalButton.on('click', () => {
		if (flagPaymentButton) {
			sendDataServer ();
		}	
	});
	
	
	startBasketFunctionality ();
	
});
