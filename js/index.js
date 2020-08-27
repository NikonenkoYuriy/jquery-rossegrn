let testObj = {
    "success": true,
    "data": {
        "cadNum": "76:23:010101:62058",
        "address": "Ярославская область, г.Ярославль, ул.Панина, д.30, кв.36",
        "type": "Помещение",
        "area": "76.1 кв. м.",
        "status": "Ранее учтенный",
        "registrationDate": "01.07.2012",
        "cadastralValue": 3268461.52,
        "category": null,
        "permittedUse": null,
        "priceDeterminationDate": null,
        "allowedDocs": [
            "main_characteristics",
            "transfer_rights"
        ]
    }
};


let urlDadata = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
	token = "4c6e33332e10e1bccff49c0cf3f5e7a2326c2755",
	
	urlDevpreview = 'https://ros.devpreview.info/api/v1/address/get-info',
	urlCors = 'https://cors-anywhere.herokuapp.com/';
	

let optionsGET = {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
},
	optionsPOST = {...optionsGET};

optionsPOST.method = "POST";
optionsPOST.headers.Authorization = "Token " + token;

let stopTimUpdateTitle = null,
	startTitle = 'Производим поиск...',
	updateTitle = 'Длительное ожидание ответа. Переотправляем запрос…';

let getDataDevpreview = ( text ) => { 
	getDataAPI( urlCors + urlDevpreview + '?' + text, optionsGET )
		.then( ({ data }) => {
		    
			if (+data.status >= 200 && +data.status < 300 ) {
				
			}
			else if ( +data.status >= 400 && +data.status < 500 ) {
				showErrorMessage ('errorUser');
			}
			else if ( +data.status >= 500 ) {
				showErrorMessage ('serverError');
			}
			
			showBoxSearchResult ( testObj.data );
		
		})
		.catch( error => showErrorMessage ('errorUnknown'))
		.finally(() => {
			clearTimeout(stopTimUpdateTitle);
			hidePopupLoader ();
			updateTitlePopupLoader (startTitle)
		});
}

let getDataAddress = ( text ) => {
	optionsPOST.body = JSON.stringify({query: text });
	getDataAPI( urlDadata, optionsPOST )
		.then(result => {
			let listElem = addListAddress (result.suggestions);
			updateListAddress (listElem.join(' '));
		})
}

let addListAddress = (data) => data.map( obj => `<li>${obj.value}<li>`);

let searchFormInput = $('.search-form__input'),
	searchFormInputList = $('.search-form__input-list'),
	pattern = /^[\d:]*$/,
	stopTim = null,
	flagGetAddress = true;

searchFormInput.on('input', function (e) {
	
	let value = e.target.value.trim().toLocaleLowerCase();
	
	if (value === '') {
		updateListAddress ();
		//flagGetAddress = true; 
		clearTimeout(stopTim);
		return;
	}
	
	if (!pattern.test(value) && value !== " ") {
		
		//if (flagGetAddress) {
		clearTimeout(stopTim);
		stopTim = setTimeout(()=>{
			getDataAddress (value);
			//flagGetAddress = true;
		}, 200);
			//flagGetAddress = false;
		//}
		
	} 
	
});

searchFormInput.focus(function(){
    searchFormInputList.show()
});

searchFormInputList.on('click', 'li', function(e){
    let text = $(e.target).text();
    searchFormInput.val(text);
});


let updateListAddress = (content = '') => {
	let value = searchFormInput.val().trim();
	if (value === '') content = '';
	searchFormInputList.get(0).innerHTML = content;
}

let searchFormButton = $('.search-form__button');

searchFormButton.on('click', function(e){
	let value = searchFormInput.val();
    if (value === '') return;
	getDataDevpreview ( 'object='+encodeURI(value) );
	showPopupLoader();
	updateTitlePopupLoader ();
});

let popupLoader = $('.popup-loader'),
	popupLoaderTitle = $('.popup-loader-title');

let showPopupLoader = () => {
	popupLoader.fadeIn(400).css('display', 'flex');
}

let updateTitlePopupLoader = ( text ) => {
	popupLoaderTitle.text( text );
}

let hidePopupLoader = () => {
	popupLoader.fadeOut(400);
}

let runTextUpdates = () => {
	stopTimUpdateTitle = setTimeout(()=> {
		updateTitlePopupLoader (updateTitle);
	}, 15000)
}

let searchResult = $('.search-result');
let extracts = $('.extracts.content');

let showBoxSearchResult = ( data ) => {
	console.log(data);
	$('.search-result__num').text(data.cadNum);
	$('.search-result__type').text(data.type);
	$('.search-result__address').text(data.address);
	$('.search-result-area').text(data.area);
	$('.search-result-status').text(data.status);
	$('.search-result_category').text(data.category);
	$('.search-result_date').text(data.priceDeterminationDate);
	$('.search-result_permitted-use').text(data.permittedUse);
	$('.search-result_cadastral-value').text(data.cadastralValue + ' руб.');

	extracts.fadeIn(400);
	searchResult.fadeIn(400);
}