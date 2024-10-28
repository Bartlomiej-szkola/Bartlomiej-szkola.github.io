const h1Liczba = document.getElementById('h1Liczba')
let numer = 0
const start = Date.now()
let ostatniaLiczba = Date.now()
let czyNalezyKliknac = false
let czyKlikniętoDzika = false
let kliknieciaCzasReakcji = {}

function kolejnyNumer(){
    if(czyNalezyKliknac && !czyKlikniętoDzika){
        alert("Nie kliknięto dzika")
        clearInterval(numerInterval)
        generujTabeleCzasowReakcji()
    }
    else if(numer>9){
        clearInterval(numerInterval)
        numerInterval = setInterval(kolejnyNumer, 1250)
    }
    else if(numer>19){
        clearInterval(numerInterval)
        numerInterval = setInterval(kolejnyNumer, 1000)
    }
    else if(numer>30){
        clearInterval(numerInterval)
        numerInterval = setInterval(kolejnyNumer, 900)
    }
    else if(numer>50){
        clearInterval(numerInterval)
        numerInterval = setInterval(kolejnyNumer, 850)

        losowanie(10, 1)
    }
    else if(numer>65){
        clearInterval(numerInterval)
        numerInterval = setInterval(kolejnyNumer, 800)

        losowanie(8, 2)
    }
    else if(numer>80){
        clearInterval(numerInterval)
        numerInterval = setInterval(kolejnyNumer, 750)

        losowanie(7, 3)
    }

    numer++
    ostatniaLiczba = Date.now();
    czyKlikniętoDzika = false;
    czyNalezyKliknac = czyMa7(numer)
    h1Liczba.innerHTML = numer
}
let numerInterval = setInterval(kolejnyNumer, 1500)

function dzik(){
    const audio = new Audio('dzik1.wav');
    audio.play();
    if(czyNalezyKliknac && !czyKlikniętoDzika){
        let czasReakcjiLiczby = czasReakcji()
        kliknieciaCzasReakcji[numer] = czasReakcjiLiczby
        console.log("Liczba " + numer + " czas reakcji: " + czasReakcjiLiczby)
        czyKlikniętoDzika = true
    }
    else if(czyKlikniętoDzika){
        console.log("Powtórnie kliknieto dzika dla liczby: " + numer)
    }
    else{
        alert("W tym numerze nie nalezalo kliknac dzika")
        clearInterval(numerInterval)
        generujTabeleCzasowReakcji()
    }
}

function playAudio(url) {
    new Audio(url).play();
  }

function czyMa7(numer){
    if(numer%7 == 0 || numer.toString().split("").includes('7')){
        return true
    }
    return false
}

function czasReakcji(){
    let delta = Date.now() - ostatniaLiczba;
    return delta
}


// Generowanie tabeli na końcu gry
const tabela = document.getElementById("tabelaCzasyReakcji")
let czyWygenerowano = false
function generujTabeleCzasowReakcji(){
    if(czyWygenerowano) return
    let iloscCzasow = 0
    let sumaCzasow = 0
    for (let numer in kliknieciaCzasReakcji) {
        if (kliknieciaCzasReakcji.hasOwnProperty(numer)) {
            iloscCzasow++
            sumaCzasow+=kliknieciaCzasReakcji[numer]

            console.log(`${numer}: ${kliknieciaCzasReakcji[numer]}`);

            let tr = document.createElement("tr")
            let poleNumer = document.createElement("td")
            poleNumer.innerText = numer

            let poleCzasReakcji = document.createElement("td")
            poleCzasReakcji.innerText = kliknieciaCzasReakcji[numer]
            
            tr.appendChild(poleNumer)
            tr.appendChild(poleCzasReakcji)
            tabela.appendChild(tr)
        }
    }
    
    let srednia = sumaCzasow / iloscCzasow
    let tr = document.createElement("tr")
    let poleSrednia = document.createElement("td")
    poleSrednia.id = "srednia"
    poleSrednia.innerText = srednia
    tr.appendChild(poleSrednia)
    tabela.appendChild(tr)
    czyWygenerowano = true
}

function losowanie(zakres, zakresPominiecia){
    let los = Math.floor(Math.random()*zakres)
    let los2 = Math.floor(Math.random()*zakres)
    console.log(los, los2)
    if(los==los2){
        let pominiecie = Math.floor(Math.random()*zakresPominiecia) + 1
        numer += pominiecie
        console.log("Pominieto numer o " + pominiecie)
    }
}

// setInterval(function() {
//     var delta = Date.now() - start;

//     console.log(Math.floor(delta / 10));

//     console.log(new Date().toUTCString());
// }, 10); 