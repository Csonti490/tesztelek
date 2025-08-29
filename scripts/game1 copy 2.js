
var nev = faj = kaszt = kepesseg = targy="-Jelenleg nincsen-";
var penzed = 0;
var regitest = true;
function Game1(tortenetIndex) {

    if(tortenetIndex === 'theend'){
        const startDiv = document.getElementById("start");
        startDiv.classList.remove("d-none");
        const tortenetek = document.querySelectorAll('.tortenet');
        tortenetek.forEach(t => t.classList.add('d-none'));
    }else{
        const startDiv = document.getElementById("start");
        startDiv.classList.add("d-none");
    }

    // Először rejtjük el az összes történetet
    const tortenetek = document.querySelectorAll('.tortenet');
    tortenetek.forEach(t => t.classList.add('d-none'));

    // Megjelenítjük a kiválasztott történetet
    const currentTortenet = tortenetek[tortenetIndex];
    currentTortenet.classList.remove('d-none');
    const currentValasz = document.querySelectorAll('.valasz');
    currentValasz.forEach(t => t.classList.add('d-none'));

    // Kiválasztjuk a szöveg elemet, és megjelenítjük
    const szovegElement = currentTortenet.querySelector('.szoveg');
    szovegElement.classList.remove('d-none');
    const szoveg = szovegElement.innerHTML;//*
    szovegElement.innerHTML = ""; // Ürítjük a szöveget//*

    let index = 0;

    function typeCharacter() {
        if (index < szoveg.length) {
            // Ha a következő karakter egy sortörés, kezeljük azt
            if (szoveg.charAt(index) === '<' && szoveg.substr(index, 4) === '<br>') {
                szovegElement.innerHTML += '<br>'; // Sortörést adunk hozzá
                index += 4; // Ugrás a következő karakterre
            } else {
                szovegElement.innerHTML += szoveg.charAt(index); // Karakter hozzáadása
                index++;
            }
            setTimeout(typeCharacter, 1); // 10 ms késleltetés
        }else {
            // Ha vége a szöveg írásának, megjelenítjük a választ
            const valaszDiv = currentTortenet.querySelector('.valasz');
            valaszDiv.classList.remove('d-none');
        }
    }

    typeCharacter();
}

function ChangeValtozo(m){
    nev = m = document.getElementById(m).value;
    console.log(nev);
}
