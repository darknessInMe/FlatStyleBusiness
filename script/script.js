const SCREEN = window.matchMedia("(max-width: 768px)");
const ARRAY_OF_PHOTOS = [
	"images/banner/Sea1.jpg",
	"images/banner/Sea2.jpg",
	"images/banner/Sea3.jpg",
	"images/banner/Sea4.jpg",
	"images/banner/Sea5.jpg",
];

window.onload = function () {
	SCREEN.addListener(buttonTransform);
	buttonTransform(SCREEN);
	if (!SCREEN.matches) {
		preloadImages(...ARRAY_OF_PHOTOS);
		startSlider();
	}
};

function preloadImages(...bgs) {
	bgs.forEach((image, index) => {
		image = document.createElement("img");
		image.src = bgs[index];
	});
}

document.querySelector(".menu-burger").onclick = function () {
	this.classList.toggle("_change");
	this.nextElementSibling.classList.toggle("_show");
};

const BANNER = document.querySelector(".banner");
const CONFIRM_BTN = document.querySelector("[data-find=confirm]");
const QUOTE_BLOCK = document.querySelector(".quote-block");
const HIDDEN_NAME = document.querySelector("#hidden-name");

let toggleSlider = true;

function buttonTransform(SCREEN) {
	if (SCREEN.matches) {
		CONFIRM_BTN.textContent = "Confirm";
		CONFIRM_BTN.classList.remove("confirm");
		CONFIRM_BTN.classList.add("confirm-text-style");

		QUOTE_BLOCK.style.flexDirection = "column";
		HIDDEN_NAME.textContent = "dhavan";
		HIDDEN_NAME.classList.add("_name-modified");

		toggleSlider = false;
	} else {
		CONFIRM_BTN.textContent = "";
		CONFIRM_BTN.classList.remove("confirm-text-style");
		CONFIRM_BTN.classList.add("confirm");

		QUOTE_BLOCK.style.flexDirection = "row";
		HIDDEN_NAME.textContent = "";
		HIDDEN_NAME.classList.remove("_name-modified");

		toggleSlider = true;
		startSlider();
	}
}

function startSlider() {
	let index = 1;

	let sliderStatus = document.querySelectorAll(".slider-move");
	sliderStatus[0].classList.add("_selected");

	const SLIDER_INTERVAL = setInterval(function () {
		if (!toggleSlider) {
			BANNER.style.backgroundImage = `url(images/banner/sea_mobile.jpg)`;
			clearInterval(SLIDER_INTERVAL);
			dropSliderStatus(sliderStatus);
			index = 0;
		} else {
			if (index == ARRAY_OF_PHOTOS.length) {
				index = 0;
			}
			dropSliderStatus(sliderStatus);
			sliderStatus[index].classList.add("_selected");

			BANNER.style.backgroundImage = `url(${ARRAY_OF_PHOTOS[index]})`;

			index += 1;
		}
	}, 2500);
}

function dropSliderStatus(slider) {
	slider.forEach((item) => {
		item.classList.remove("_selected");
	});
}

(function lazyLoad() {
	let lazyImages = document.querySelectorAll("[data-load]");

	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};
	const observer = new IntersectionObserver(handleLoad, options);

	lazyImages.forEach((img) => {
		observer.observe(img);
	});

	function handleLoad(myImg) {
		myImg.forEach((myImgSingle) => {
			if (myImgSingle.isIntersecting) {
				loadImage(myImgSingle.target);
			}
		});
	}

	function loadImage(element) {
		if (element.tagName == "SECTION") {
			element.style.backgroundImage = `url(${element.getAttribute(
				"data-load"
			)})`;
		} else {
			element.src = element.getAttribute("data-load");
		}
	}
})();
