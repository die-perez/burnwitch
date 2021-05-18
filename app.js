window.addEventListener("DOMContentLoaded", () => {
    // global event listeners
    let witch = document.querySelector(".witch-img")
    let fire = document.querySelector(".fire-img")
    let keywordHoldingArea = document.querySelector("#wordToGuess")
    let score = document.querySelector(".scoreboard")
    let keyboard = document.querySelectorAll(".alphabet")
  
    
    // //create prompt for keyword
    // var keyword = prompt("Player one, type in a keyword")
    
    // //check for alphabet only (no numbers or characters)
    // while (!keyword || !keyword.match(/^[a-z]+$/)) {
    //     alert("Only letters are allowed, no spaces or special characters.");
    //     var keyword = prompt("Player one, type in a keyword")
    // }

    var keyword = "banana"

    let gameOVer = false

    // convert into array for comparison
    let arr = keyword.split("")

    // have number empty slots on screen display keyword length
    function pushKeywordToMain(){
        for (i=0; i< arr.length; i++){
            let div = document.createElement("div")
            div.innerText = (arr[i])
            keywordHoldingArea.appendChild(div)
            div.classList.add("border")
            div.classList.add("hidden")
            div.classList.add(arr[i])
        }
    }

    pushKeywordToMain()


    for (let i=0; i<keyboard.length; i++){
        keyboard[i].addEventListener("click", clickLetter)
    }

     function clickLetter(event){
         let letter = event.target.id
         let guess = new Guess (letter)
         guess.compare()
         event.target.classList.add("crossout")
         event.target.removeEventListener("click",clickLetter)

         if (gameOVer){
            event.target.removeEventListener("click",clickLetter)
         }
     } 


    // handling a new guess
    class Guess {
        static wrongGuesses = 0
        static rightGuesses = 0

        constructor(letter){
            this.letter = letter
        }

        compare(){
            let letterFound = false

            // loop for comparing string to new guess
            for(i=0; i<arr.length; i++){
            
                if (this.letter === arr[i]) {
                    let divs = Array.from(document.getElementsByClassName(this.letter))
                    divs.forEach(element => {
                        element.classList.remove("hidden")
                    });
                    Guess.rightGuesses++
                    witch.classList.remove("wrong")
                    letterFound = true
                }
            }

            if (!letterFound) {
                Guess.wrongGuesses++
                score.innerText = `Wrong guesses: ${Guess.wrongGuesses}`
                witch.classList.add("wrong-one")
            }

            if (Guess.wrongGuesses === 2) {
                witch.classList.add("fire-out")
                setTimeout(function(){
                    witch.className = "wrong-two"
                    witch.setAttribute("src", "/img/noun_Witch_3572374.png")
                }, 2000)
            }

            if (Guess.wrongGuesses === 3) {
                witch.classList.add("fire-out")
                setTimeout(function(){
                    witch.className = "wrong-two"
                    witch.setAttribute("src", "/img/noun_Witch_3572369.png")
                }, 2000)
            }

            if (Guess.wrongGuesses === 4){
                gameOVer = true;
                score.innerText = "Her blood is on your hands..."
                score.classList.add("final-message")
                witch.classList.add("shake") 
            }

            if (arr.length === Guess.rightGuesses){
                gameOVer = true;
                score.classList.add("final-message")
                score.innerText = "You win!"
                fire.classList.add("fire-out")
                witch.className = "free-witch"
                witch.setAttribute("src", "/img/noun_Witch_13874.png")
                setTimeout(function(){ 
                    witch.classList.add("fly-out")
                 }, 5000);
            }
        }
    }

})





