jQuery(document).ready(function ($) {



	let audioGolos = 'golos.mp3';   // название файла аудио





	/*
	 * International Telephone Input v16.0.0
	 * https://github.com/jackocnr/intl-tel-input.git
	 * Licensed under the MIT license
	*/
	var input = document.querySelectorAll("input[name=leyka_donor_phone]");

	for (var i = 0; i < input.length; i++) {
		iti = intlTelInput(input[i], {
			autoHideDialCode: false,
			autoPlaceholder: "aggressive",
			initialCountry: "auto",
			separateDialCode: true,
			preferredCountries: ['kz'],
			customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
				return '' + selectedCountryPlaceholder.replace(/[0-9]/g, 'X');
			},
			geoIpLookup: function (callback) {
				$.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
					var countryCode = (resp && resp.country) ? resp.country : "";
					console.log(resp)
					callback(countryCode);
				});
			},
			utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js" // just for 
		});


		$('input[name="leyka_donor_phone"]').on("focus click countrychange", function (e, countryData) {

			var pl = $(this).attr('placeholder') + '';
			var res = pl.replace(/X/g, '9');
			if (res != 'undefined') {
				$(this).inputmask(res, { placeholder: "X", clearMaskOnLostFocus: true });
			}




		});

		$('input[name="leyka_donor_phone"]').on("focusout", function (e, countryData) {
			var intlNumber = iti.getNumber();
			console.log(intlNumber);
		});

	}









	const div = (val, by) => (val - val % by) / by;
	const mod = (val, by) => val % by;

	class AudioMessage {
		constructor(container, audioLink) {
			this.audioLink = audioLink;
			this.speed = 1;

			this.elements = {};
			this.elements.container = container;
			this.elements.playToggle = container.querySelector('[data-play-toggle]');
			this.elements.wave = container.querySelector('[data-wave]');
			this.elements.time = container.querySelector('[data-time]');
			this.elements.speedToggle = container.querySelector('[data-speed-toggle]');

			this.wavesurfer = WaveSurfer.create({
				container: this.elements.wave,
				waveColor: '#E0E0E0',
				progressColor: '#00D45D',
				barWidth: 2,
				barHeight: 3, // the height of the wave
				barGap: 2,
				height: 40,
				cursorWidth: 0,
			});
			this.wavesurfer.load(this.audioLink);
			this.wavesurfer.on('ready', () => {
				this.setTime(this.wavesurfer.getDuration());

				this.elements.playToggle.addEventListener('click', this.togglePlay.bind(this));
				this.elements.speedToggle.addEventListener('click', this.toggleSpeed.bind(this));

				this.wavesurfer.on('audioprocess', () => {
					this.setTime(this.wavesurfer.getCurrentTime());
				});

				this.wavesurfer.on('seek', () => {
					this.play();
				});
			});
		}

		togglePlay() {
			this.elements.container.classList.toggle('AudioMessage--active');
			this.wavesurfer.playPause();
		}

		play() {
			this.elements.container.classList.add('AudioMessage--active');
			this.wavesurfer.play();
		}

		toggleSpeed() {
			this.speed += 0.5;
			if (this.speed > 2) {
				this.speed = 0.5;
			}
			this.wavesurfer.setPlaybackRate(this.speed);
			this.updateSpeed();
		}

		setTime(seconds) {
			const intSeconds = Math.trunc(seconds);
			const padMinutes = String(div(intSeconds, 60)).padStart(2, '0');
			const padSeconds = String(mod(intSeconds, 60)).padStart(2, '0');

			this.elements.time.textContent = `${padMinutes}:${padSeconds}`;
		}

		updateSpeed() {
			this.elements.speedToggle.textContent = `${this.speed}x`;
		}
	}

	const messages = [];

	document.querySelectorAll('[data-audio-message]').forEach((message) => {
		messages.push(new AudioMessage(message, audioGolos));
	});
















	$("body").on("click", ".CTW__quantity_arrow_minus", function () {
		quantityMinus($(this));
	});

	$("body").on("click", ".CTW__quantity_arrow_plus", function () {
		quantityPlus($(this));
	});


	var $quantityNum = "";
	// $quantityArrowMinus.click(quantityMinus);
	// $quantityArrowPlus.click(quantityPlus);
	function quantityMinus(th) {
		console.log("  eeeeeee ");
		$quantityNum = th.closest(".CTW__quantity_block").find(".CTW__InputQuantity_js");
		// if ($quantityNum.val() > 0) {
		let minQantVal = +th.closest(".CTW__quantity_block").find(".CTW__InputQuantity_js").attr("min");
		// console.log(minQantVal);
		if ($quantityNum.val() > minQantVal) {
			$quantityNum.val(+$quantityNum.val() - 1);
			// console.log($quantityNum);
		}

		progress();

	};
	function quantityPlus(th) {
		console.log("  eeeeeee ");

		$quantityNum = th.closest(".CTW__quantity_block").find(".CTW__InputQuantity_js");
		$quantityNum.val(+$quantityNum.val() + 1);


		progress();

	};
	// };
	// стилизация input type number
	// quantityProducts();




	$(".CTW__input_change_js").on("change keyup", function () {
		progress();
	});
	$(".CTW__input_typePay_js").on("change", function () {
		progress();
	});
	$("#inputCalcTelUser").on("change keyup", function () {
		progress();
	});








	let stepOk = 0;
	let persent = 0;
	let tovar_Quantity = 0;
	let tovar_price_one = 4990;
	let tovar_price_total = 0;
	let tovar_price_rassrochka = 0;
	// let phone = 79895297375;
	let phone = 77071642982;
	let hrefWhatsapp = "";
	let hrefVopros = "";

	function progress() {


		setTimeout(function () {


			tovar_Quantity = +($("#CTW__InputQuantity").val());
			tovar_price_total = tovar_Quantity * tovar_price_one;
			$("#CTW__tovar_price_total").text(tovar_price_total);


			// если рассрочка

			tovar_price_rassrochka = tovar_price_total / 3;

			tovar_price_rassrochka = tovar_price_rassrochka.toFixed(0);
			tovar_price_rassrochka = +tovar_price_rassrochka;

			$("#tovar_price_rassrochka").text(tovar_price_rassrochka);

			if ($(".CTW__input_typePay_js:checked").hasClass("CTW__input_typePay_rassrochka_js")) {
				$(".CTW__wrapText_rassrochka_js").removeClass("hide");
			} else {
				$(".CTW__wrapText_rassrochka_js").addClass("hide");
			};



			let ball_Name = 0;
			if ($("#CTW__input_name").val() != "") {
				ball_Name = 1;
			} else {
				ball_Name = 0;
			};
			console.log(ball_Name);


			let ball_Quantity = 0;
			if (+($("#CTW__InputQuantity").val()) != 0) {
				ball_Quantity = 1;
			} else {
				ball_Quantity = 0;
			};


			console.log($(".CTW__input_typePay_js:checked").val());

			let ball_typePay = 0;
			if ($(".CTW__input_typePay_js:checked").val() !== undefined || $(".CTW__input_typePay_js:checked").val() == "") {
				ball_typePay = 1;
			} else {
				ball_typePay = 0;
			};

			console.log(ball_typePay);


			console.log($("#inputCalcTelUser").val());

			let ball_Tel = 0;
			if (($("#inputCalcTelUser").val()) != "") {
				ball_Tel = 1;
			} else {
				ball_Tel = 0;
			};

			let ball_Adress = 0;
			if ($("#CTW__textarea_adress").val() != "") {
				ball_Adress = 1;
			} else {
				ball_Adress = 0;
			};


			stepOk = 0;
			stepOk = ball_Name + ball_Quantity + ball_typePay + ball_Tel + ball_Adress;

			console.log(stepOk);


			persent = stepOk * 20;

			console.log(persent);

			if (persent == 100) {
				persent = 99
			};


			$("#ProgressBarInner").css("width", persent + "%");
			$("#progressBarText").text(persent + "%");

		}, 100);


let mess = `*Стиральная машинка за ${tovar_price_one} тг*

*Способ оплаты: ${$(".CTW__input_typePay_js:checked").val()}*

*Итого к оплате: ${tovar_price_total} тг*

_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

Ф.И.О. : ${$("#CTW__input_name").val()}

Кол-во: ${tovar_Quantity} штуки

Телефон: +7${$("#inputCalcTelUser").val()}

Адрес доставки : ${$("#CTW__textarea_adress").val()}
`;


		let walink = "";

		walink = 'https://web.whatsapp.com/send';
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			walink = 'whatsapp://send';
		}


		mess = encodeURIComponent(mess);


		hrefWhatsapp = `${walink}?phone=${phone}&text=${mess}`;

		$("#CTW__btn_whatsapp").attr("href", hrefWhatsapp);





		let vopros = `
Здравствуйте 👋

Меня интересует мини-стиральная машинка, хочу задать вопрос
`;
		vopros = encodeURIComponent(vopros);
		hrefVopros = `${walink}?phone=${phone}&text=${vopros}`;
		$("#CTW__btn_vopros").attr("href", hrefVopros);


	};
	
	progress();










