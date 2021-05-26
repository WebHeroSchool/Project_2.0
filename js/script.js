const startButton = document.getElementById('start');
const form = document.getElementById('form');
const nameForm = form.querySelector('.form-name');
const slider = document.querySelector('.slide-start');
const buttons = document.querySelector('.buttons');
const restartButton = document.getElementById('restart');
const gameOver = document.querySelector('.game-over');
const error = document.querySelector('.error-block');
const quizContainer = document.querySelector('.quiz-container');

gameOver.style.display = 'none';

function startGame () {
	slider.style.display = 'none';
	buttons.style.opacity = '1';
	// const questions = [
	// 	{
	// 		question: "Кто стал первым в истории человеком, который полетел в Космос?", 
	// 		incorrect_answers: {
	// 			a: "Герман Титов",
	// 			b: "Юрий Гагарин",
	// 			c: "Алексей Леонов"
	// 		},
	// 		correct_answer: "b"
	// 	},
	// 	{
	// 		question: "Кто стал первым в истории человеком, который вышел из космического корабля в открытый Космос?", 
	// 		incorrect_answers: {
	// 			a: "Герман Титов",
	// 			b: "Юрий Гагарин",
	// 			c: "Алексей Леонов"
	// 		},
	// 		correct_answer: "c"
	// 	},
	// 	{
	// 		question: "Что именно произошло 12 апреля 1961 года?", 
	// 		incorrect_answers: {
	// 			a: "родился Юрий Гагарин",
	// 			b: "был запущен первый космический спутник",
	// 			c: "человек впервые совершил полёт в космическом пространстве"
	// 		},
	// 		correct_answer: "c"
	// 	},
	// 	{
	// 		question: "Как звали конструктора, благодаря которому стал возможен первый космический полёт?", 
	// 		incorrect_answers: {
	// 			a: "Сергей Королёв",
	// 			b: "Михаил Тихонравов",
	// 			c: "Михаил Ломоносов"
	// 		},
	// 		correct_answer: "a"
	// 	}
	// ];

// fetch('https://opentdb.com/api.php?amount=10')
// 	.then(response => response.json())

// let response = await fetch('https://opentdb.com/api.php?amount=10');
// let result = await response.json();

/*async function getQuestion() {
	let response = await fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple');
	return await response.json();
}
let questions = getQuestion().then((json) => json.results);*/

// const questions = [];
// function getQuestion() {
// 	fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple')
// 	 .then(response => response.json())
// 	 .then(json => {
// 	 	questions.push(json.results);
// 	 });
// }

let questions = [];

function getQuestion() {
	fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple')
	 .then(response => response.json())
	 .then(json => {
	 	questions = json.results;
	 })
	 	//выводим в окно список вопросов с вариантами ответов
	 .then(questions => {
			//массив для вывода вопросов с вариантами ответов
			const output = [];
			//для каждого вопроса...
			questions.forEach((currentQuestion, questionNumber) => {
				//создаем массив с вариантами ответов
				const incorrect_answers = [];
				//для каждого варианта ответа...
				for (letter in `${currentQuestion.incorrect_answers}${currentQuestion.correct_answer}`) {
					//добавляем radio button, выводим ключ и его значение
					incorrect_answers.push(
			          `<label>
			             <input type="radio" name="question${questionNumber}" value="${letter}">
			              ${letter} : 
			              ${currentQuestion.incorrect_answers[letter]}${currentQuestion.correct_answers[letter]}
			           </label>`
			        );
				}
				//добавим вопрос и варианты ответов в output
				output.push(
					`<div class="slide">
						<div>Вопрос ${questionNumber + 1}</div>
						<div class="question">${currentQuestion.question}</div>
						<div class="answer">${incorrect_answers.join("")}</div>
					</div>`
				);
			});
			//объединяем наш выходной список в одну строку HTML и помещаем ее на страницу
			questionItem.innerHTML = output.join("");
			setTimeout(showResults, 10000);
		}
		// buildQuiz(questions);

	 );
}
// getQuestion();

	// //выводим в окно список вопросов с вариантами ответов
	// function buildQuiz() {
	// 	//массив для вывода вопросов с вариантами ответов
	// 	const output = [];
	// 	//для каждого вопроса...
	// 	questions.forEach((currentQuestion, questionNumber) => {
	// 		//создаем массив с вариантами ответов
	// 		const incorrect_answers = [];
	// 		//для каждого варианта ответа...
	// 		for (letter in currentQuestion.incorrect_answers) {
	// 			//добавляем radio button, выводим ключ и его значение
	// 			incorrect_answers.push(
	// 	          `<label>
	// 	             <input type="radio" name="question${questionNumber}" value="${letter}">
	// 	              ${letter} : 
	// 	              ${currentQuestion.incorrect_answers[letter]}
	// 	           </label>`
	// 	        );
	// 		}
	// 		//добавим вопрос и варианты ответов в output
	// 		output.push(
	// 			`<div class="slide">
	// 				<div>Вопрос ${questionNumber + 1}</div>
	// 				<div class="question">${currentQuestion.question}</div>
	// 				<div class="answer">${incorrect_answers.join("")}</div>
	// 			</div>`
	// 		);
	// 	});
	// 	//объединяем наш выходной список в одну строку HTML и помещаем ее на страницу
	// 	questionItem.innerHTML = output.join("");
	// 	setTimeout(showResults, 10000);
	// }

	function showSlide (n) {
		slides[currentSlide].classList.remove('active-slide');
		slides[n].classList.add('active-slide');
		currentSlide = n;
		if (currentSlide === 0) {
			previousButton.style.visibility = 'hidden';
		} else {
			previousButton.style.visibility = 'visible ';
		}
		if (currentSlide === slides.length - 1) {
			nextButton.style.visibility = 'hidden';
			submitButton.style.visibility = 'visible ';
		} else {
			nextButton.style.visibility = 'visible ';
			submitButton.style.visibility = 'hidden';
		}	

	}

	function showNextSlide () {
		showSlide(currentSlide + 1);
	}

	function showPreviousSlide () {
		showSlide(currentSlide - 1);
	}

	const showResults = () => {
		//собрать контейнеры с ответами из нашей викторины
		const answerContainers = questionItem.querySelectorAll('.answer');
		//отслеживать ответы пользователя
		let numCorrect = 0;
		//для каждого вопроса ...
		questions.forEach((currentQuestion, questionNumber) => {
			//найти выбранный ответ
			//перебрать все вопросы из квиза
			const answerContainer = answerContainers[questionNumber];
			//берем подходящий элемент
			const selector = `input[name=question${questionNumber}]:checked`;
			const userAnswer = (answerContainer.querySelector(selector) || {}).value;

			//если ответ верный
			if (userAnswer === currentQuestion.correct_answer) {
				//добавить к количеству правильных ответов единицу
				numCorrect++;
			}
		});
		//показать количество правильных ответов из общего количества
		resultContainer.innerHTML = `Количество правильных ответов: ${numCorrect} из ${questions.length}`;
		gameOver.style.display = 'inline-block';
		quizContainer.style.display = 'none';
		previousButton.style.display = 'none';
		nextButton.style.display = 'none';
		submitButton.style.display = 'none';
	}

	const checkResult = (e) => {
		//сохраняем в переменную tar DOM-элемент, по которому произошел клик
		const tar = e.target;
		//проверяем был ли совершен клик по input
		if (tar.tagName === 'INPUT') {
			//получаем номер вопроса, копируя последний символ его атирибута name
			const questionNumber = tar.name.slice(-1);
			//получаем значение поля инпута
			const userAnswer = tar.value;
			//сравниваем выбранный пользователем ответ с выбранным ответом
			const isCorrect = questions[questionNumber].correct_answer === userAnswer;
			//если пользователь дал правильный ответ
			if(isCorrect) {
				//тогда окрашиваем шрифт в зеленый
				tar.parentNode.style.color = "#2E8B57";
			} else {
				tar.parentNode.style.color = "#B22222";
			}
			//выбираем все кнопки, которые находятся внутри блока с текущими вопросами
			const radioButtons = e.currentTarget.querySelectorAll('.answer input');
			//блокируем изменения ответа, юобавляя всем полям ввода атрибут disabled
			radioButtons.forEach(button => button.setAttribute('disabled', true))
		}
	}

	//Объявляем функцию, которая устанавлявает обработчик событий CheckResult на все блоки с вопросами
	const setAnswerHandlers = () => {
		Array.from(questionItem.querySelectorAll('.slide .answer')).forEach(answer => {
			answer.addEventListener('click', checkResult);
		})
	}

	const questionItem = document.getElementById('question');
	const resultContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');

	// buildQuiz(questions);
	getQuestion();
	setAnswerHandlers();

	const previousButton = document.getElementById('previous');
	const nextButton = document.getElementById('next');
	const slides = document.querySelectorAll('.slide');
	let currentSlide = 0;

	showSlide(currentSlide);

	previousButton.addEventListener('click', showPreviousSlide);
	nextButton.addEventListener('click', showNextSlide);
	submitButton.addEventListener('click', showResults);
} 

// let error = document.createElement('div');
// error.className = 'error-block';
// nameForm.parentElement.insertBefore(error, nameForm);

form.addEventListener('submit', function(event) {
	let regex = /^[А-ЯЁа-яё]{2,10}$/;
	nameForm.classList.remove('error');
	if(!regex.test(nameForm.value)) {
		//очищаются стандартные настройки event
		event.preventDefault();
		console.log('error');
		nameForm.classList.add('error');
		error.innerHTML = 'Укажите верное имя';
	} else {
		event.preventDefault();
		startGame()
	}
});

restartButton.addEventListener('click', function(){ location.reload() });



