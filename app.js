window.addEventListener("DOMContentLoaded", () => {
    // Global event listeners
    let beginPress = document.querySelector(".go")
    let startHeading = document.querySelector("#start-heading")
    let witch = document.querySelector(".witch-img")
    let fire = document.querySelector(".fire-img")
    let keywordHoldingArea = document.querySelector("#wordToGuess")
    let score = document.querySelector(".scoreboard")
    let keyboard = document.querySelectorAll(".alphabet")
    let graphicsArea = document.querySelector(".graphics-area")
    let form = document.querySelector(".start-form")
    
    // Variables
    let startScreen = true
    let gameOver = false
    
    let arr = []

    // if (gameOver) {
    //     return
    // }

    if (startScreen) {
        graphicsArea.classList.add("start-screen")
    }

    //check for alphabet only (no numbers or characters)

    beginPress.addEventListener("click", gameStart)

    function gameStart(){
        var keyword = document.getElementById("secret").value
        if (!keyword || !keyword.match(/^[a-z]+$/)) {
            alert("Only letters are allowed, no spaces or special characters.");
            return
        } 
        // convert into array for comparison
        arr = keyword.split("")

        //run this 
        pushKeywordToMain()

        // when button pressed and keyword is okay leave start screen
        startScreen = false
        graphicsArea.classList.remove("start-screen")
        startHeading.classList.add("hide")
        form.classList.add("hide")
    }
  
    // have number empty slots on screen display keyword length
    function pushKeywordToMain(){
        for (i=0; i< arr.length; i++){
            let div = document.createElement("div")
            div.innerText = (arr[i])
            keywordHoldingArea.appendChild(div)
            div.classList.add("border")
            div.classList.add("hidden-word")
            div.classList.add(arr[i])
        }
    }

    for (let i=0; i<keyboard.length; i++){
        keyboard[i].addEventListener("click", clickLetter)
    }

     function clickLetter(event){
        if (gameOver) {
            return
        }

         let letter = event.target.id
         let guess = new Guess (letter)
         guess.compare()
         event.target.classList.add("crossout")
         event.target.removeEventListener("click",clickLetter)


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
                        element.classList.remove("hidden-word")
                    });
                    Guess.rightGuesses++
                    witch.classList.remove("wrong")
                    letterFound = true
                }
            }

            if (!letterFound && Guess.wrongGuesses < 4) {
                Guess.wrongGuesses++
                score.innerText = `Wrong guesses: ${Guess.wrongGuesses}`
                witch.classList.add("wrong-one")
            }

            if (Guess.wrongGuesses === 2) {
                witch.classList.add("flicker-out")
                setTimeout(function(){
                    witch.className = "wrong-two"
                    witch.setAttribute("src", "/img/witch3.png")
                    
                }, 2000)
            }

            if (Guess.wrongGuesses === 3) {
                witch.classList.add("flicker-out")
                setTimeout(function(){
                    witch.className = "wrong-two"
                    witch.setAttribute("src", "/img/noun_Witch_3572374.png")
                }, 2000)
            }

            if (Guess.wrongGuesses === 4){
                score.innerText = "Her blood is on your hands..."
                score.classList.add("final-message")
                witch.classList.add("shake")
                witch.setAttribute("src", "/img/witchface.png") 
                setTimeout(function(){ 
                    witch.classList.add("dead-witch")
                 }, 3000);
                 gameOver = true;
            }

            if (arr.length === Guess.rightGuesses){
                gameOver = true;
                score.classList.add("final-message")
                score.innerText = "You win!"
                fire.classList.add("fire-out")
                witch.className = "free-witch"
                witch.setAttribute("src", "/img/noun_Witch_13874.png")
                setTimeout(function(){ 
                    witch.classList.add("fly-out")
                 }, 3500);
            }
        }
    }

})





