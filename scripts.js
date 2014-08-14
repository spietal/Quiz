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
	};





	var getSubmittedAnswerId = function(question) {
		return $("input:radio[name=" + question.qId + "]:checked").val();
	};


	var getAnswerById = function(id, question) {
		for (var answerIdx = 0; answerIdx < question.answers.length; 
				answerIdx++) {
			var answer = question.answers[answerIdx];
			if (answer.aId == id) {
				return answer;
			}
		}
	};


	var isCorrectAnswer = function(answer) {
		if (answer.isCorrect == null) {
			return false;
		}
		return answer.isCorrect
	};


	var questionIsCorrect = function(question) {
		var submittedAnswerId = getSubmittedAnswerId(question);
		if (submittedAnswerId == null) {
			return false;
		}
		var submittedAnswer = getAnswerById(submittedAnswerId, question);
		var isCorrect = isCorrectAnswer(submittedAnswer);


		if (isCorrect) {
			$("#question-container-"+question.qId).addClass("right-answer");
			$("#question-container-"+question.qId).removeClass("wrong-answer");
		}
		else {
			$("#question-container-"+question.qId).addClass("wrong-answer");
			$("#question-container-"+question.qId).removeClass("right-answer");
		}
		return isCorrect;
	};


	var gradeQuiz = function(quiz) {
		var numCorrect = 0;
		for (var i = 0; i < quiz.length; i++) {

			var question = quiz[i];
			var isCorrect = questionIsCorrect(question);
			if (isCorrect) {
				numCorrect += 1;
			}
			// console.log("question: " + i);
			// console.log("isCorrect: " + isCorrect);
		}
		var score = numCorrect/quiz.length;
		score *= 100;
		score = Math.round(score);
		console.log(score);
		$("#quiz-score").text("Your score is "+score+"%");
	};


	$("#submit-button").click(function() {
		gradeQuiz(QUIZ);
	});
});