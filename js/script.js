let num; //для перехода между вопросами при увеличении значения переменной
let score; //для учета набранных очков

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

// let answers = questions.filter(item => item.correctAnswer == item.c);
// console.log(answers);

let answer = ['b', 'b', 'c', 'b'];

function checkAnswers(answer, questions) {
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].correctAnswer == answer[i]) {
			console.log('Ответ верный');
		} else {
			console.log('Ответ неверный');
		}
	}
}

checkAnswers(answer, questions);