// Specify your actual API key here:
var API_KEY = 'INSERT_KEY_HERE';

// Specify the URL you want PageSpeed results for here:
var URL_TO_GET_RESULTS_FOR = 'https://www.suits.at';
var API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?';
var CHART_API_URL = 'https://chart.apis.google.com/chart?';

// Object that will hold the callbacks that process results from the
// PageSpeed Insights API.
var callbacks = {}

// Invokes the PageSpeed Insights API. The response will contain
// JavaScript that invokes our callback with the PageSpeed results.
function runPagespeed() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  var query = [
    'url=' + URL_TO_GET_RESULTS_FOR,
    'callback=runPagespeedCallbacks',
    'key=' + API_KEY,
  ].join('&');
  s.src = API_URL + query;
  document.head.insertBefore(s, null);
}

callbacks.displayPageSpeedScore = function(result) {
  var score = result.ruleGroups.SPEED.score;
  
  // Construct the query to send to the Google Chart Tools.
  var query = [
    'chtt=Page+Speed+score:+' + score,
    'chs=180x100',
    'cht=gom',
    'chd=t:' + score,
    'chxt=x,y',
    'chxl=0:|' + score,
  ].join('&');
  var i = document.createElement('img');
  i.src = CHART_API_URL + query;
  document.body.insertBefore(i, null);
};

