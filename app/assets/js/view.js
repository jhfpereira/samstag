function createQuizOverview(){
	
	getTemplate(templateUrls.quizOverview).then(function(response) {
    	// The first runs when the promise resolves, with the request.reponse
		// specified within the resolve() method.
		
		// Wir injizieren das Template in Quiz-Wrap
		var target = document.getElementById("content");
		target.innerHTML = response;
		
		// Item Template ziehen und speichern
		var item = document.getElementById("quiz-item");
		var itemHtml = item.innerHTML;

		
		// Item im Wrap löschen
		item.parentNode.removeChild(item);
		console.log(item);
		

    // The second runs when the promise
    // is rejected, and logs the Error specified with the reject() method.
  	}, function(Error) {
    	console.log(Error);
  	});
	
	// Lies das Wrap Templates aus und gib mir den Inhalt
	//var wrapTemplate = getTemplate(templateUrls.quizOverviewWrap);
	//alert(wrapTemplate);
	
	
	// Gib mir die URL des Item Templates
	//var itemUrl = getTemplateUrl(templateUrls.quizOverviewItem);
	
	// Lies es aus und gib mir den Inhalt
	//var itemTemplate = getTemplate(itemUrl);
	
	// Injiziere die Items in den Wrap
	
	
	// Injiziere den Content in Quiz Wrap
	
	getJsonData(dataUrls.quizOverview).then(function(response) {

		var dataJSON = JSON.parse(response);	   
		console.log(dataJSON); // this will show the info it in firebug console
		

	}, function(Error) {
    	console.log(Error);
  	});
	
}