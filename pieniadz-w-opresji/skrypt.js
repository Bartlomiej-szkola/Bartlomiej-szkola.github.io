// KONFIGURACJA I DEKLARACJE GLOBALNE
function uruchomGre(){
  const szerokoscEkranu = window.innerWidth; 
  const wysokoscEkranu = window.innerHeight; 
  console.log(`Rozmiar ekranu: ${szerokoscEkranu}x${wysokoscEkranu}`);
  
  let punkty = 0; 
  
  // KLASY OBIEKTÓW
  class Obiekt {
  constructor(x, y, image, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }
  
  rysuj() {
    let elementHtml = `<img src="${this.image}">`;
    this.htmlElement = $(elementHtml);
  
    this.htmlElement.css({
        position: "absolute",
        left: this.x,
        top: this.y,
        width: this.width,
        height: this.height,
    });
    $("body").append(this.htmlElement);
  }
  
  wLewo(distance) {
    this.x -= distance;
    this.htmlElement.css({ left: this.x, top: this.y });
  }
  
  wPrawo(distance) {
    this.x += distance;
    this.htmlElement.css({ left: this.x, top: this.y });
  }
  
  wGore(distance) {
    this.y -= distance;
    this.htmlElement.css({ left: this.x, top: this.y });
  }
  
  wDol(distance) {
    this.y += distance;
    this.htmlElement.css({ left: this.x, top: this.y });
  }
  
  usun() {
    $(this.htmlElement).remove();
  }
  }
  
  // Klasa dla spadających worków
  class Worek extends Obiekt {
  constructor(x, y) {
    super(x, y, "worek.png", 128, 128); 
  }
  }
  
  // Klasa dla spadających policjantów
  class Policjant extends Obiekt {
  constructor(x, y) {
    super(x, y, "policeman.png", 128, 128);
  }
  }
  
  // Klasa dla gracza
  class Gracz extends Obiekt {
  constructor(x, y) {
    super(x, y, "postac.png", 128, 128); 
  }
  }
  
  // LOSOWANIE LICZB
  function losuj(min, max) {
  return Math.round(Math.random() * (max - min) + min);
  }
  
  function losowaLiczba(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // FUNKCJA UPUSZCZAJĄCA WOREK
  function upuscWorek() {
  const worek = new Worek(losuj(0, szerokoscEkranu - 128), 0);
  worek.rysuj();
  const predkosc = losuj(850, 10000);
  
  const intervalSpadanie = setInterval(() => {
    worek.wDol(1);
  
    if (worek.y + worek.height > wysokoscEkranu) {
        clearInterval(intervalSpadanie);
        worek.usun();
    }
  
    if (czyDotknieto(worek)) {
        clearInterval(intervalSpadanie);
        worek.usun();
        punkty++;
  
        const wynik = document.getElementById("wynik");
        wynik.innerHTML = punkty < 10 ? "0" + punkty : punkty;
    }
  }, predkosc / 10000);
  }
  
  // FUNKCJA UPUSZCZAJĄCA POLICJANTA
  function upuscPolicjanta() {
  if (losowaLiczba(1, 2) !== 2) return;
  
  const policjant = new Policjant(losowaLiczba(0, szerokoscEkranu - 128), 0);
  policjant.rysuj();
  const predkosc = losuj(850, 10000);
  
  const intervalSpadanie = setInterval(() => {
    policjant.wDol(1); 
  
    if (policjant.y + policjant.height > wysokoscEkranu) {
        clearInterval(intervalSpadanie);
        policjant.usun();
    }
  
    if (czyDotknieto(policjant)) {
        clearInterval(intervalSpadanie);
        policjant.usun();
        alert("KONIEC GRY. Złapał cie policjant :(");
        window.location.reload();
        
    }
  }, predkosc/10000);
  }
  
  // SPRAWDZANIE KOLIZJI
  function czyDotknieto(obiekt) {
  const margines = 10; 
  return (
    obiekt.x + margines + (obiekt.width - 2.5 * margines) >= gracz.x + margines &&
    gracz.x + margines + (gracz.width - 2 * margines) >= obiekt.x + margines &&
    obiekt.y + margines + (obiekt.height - 2.5 * margines) >= gracz.y + margines &&
    gracz.y + margines + (gracz.height - 2 * margines) >= obiekt.y + margines
  );
  }
  
  // RUCH GRACZA
  let kierunki = { left: false, right: false };
  function ruchGracza() {
    const distance = 5; // Dystans przesuwania
  
    if (kierunki.left && !(gracz.x - distance < 0)) {
      gracz.wLewo(distance);
    }
  
    if (kierunki.right && !(gracz.x + distance > szerokoscEkranu - gracz.width)) {
      gracz.wPrawo(distance);
    }
  
    requestAnimationFrame(ruchGracza);
  }
  ruchGracza();
  
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      kierunki.right = true;
    } else if (event.key === "ArrowLeft") {
      kierunki.left = true;
    }
  });
  
  window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
      kierunki.right = false;
    } else if (event.key === "ArrowLeft") {
      kierunki.left = false;
    }
  });
  
  // TWORZENIE GRACZA
  const gracz = new Gracz(0, 0);
  gracz.x = (szerokoscEkranu - gracz.width) / 2; 
  gracz.y = wysokoscEkranu - gracz.height; 
  gracz.rysuj();
  
  // INTERWAŁY URUCHAMIAJĄCE MECHANIKĘ GRY
  const intervalUpuscWorek = setInterval(upuscWorek, 1500); 
  const intervalUpuscPolicjanta = setInterval(upuscPolicjanta, 1500);
  
  // TWORZENIE ODLICZANIE
  function odliczanie() {
  var sekundy = 60; 
  
  function tykaj() {
    var licznik = document.getElementById("licznik");
    sekundy--;
    licznik.innerHTML = (sekundy < 10 ? "0" : "") + String(sekundy) + "S"; 
  
    if (sekundy > 0) {
        setTimeout(tykaj, 1000); 
    } else {
        restart();
    }
  }
  
  tykaj();
  }
  odliczanie();   
  
  function restart(){
  alert("Koniec gry. Twoje punkty: "+punkty); 
  window.location.reload();
  }
  }
  
  uruchomGre();
  