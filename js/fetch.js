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

let getDataAPI = ( url, options ) => {
	
	return fetch( url, options )
		   .then( response => response.json())
		   .then( response => response);
	
}