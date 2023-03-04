const word_el = document.getElementById("word");
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('succsess-message');
const wrongLetters_el = document.getElementById('wrong-letters')
const items = document.querySelectorAll('.item')
const message_ell = document.getElementById('message')
const PlayAgainBtn = document.getElementById('play-again')


const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWorld()

function getRandomWorld() {
  const words = [ "javascrıpt" , "java", "python"];

  return words[Math.floor(Math.random() * words.length)]; // random kelime gelmesi için
}

// kelimelerin sayfada yazdırmamız için
function displayWord() {
    word_el.innerHTML = `
        ${selectedWord.split("").map((letter) => `
        <div class = "letter">
        ${correctLetters.includes(letter) ? letter: ' '} 
        </div>

        `).join("")}
    
    
    `;

    // kelimenin tamamını doldurursak
    const w = word_el.innerText.replace(/\n/g,'')
    if ( w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler Kazandınız'
    }
}

// Hatalı kelimelerin Bulunması

function updateWrongLetters() {
 wrongLetters_el.innerHTML = `
 ${wrongLetters.length>0? '<h3>Hatalı Harfler</h3>' : ''}
 ${wrongLetters.map(letter => `<span> ${letter} </span>`)}`;

 items.forEach((item,index) => {
    const errorCount = wrongLetters.length;
    if (index < errorCount) {
        item.style.display = 'block'
    } else {
        item.style.display = 'none'
    }
 })
  
 if(wrongLetters.length === items.length) {
    popup.style.display = 'flex';
    message_el.innerText = 'Maalesef Kaybettiniz';
    
 }
}

// Kelimeyi Girdiniz Mesajının Gitmesi İçin;

function displayMessage() {
    message_ell.classList.add('show')

    setTimeout(function() {
        message_ell.classList.remove('show')
    }, 2000)
}

// Tekrar Oyna Butonunu Aktif Etme

PlayAgainBtn.addEventListener('click' , function() {
    correctLetters.splice(0);
    wrongLetters.splice(0)

    selectedWord = getRandomWorld()

    displayWord();
    updateWrongLetters();
    

    popup.style.display = 'none';
})

// Kelime Girince Sayfada çıkması
window.addEventListener('keydown' , function(e) {
    if(e.keyCode >= 65 && e.keyCode <=90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
                 message_ell.classList.add('show')
            } 
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                 updateWrongLetters();
            } else {
                displayMessage()
            }
        }
    }
})

displayWord()


