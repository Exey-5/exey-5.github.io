'use strict';

$(document).ready(function() {
	$(function(){
		// Необходимые переменные будующей библиотеки
		//
		var geo = window.country || 'ES';

		var countClass    = '.count-people';							// Класс "Уже купили сегодня"
		var lastpackClass = '.lastpack';									// Класс "Осталось товаров со скидкой"

		var oldPriceClass = '.price_land_s4';							// Класс "Старая цена"
		var newPriceClass = '.price_land_s1';							// Класс "Новая цена"
		var currClass     = '.price_land_curr';						// Класс "Валюта"

		var curr     = $(currClass + ':first').text() || 'ESP';					// Валюта из документе
		var oldPrice = parseInt(($(oldPriceClass + ':first').text()).replace(/[^0-9]/g,'')) || 0;			// Старая цена из документа
		var newPrice = parseInt(($(newPriceClass + ':first').text()).replace(/[^0-9]/g,'')) || 0;			// Новая цена из документа

		var flagPhone = true;			// флажок для показа между заказами сообщения о том, кто сделал заказ телефонного звонка
		var flagFinal = true;			// флажок для показа для показа сообщения, что осталось последнее количество упаковок
		var flagKey   = true;			// Флажок для слежение за пользователем. Нужен для отображения попапа через определенное время нахождения пользователя на сайте.

		// Это всё нужно для слежением за пользователем. Чтобы показать ему попап для заказа
		var idleTimer = null;
		var idleState = false; // состояние отсутствия
		var idleWait  = 30000; // время ожидания в мс. (1/1000 секунды)

		var optVar = 0;

		// Суммы заказов
		var totalSumm = [0, 0];

		if ((newPrice == 1) && (oldPrice == 3960) && (geo == 'RU')) {
			optVar = 1;
			totalSumm = [3963, 4954];
		}
		if ((newPrice == 499) && ((oldPrice == 3960) || (oldPrice == 1996)) && (geo == 'RU')) {
			optVar = 2;
			totalSumm = [3883, 4881];
		}
		if ((newPrice == 147) && ((oldPrice == 3960) || (oldPrice == 1996)) && (geo == 'RU')) {
			optVar = 3;
			totalSumm = [3951, 4695];
		}
		if ((newPrice == 975) && (oldPrice == 3900) && (geo == 'RU')) {
			optVar = 4;
			totalSumm = [3315, 4290];
		}
		if ((newPrice == 1990) && (oldPrice == 3900) && (geo == 'RU')) {
			optVar = 5;
			totalSumm = [3980, 5970];
		}
		if ((newPrice == 1) && (oldPrice == 132) && (geo == 'BY')) {
			optVar = 6;
			totalSumm = [136, 206];
		}
		if ((newPrice == 33) && (oldPrice == 132) && (geo == 'BY')) {
			optVar = 7;
			totalSumm = [132, 264];
		}

		// Суммы заказов

		var lastpack = '27';													// Количество оставшихся упаковок
		var steppack = [4, 4, 4, 5, 5];								// Устанавливаем шаги итераций (на сколько уменьшать упаковки) (sp = step pack)
		var final    = 5;


		if ((geo == 'RU') && (newPrice > 0) && (optVar > 0)) {
			lastpack = '28';													// Количество оставшихся упаковок
			steppack = [4, 4, 4, 4, 6];								// Устанавливаем шаги итераций (на сколько уменьшать упаковки) (sp = step pack)
			final    = 6;
		}

		if ((geo == 'RU') && (newPrice == 0)) {
			var lastpack = '42';													// Количество оставшихся упаковок
			var steppack = [7, 7, 7, 7, 7];								// Устанавливаем шаги итераций (на сколько уменьшать упаковки) (sp = step pack)
			var final    = 7;
		}

		if ((geo == 'BY') && (optVar > 0)) {
			lastpack = '40';													// Количество оставшихся упаковок
			steppack = [5, 5, 5, 5, 10];								// Устанавливаем шаги итераций (на сколько уменьшать упаковки) (sp = step pack)
			final    = 10;
		}

		var cp       = firstCount();									// Количество сделавших заказ сегодня  (cp = count people)

		/* Проверяем LocalStorage, есть ли запись по количеству пользователей и текущую дату и количество оставшихся упаковок */
		var dateNow  = new Date();										// Текущая дата
		var dayNow   = parseInt(dateNow.getDate());		// Текущий день

		if (localStorage.getItem('___cp')) {								// Проверяем LocalStorage, есть ли запись о количестве посетителей сегодня
			var tm = parseInt(localStorage.getItem('___tm'));					//Считываем записанный день из LocalStorage

			if (dayNow - tm == 0) {																// Проверяем, когда была сделална запись - сегодня или нет
				cp       = localStorage.getItem('___cp');						// Считываем из LocalStorage количество людей сделавших заказ сегодня
				lastpack = localStorage.getItem('___lp');						// Считываем из LocalStorage количество оставшихся упаковок (lp = last pack)
			} else {																						// если запись не сегодняшняя, то считаем всё заново
				setLS(dayNow, lastpack, steppack, cp);
			}
		} else {																						// Если в LocalStorage нет записи о количестве людей, то устанавливаем первоначальные значения
			setLS(dayNow, lastpack, steppack, cp);
		}
		/* Проверяем LocalStorage, есть ли запись по количеству пользователей и текущую дату  и количество оставшихся упаковок */

		$(countClass).text(cp);													// Запивываем в ленд количество людей, сделавших заказ сегодня
		$(lastpackClass).text(lastpack);								// Запивываем в ленд количество оставшихся упаковок

		/* Сообщение "Количество посетителей на сайте"" */
		var message02 = '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info">Cantidad de visitantes en el sitio: <span id="js-user-id3"></span></p></div>';
		/* Сообщение "Заказ обратного звонка"" */
		var message03 = '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-callback"></i><p class="show-message__info"><span class="js-show-name"><span class="js-name"></span></span> ha ordenado una llamada</p></div>';
		/* Сообщение "Осталось Задуманное количество упаковок упаковок"" */
		var message04 = '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info"><span style="font-size: 16px;">Quedado de promoción<br><span style="color: red;font-size: 20px;font-weight: bold;"><span style="color: red;">' + final + '</span></span> un.</span></p></div>';

		/* Закрытие попапа пои клике */
		$('.show-message').on('click', function() {
			$('.show-message__item').fadeOut(100);
			setTimeout(function(){
				$('.show-message').empty();
			}, 200);
		});
		/* Закрытие попапа пои клике */

		/* Показ формы заказа через 35 секунд*/
		if ($(window).width() > 991) {
			/* Следим за пользователем, не нажимает ли он кнопку */
			$(document).bind('keydown', function(){
				if (flagKey) {
					clearTimeout(idleTimer); // отменяем прежний временной отрезок

					idleState = false;
					idleTimer = setTimeout(function(){
						// Действия на отсутствие пользователя
						flagKey = false;
						// Если не используется плагин magnificPopup, то тут указывает вызов нужного попапа
						// Также тут необходимо переписать параметры вызова magnificPopup, а именно - айдишник формы
						// $.magnificPopup.open({
						// 	items: {
						// 		src: '#pu-form',
						// 		type: 'inline'
						// 	}
						// });
						idleState = true;
					}, idleWait);
				}

			});

			$("body").trigger("keydown");
			/* Следим за пользователем, не нажимает ли он кнопку */
		}
		/* Показ формы заказа через 35 секунд*/

		/* Попап на заказы */
		setTimeout(	function() {
			popUp()
		}, 8000);

		/* Функция подсчета первоначального количества людей, сделавших заказ сегодня */
		function firstCount() {
			var d = new Date();

			var h = d.getHours();
			var m = d.getMinutes();
			var num_first = 100;
			var first_count_people = num_first + h * 12 + Math.floor(m / 5);

			return first_count_people;
		}
		/* Функция подсчета первоначального количества людей, сделавших заказ сегодня */

		/* Записываем в LocalStorage первоначальные данные */
		function setLS(dayNow, lastpack, steppack, cp) {
			localStorage.setItem('___cp', cp);																	// Записываем текущее количество людей на сайте в LocalStorage
			localStorage.setItem('___tm', dayNow);															// Записываем в LocalStorage текущий день
			localStorage.setItem('___lp', lastpack);														// Записываем в LocalStorage начальное количество упаковок
			localStorage.setItem('___sp', JSON.stringify(steppack));						// Записываем в LocalStorage шиги итераций
		}
		/* Записываем в LocalStorage первоначальные данные */

		//PopUp на заказы
		function popUp() {

			/* Сначала выводим попап с количеством посетителей на сайте*/
			var rp = rand(321, 769);							// Случайное число из диапазона 321-769 (rp = random people) - количество посетителй на сайте
			localStorage.setItem('___rp', rp);		// Записываем это количество в LocalStorage

			shwMsg(message02, '', rp);						// Показываем сначала количество посетителей на сайте
			/* Сначала выводим попап с количеством посетителей на сайте*/

			setTimeout(function() {
				var lp = parseInt(localStorage.getItem('___lp'));								/* Считываем количество упаковок */

				if (lp <= final) {										// Если упаковок меньше или ранвно Задуманного числа, то будем бесконечно показывать попапы Кто сделал заказ обратного звонка или Количество посетителей на сайте
					if (flagFinal) {
						shwMsg(message04, '', 0);
						flagFinal = false;
						setTimeout(function(){
							showPopupEnd();
						}, 12000);
					}
				} else {													// Если количество оставшихся упаковок больше Задуманного числа, то показываем, что их покупают и увеличиваем количество людей сделавших заказ сегодня и уменьшаем количество оставшихся упаковок
					var sp = JSON.parse(localStorage.getItem('___sp'));							/* Считываем шаги итераций */
					showPopupBegin(lp, sp);
				}
			}, 12000);

		};
		//PopUp на заказы

		/* Вывод непосредственно самого попапа*/
		function shwMsg(msg, name, onsite) {
			$('.show-message').append(msg);
			if (name != '') {
				$('.js-name').text(name);
			}
			if (onsite != 0) {
				$('#js-user-id3').text(onsite);
			}
			$('.show-message__item').fadeIn(500).delay(4000).fadeOut(500);
			setTimeout(function(){
				$('.show-message').empty();
			}, 5500);
		}
		/* Вывод непосредственно самого попапа*/

		/* Функция показывает Кто и какой сделал заказ*/
		function showPopupBegin(lp, sp) {
			var name     = orderName();																		// Кто заказал
			var iCurent;
			var step;
			var summ;
			var cp;
			var endpack;
			var message01;

			if ((sp.length == 2) && (flagPhone)) {
				shwMsg(message03, name, 0);
				flagPhone = false;
				setTimeout(function(){
					endpack = lp;
					showPopupBegin(endpack, sp);
				}, 13000);
			} else {
				iCurent = Math.floor(Math.random()*(sp.length));			// Случайный индекс массива шагов
				step     = sp[iCurent];																// СЛучайный элемент массива шагов
				cp = parseInt(localStorage.getItem('___cp')) + 1;
				endpack  = lp - step;

				summ = step * newPrice;

				if ((geo == 'RU') && (newPrice > 0) && (optVar > 0)) {
					switch (step) {
						case 4:
							summ = totalSumm[0];
							break;
						case 6:
							summ = totalSumm[1];
							break;
						default:
							summ = 0;
					}
				}

				if ((geo == 'BY') && (optVar > 0)) {
					switch (step) {
						case 5:
						summ = totalSumm[0];
						break;
						case 10:
						summ = totalSumm[1];
						break;
						default:
						summ = 0;
					}
				}

				if (((newPrice > 0) && (optVar > 0)) || ((newPrice > 1) && (optVar == 0))) {
					message01 = '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info"><span class="js-show-name"><span class="js-name">' + name + '</span></span> hizo un pedido de la suma de <span class="x_price_current x_price">' + summ + '</span> <span class="x_currency">' + curr + '</span>, <span class="bay">' + step + '</span> <span class="paced">cajas pedidas </span><br><span class="package_left">Quedado de promoción <br><span class="blink">' + lp + '</span> <span class="blink_me">' + endpack + '</span></span></p></div>';
				} else {
					message01 = '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info"><span class="js-show-name"><span class="js-name">' + name + '</span></span>hizo un pedido de un curso completo.</p></div>';
				}

				sp.splice(iCurent, 1);
				localStorage.setItem('___lp', endpack);
				localStorage.setItem('___sp', JSON.stringify(sp));
				localStorage.setItem('___cp', cp);

				$(countClass).text(cp);									// Запивываем в ленд количество людей, сделавших заказ сегодня
				$(lastpackClass).text(endpack);								// Запивываем в ленд количество оставшихся упаковок

				shwMsg(message01, '', 0)

				setTimeout(function() {
					if (endpack > final) {
						showPopupBegin(endpack, sp);
					} else {
						if (flagFinal) {
							shwMsg(message04, '', 0);
							flagFinal = false;
							setTimeout(function(){
								showPopupEnd();
							}, 12000);
						} else {
							showPopupEnd();
						}
					}
				}, 13000);
			}
		}
		/* Функция показывает Кто и какой сделал заказ*/

		/* Генерируем имя кто сделал заказ*/
		function orderName() {
			var lastName = [
				// Женские имена и фамилии
				'Eduvigis Beatriz Britez Albarenga'
				, 'Claudia Velazco Saucedo'
				, 'Olga Noemí Rodas Bordón'
				, 'Valeria Paola Barrios jJousson'
				, 'Emily Delfino Isolini'
				, 'Maria Andresa  Agüero'
				, 'Marissa Raquel Ramoa Paéz'
				, 'Liz Paola Paredes Silva'
				, 'Sidney Celia Asucena Paredes Escobar'
				, 'Reimunda Luisa Benitez Gamarra'
				, 'Antonia Verón Salinas'
				, 'Luz  Gabriela Martínez Albarenga'
				, 'Cinthia Romina Estefania Malatini Loeblein'
				, 'Paola Rodríguez'
				, 'María de los Angeles Núñez'
				, 'Mónica Raquel Ruíz Díaz'
				, 'Antonella Britos Agüero'
				, 'Silene Gisselle Vera Espínola'
				, 'Verónica Aracely Villasanti Ferloni'
				, 'Paula Eva Dávalos '
				, 'Larisa Inés Soto Mora'
				, 'Alicia Monserrat Caballero Bordoli'
				, 'Ana Laura Silva López'
				, 'Ana Belén Ferreira Medina'
				, 'Aida Noemí Torres Ayala'
				, 'Ruth Mariela Vargas Dominguez'
				, 'Leidy Belén Alarcón Cristaldo'
				, 'Catalina Soledad Romero Duartes'
				, 'Dana María Benítez Maidana'
				, 'Camila Rocio Ramos'
				, 'Elvy Diana Romero Vega'
				, 'Liz Griselda Forneron Enciso'
				, 'Fanny Camila Cáceres Fernández'
				, 'Daisy Patricia Gamarra Arnold'
				, 'Pamela Luján Kallus González'
				, 'Lissandri Primavera Escalante Paiva'
				, 'Malena del Mar Domínguez Sánchez'
				, 'Yennifer Andrea Leiva Suares'
				, 'Alejandra Beatriz Insaurralde López'
				, 'Mirian Clarisa Encina Aceval'
				, 'Alejandra Cordova Flores'
				, 'Cristina Carranza Martinez'
				, 'Karina Cabral Salinas'
				, 'Sonia Corona Flores'
				, 'Marlena Paredes Montes'
				, 'Claudia Velazques Jasso'
				, 'Eleonora Chavez Perez '
				, 'Beatriz Gonzales Marcos'
				, 'Darisley Díaz Sanchez'
				, 'Leidiana Osvaldo Perales'
			];

			var firstName = [];

			var ln = lastName[Math.floor(Math.random()*(lastName.length))];
			// var fn = firstName[Math.floor(Math.random()*(firstName.length))];

			// return ln + ' ' + fn;
			return ln;
		}
		/* Генерируем имя кто сделал заказ*/

		/* Функция показывает попапы Сколько посетителей на сайте и кто сделал заказ на звонок */
		function showPopupEnd() {
			var plus    = true;
			var name    = '';
			setInterval(function() {

				var rndArr = new Array(0, 1);
				var indx    = rndArr[Math.floor(Math.random()*(rndArr.length))];

				if (indx == 0) {						// Показываем количество посетителей на сайте
					var kindx = rand(1, 33);
					var rp = parseInt(localStorage.getItem('___rp'));
					if (plus) {
						rp   = rp + kindx;
						plus = false;
					} else {
						rp   = rp - kindx
						plus = true;
					}
					localStorage.setItem('___rp', rp);
					shwMsg(message02, '', rp);
				} else {										// Показываем кто сделал заказ на обратный звонок
					name = orderName();
					shwMsg(message03, name, 0);
				}

			}, 13000);
			/* Функция показывает попапы Сколько посетителей на сайте и кто сделал заказ на звонок */
		}

		/*Случайное число из заданного диапазона*/
		function rand (min, max) {
			min = parseInt(min);
			max = parseInt(max);
			return Math.floor( Math.random() * (max - min + 1) ) + min;
		}
		/*Случайное число из заданного диапазона*/
	});
});
