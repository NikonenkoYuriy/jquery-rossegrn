let urlDadata = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
	token = "4c6e33332e10e1bccff49c0cf3f5e7a2326c2755",
	
	urlCors = 'https://cors-anywhere.herokuapp.com/',
	urlDevpreview = 'https://ros.devpreview.info/api/v1/address/get-info';

optionsPOST.headers.Authorization = "Token " + token;

let advantages = $('.advantages'),
	sampleDocuments = $('.sample-documents'),
	stopTimUpdateTitle = null,
	startTitle = 'Производим поиск...',
	updateTitle = 'Длительное ожидание ответа. Переотправляем запрос…',
	updateData = new UpdateDataLocalStorage('items');

let getDataDevpreview = (text) => {
	getDataAPI( urlDevpreview + '?' + text, optionsGET)
		.then((response) => {
		console.log(response);
			if (response.success) {
				
				/*------------------------------*/
				defineWhichBlockToShow(response);			
				/*------------------------------*/
			} 
			else if (+response.data.status >= 400 && +response.data.status < 500) {
				showErrorMessage('errorUser');
			} 
			else if (+response.data.status >= 500) {
				showErrorMessage('serverError');
			}
		})
		.catch(error => showErrorMessage('errorUnknown'))
		.finally(() => {
			clearTimeout(stopTimUpdateTitle);
			hidePopupLoader();
			updateTitlePopupLoader(startTitle)
		});
}

let getDataAddress = (text) => {
	optionsPOST.body = JSON.stringify({
		query: text
	});
	getDataAPI( urlCors + urlDadata, optionsPOST)
		.then(result => {
			let listElem = addListAddress(result.suggestions);
			updateListAddress(listElem.join(' '));
		})
}

let objectDataDoc = {};

let createDataDoc = (data) => {
	objectDataDoc.type = data.type;
	objectDataDoc.address = data.address;
	objectDataDoc.cadastralNumber = data.cadNum;
	objectDataDoc.documents = data.allowedDocs;
}

let updateDataLocalStorage = (_this) => {

	if (_this.hasClass('added')) {
		updateData.setDataLocalStorage(objectDataDoc);
	} else {
		updateData.removeDataArrau(objectDataDoc);
	}

}

let extractFormButtonAdd = $('.extract-form__button-add'),
	extractFormButton = $('.extract-form__button'),
	itemOldprice = $('.extract-form-item__oldprice');

let checkIfThereIsDataInLocalStorage = (data) => {
	let obj = updateData.returnObjectLS(data);
	if (obj !== undefined) {
		selectDocumentBox(obj.documents);
		addClassElem(extractFormButtonAdd, 'added');
		removeClassElem(extractFormButton, 'dn');
	} else {
		selectDocumentBox(data.allowedDocs);
	}
}

let addListAddress = (data) => data.map(obj => `<li>${obj.value}<li>`);

let searchFormInput = $('.search-form__input'),
	searchFormInputList = $('.search-form__input-list'),
	pattern = /^[\d:]*$/,
	stopTim = null,
	flagGetAddress = true;

searchFormInput.on('input', function (e) {
    
	let value = e.target.value.trim().toLocaleLowerCase();
	showStartPage ();

	if (value === '') {
		updateListAddress();
		flagGetAddress = true;
		return;
	}

	if (!pattern.test(value) && value !== " ") {

		if (flagGetAddress) {
			stopTim = setTimeout(() => {
				getDataAddress(value);
				flagGetAddress = true;
			}, 200);
			flagGetAddress = false;
		}
	}

});

/*------------------------------*/
let defineWhichBlockToShow = ( { data } ) => {
	if ( Array.isArray(data)) {
		showBlockAddress(data)
	} else {
		showSearchResultPage ( data )
	}
}

let addressList = $('.address__list'),
	address = $('.address');

let showBlockAddress = ( data ) => {
	hideBlockPage ();
	createMarkupBlockAddresses (data);
	removeClassElem(address, 'dn');
	scrollPage (address);
}

addressList.on('click', '.address__list-item', function (){
	let cadnum = this.dataset.cadnum; 
	sendDataServer (cadnum);
	updateInputAddress(cadnum);
})

