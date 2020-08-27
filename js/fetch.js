let getDataAPI = ( url, options ) => {
	
	return fetch( url, options )
		   .then( response => response.json())
		   .then( response => response);
	
}