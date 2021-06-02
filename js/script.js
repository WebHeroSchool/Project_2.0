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
	
	// const questions = [
	// 	{
	// 		question: "Кто стал первым в истории человеком, который полетел в Космос?", 
	// 		answers: {
	// 			a: "Герман Титов",
	// 			b: "Юрий Гагарин",
	// 			c: "Алексей Леонов"
	// 		},
	// 		correctAnswer: "b"
	// 	},
	// 	{
	// 		question: "Кто стал первым в истории человеком, который вышел из космического корабля в открытый Космос?", 
	// 		answers: {
	// 			a: "Герман Титов",
	// 			b: "Юрий Гагарин",
	// 			c: "Алексей Леонов"
	// 		},
	// 		correctAnswer: "c"
	// 	},
	// 	{
	// 		question: "Что именно произошло 12 апреля 1961 года?", 
	// 		answers: {
	// 			a: "родился Юрий Гагарин",
	// 			b: "был запущен первый космический спутник",
	// 			c: "человек впервые совершил полёт в космическом пространстве"
	// 		},
	// 		correctAnswer: "c"
	// 	},
	// 	{
	// 		question: "Как звали конструктора, благодаря которому стал возможен первый космический полёт?", 
	// 		answers: {
	// 			a: "Сергей Королёв",
	// 			b: "Михаил Тихонравов",
	// 			c: "Михаил Ломоносов"
	// 		},
	// 		correctAnswer: "a"
	// 	}
	// ];

	const previousButton = document.getElementById('previous');
	const nextButton = document.getElementById('next');
	let currentSlide = 0;
	const questionItem = document.getElementById('question');
	const resultContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');

	fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple')
		 .then(response => response.json())
		 .then(data => {
		 	return data.results.map(item => {
		 		item.incorrect_answers = item.incorrect_answers.concat(item.correct_answer);
		 		return item
		 	})
		 })
		 .then(data => {
		 	slider.style.display = 'none';
			buttons.style.opacity = '1';
		 	
		 	//Объявляем функцию, которая устанавлявает обработчик событий CheckResult на все блоки с вопросами
			const setAnswerHandlers = () => {
				Array.from(questionItem.querySelectorAll('.slide .answer')).forEach(answer => {
					answer.addEventListener('click', (e) => checkResult(e, data));
				})
			}
			buildQuiz(data);
			setAnswerHandlers();
			showSlide(0);
			previousButton.addEventListener('click', showPreviousSlide);
			nextButton.addEventListener('click', showNextSlide);
			submitButton.addEventListener('click', () => showResults(data));
		 })		 
		 
	//выводим в окно список вопросов с вариантами ответов
	function buildQuiz(data) {
		//массив для вывода вопросов с вариантами ответов
		const output = [];
		//для каждого вопроса...
		data.forEach((currentQuestion, questionNumber) => {
			//создаем массив с вариантами ответов
			const answers = [];
			//для каждого варианта ответа...
			for (let letter in currentQuestion.incorrect_answers) {
				
				// if (letter >= 3) {
				// 	String.fromCharCode(94 + 3);
				// }
				
				// console.log(String.fromCharCode(94 + 3));
				// console.log(String.fromCharCode(94 + 3 + letter + 4));
				// console.log(letter);
				
				
				//  if (letter === '0') {
				// 	letter === 'a'
				// } if (letter === '1') {
				// 	letter === 'b'
				// } if (letter === '2') {
				// 	letter === 'c'
				// } if (letter === '3') {
				// 	letter === 'd'
				// }

				answers.push(
		          `<label class="label">
		             <input type="radio" name="question${questionNumber}" value="${letter}">
		              ${letter} : 
		              ${currentQuestion.incorrect_answers[letter]}
		           </label>`
		        );
			}
			//добавим вопрос и варианты ответов в output
			output.push(
				`<div class="slide">
					<div>Question ${questionNumber + 1}</div>
					<div class="question">${currentQuestion.question}</div>
					<div class="answer">${answers.join("")}</div>
				</div>`
			);
		});
		//объединяем наш выходной список в одну строку HTML и помещаем ее на страницу
		questionItem.innerHTML = output.join("");
		// setTimeout(showResults, 10000);
	}

	function showSlide (n) {
		const slides = document.querySelectorAll('.slide');
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

	const showResults = (data) => {
		console.log(data);
		//собрать контейнеры с ответами из нашей викторины
		let answerContainers = questionItem.querySelectorAll('.answer');
		//отслеживать ответы пользователя
		let numCorrect = 0;
		//для каждого вопроса ...
		data.forEach((currentQuestion, questionNumber) => {
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
		resultContainer.innerHTML = `Количество правильных ответов: ${numCorrect} из ${data.length}`;
		gameOver.style.display = 'flex';
		quizContainer.style.display = 'none';
		previousButton.style.display = 'none';
		nextButton.style.display = 'none';
		submitButton.style.display = 'none';
	}

	function checkResult (e, data) {
		//сохраняем в переменную tar DOM-элемент, по которому произошел клик
		const tar = e.target;
		//проверяем был ли совершен клик по input
		if (tar.tagName === 'INPUT') {
			//получаем номер вопроса, копируя последний символ его атирибута name
			const questionNumber = tar.name.slice(-1);
			//получаем значение поля инпута
			const userAnswer = tar.value;
			//сравниваем выбранный пользователем ответ с выбранным ответом
			const isCorrect = data[questionNumber].correct_answer === userAnswer;
			//если пользователь дал правильный ответ
			if(isCorrect) {
				//тогда окрашиваем шрифт в зеленый
				tar.parentNode.style.color = "#2E8B57";
			} else {
				tar.parentNode.style.color = "#B22222";
			}
			//выбираем все кнопки, которые находятся внутри блока с текущими вопросами
			const radioButtons = e.currentTarget.querySelectorAll('.answer input');
			//блокируем изменения ответа, добавляя всем полям ввода атрибут disabled
			radioButtons.forEach(button => button.setAttribute('disabled', true));

			//выбираем все label, которые находятся внутри массива с вариантами ответов и 
			//добавляем класс disable, убираем класс label
			const radioLabel = e.currentTarget.querySelectorAll('.answer label');
			radioLabel.forEach(labels => labels.classList.toggle('disable', 'label'))
		}
	}

	//Объявляем функцию, которая устанавлявает обработчик событий CheckResult на все блоки с вопросами
	// const setAnswerHandlers = () => {
	// 	Array.from(questionItem.querySelectorAll('.slide .answer')).forEach(answer => {
	// 		answer.addEventListener('click', checkResult);
	// 	})
	// }

	// const questionItem = document.getElementById('question');
	// const resultContainer = document.getElementById('results');
	// const submitButton = document.getElementById('submit');

	// setAnswerHandlers();

	// const previousButton = document.getElementById('previous');
	// const nextButton = document.getElementById('next');
	// let currentSlide = 0;

	// previousButton.addEventListener('click', showPreviousSlide);
	// nextButton.addEventListener('click', showNextSlide);
	// submitButton.addEventListener('click', showResults);
} 

form.addEventListener('submit', function(event) {
	let regex = /^[А-ЯЁA-Z]{1}[а-яёa-z]{2,10}$/;
	nameForm.classList.remove('error');
	if(!regex.test(nameForm.value)) {
		//очищаются стандартные настройки event
		event.preventDefault();
		console.log('error');
		nameForm.classList.add('error');
		error.innerHTML = 'Enter the correct name.<br>*the name must start with an uppercase letter and not have symbols or numbers';
	} else {
		event.preventDefault();
		startGame()
	}
});

restartButton.addEventListener('click', function(){ location.reload() });



