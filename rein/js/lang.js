var responsive = $.responsive();
var w = $(window);

var sliders = {};

function sliders_startAuto() {
	$.each(sliders, function (i, val) {
		if (val !== null) {
			val.startAuto();
		}
	});
}

function sliders_stopAuto() {
	$.each(sliders, function (i, val) {
		if (val !== null) {
			val.stopAuto();
		}
	});
}

jQuery(function ($) {
	"use strict";

	// ページ内リンク
	$(".innerLink").pageScroller();

	// 横並びの要素の高さを揃える
	var matchHeight = $(".matchHeight");
	matchHeight.each(function () {
		$(this).children().matchHeight();
	});

	// ヘッダー
	var header = $("header");
	var timer;
	w.scroll(function () {
		if (!header.hasClass("scroll")) {
			header.addClass("scroll");
		}
		clearTimeout(timer);
		timer = setTimeout(function () {
			header.removeClass("scroll");
		}, 1000);
	});

	var gnavi = {
		init: function () {
			$('#gnavi > ul > li > a').mouseenter(function () {
				$(this).parents("li").addClass('on_hover');
				var menu_h = $(this).parents("li").children(".popup").height();
				var win_h = $(window).height() - 100;
				if (menu_h > win_h) {
					$(this).parents("li").children(".popup").css("height", win_h);
				}
				sliders_stopAuto();
			});
			$('#gnavi > ul > li').mouseleave(function () {
				var li = $(this);
				if (li.hasClass('on_hover')) {
					li.removeClass('on_hover');
					sliders_startAuto();
				}
			});
			// $('#gnavi .popup .inner > ul > li > ul > li > ul').each(function(){
			// 	var left = $(this).parent().find("span").outerWidth() + 10 + 10;
			// 	$(this).css("left", left);
			// });
			$(".closePopup").on("click", function () {
				$(this).parents('li').removeClass('on_hover');
				sliders_startAuto();
				return false;
			});
		},
		exit: function () {
			$('#gnavi > ul > li > a').off("mouseenter");
			$('#gnavi > ul > li').off("mouseleave");
			$(".closePopup").off("click");
		}
	};

	responsive.execute(
		1200,
		function () {
			gnavi.init();
			footer_banners.initPCw1200();
		},
		function () {
			responsive.execute(
				1024,
				function () {
					gnavi.init();
				},
				function () {
					menu.init();
					responsive.execute(
						769,
						function () {
							footer_banners.initPCw769();
						},
						function () {
							footer_banners.initSP();
							replaceImage.SP();
						}
					);
				}
			);
		}
	);

	responsive.addFunction(
		1024,
		function () {
			gnavi.init();
			menu.exit();
		},
		function () {
			gnavi.exit();
			menu.init();
		}
	);
});