// Our JSONP callback. Checks for errors, then invokes our callback handlers.
function runPagespeedCallbacks(result) {
  if (result.error) {
    var errors = result.error.errors;
    for (var i = 0, len = errors.length; i < len; ++i) {
      if (errors[i].reason == 'badRequest' && API_KEY == 'yourAPIKey') {
        alert('Please specify your Google API key in the API_KEY variable.');
      } else {
        // NOTE: your real production app should use a better
        // mechanism than alert() to communicate the error to the user.
        alert(errors[i].message);
      }
    }
    return;
  }

  // Dispatch to each function on the callbacks object.
  for (var fn in callbacks) {
    var f = callbacks[fn];
    if (typeof f == 'function') {
      callbacks[fn](result);
    }
  }
}

// Invoke the callback that fetches results. Async here so we're sure
// to discover any callbacks registered below, but this can be
// synchronous in your code.
setTimeout(runPagespeed, 0);

callbacks.displayTopPageSpeedSuggestions = function(result) {
  var results = [];
  var ruleResults = result.formattedResults.ruleResults;
  for (var i in ruleResults) {
    var ruleResult = ruleResults[i];
    // Don't display lower-impact suggestions.
    if (ruleResult.ruleImpact < 3.0) continue;
    results.push({name: ruleResult.localizedRuleName,
                  impact: ruleResult.ruleImpact});
  }
  results.sort(sortByImpact);
  var ul = document.createElement('ul');
  for (var i = 0, len = results.length; i < len; ++i) {
    var r = document.createElement('li');
    r.innerHTML = results[i].name;
    ul.insertBefore(r, null);
  }
  if (ul.hasChildNodes()) {
    document.body.insertBefore(ul, null);
  } else {
    var div = document.createElement('div');
    div.innerHTML = 'No high impact suggestions. Good job!';
    document.body.insertBefore(div, null);
  }
};

// Helper function that sorts results in order of impact.
function sortByImpact(a, b) { return b.impact - a.impact; }

var RESOURCE_TYPE_INFO = [
  {label: 'JavaScript', field: 'javascriptResponseBytes', color: 'e2192c'},
  {label: 'Images', field: 'imageResponseBytes', color: 'f3ed4a'},
  {label: 'CSS', field: 'cssResponseBytes', color: 'ff7008'},
  {label: 'HTML', field: 'htmlResponseBytes', color: '43c121'},
  {label: 'Flash', field: 'flashResponseBytes', color: 'f8ce44'},
  {label: 'Text', field: 'textResponseBytes', color: 'ad6bc5'},
  {label: 'Other', field: 'otherResponseBytes', color: '1051e8'},
];

callbacks.displayResourceSizeBreakdown = function(result) {
  var stats = result.pageStats;
  var labels = [];
  var data = [];
  var colors = [];
  var totalBytes = 0;
  var largestSingleCategory = 0;
  for (var i = 0, len = RESOURCE_TYPE_INFO.length; i < len; ++i) {
    var label = RESOURCE_TYPE_INFO[i].label;
    var field = RESOURCE_TYPE_INFO[i].field;
    var color = RESOURCE_TYPE_INFO[i].color;
    if (field in stats) {
      var val = Number(stats[field]);
      totalBytes += val;
      if (val > largestSingleCategory) largestSingleCategory = val;
      labels.push(label);
      data.push(val);
      colors.push(color);
    }
  }
  // Construct the query to send to the Google Chart Tools.
  var query = [
    'chs=300x140',
    'cht=p3',
    'chts=' + ['000000', 16].join(','),
    'chco=' + colors.join('|'),
    'chd=t:' + data.join(','),
    'chdl=' + labels.join('|'),
    'chdls=000000,14',
    'chp=1.6',
    'chds=0,' + largestSingleCategory,
  ].join('&');
  var i = document.createElement('img');
  i.src = 'https://chart.apis.google.com/chart?' + query;
  document.body.insertBefore(i, null);
};










	



}); //end function