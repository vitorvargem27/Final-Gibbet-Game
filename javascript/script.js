const arrayWords = [

    word01 = {
        string: "BANANA",
        theme: "FRUITS"
    },

    word02 = {
        string: "WATERMELON",
        theme: "FRUITS"
    },

    word03 = {
        string: "MELON",
        theme: "FRUITS"
    },

    word04 = {
        string: "APPLE",
        theme: "FRUITS"
    },

    word05 = {
        string: "ARGENTINA",
        theme: "COUNTRIES"
    },

    word06 = {
        string: "BRAZIL",
        theme: "COUNTRIES"
    },

    word07 = {
        string: "GERMANY",
        theme: "COUNTRIES"
    },

    word08 = {
        string: "NETHERLANDS",
        theme: "COUNTRIES"
    },

    word09 = {
        string: "SOCCER",
        theme: "SPORTS"
    },

    word10 = {
        string: "VOLLEYBALL",
        theme: "SPORTS"
    },

    word11 = {
        string: "BASKET",
        theme: "SPORTS"
    },

    word12 = {
        string: "HANDBALL",
        theme: "SPORTS"
    },

    word13 = {
        string: "SHIRT",
        theme: "CLOTHES"
    },

    word14 = {
        string: "PANTS",
        theme: "CLOTHES"
    }
]

let arrayListWords = []
let wordSecretCategory;
let wordSecretRandom;
let lifesOfGame = 5;

//Função que gera número aleatório compatível com o número de palavra/tema dentro do array de palavras//
function secretWordGenerate() {
    let wordIndex = parseInt(Math.random() * arrayWords.length);

    wordSecretRandom = arrayWords[wordIndex].string;
    wordSecretCategory = arrayWords[wordIndex].theme;
    console.log(wordSecretRandom);
    console.log(wordSecretCategory);
}

secretWordGenerate()


//Função gerando as lacunas no lugar das letras da palavra//
function wordOfTheGame() {
    let category = document.getElementById("categories");
    category.innerHTML = wordSecretCategory;

    let wordFinal = document.getElementById("secretWord");
    wordFinal.innerHTML = ""

    for (let i = 0; i < wordSecretRandom.length; i++) {
        // If para ajustar os "espaços" entre as letras, para espaços vazios//
        if (arrayListWords[i] == undefined) {
            arrayListWords[i] = "&nbsp;" //Código de espaço usado porque com espaço normal daria erro na palavra na página hHTML//

            //Usando partes textuais ""
            wordFinal.innerHTML = wordFinal.innerHTML + "<div class='letter'>" + arrayListWords[i] + "</div>"
        }
        else {
            wordFinal.innerHTML = wordFinal.innerHTML + "<div class='letter'>" + arrayListWords[i] + "</div>"
        }
    }

}

wordOfTheGame();

//Função que define ação à partir do id + letra//
function verifyLetterButton(letterButton) {
    if (lifesOfGame > 0) {
        changeLetterIncorrect("letter" + letterButton);
        letterChoice(letterButton);
        wordOfTheGame()
    }
}

//Função onde começa a definição de acerto ou erro
function letterChoice(letter) {
    const position = wordSecretRandom.indexOf(letter)

    //Condição de erro//
    if (position < 0) {
        lifesOfGame--;
        gibbetImage();
        console.log("Oh no, wrong letter...\nTry again 🔁");
        if(lifesOfGame == 0){
            verifyGameSituation(false);
        }
        return;
    }
    //Condição de acerto//
    else {
        console.log("Yes!! Correct decision, continue!!");
        for (let i = 0; i < wordSecretRandom.length; i++) {
            if (wordSecretRandom[i] == letter) {
                arrayListWords[i] = letter;
            }
        }
        if(wordSecretRandom == arrayListWords.join("")) {
            verifyGameSituation(true);
        }
        return;
    }

}

function verifyGameSituation(verifyFinalResult) {
    //Verificando se as letras da palavra secreta estão iguais a palavra geral para dar situação de vitória ou derrota//

    if (verifyFinalResult) {
        console.log("You win!! \n Very good");
        alert("You win!! \nVery good");
        lifesOfGame = 0;
    }
    else {
        console.log("Oh no!! You lose...\nTry again")
        alert("Oh no!! You lose...\nTry again")
    }
}

//Função de alterar a cor da letra errada selecionada
function changeLetterIncorrect(button) {
    document.getElementById(button).style.background = "red"
    document.getElementById(button).style.color = "white"
}

//Funções para alterar a cor do botão de reset game
function verifyGameButton() {
    changeResetButton("ButtonGameAgain")
}
function changeResetButton(buttonGame) {
    document.getElementById(buttonGame).style.background = "green"
}

function gibbetImage() {
    switch (lifesOfGame) {
        case 4:
            document.getElementById("gibbetImage").removeAttribute("class");
            document.getElementById("gibbetImage").classList.add("imgFourLifes");
            break;
        case 3:
            document.getElementById("gibbetImage").removeAttribute("class");
            document.getElementById("gibbetImage").classList.add("imgThreeLifes");
            break;
        case 2:
            document.getElementById("gibbetImage").removeAttribute("class");
            document.getElementById("gibbetImage").classList.add("imgTwoLifes");
            break;
        case 1:
            document.getElementById("gibbetImage").removeAttribute("class");
            document.getElementById("gibbetImage").classList.add("imgLastLife");
            break;
        case 0:
            document.getElementById("gibbetImage").removeAttribute("class");
            document.getElementById("gibbetImage").classList.add("imgLoseAllLifes");
            break;
        default: document.getElementById("gibbetImage").classList.add("imgFullLife");
            break;
    }

}