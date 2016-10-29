function createQuizOverview(){
	
	// Lies das Wrap Templates aus und gib mir den Inhalt
	var wrapTemplate = getTemplateCB(templateUrls.quizOverview, function() { 
		var template = this.responseText;
		
		// Inhalt in Quiz-warp injizieren	
		var target = document.getElementById("content");
		target.innerHTML = template;
		
		// Item Template ziehen und speichern
		var quizItem = document.getElementsByClassName("quiz-item")[0];

		// Item im Wrap löschen
		quizItem.parentNode.removeChild(quizItem);
		
		// Durch das QuizOverview JSON iterieren
		var resultHtml = "";
		for(var quiz in quizOverviewData){
			
			// Item Template zwischenspeichern
			resultHtml = quizItem.outerHTML;
			
			// Platzhalter ersetzen
			resultHtml = resultHtml.replace(/{{quizName}}/, quizOverviewData[quiz].name);
			resultHtml = resultHtml.replace(/{{quizDescription}}/, quizOverviewData[quiz].description);
			
			// ID ändern
			resultHtml.id = quiz;

			// HTML in Wrap einfügen
			document.getElementById("quizzes").innerHTML += resultHtml;
			
		}
		
	});
	
	
	// Gib mir die URL des Item Templates
	//var itemUrl = getTemplateUrl(templateUrls.quizOverviewItem);
	
	// Lies es aus und gib mir den Inhalt
	//var itemTemplate = getTemplate(itemUrl);
	
	// Injiziere die Items in den Wrap
	
	
	// Injiziere den Content in Quiz Wrap
	
	
	
}


/*
getTemplate(templateUrls.quizOverview).then(function(response) {
	var target = document.getElementById("content");
	target.innerHTML = response;
	
	// Item Template ziehen und speichern
	var item = document.getElementById("quiz-item");
	
	// Item im Wrap löschen
	item.parentNode.removeChild(item);
	console.log(item);
	

// The second runs when the promise
// is rejected, and logs the Error specified with the reject() method.
	}, function(Error) {
	console.log(Error);
	}); */
	
