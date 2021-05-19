const startButton = document.getElementById('start');
const form = document.getElementById('form');
const nameForm = form.querySelector('.form-name');
const slider = document.querySelector('.slider');
const buttons = document.querySelector('.buttons');

function startGame () {
	slider.style.display = 'none';
	buttons.style.opacity = '1';
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
					<div>Вопрос ${questionNumber + 1}</div>
					<div class="question">${currentQuestion.question}</div>
					<div class="answer">${answers.join("")}</div>
				</div>`
			);
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
	}

	function showNextSlide () {
		showSlide(currentSlide + 1);
		// slideNumber.innerHTML = `Вопрос ${++ num}`;
	}

	function showPreviousSlide () {
		showSlide(currentSlide - 1);
		// slideNumber.innerHTML = `Вопрос ${-- num}`;
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
			if (userAnswer === currentQuestion.correctAnswer) {
				//добавить к количеству правильных ответов единицу
				numCorrect++;
			}
		});
		//показать количество правильных ответов из общего количества
		resultContainer.innerHTML = `Количество правильных ответов: ${numCorrect} из ${questions.length}`;
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
			const isCorrect = questions[questionNumber].correctAnswer === userAnswer;
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

	// const slideNumber = document.getElementById('num-slide');
	const questionItem = document.getElementById('question');
	const resultContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');
	// const form = document.querySelector('.form');
	// const name = form.querySelector('.form-name');

	// form.addEventListener('submit', function(event) {
	// 	let regex = /^[А-ЯЁа-яё]{2,10}$/;
	// 	// event.target.value = event.target.value[0].toUpperCase() + event.target.slice(1);
	// 	name.classList.remove('error');
	// 	if(!regex.test(name.value)) {
	// 		//очищаются стандартные настройки event
	// 		event.preventDefault();
	// 		console.log('error');
	// 		name.classList.add('error');

	// 		let error = document.createElement('div');
	// 		error.className = 'error-block';
	// 		error.innerHTML = 'Укажите верное имя';
	// 		name.parentElement.insertBefore(error, name);
	// 	}
	// })

	buildQuiz(questions);
	setAnswerHandlers();

	const previousButton = document.getElementById('previous');
	const nextButton = document.getElementById('next');
	const slides = document.querySelectorAll('.slide');
	let currentSlide = 0;
	// let num = 1;

	showSlide(currentSlide);

	previousButton.addEventListener('click', showPreviousSlide);
	nextButton.addEventListener('click', showNextSlide);
	submitButton.addEventListener('click', showResults);
} 

form.addEventListener('submit', function(event) {
	let regex = /^[А-ЯЁа-яё]{2,10}$/;
	nameForm.classList.remove('error');
	if(!regex.test(nameForm.value)) {
		//очищаются стандартные настройки event
		event.preventDefault();
		console.log('error');
		nameForm.classList.add('error');

		let error = document.createElement('div');
		error.className = 'error-block';
		error.innerHTML = 'Укажите верное имя';
		nameForm.parentElement.insertBefore(error, nameForm);
	} else {
		startButton.addEventListener('click', startGame);
	}
})



