function Game1(tortenetIndex) {
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
    const szoveg = szovegElement.textContent;
    szovegElement.textContent = ""; // Ürítjük a szöveget

    let index = 0;

    function typeCharacter() {
        if (index < szoveg.length) {
            szovegElement.textContent += szoveg.charAt(index);
            index++;
            setTimeout(typeCharacter, 10); // 10 ms késleltetés
        }else {
            // Ha vége a szöveg írásának, megjelenítjük a választ
            const valaszDiv = currentTortenet.querySelector('.valasz');
            valaszDiv.classList.remove('d-none');
        }
    }

    typeCharacter();
}
