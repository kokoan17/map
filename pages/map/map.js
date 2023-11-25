let availableKeywords = [
    "Курский вокзал",
    "НИТУ МИСИС",
    "Метро Таганская",
    "Ул. Земляной Вал",
    "Ул. Каменщики М.",
    "Пр-т Гагарина",
    "13ая Городская Больница",
    "Парковка МГУ",
    "Сокольники",
    "Парк Горького",
    "Метро Люблино",
    "Парковка МЭИ"
];

const resultBox = document.querySelector(".box__result");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
        result = availableKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });

        // console.log(result);
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
            5: "занято",
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
        },
    },
]

console.log(parkingDots[0].parking.keys().length);

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

            const parkingTitle = document.querySelector(".active__title");
            parkingTitle.innerHTML = parkingDots[i].name;

            const parkingAdress = document.querySelector(".active__adress");
            parkingAdress.innerHTML = parkingDots[i].adress;

        })

        map.geoObjects.add(placemark);
    }

    console.log(map.geoObjects);
}

const bottom = document.querySelector(".search__bottom");
const arrow = document.querySelector(".bottom__arrow i");

const numOfAvailable = document.querySelector(".numOfAvailable");
const wordOfAvailable = document.querySelector(".wordOfAvailable");
const load = document.querySelector(".load");

function numAndWord() {
    let len = parkingDots.length;
    numOfAvailable.innerHTML = len;
    let numm = numOfAvailable.innerHTML;
    let need = numm[numm.length - 1];
    if (need === "1") {
        wordOfAvailable.innerHTML = "Парковка";
    } else if (need <= "4") {
        wordOfAvailable.innerHTML = "Парковки";
    } else {
        wordOfAvailable.innerHTML = "Парковок";
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