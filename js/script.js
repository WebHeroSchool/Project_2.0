const questions = [
	{
		question: "Кто стал первым в истории человеком, который полетел в Космос?", 
		answers: {
			a: "Герман Титов",
			b: "Юрий Гагарин",
			c: "Алексей Леонов"
		},
		correctAnswer: "b"
	},
	{
		question: "Кто стал первым в истории человеком, который вышел из космического корабля в открытый Космос?", 
		answers: {
			a: "Герман Титов",
			b: "Юрий Гагарин",
			c: "Алексей Леонов"
		},
		correctAnswer: "c"
	},
	{
		question: "Что именно произошло 12 апреля 1961 года?", 
		answers: {
			a: "родился Юрий Гагарин",
			b: "был запущен первый космический спутник",
			c: "человек впервые совершил полёт в космическом пространстве"
		},
		correctAnswer: "c"
	},
	{
		question: "Как звали конструктора, благодаря которому стал возможен первый космический полёт?", 
		answers: {
			a: "Сергей Королёв",
			b: "Михаил Тихонравов",
			c: "Михаил Ломоносов"
		},
		correctAnswer: "a"
	}
];
let num; //для перехода между вопросами при увеличении значения переменной
let score = 0; //для учета набранных очков
let answer = ['b', 'b', 'c', 'b'];

let questionItem = document.getElementById('question');
questionItem.classList.add('wrap');

// let answers = questions.filter(item => item.correctAnswer == item.c);
// console.log(answers);

function checkAnswers(answer, questions) {
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].correctAnswer == answer[i]) {
			console.log('Ответ верный');
			score++;
		} else {
			console.log('Ответ неверный');
		};
	};
}
checkAnswers(answer, questions);

function buildQuiz(questions) {
	questions.forEach(item => {
		let newQuestion = document.createElement('h2');
		newQuestion.classList.add('title');
		newQuestion.innerHTML = item.question;
		questionItem.appendChild(newQuestion);

		let answerOptions = document.createElement('ol');
		answerOptions.classList.add('list');
		answerOptions.innerHTML = item.answers;
		questionItem.appendChild(answerOptions);
	});
}
buildQuiz(questions);

let replyCounter = document.createElement('div');
replyCounter.classList.add('counter');
replyCounter.innerHTML = `Количество правильных ответов: ${score}`;
questionItem.appendChild(replyCounter);