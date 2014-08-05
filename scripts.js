$(function() {
    
	$.get('quiztemplate.html', function(template) {
		var quiz = addIdsToQuiz(QUIZ);
    	var rendered = Mustache.render(template, quiz);
    	$('#quiz-container').html(rendered);

  	});


 
	var addIdsToQuiz = function(quiz) { 
		var id = 1;
		for (var questionIdx = 0; questionIdx < quiz.length; questionIdx++) {
			var question = quiz[questionIdx];
			question.qId = id;
			id += 1;
			for (var answerIdx = 0; answerIdx < question.answers.length; 
					answerIdx++) {
				var answer = question.answers[answerIdx];
				answer.aId = id;
				id += 1;
			}
		}
		return quiz;
	}

});