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
			item.firstChild.onclick = function(){ showQuizStart(this); };
			 
			// HTML in Wrap einfügen
			document.getElementById("quizzes").appendChild(item.firstChild);
			
		}

	}
	
}


function showQuizStart( quiz ){
	
	var data = model.data.quizOverviewData[quiz.id];
	
	// Template Quiz-Start holen
	get(templateUrls.quizStart, renderTemplate);

	// Quiz-Start mit Inhalt fuellen
	function renderTemplate() { 
		var template = this.responseText;

		// Plazthalter ersetzen	
		template = template.replace(/{{quizName}}/, data.name );
		template = template.replace(/{{quizDescription}}/, data.description );

		// Inhalt in Quiz-warp injizieren	
		var target = document.getElementById("content");
		target.innerHTML = template;
		
		// Buttons mit Event ausstatten
		var play = document.getElementById("spielen");
		play.onclick = function() {initQuiz(quiz); };	

		var back = document.getElementById("zurueck");
		back.onclick = function() {createQuizOverview(); };	
		
	}
	
}

function initQuiz( quiz ){
	setDataUrlsQuiz(quiz.id);
	
	// JSON holen und Quiz initialisieren
	var quizQuestionsData;
	get(dataUrls.quizQuestions, init);
	
	function init(){
		model.data.quizQuestionsData.activeQuiz = JSON.parse(this.responseText);
		model.data.quizQuestionsData.activeQuestionCount = 1;
		model.data.quizQuestionsData.activeQuestion = model.data.quizQuestionsData.activeQuiz["question1"];
		
		// Quiz starten
		playQuiz(quiz);
	}
	
}

function playQuiz( ){

	// Template Quiz-Questions holen
	get(templateUrls.quizQuestions, renderTemplate);

	// Quiz-Questions mit Inhalt fuellen
	function renderTemplate() { 

		var template = this.responseText;
		var activeQuestion = model.data.quizQuestionsData.activeQuestion;
	
		// Plazthalter ersetzen
		template = template.replace(/{{quizFrage}}/, activeQuestion.question );
		template = template.replace(/{{optionA}}/, activeQuestion.options.optionA );
		template = template.replace(/{{optionB}}/, activeQuestion.options.optionB );
		template = template.replace(/{{optionC}}/, activeQuestion.options.optionC );
		template = template.replace(/{{optionD}}/, activeQuestion.options.optionD );

		// Inhalt in Quiz-warp injizieren	
		var target = document.getElementById("content");
		target.innerHTML = template;
		
		// Buttons mit Events ausstatten
		var optionA = document.getElementById("option-A");
		optionA.onclick = function() { checkAnswer("A"); };
		
		var optionB = document.getElementById("option-B");
		optionB.onclick = function() { checkAnswer("B"); };	

		var optionC = document.getElementById("option-C");
		optionC.onclick = function() { checkAnswer("C"); };
		
		var optionD = document.getElementById("option-D");
		optionD.onclick = function() { checkAnswer("D"); };
	}

}

function checkAnswer( answer ){
	
	var data = model.data.quizQuestionsData;
	var questionId = "question" + data.activeQuestionCount;
			
	// Ist die Antwort richtig?
	if(answer == data.activeQuestion.answer){
		data.answers[questionId] = true;
	}else{
		data.answers[questionId] = false;
	}
	
	// Naechste Frage
	data.activeQuestionCount++;
	questionId = "question" + data.activeQuestionCount;
	data.activeQuestion = data.activeQuiz[questionId];
	
	playQuiz();
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
	
