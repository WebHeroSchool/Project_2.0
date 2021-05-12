(function () {
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
// let num; //для перехода между вопросами при увеличении значения переменной
// let answer = ['b', 'b', 'c', 'b'];

let questionItem = document.getElementById('question');
let resultContainer = document.getElementById('results');
let previousButton = document.getElementById('previous');
let nextButton = document.getElementById('next');


// let answers = questions.filter(item => item.correctAnswer == item.c);
// console.log(answers);

// function checkAnswers(answer, questions) {
// 	for (let i = 0; i < questions.length; i++) {
// 		if (questions[i].correctAnswer == answer[i]) {
// 			console.log('Ответ верный');
// 			score++;
// 		} else {
// 			console.log('Ответ неверный');
// 		};
// 	};
// }
// checkAnswers(answer, questions);

//выводим в окно список вопросов с вариантами ответов
function buildQuiz() {
	//массив для вывода вопросов с вариантами ответов
	const output = [];

	//для каждого вопроса...
	questions.forEach((currentQuestion, questionNumber) => {
		//создаем массив с вариантами ответов
		const answers = [];

		//для каждого варианта ответа...
		for (letter in currentQuestion.answers) {
			//добавляем radio button, выводим ключ и его значение
			answers.push(
	          `<label>
	             <input type="radio" name="question${questionNumber}" value="${letter}">
	              ${letter} : 
	              ${currentQuestion.answers[letter]}
	           </label>`
	        );
		}

		//добавим вопрос и варианты ответов в output
		output.push(
			`<div class="slide">
				<div class="question">${currentQuestion.question}</div>
				<div class="answer">${answers.join("")}</div>
			</div>`
		);

		// let newQuestion = document.createElement('h2');
		// newQuestion.classList.add('title');
		// newQuestion.innerHTML = item.question;
		// questionItem.appendChild(newQuestion);

		// let answerOptions = document.createElement('ol');
		// answerOptions.classList.add('list');
		// answerOptions.innerHTML = item.answers.join(' ');
		// questionItem.appendChild(answerOptions);
	});

	//объединяем наш выходной список в одну строку HTML и помещаем ее на страницу
	questionItem.innerHTML = output.join("");
}


//выводим в окно колич правильных ответов
// let replyCounter = document.createElement('div');
// replyCounter.classList.add('counter');
// replyCounter.innerHTML = `Количество правильных ответов: ${score}`;
// questionItem.appendChild(replyCounter);

const showResults = () => {
	//собрать контейнеры с ответами из нашей викторины
	const answerContainers = questionItem.querySelectorAll('.answers');
	
	//отслеживать ответы пользователя
	let numCorrect = 0;

	//для каждого вопроса ...
	questions.forEach((currentQuestion, questionNumber) => {
		//найти выбранный ответ
		//перебираем все вопросы из квиза
		const answerContainer = answerContainers[questionNumber];
		//берем подходящий элемент
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector) || {}).value;

		//если ответ верный
		if (userAnswer === currentQuestion.correctAnswer) {
			//добавить к количеству правильных ответов единицу
			numCorrect++;
			//поменять цвет вопроса на зеленый
			answerContainers[questionNumber].style.color = "#2E8B57";
		} else {
			//если ответ неправильный или пустой поменять цвет вопроса на красный
			answerContainers[questionNumber].style.color = "#B22222";
		}
	});

	//показать количество правильных ответов из общего количества
	resultContainer.innerHTML = `Количество правильных ответов: ${numCorrect} из ${questions.length}`;
}

function showSlide (currentSlide) {
	slides[currentSlide].classList.remove('active-slide');
	slides[currentSlide].classList.add('active-slide');

	let i;
	for (i; i < question.length; i++) {
		if (questions[i].question == search) {
			let numSlide = document.createElement('div');
			numSlide.classList.add('num-slide');
			numSlide.innerHTML = `Вопрос номер: ${i}`;
			questionItem.prependChild(numSlide);
		}
	}
}

function showPreviousSlide () {
	showSlide(currentSlide - 1);
	// console.log('Вывести предыдущий слайд');
}

function showNextSlide () {
	showSlide(currentSlide + 1);
	// console.log('Вывести следующий слайд');
}

let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

buildQuiz();
showSlide(0);

previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

})();