let searchResultInner = $('.search-result__inner');

let showSearchResultPage = ( data ) => {
	addClassElem(address, 'dn');
	updateTitlePage( data.address );
	hideBlockPage ();
	showBoxSearchResult(data);
	checkIfThereIsDataInLocalStorage(data);
	createDataDoc(data);
	showDocumentOptions(data.allowedDocs);
	scrollPage (searchResultInner);
}

let hideBlockPage = () => {
	addClassElem(advantages, 'dn');
	addClassElem(sampleDocuments, 'dn');
}
/*------------------------------*/
let showStartPage = () => {
	addClassElem(address, 'dn');
	removeClassElem(advantages, 'dn');
	removeClassElem(sampleDocuments, 'dn');
	updateTitlePage( );
}

let	refBody = $('html, body'),
	refHeader = $('.header');
/*------------------------------*/
let scrollPage = ( elem ) => {
	let offsetElem = elem.offset().top - ( refHeader.height() + 20 );
	refBody.animate({ scrollTop: offsetElem }, 1000);
}
/*------------------------------*/
searchFormInput.on('input', function () {
	searchFormInputList.show();
	hideAdditionalBoxWithInformation();
});

searchFormInputList.on('click', 'li', (e) => {
	updateInputAddress($(e.target).text());
});

let updateListAddress = (content = '') => {
	let value = searchFormInput.val().trim();
	if (value === '') content = '';
	searchFormInputList.get(0).innerHTML = content;
}

let searchFormButton = $('.search-form__button');

searchFormButton.on('click', (e) => {
	sendData ();
});

document.addEventListener('keydown', function(e) {
    if (e.code === 'Enter') {
		searchFormInputList.hide();
		e.preventDefault();
		sendData ();
	}
});

let sendData = () => {
	let value = searchFormInput.val();
	if (value === '') {
		return;
	}
	sendDataServer (value);
}

let sendDataServer = (value) => {
	getDataDevpreview('object=' + encodeURI(value));
	showPopupLoader();
	runTextUpdates();
	updateTitlePopupLoader()
}

let popupLoader = $('.popup-loader'),
	popupLoaderTitle = $('.popup-loader-title');

let showPopupLoader = () => {
	popupLoader.fadeIn(400).css('display', 'flex');
}

let updateTitlePopupLoader = (text) => {
	popupLoaderTitle.text(text);
}

let hidePopupLoader = () => {
	popupLoader.fadeOut(400);
}

let runTextUpdates = () => {
	stopTimUpdateTitle = setTimeout(() => {
		updateTitlePopupLoader(updateTitle);
	}, 15000)
}

let searchResult = $('.search-result');

let showBoxSearchResult = (data) => {

	$('.search-result__num').text(data.cadNum);
	$('.search-result__type').text(data.type);
	$('.search-result__address').text(data.address);
	$('.search-result-area').text(data.area);
	$('.search-result-status').text(data.status);
	$('.search-result_category').text(data.category);
	$('.search-result_date').text(data.priceDeterminationDate);
	$('.search-result_permitted-use').text(data.permittedUse);
	$('.search-result_cadastral-value').text(data.cadastralValue + ' руб.');
	$('.search-result-regis-date').text(data.registrationDate); 

	searchResult.fadeIn(400);
}

let titleNoDoc = $('.title-no-doc'),
	labelExtract1 = $('[for="extract-1"]'),
	labelExtract2 = $('[for="extract-2"]'),
	inputExtract1 = $('#extract-1'),
	inputExtract2 = $('#extract-2'),
	containerDoc = $('.container-doc');

let showDocumentOptions = (docs) => {

	addClassElem(titleNoDoc, 'dn');
	addClassElem(containerDoc, 'dn');

	if (docs.length === 0) {
		removeClassElem(titleNoDoc, 'dn');
	} else {
		removeClassElem(containerDoc, 'dn');
		showDocumentBox(docs);
	}
}

