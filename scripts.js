$(function() {

  $.get('quiztemplate.html', function(template) {
    	var rendered = Mustache.render(template, QUIZ);
    	$('#quiz-container').html(rendered);
  });
});