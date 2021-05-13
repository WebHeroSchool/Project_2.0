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

function showSlide (n) {
	slides[currentSlide].classList.remove('active-slide');
	slides[n].classList.add('active-slide');
	currentSlide = n;

	if (currentSlide === 0) {
		previousButton.style.display = 'none';
	} else {
		previousButton.style.display = 'inline-block';
	}

	if (currentSlide === slides.length - 1) {
		nextButton.style.display = 'none';
		submitButton.style.display = 'inline-block';
	} else {
		nextButton.style.display = 'inline-block';
		submitButton.style.display = 'none';
	}



	// questions.find((numSlide) => {
	// 	let num = questions.indexOf(numSlide);
	// 	slideNumber.innerHTML = `Вопрос номер: ${num}`;
	// 	// questionItem.prepend(numSlideShow);
	// });

	// for (let i = 0; i < questions.length; i++) {
	// 		let num = questions[i].question;
	// 		let numSlide = document.createElement('div');
	// 		numSlide.classList.add('num-slide');
	// 		numSlide.innerHTML = `Вопрос номер: ${num}`;
	// 		questionItem.appendChild(numSlide);
	// 	}

	// for (let i = 0; i < questions.length; i++) {
	// 		let num = questions.indexOf(1);
	// 		let numSlide = document.createElement('div');
	// 		numSlide.classList.add('num-slide');
	// 		numSlide.innerHTML = `Вопрос номер: ${num}`;
	// 		questionItem.appendChild(numSlide);
	// 	}
	
	
}

function showNextSlide () {
	showSlide(currentSlide + 1);

	slideNumber.innerHTML = `Вопрос номер: ${num ++}`;


	// let num = currentSlide + 1;
	// slideNumber.innerHTML = `Вопрос номер: ${num}`;
}

function showPreviousSlide () {
	showSlide(currentSlide - 1);

	slideNumber.innerHTML = `Вопрос номер: ${num --}`;
}

let num = 1;



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

const questionItem = document.getElementById('question');
const resultContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const slideNumber = document.getElementById('num-slide');

buildQuiz(questions);

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

showSlide(currentSlide);

previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);
submitButton.addEventListener('click', showResults);

})();