let showDocumentBox = (docs) => {

	if (docs.includes('main_characteristics')) {
		removeClassElem(labelExtract1, 'dn');
	}

	if (docs.includes('transfer_rights')) {
		removeClassElem(labelExtract2, 'dn');
	}

}

let selectDocumentBox = (docs) => {
	inputExtract1.get(0).checked = false;
	inputExtract2.get(0).checked = false;

	if (docs.includes('main_characteristics')) {
		inputExtract1.get(0).checked = true;
	}

	if (docs.includes('transfer_rights')) {
		inputExtract2.get(0).checked = true;
	}

	updateBoxDocs();

}

inputExtract1.on('change', (e) => {
	updateBoxDocs();
});

inputExtract2.on('change', (e) => {
	updateBoxDocs();
});

let updateBoxDocs = () => {
	recalculatePrice();
	updateViewBoxDocs();
}

let extractFormPaymentTotal = $('.extract-form__payment-total'),
	itemPrice = $('.extract-form-item__price'),
	someElem = null,
	everyElem = null,
	onClickBtn = true,
	total = 0,
	costDoc = 249;

let recalculatePrice = () => {

	let inputChanges = [inputExtract1.get(0).checked, inputExtract2.get(0).checked];

	let arr = [];
	if (inputExtract1.get(0).checked) arr.push('main_characteristics');
	if (inputExtract2.get(0).checked) arr.push('transfer_rights');
	objectDataDoc.documents = arr;

	someElem = inputChanges.some(elem => elem),
		everyElem = inputChanges.every(elem => elem);

	if (someElem && everyElem) {
		costDoc = 200;
		total = costDoc * 2;
		onClickBtn = true;
	} else if (someElem && !everyElem) {
		costDoc = 249;
		total = costDoc;
		onClickBtn = true;
	} else {
		costDoc = 249;
		total = 0;
		onClickBtn = false;
	}

}

let updateViewBoxDocs = () => {

	if (someElem && everyElem) {
		removeClassElem(itemOldprice, 'dn');
		addClassElem(extractFormButtonAdd, 'active');
	} else if (someElem && !everyElem) {
		addClassElem(itemOldprice, 'dn');
		addClassElem(extractFormButtonAdd, 'active');
	} else {
		addClassElem(itemOldprice, 'dn');
		removeClassElem(extractFormButtonAdd, 'active');
	}

	itemPrice.text(costDoc + ' ₽')
	extractFormPaymentTotal.text(total)
}

let hideAdditionalBoxWithInformation = () => {

	searchResult.fadeOut(400);
	addClassElem(titleNoDoc, 'dn');
	addClassElem(containerDoc, 'dn');
	addClassElem(extractFormButton, 'dn');
	removeClassElem(extractFormButtonAdd, 'active, added');

}

extractFormButtonAdd.on('click', function () {
	if (onClickBtn) {
		updateBtnAdd($(this));
		updateDataLocalStorage($(this));
		updateOrderQuantity();
	}
});

let updateBtnAdd = (_this) => {
	if (_this.hasClass('added')) {
		removeClassElem(_this, 'added');
		addClassElem(extractFormButton, 'dn');
	} else {
		addClassElem(_this, 'added');
		removeClassElem(extractFormButton, 'dn');
	}
}

let titleElem = $('title');

let updateTitlePage = ( title = "Index" ) => {
	titleElem.text(title);
}
/*------------------------------*/
let updateInputAddress = (value) => {
	searchFormInput.val(value)
}
/*------------------------------*/
let addClassElem = (elem, addClassElem) => elem.addClass(addClassElem);

let removeClassElem = (elem, remClassElem) => elem.removeClass(remClassElem);

/*------------------------------*/
let titleAddress = `<li class="address__title">
                    	Уточните адрес
                    </li>`;

let createMarkupBlockAddresses = ( data ) => {
	let markup = data.map( elem => {
		return `<li class="address__list-item"
				data-cadnum="${elem.cadNum}">
                   ${elem.address}         
                 	<span class="address__list-item-number">
                    	${elem.cadNum}
                    </span>
                </li>`;
	});
	markup.unshift(titleAddress);
	addressList.empty().append(...markup);
}
/*------------------------------*/
