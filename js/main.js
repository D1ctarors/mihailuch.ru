
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
function Current() {

	const getToday = () => {
		const date = new Date();
		return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	};

// Получение валют - https://apilayer.com/marketplace/exchangerates_data-api?live_demo=show

// https://www.youtube.com/watch?v=H65F_dZ3RAI

	function getCurrency() {
		const CURRENCY_CODE = {
			USD: 'USD',
			EUR: 'EUR',
			RUB: 'RUB',
		};

		var myHeaders = new Headers();
		myHeaders.append("apikey", "UetsPW3HL9FAuoRxxTpSCzQ7r07YWpmE");

		var requestOptions = {
			method: 'GET',
			redirect: 'follow',
			headers: myHeaders
		};

		const renderContent = (response) => {
			const { data } = response;

			// console.log(data);

		}; //не выводит данные, ошибка в получении / построении данных

		fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${CURRENCY_CODE.RUB}&base=${CURRENCY_CODE.USD}`, requestOptions)
			.then(renderContent);

		// .then(response => response.text())
		// .then(result => console.log(result))
		// .catch(error => console.log('error', error));

	}
	// getCurrency();





	const wrapCourse = document.getElementById('course');
	let dollar = document.getElementById('dollar');
	let euro = document.getElementById('euro');

	const dataItem = [{

		dollar: '62,59',
		euro: '63,76',
		today: getToday()
	}];


	let item = "";

	dataItem.forEach((data => {
		item +=
			`
			<div class="information__currencies" >
									<div class="dollar" id="dollar">${data.dollar}</div>
		<div class="euro" id="euro">${data.euro}</div>
								</div>
								<p>Актуально на <span class="select">${data.today}</span></p>
		
			`;
	}));
	wrapCourse.insertAdjacentHTML("afterbegin", item);





}
Current();


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
		linkToBlock: 'пока_не_могу_дать(',
		filter: 'f_all f_landing',
	},
	// {
	// 	photoPrewiew: './img/projects-prev/06.jpg',
	// 	photoPrewiewAlt: 'aquazond',
	// 	logoInPrewiew: './img/projects-prev/logo-project/aquazond.png',
	// 	linkToBlock: 'пока_не_могу_дать(',
	// 	filter: 'f_all f_landing',
	// },
	{
		photoPrewiew: './img/projects-prev/05.jpg',
		photoPrewiewAlt: 'discounts',
		logoInPrewiew: './img/projects-prev/logo-project/discounts.png',
		linkToBlock: 'https://d1ctarors.github.io/discounts/',
		filter: 'f_all f_pet f_multipage',
	},
	{
		photoPrewiew: './img/projects-prev/04.jpg',
		photoPrewiewAlt: 'aperture',
		logoInPrewiew: './img/projects-prev/logo-project/aperture.svg',
		linkToBlock: 'https://d1ctarors.github.io/aperture/',
		filter: 'f_all f_landing f_pet',
	},
	{
		photoPrewiew: './img/projects-prev/03.jpg',
		photoPrewiewAlt: 'mtbiking',
		logoInPrewiew: './img/projects-prev/logo-project/mtbiking.png',
		linkToBlock: 'https://d1ctarors.github.io/mtbiking/',
		filter: 'f_all f_landing f_pet',
	},
	{
		photoPrewiew: './img/projects-prev/02.jpg',
		photoPrewiewAlt: 'binary',
		logoInPrewiew: './img/projects-prev/logo-project/binary.svg',
		linkToBlock: 'https://d1ctarors.github.io/binary/',
		filter: 'f_all f_landing f_pet',
	},
	{
		photoPrewiew: './img/projects-prev/01.jpg',
		photoPrewiewAlt: 'activeBox',
		logoInPrewiew: './img/projects-prev/logo-project/activeBox.png',
		linkToBlock: 'https://d1ctarors.github.io/activebox/',
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
									<a href="${data.linkToBlock}" target="_blank"><span>Подробнее</span></a>
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
	const dataItem = [{
		nameProject: 'Атриум',
		jointlyWatch: 'block',
		jointlyText: 'Работа в команде,<br>спасибо <span><a href="https://github.com/genius192x" target="_blank" class= "select" > Genius192x</a></span > ',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aliquid rem unde voluptatum repudiandae dolores iusto dignissimos consectetur eaque a.Aperiam, perspiciatis! Architecto eius exercitationem placeat libero iure delectus dolores vel numquam et asperiores.Similique, exercitationem deleniti ut magnam doloribus earum reiciendis quasi dolores dignissimos labore alias ducimus vel a?',
		usedTools: ['<li>html</li>', '<li>css</li>', '<li>js</li>'],
		imageSrc: './img/projects-prev/content-project/Atrium.png',
		filter: '',
	},
	];
	let item = "";
	let Wrapper = document.getElementById("projects-content");
	dataItem.forEach((data => {
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
					<a class="projects-content__link" href="#" target="_blank">Ссылка на проект<svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16 0.499999L14.59 1.91L20.17 7.5L-3.93402e-07 7.5L-3.0598e-07 9.5L20.17 9.5L14.58 15.08L16 16.5L24 8.5L16 0.499999Z"
							fill="#ffffff"></path>
					</svg></a>
					<div class="projects-content__image-project"><img src="${data.imageSrc}"
							alt="${data.nameProject}"></div>
				</div>
			`;
	}));
	Wrapper.insertAdjacentHTML("afterbegin", item);
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
		value: '80%',
		title: 'Качество работы'
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

		authorName: 'Имя',
		authorCompany: 'Ваша компания',
		reviewText: 'Доставка немного подкачала. товар шел около трёх месяцев. качество товара на хорошо, немного торчат нитки. ткань трусов из сетки. сидят хорошо. продавец пообщался со мной. сначала ошибся с размером и заказал меньше,чем нужно и мне вернули деньги за заказ. а потом заказала правильные и боже… это прекрасно. надеюсь с размером я угадал. если хотите прикольный подарок,который вызовет кучу эмоций, то это подходит.',
	}, {
		authorPhotoSrc: defaultPhotoSrc,

		authorName: 'Валентин В.В.',
		authorCompany: 'Аквазонтики',
		reviewText: 'Не думал что за такую цену я найду такой хороший утюг. Раньше я пользовался утюгом который вообще никак не греется и постоянно отключался. Этот уюг работает прекрасно греется быстро пар работает без приколов. Пар даёт мощный. Хотя есть одн неприятная проблемка, утюг немного неприятный на ощупь.',
	},
	{
		authorPhotoSrc: defaultPhotoSrc,

		authorName: 'Левченко М.А.',
		authorCompany: 'ловерСфловерс',
		reviewText: 'Норм сайт. Но мой ловерФлофер ломается н айпхоне 6',
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
		link: 'Оставить отзыв'
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

// перетащить элемент
function elementWrapping() {
	let container = document.querySelector('.container');
	if (container.innerHTML.width == '768') {
		console.log('ok');
	}

	$("#source").prependTo("#destination");
}
// elementWrapping();