function createQuizOverview(){
	
	// JSON holen und danach Temlate ziehen
	var quizOverviewData;
	get(dataUrls.quizOverview, requireTemplate);
	
	// Lies das Wrap Templates aus und gib mir den Inhalt
	function requireTemplate(){
		model.data.quizOverviewData = JSON.parse(this.responseText);
		get(templateUrls.quizOverview, renderTemplate);
	}
	
	function renderTemplate() { 
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
		for(var quiz in model.data.quizOverviewData){
			
			// Item Template zwischenspeichern
			resultHtml = quizItem.outerHTML;

			// Platzhalter ersetzen
			resultHtml = resultHtml.replace(/{{quizId}}/, quiz);
			resultHtml = resultHtml.replace(/{{quizName}}/, model.data.quizOverviewData[quiz].name);
			resultHtml = resultHtml.replace(/{{quizDescription}}/, model.data.quizOverviewData[quiz].description);
			
			// Element erzeugen und mit Event ausstatten
			var item = document.createElement("div");
			item.innerHTML = resultHtml;
			item.firstChild.onclick = function(){ showQuiz(this); };
			 
			// HTML in Wrap einfügen
			document.getElementById("quizzes").appendChild(item.firstChild);
			
		}

	}
	
}


function showQuiz( quiz ){
	console.log(quiz.id);
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
	
