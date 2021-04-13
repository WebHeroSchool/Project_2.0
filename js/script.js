let num; //для перехода между вопросами при увеличении значения переменной
let score; //для учета набранных очков

const questions = [
	{
		question: "Кто стал первым в истории человеком, который полетел в Космос?", 
		a: "Герман Титов",
		b: "Юрий Гагарин",
		c: "Алексей Леонов",
		correctAnswer: "Юрий Гагарин"
	},
	{
		question: "Кто стал первым в истории человеком, который вышел из космического корабля в открытый Космос?", 
		a: "Герман Титов",
		b: "Юрий Гагарин",
		c: "Алексей Леонов",
		correctAnswer: "Алексей Леонов"
	},
	{
		question: "Что именно произошло 12 апреля 1961 года?", 
		a: "родился Юрий Гагарин",
		b: "был запущен первый космический спутник",
		c: "человек впервые совершил полёт в космическом пространстве",
		correctAnswer: "человек впервые совершил полёт в космическом пространстве"
	},
	{
		question: "Как звали конструктора, благодаря которому стал возможен первый космический полёт?", 
		a: "Сергей Королёв",
		b: "Михаил Тихонравов",
		c: "Михаил Ломоносов",
		correctAnswer: "Сергей Королёв"
	}
];

let answers = questions.filter(item => item.correctAnswer == item.c);
console.log(answers);


