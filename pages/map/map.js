const parkingTitle = document.querySelector(".active__title");
const parkingAdress = document.querySelector(".active__adress");
const parkingPlaces = document.querySelector(".active__places");

const bottom = document.querySelector(".search__bottom");
const resultBox = document.querySelector(".box__result");
const inputBox = document.getElementById("input-box");

const booking = document.querySelector(".booking");
const bookingTitle = document.querySelector(".booking__title");
const bookingAdress = document.querySelector(".booking__adress");

const bookingCloseBtn = document.querySelector(".top__icon");
bookingCloseBtn.addEventListener("click", function () {
    booking.classList.toggle("active");
})

inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
        result = availableKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }

    display(result);

    if (!result.length) {
        resultBox.innerHTML = "";
    }
}

function display(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    resultBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultBox.innerHTML = "";
}

const bottomActive = document.querySelector(".bottom__active");
const bottomBtn = document.querySelector(".bottom__btn");

bottomBtn.addEventListener("click", function () {
    booking.classList.toggle("active");
})

const searchBtn = document.querySelector(".search__btn");

searchBtn.addEventListener("click", function () {
    console.log(inputBox.value);
    bottom.classList.toggle("active");
    bottomActive.classList.toggle("active");
    bottomBtn.classList.toggle("active");
    for (let i = 0; i < parkingDots.length; i++) {
        if (inputBox.value === parkingDots[i].name) {
            parkingTitle.innerHTML = parkingDots[i].name;
            parkingAdress.innerHTML = parkingDots[i].adress;

            let count = 0;
            for (key in parkingDots[i].parking) {
                count++;
            }

            parkingPlaces.innerHTML = count;
        }

        bookingTitle.innerHTML = parkingDots[i].name;
        bookingAdress.innerHTML = parkingDots[i].adress;
    }
})

ymaps.ready(init);

let Moscow = [55.7522, 37.6156];

const parkingDots = [
    {
        lat: 55.7364,
        lon: 37.6535,
        name: "Парковка на районе",
        adress: "Ул. Малые Каменщики",
        price: 200,
        parking: {
            1: "занято",
            2: "занято",
            3: "свободно",
            4: "занято",
            5: "свободно",
            6: "свободно",
            7: "свободно",
            8: "свободно",
            9: "занято",
            10: "свободно",
            11: "занято",
            12: "свободно",
        },
    },
    {
        lat: 55.7419,
        lon: 37.6098,
        name: "Парковка у лофта",
        adress: "Ул. Новодмитровская",
        price: 300,
        parking: {
            1: "свободно",
            2: "занято",
            3: "свободно",
            4: "занято",
            5: "свободно",
            6: "занято",
            7: "свободно",
            8: "занято",
            9: "свободно",
            10: "занято",
            11: "свободно",
            12: "занято",
        },
    },
    {
        lat: 55.7429,
        lon: 37.6560,
        name: "Парковка у зала",
        adress: "Ул. Таганская",
        price: 250,
        parking: {
            1: "занято",
            2: "занято",
            3: "занято",
            4: "занято",
            5: "свободно",
            6: "занято",
            7: "занято",
            8: "занято",
            9: "занято",
            10: "свободно",
            11: "свободно",
            12: "занято",
        },
    },
    {
        lat: 55.7559,
        lon: 37.6098,
        name: "Парковка у музея МГУ",
        adress: "Ул. Малые Каменщики",
        price: 400,
        parking: {
            1: "занято",
            2: "занято",
            3: "занято",
            4: "занято",
            5: "свободно",
            6: "занято",
            7: "занято",
            8: "занято",
            9: "занято",
            10: "свободно",
            11: "свободно",
            12: "занято",
        },
    },
]

let availableKeywords = [];

for (let i = 0; i < parkingDots.length; i++) {
    availableKeywords.push(parkingDots[i].name)
};

console.log(availableKeywords);

console.log(parkingDots[0].parking);

console.log(parkingDots.length);

function init() {

    const map = new ymaps.Map("map", {
        center: Moscow,
        zoom: 12,
    });

    map.controls.remove("searchControl");
    map.controls.remove("trafficControl");
    map.controls.remove("fullscreenControl");
    map.controls.remove("zoomControl")
    map.controls.remove("typeSelector");
    map.controls.remove("rulerControl");
    map.controls.remove("scrollZoom");

    for (let i = 0; i < parkingDots.length; i++) {
        console.log(parkingDots[i].name);
        let placemark = new ymaps.Placemark([parkingDots[i].lat, parkingDots[i].lon], {
            hintContent: parkingDots[i].name,
        },
            {
                iconLayout: "default#image",
                iconImageHref: "https://cdn-icons-png.flaticon.com/128/1783/1783356.png",
                iconImageSize: [25, 25],
                iconImageOffset: [0, 0],
            });

        placemark.events.add("click", function () {
            bottom.classList.toggle("active");
            bottomActive.classList.toggle("active");
            bottomBtn.classList.toggle("active");

            parkingTitle.innerHTML = parkingDots[i].name;
            parkingAdress.innerHTML = parkingDots[i].adress;

            let count = 0;
            for (key in parkingDots[i].parking) {
                count++;
            }

            parkingPlaces.innerHTML = count;

            bookingTitle.innerHTML = parkingDots[i].name;
            bookingAdress.innerHTML = parkingDots[i].adress;
        })

        map.geoObjects.add(placemark);
    }

    console.log(map.geoObjects);
}

const numOfAvailable = document.querySelector(".numOfAvailable");
const wordOfAvailable = document.querySelector(".wordOfAvailable");
const load = document.querySelector(".load");

function numAndWord() {
    let len = parkingDots.length;
    numOfAvailable.innerHTML = len;
    let numm = numOfAvailable.innerHTML;
    let need = numm[numm.length - 1];
    if (need === "1") {
        wordOfAvailable.innerHTML = "парковка";
    } else if (need <= "4") {
        wordOfAvailable.innerHTML = "парковки";
    } else {
        wordOfAvailable.innerHTML = "парковок";
    }

    if (len <= 10) {
        load.innerHTML = "Низкая";
    } else if (len <= 25) {
        load.innerHTML = "Средняя";
    } else {
        load.innerHTML = "Высокая";
    }
}

numAndWord();