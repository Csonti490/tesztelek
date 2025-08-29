var karakter = {
    nev: '-Jelenleg nincsen-', 
    fajod: '-Jelenleg nincsen-',
    kasztod: '-Jelenleg nincsen-',
    kepesseged: '-Jelenleg nincsen-',
    targyad: '-Jelenleg nincsen-',
    regitestedez: true
};
var penzed = 0;
var regitest = true;

fajok = ["Ember","Elf", "Törpe", "Ork"];
kasztok = ["Harcos", "Íjász", "Mágus", "Alkimista", "Idéző"];
//kardok 3, íjak 3, pálcák 3, varázslatok 3, segítők 3
fegyverektipus = ["Fakard","Vaskard","Excalibur","Íj","Erősített íj","Death's Kiss","Fapálca","Vaspálca","Gandalf botja","Erőnövelés","Újraéledés képessége","Belzebub ereje","3db goblin","2db Gólem","Smaug a sárkány"];
fegyverar = [5,20,100];
haromproba = ["Sárkánytojás", "Királynő gyűrűje","Unikornis szarv"];


var Tortenet = {
    stry: [
        {//1 - Bevezető
            rajz: ` ____________________
/                    \\
|      Lurolona      |
|       Village      |
\\____________________/
         !  !
         !  !
         !  !
         !  !
         \\__/`,
            szoveg: '[Angyal] Oh... úgy látom Truck-kun egy újabb életnek akart véget vetni. Nem hiszem el ezt... nah mindegy. Szóval... Üdvözöllek a másvilág kapujában! Lehetőséged van rá, hogy folytasd az életedet, de egy másik világban. Itt van előtted egy kapu, ami egy számodra ismeretlen világba vezet.<br><br>Szeretnél reinkarnálódni?',
            valasz: '<button onclick="Haladas(3)" class="d-block mx-auto p-2">Igen</button><button onclick="Haladas(2)" class="d-block mx-auto p-2">Nem</button>'
        },
        {//2 - Game Over
            rajz: `             .,-:;//;:=,
         . :H@@@MM@M#H/.,+%;,
      ,/X+ +M@@M@MM%=,-%HMMM@X/,
     -+@MM; $M@@MH+-,;XMMMM@MMMM@+-
    ;@M@@M- XM@X;. -+XXXXXHHH@M@M#@/.
  ,%MM@@MH ,@%=            .---=-=:=,.
  -@#@@@MX .,              -%HX$$%%%+;
 =-./@M@M$                  .;@MMMM@MM:
 X@/ -$MM/                    .+MM@@@M$
,@M@H: :@:                    . -X#@@@@-
,@@@MMX, .                    /H- ;@M@M=
.H@@@@M@+,                    %MM+..%#$.
 /MMMM@MMH/.                  XM@MH; -;
  /%+%$XHH@$=              , .H@@@@MX,
   .=--------.           -%H.,@@@@@MX,
   .%MM@@@HHHXX$$$%+- .:$MMX -M@@MM%.
     =XMMM@MM@MM#H;,-+HMM@M+ /MMMX=
       =%@M@M#@$-.=$@MM@@@M; %M%=
         ,:+$+-,/H#MMMMMMM@- -,
               =++%%%%+/:-.`,
            szoveg: '',
            valasz: '<h3 class="text-center mb-5">[-] Game Over [-]</h3><button onclick="TheEnd(true)" class="d-block mx-auto p-2">Vissza a kezdéshez</button>'
        },
        {//3 - Új név
            rajz: ``,
            szoveg: '[Angyal] Ezzel a döntéssel már rá is lépsz az új történeted ösvényére. De mielőtt átlépnél abba a világba, előtte alkossuk meg a karakteredet. Az új élethez új név is dukál.',
            valasz: 'Írd be az új nevedet: <input type="text" id="nev"><button onclick="Ment(),Haladas(4)" class="d-block mx-auto p-2">Tovább</button>'
        },
        {//4 - Biztos?
            rajz: ``,
            szoveg: '[Angyal] Biztos a(z) '+karakter.nev+' nevet akarod használni? Nemár...',
            valasz: ''
        },
        {//?
            rajz: ``,
            szoveg: '',
            valasz: ''
        }
    ]
}

function TheEnd(ertek){
    if(ertek===true){
        const t = document.getElementsByClassName("t")[0];
        const sz = document.getElementsByClassName("sz")[0];
        const v = document.getElementsByClassName("v")[0];
        t.classList.add("d-none");
        sz.classList.add("d-none");
        v.classList.add("d-none");
        const strt = document.getElementById("start");
        strt.classList.remove("d-none");
    }else{
        const strt = document.getElementById("start");
        strt.classList.add("d-none");
    }
}

function Haladas(n){
    localStorage.setItem('result', n);

    const r = document.getElementsByClassName("r")[0];
    r.innerHTML = `${Tortenet.stry[localStorage.getItem('result')-1].rajz}`;
    //let s = (+localStorage.getItem('result')), episode = n;
    const t = document.getElementsByClassName("t")[0];
    const sz = document.getElementsByClassName("sz")[0];
    const v = document.getElementsByClassName("v")[0];
    t.classList.add("d-none");
    sz.classList.add("d-none");
    v.classList.add("d-none");

    sz.innerHTML = "";
    v.innerHTML = "";

    t.classList.remove("d-none");
    sz.classList.remove("d-none");
    v.classList.remove("d-none");
    //sz.innerHTML = `${Tortenet.stry[localStorage.getItem('result')-1].szoveg}`;
    const szoveg = `${Tortenet.stry[localStorage.getItem('result')-1].szoveg}`;
    
    let index = 0;
    function typeCharacter() {
        if (index < szoveg.length) {
            // Ellenőrizzük, hogy a következő karakterek egy HTML elem kezdetét jelentik-e
            if (szoveg.charAt(index) === '<') {
                // Megkeressük a zárójelet
                const endIndex = szoveg.indexOf('>', index);
                if (endIndex !== -1) {
                    // Kivágjuk az egész HTML elemet
                    const htmlTag = szoveg.substring(index, endIndex + 1);
                    sz.innerHTML += htmlTag; // Hozzáadjuk a HTML elemet
                    index = endIndex + 1; // Ugrás a következő karakterre
                    setTimeout(typeCharacter, 1); // Késleltetett hívás
                    return; // Visszatérés, hogy ne folytassa a karakterek írását
                }
            }
            // Normál karakter hozzáadása
            sz.innerHTML += szoveg.charAt(index);
            index++;
            setTimeout(typeCharacter, 1); // 1 ms késleltetés
        } else {
            // Ha vége a szöveg írásának, megjelenítjük a választ
            v.innerHTML = `${Tortenet.stry[localStorage.getItem('result')-1].valasz}`;
        }
    }
    typeCharacter();
}

function Ment(){
    let nneevv = document.getElementById("nev").value;
    karakter.nev = nneevv === "" ? karakter.nev : nneevv;
}