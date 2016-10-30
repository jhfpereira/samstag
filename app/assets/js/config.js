var base = {};
base.templates = "assets/templates";
base.dataFolder = "assets/data";

var templateUrls = {};
templateUrls.quizOverview = base.templates + "/quiz-overview.htm";
templateUrls.quizStart = base.templates + "/quiz-start.htm";
templateUrls.quizQuestions = base.templates + "/quiz-questions.htm";

var dataUrls = {};
dataUrls.quizOverview = base.dataFolder + "/quizOverview.json";


function setDataUrlsQuiz(quizID){
	return dataUrls.quizQuestions = base.dataFolder + "/" + quizID + "/questions.json";
	return dataUrls.quizHighscore = base.dataFolder + "/" + quizID + "/highscore.json";
}
