const BASE_URL = "https://ajsteinhauser.github.io/portfolio/groomsmen/";

const groomMen = {
	mark: {
		image: "Mark",
		name: "Mark Schisler",
		text:
			"Mark, you've been my best friend for many years now. I have grown and learned so much through our friendship. You have been a huge blessing on my life and it would mean a lot to me, if you would do me the honor, of being my best man"
	},
	sam: {
		image: "Sam",
		name: "Sam Steinhauser",
		text: "Love you bro"
	},
	max: {
		image: "Max",
		name: "Max Steinhauser",
		text: "Love you bro"
	},
	rigdon: {
		image: "Rigdon",
		name: "Rigdon Steinhauser",
		text: "Love you bro"
	},
	jordan: {
		image: "Jordan",
		name: "Jordan Gertz",
		text: "Love you bro"
	},
	ben: {
		image: "Ben",
		name: "Ben Biesecker",
		text: `Our friendship has not always been deep, but I had greatly appreciated it over the years even when it was just “Ben the witty guy at b-stud desperate to get married”. At this point, it’s pretty safe to say I know your character and for grooms-men, I want, friends in the gospel, who will be actively praying for my marriage with Rachel.
<br>
<br>
I have 3 brothers who are at different stages of spiritual immaturity, cultural Christianity, or living completely apart from God. Part of the reason I have picked the non-family groomsmen is to give my siblings tangible examples of what it could look like to be young men earnestly pursuing God. It is first my prayer and then my hope that through the rhythms of this engagement season and eventual wedding, you will be that model and a witness by the nature of your forever-changed heart. 
<br>
<br>
I also have just always liked your spirit and thoroughly enjoyed the time I’m around you, so not a hard pick. 
<br>
<br>
Love you : )
<br>
<br>
—AJ`
	},
	william: {
		image: "William",
		name: "William Gaston",
		text: "Love you bro"
	},
	chase: {
		image: "Chase",
		name: "Chase Coleman",
		text: "Love you bro"
	}
};

const setPageGroomsMen = (man) => {
	const imageSrc = `${BASE_URL}${groomMen[man].image}.png`;
	document.getElementById("full-name").innerHTML = groomMen[man].name;
	document.getElementById("groomsman-picture").src = imageSrc;
	document.getElementById("personal-note").innerHTML = groomMen[man].text;
	document.getElementById("hey").innerHTML = `Hey ${groomMen[man].image} 👋`;
	if (man === "mark" || man === "max") {
		document.getElementById(
			"the-ask"
		).innerHTML = `If you would be my (co)Best man!!!`;
	}
};

AOS.init({
	startEvent: "load",
	disableMutationObserver: false,
	duration: 1200
});
AOS.refresh(true);

var swiper = new Swiper(".swiper", {
	effect: "cards",
	grabCursor: true,
	initialSlide: 2,
	speed: 500,
	loop: true,
	rotate: true,
	mousewheel: {
		invert: false
	}
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
setPageGroomsMen(urlParams.get("name") || "max");