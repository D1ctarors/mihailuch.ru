
// перетащить элемент
function elementWrapping() {

	if (window.innerWidth <= 992) {
		const weather = document.querySelector('.header__information');
		const burgerWrap = document.querySelector('.navigation');
		const weatherWiget = weather.innerHTML;
		burgerWrap.innerHTML = `${weatherWiget}  ${burgerWrap.innerHTML}`;
		weather.style.display = "none";
	}


}

window.addEventListener('load', () => {
	elementWrapping();
});

// Плавный скролл
function scrollTo() {
	const smoothLinks = document.querySelectorAll('a[href^="#"]');
	for (let smoothLink of smoothLinks) {
		smoothLink.addEventListener('click', function (e) {
			e.preventDefault();
			const id = smoothLink.getAttribute('href');

			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};
}
scrollTo();

// Получение и отрисовка актуальных курсов валют
function CBR_XML_Daily_Ru(rates) {
	function trend(current, previous) {
		// if (current > previous) return ' ▲';
		// if (current < previous) return ' ▼';
		return '';
	}

	var USDrate = rates.Valute.USD.Value.toFixed(2).replace('.', ',');
	var USD = document.getElementById('USD');
	USD.innerHTML = USD.innerHTML.replace('00,0000', USDrate);
	USD.innerHTML += trend(rates.Valute.USD.Value, rates.Valute.USD.Previous);

	var EURrate = rates.Valute.EUR.Value.toFixed(2).replace('.', ',');
	var EUR = document.getElementById('EUR');
	EUR.innerHTML = EUR.innerHTML.replace('00,0000', EURrate);
	EUR.innerHTML += trend(rates.Valute.EUR.Value, rates.Valute.EUR.Previous);
}

function Current() {

	const getToday = () => {
		const date = new Date();
		return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	};

	const wrapCourse = document.getElementById('course');
	let dollar = document.getElementById('USD');
	let euro = document.getElementById('EUR');


	const dataItem = [{
		today: getToday()
	}];

	let item = "";

	dataItem.forEach((data => {
		item +=
			`
			<div class="information__currencies" >
									<div class="dollar" id="USD">00,0000<sub>₽</sub></div>
		<div class="euro" id="EUR">00,0000<sub>₽</sub></div>
								</div>
								<p>Актуально на <span class="select">${data.today}</span></p>
		
			`;
	}));
	wrapCourse.insertAdjacentHTML("afterbegin", item);

}
Current();

// Получение и отрисовка погоды 
async function getWeather() {

	const city = 'Таганрог';
	const lang = 'ru';

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
	const res = await fetch(url);
	var dataJSON = await res.json();

	const dataItem = [{
		temp: Math.round(dataJSON.main.temp),
		city: city,
		img: dataJSON.weather[0].icon,
		description: dataJSON.weather[0].description,
	}];

	const wrapWeather = document.getElementById('weather');
	let item = "";
	dataItem.forEach((data => {
		item +=
			`
			<div class="weather__img"><img src="./img/weather/base.png" alt="weather"></img></div>
								<div class="weather__info">
									<div class="weather__temperature">${data.temp}<sup> o</sup>C</div>
									<div class="weather__location">${data.city}</div>
									<div class="weather__status">${data.description}</div>
								</div>
		
			`;
	}));
	wrapWeather.insertAdjacentHTML("afterbegin", item);
}
getWeather();

// добавление open - БУРГЕР
function giveOpenForBurger() {
	$(document).ready(function () {
		$('.burger').click(function (event) {
			$('.burger, .navigation').toggleClass('open');
			$('body').toggleClass('lock');
		});
	});
}
giveOpenForBurger();

// добавление active - НАВИГАЦИЯ
function giveActiveForNavigation() {
	const nav = document.getElementById('navigation');
	const navItem = nav.getElementsByClassName('navigation__item');

	for (let i = 0; i < navItem.length; i++) {
		navItem[i].addEventListener("click", function () {
			let current = document.getElementsByClassName("active");
			current[0].className = current[0].className.replace(" active", "");
			this.className += " active";


		});
	}
}
giveActiveForNavigation();

// Изменение active навигации по блокам
function autoNavigation() {
	window.addEventListener('scroll', () => {
		let scrollDistance = window.scrollY;

		if (window.innerWidth > 768) {
			document.querySelectorAll('.full-screen').forEach((el, i) => {
				if (el.offsetTop - document.querySelector('.navigation').clientHeight <= scrollDistance) {
					document.querySelectorAll('.navigation__item a').forEach((el) => {
						if (el.classList.contains('active')) {
							el.classList.remove('active');
						}
					});

					document.querySelectorAll('.navigation__item')[i].querySelector('a').classList.add('active');
				}
			});
		}
	});
}
autoNavigation();

// Закрыть бургер при нажатии на элемент
function closeNavigation() {
	if (document.documentElement.clientWidth < 992) {
		const burger = document.getElementById('burger');
		const nav = document.getElementById('navigation');
		const navItem = nav.getElementsByClassName('navigation__item');


		for (let i = 0; i < navItem.length; i++) {
			navItem[i].addEventListener("click", function () {
				let current = document.getElementsByClassName("active");
				current[0].className = current[0].className.replace(" active", "");
				this.className += " active";

				if (current.className = 'active') {
					nav.classList.remove('open');
					burger.classList.remove('open');
					$('body').toggleClass('lock');
				}
			});
		}

	}
}
closeNavigation();

// Работа прогресс бара - НАВЫКИ
function workProgressBarCircle() { //Взял с инета
	document.addEventListener("DOMContentLoaded", function () {
		var circleProgress = (function (selector) {
			var wrapper = document.querySelectorAll(selector);
			Array.prototype.forEach.call(wrapper, function (wrapper, i) {
				var wrapperWidth,
					wrapperHeight,
					percent,
					innerHTML,
					context,
					lineWidth,
					centerX,
					centerY,
					radius,
					newPercent,
					speed,
					from,
					to,
					duration,
					start,
					strokeStyle,
					text;

				var getValues = function () {
					wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
					wrapperHeight = wrapperWidth;
					percent = wrapper.getAttribute('data-cp-percentage');
					innerHTML = '<span class="percentage"><strong>' + percent + '</strong>%</span><canvas class="circleProgressCanvas" width="' + (wrapperWidth * 2) + '" height="' + wrapperHeight * 2 + '"></canvas>';
					wrapper.innerHTML = innerHTML;
					text = wrapper.querySelector(".percentage");
					canvas = wrapper.querySelector(".circleProgressCanvas");
					wrapper.style.height = canvas.style.width = canvas.style.height = wrapperWidth + "px";
					context = canvas.getContext('2d');
					centerX = canvas.width / 2;
					centerY = canvas.height / 2;
					newPercent = 0;
					speed = 1;
					from = 0;
					to = percent;
					duration = 2000;
					lineWidth = 40;
					radius = canvas.width / 2 - lineWidth;
					strokeStyle = wrapper.getAttribute('data-cp-color');
					start = new Date().getTime();
				};


				function animate() {
					requestAnimationFrame(animate);
					var time = new Date().getTime() - start;
					if (time <= duration) {
						var x = easeInOutQuart(time, from, to - from, duration);
						newPercent = x;
						text.innerHTML = Math.round(newPercent) + "%";
						drawArc();
					}
				}

				function drawArc() {
					var circleStart = 1.5 * Math.PI;
					var circleEnd = circleStart + (newPercent / 50) * Math.PI;
					context.clearRect(0, 0, canvas.width, canvas.height);
					context.beginPath();
					context.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
					context.lineWidth = lineWidth;
					context.strokeStyle = "rgba(0, 0, 0, 0.0)";
					context.stroke();
					context.beginPath();
					context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
					context.lineWidth = lineWidth;
					context.strokeStyle = strokeStyle;
					context.stroke();

				}
				var update = function () {
					getValues();
					animate();
				}
				update();

				var resizeTimer;
				window.addEventListener("resize", function () {
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(function () {
						clearTimeout(resizeTimer);
						start = new Date().getTime();
						update();
					}, 250);
				});
			});

			//  t: current time
			//  b: beginning value
			//  c: change in value
			//  d: duration
			//
			function easeInOutQuart(t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			}

		});

		circleProgress('.counter');

		function getRandom(min, max) {
			return Math.random() * (max - min) + min;
		}
	});
}
workProgressBarCircle();

// работа фильтров проектов - ПРОЕКТЫ
function WorkFilter() {
	$('.filter__item').click(function (event) {
		let dataFilter = $(this).data('filter');
		if (dataFilter == 'all') {
			$('.projects-item').show();
		} else {
			$('.projects-item').hide();
			$('.projects-item.f_' + dataFilter).show();
		}
		$('.filter__item').removeClass('active');
		$(this).addClass('active');

		return false;
	});
}
WorkFilter();

// Создание карточки проекта - ПРОЕКТЫ
function createProjectsItem() {
	const dataItem = [{
		photoPrewiew: './img/projects-prev/07.jpg',
		photoPrewiewAlt: 'atrium',
		logoInPrewiew: './img/projects-prev/logo-project/atrium.png',
		filter: 'f_all f_landing',
	},
	// {
	// 	photoPrewiew: './img/projects-prev/06.jpg',
	// 	photoPrewiewAlt: 'aquazond',
	// 	logoInPrewiew: './img/projects-prev/logo-project/aquazond.png',
	// 	filter: 'f_all f_landing',
	// },
	{
		photoPrewiew: './img/projects-prev/05.jpg',
		photoPrewiewAlt: 'discounts',
		logoInPrewiew: './img/projects-prev/logo-project/discounts.png',
		filter: 'f_all f_pet f_multipage',
	},
	{
		photoPrewiew: './img/projects-prev/08.jpg',
		photoPrewiewAlt: 'mys',
		logoInPrewiew: './img/projects-prev/logo-project/mys.jpg',
		filter: 'f_all f_landing f_pet',
	},
	{
		photoPrewiew: './img/projects-prev/04.jpg',
		photoPrewiewAlt: 'aperture',
		logoInPrewiew: './img/projects-prev/logo-project/aperture.svg',
		filter: 'f_all f_landing f_pet',
	},
	{
		photoPrewiew: './img/projects-prev/03.jpg',
		photoPrewiewAlt: 'mtbiking',
		logoInPrewiew: './img/projects-prev/logo-project/mtbiking.png',
		filter: 'f_all f_landing f_pet',
	},
	{
		photoPrewiew: './img/projects-prev/02.jpg',
		photoPrewiewAlt: 'binary',
		logoInPrewiew: './img/projects-prev/logo-project/binary.svg',
		filter: 'f_all f_landing f_pet',
	},
	{
		photoPrewiew: './img/projects-prev/01.jpg',
		photoPrewiewAlt: 'activeBox',
		logoInPrewiew: './img/projects-prev/logo-project/activeBox.png',
		filter: 'f_all f_landing f_pet',
	},


	];
	let item = "";
	let projectsWrapper = document.getElementById("projects-wrapper");
	dataItem.forEach((data => {
		item +=
			`
		<li class="projects-item ${data.filter}" >
							<div class="projects-item__inner">
								<img class="projects-item__prev" src="${data.photoPrewiew}" alt="${data.photoPrewiewAlt}">
								
								<div class="projects-item__overlay">

									<img src="${data.logoInPrewiew}" alt="">
									<button data-info>Подробнее</button>
								</div>
							</div>
						</li>
			`;
	}));
	projectsWrapper.insertAdjacentHTML("afterbegin", item);
}
createProjectsItem();

// Создание контента проекты - ПРОЕКТЫ-контент
function createContentProjectsItem() {

	// const btn = document.querySelectorAll(.)

	// btn.forEach


	window.addEventListener('click', function (event) {

		const clear = document.querySelectorAll('.projects-content__body');
		clear.forEach((item) => {
			item.remove();
		});



		if (event.target.hasAttribute('data-info')) {

			const card = event.target.closest('.projects-item');


			const alt = card.querySelector('.projects-item__prev').getAttribute('alt');

			const dataItem = [{
				nameProject: 'Atrium',
				jointlyWatch: 'block',
				jointlyText: 'Работа в команде,<br>спасибо <span><a href="https://github.com/genius192x" target="_blank" class= "select" >Genius192x</a></span > ',
				description: 'Опыт коммерческой разработки. Опыт работы в команде. Вставка элементов через js. Работа с масками. Работа с PopUp. Вставка Lottie-анимации. Использование слайдеров. Адаптивная вёрстка по макету. Работа с бургером.',
				usedTools: ['<li>html</li>', '<li>css</li>', '<li>js</li>'],
				imageSrc: './img/projects-prev/content-project/Atrium.png',
				filter: '',
				linkToProject: 'http://atrium.edavpolzu.ru/',
			},
			{
				nameProject: 'discounts',
				jointlyWatch: 'none',
				jointlyText: '',
				description: 'Адаптивная вёрстка по макету. Работа с бургером.',
				usedTools: ['<li>html</li>', '<li>css</li>', '<li>js</li>'],
				imageSrc: './img/projects-prev/content-project/discounts.png',
				filter: '',
				linkToProject: 'https://d1ctarors.github.io/discounts/',
			},
			{
				nameProject: 'MYS',
				jointlyWatch: 'none',
				jointlyText: '',
				description: 'Вёрстка v1.0 по созданному макету',
				usedTools: ['<li>html</li>', '<li>css</li>', '<li>js</li>'],
				imageSrc: './img/projects-prev/content-project/',
				filter: '',
				linkToProject: 'https://d1ctarors.github.io/MYS/',
			},
			{
				nameProject: 'Aperture',
				jointlyWatch: 'none',
				jointlyText: '',
				description: 'Вёрстка по макету. Адаптации под разные размеры экрана. Создание и оптимизация нескольких FullScreen блоков. Стилизованный ScrollBar. Работа с EM, REM. Работа с оптимизацией картинок.',
				usedTools: ['<li>html</li>', '<li>css</li>', '<li>js</li>'],
				imageSrc: './img/projects-prev/content-project/aperture.png',
				filter: '',
				linkToProject: 'https://d1ctarors.github.io/aperture/',
			},
			{
				nameProject: 'mtBiking',
				jointlyWatch: 'none',
				jointlyText: '',
				description: 'Адаптивная вёрстка по макету. Работа с бургером.',
				usedTools: ['<li>html</li>', '<li>css</li>', '<li>js</li>'],
				imageSrc: './img/projects-prev/content-project/MT_BIKING.png',
				filter: '',
				linkToProject: 'https://d1ctarors.github.io/mtbiking/',
			},
			{
				nameProject: 'Binary',
				jointlyWatch: 'none',
				jointlyText: '',
				description: 'Адаптивная вёрстка по макету',
				usedTools: ['<li>html</li>', '<li>css</li>', '<li>js</li>'],
				imageSrc: './img/projects-prev/content-project/',
				filter: '',
				linkToProject: 'https://d1ctarors.github.io/binary/',
			},
			{
				nameProject: 'activebox',
				jointlyWatch: 'none',
				jointlyText: '',
				description: 'Вёрстка по макету',
				usedTools: ['<li>html</li>', '<li>css</li>'],
				imageSrc: './img/projects-prev/content-project/activebox.png',
				filter: '',
				linkToProject: 'https://d1ctarors.github.io/activebox/',
			},
			];
			let item = "";
			let Wrapper = document.getElementById("projects-content");
			dataItem.forEach((data => {
				if (alt.toLowerCase() === data.nameProject.toLowerCase()) {

					item +=
						`
		<div class="projects-content__body">
				<div class="projects-content__close"></div>
					<div class="projects-content__header">
						<h2 class="projects-content__name-project">${data.nameProject}</h2>
						<div class="projects-content__jointly" style="display:${data.jointlyWatch}">${data.jointlyText}</div>
					</div>
					<div class="projects-content__description">
						${data.description}
					</div>
					<h2 class="projects-content__tools-title">во время работы использовались:</h2>
					<ul class="projects-content__tools">
						${data.usedTools}
					</ul>
					<a class="projects-content__link" href="${data.linkToProject}" target="_blank">Ссылка на проект<svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16 0.499999L14.59 1.91L20.17 7.5L-3.93402e-07 7.5L-3.0598e-07 9.5L20.17 9.5L14.58 15.08L16 16.5L24 8.5L16 0.499999Z"
							fill="#ffffff"></path>
					</svg></a>
					<div class="projects-content__image-project"><img src="${data.imageSrc}"
							alt="${data.nameProject}"></div>
				</div>
			`;
				}

			}));
			Wrapper.insertAdjacentHTML("afterbegin", item);

		}
		// event.preventDefault();
	});


}
createContentProjectsItem();

// Создание карточки статистики - СТАТИСТКА
function createStatisticsItem() {
	const dataItem = [{
		value: '9',
		title: 'Всего проектов'
	}, {
		value: '0',
		title: 'Сейчас в разработке'
	},
	{
		value: '1%',
		title: '"Погуляем"'
	},
	];
	let item = "";
	let statisticsWrapper = document.getElementById("statistics-wrap");
	dataItem.forEach((data => {
		item +=
			`
		<div class="statistics-item">
								<b>${data.value}</b>
								<span>${data.title}</span>
							</div>
			`;
	}));
	statisticsWrapper.insertAdjacentHTML("afterbegin", item);
}
createStatisticsItem();

// Создание карточки отзыва - ОТЗЫВЫ
function createReviewsItem() {
	let defaultPhotoSrc = './img/reviews/photo/default.png';
	const dataItem = [{
		authorPhotoSrc: defaultPhotoSrc,

		authorName: 'Валентин В.В.',
		authorCompany: 'Аквазонтики',
		reviewText: 'Не думал что за такую цену я найду такой хороший утюг. Раньше я пользовался утюгом который вообще никак не греется и постоянно отключался. Этот уюг работает прекрасно греется быстро пар работает без приколов. Пар даёт мощный. Хотя есть одн неприятная проблемка, утюг немного неприятный на ощупь.',
	},
	{
		authorPhotoSrc: './img/reviews/photo/trusbl.jpg',

		authorName: 'Имя',
		authorCompany: 'Ваша компания',
		reviewText: 'Доставка немного подкачала. товар шел около трёх месяцев. качество товара на хорошо, немного торчат нитки. ткань трусов из сетки. сидят хорошо. продавец пообщался со мной. сначала ошибся с размером и заказал меньше,чем нужно и мне вернули деньги за заказ. а потом заказала правильные и боже… это прекрасно. надеюсь с размером я угадал. если хотите прикольный подарок,который вызовет кучу эмоций, то это подходит.',
	},
	{
		authorPhotoSrc: './img/reviews/photo/meRev.jpg',

		authorName: 'Левченко М.А.',
		authorCompany: 'ловерСфловерс',
		reviewText: 'Норм сайт. Но мой ловерФлофер лучше',
	},
	];
	let item = "";
	let ReviewsWrapper = document.getElementById("reviewsWrapper");
	dataItem.forEach((data => {
		item +=
			`
			
					<div class="reviews-slider__review">
						<div class="review__author">
							<div class="author__photo"><img src="${data.authorPhotoSrc}" alt="${data.authorPhotoSrc}"></div>
								<div class="author__name">${data.authorName}</div>
								<div class="author__company"><span>"${data.authorCompany}"</span></div>
							</div>
						<div class="review__content">${data.reviewText}</div>
					</div>
				
			`;
	}));
	ReviewsWrapper.insertAdjacentHTML("afterbegin", item);
}
createReviewsItem();

// Создание карточки контактных данных - КОНТАКТНЫЕ ДАННЫЕ
function createContactsItem() {

	const dataItem = [{
		imageSrc: './img/contacts/phone.svg',
		title: 'Позвоните мне',
		subtitle: 'Есть вопросы? Я помогу!',
		linkHref: 'tel:+79526049887',
		link: '+7 (952) 604-98-87'
	}, {
		imageSrc: './img/contacts/mail.svg',
		title: 'Напишите мне',
		subtitle: 'Есть идеи?<br>Предложения?<br>Пишите!',
		linkHref: 'mailto:mihailuch.work@yandex.ru',
		link: 'mihailuch.work@yandex.ru'
	},
	{
		imageSrc: './img/contacts/stars.svg',
		title: 'Обратная связь',
		subtitle: 'Качество<br>выполненной<br>работы',
		linkHref: 'Тут должен открываться попап, но мне лень его делать :)',
		link: ' '
	},
	];
	let item = "";
	let ContactsWrapper = document.getElementById("contactsWrapper");
	dataItem.forEach((data => {
		item +=
			`
			
				<div class="contacts__item item-contacts">
					<div class="item-contacts__image"><img src="${data.imageSrc}" alt="${data.imageSrc}"></div>
					<div class="item-contacts__title">${data.title}</div>
					<div class="item-contacts__subtitle">${data.subtitle}</div>
					<a class="item-contacts__link" target="_blank" href="${data.linkHref}">${data.link}</a>
				</div>
				
			`;
	}));
	ContactsWrapper.insertAdjacentHTML("afterbegin", item);
}
createContactsItem();


