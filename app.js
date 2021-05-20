window.addEventListener("DOMContentLoaded", () => {
    // Global event listeners
    let beginPress = document.querySelector(".go")
    let randomWordGenerator = document.querySelector(".random")
    let startHeading = document.querySelector("#start-heading")
    let witch = document.querySelector(".witch-img")
    let fire = document.querySelector(".fire-img")
    let keywordHoldingArea = document.querySelector("#wordToGuess")
    let score = document.querySelector(".scoreboard")
    let keyboard = document.querySelectorAll(".alphabet")
    let graphicsArea = document.querySelector(".graphics-area")
    let form = document.querySelector(".start-form")
    let audio = new Audio('/audio/The-Oppressed.mp3')
    let laugh =  new Audio('/audio/wlaugh.mp3')
    let dying = new Audio('/audio/dying.mp3')
    let scream = new Audio('/audio/scream.mp3')
    
    // variables
    let gameOver = false
    let arr = []

    //audio and loops
    audio.loop = true
    audio.play()

    // should always start with this screen
    graphicsArea.classList.add("start-screen")

    //check for alphabet only (no numbers or characters)
    beginPress.addEventListener("click", gameStart)
    randomWordGenerator.addEventListener("click", getWord)

    function gameStart(){
        var keyword = document.getElementById("secret").value
        if (!keyword || !keyword.match(/^[a-z]+$/)) {
            alert("Only letters are allowed, no spaces or special characters.")
            return
        } 
        // convert into array for comparison
        arr = keyword.split("")

        //run this 
        pushKeywordToMain()

        // when button pressed and keyword is okay leave start screen
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
                scream.play()
                witch.classList.add("wrong")
                witch.classList.add("flicker-out")
            }

            if (Guess.wrongGuesses === 2) {
                witch.classList.add("flicker-out")
                witch.classList.add("shake")
                setTimeout(function(){
                    witch.className = "wrong-two"
                    witch.setAttribute("src", "/img/witch3.png")
                    witch.classList.add("wrong")
                }, 1500)
            }

            if (Guess.wrongGuesses === 3) {
                witch.classList.add("flicker-out")
                setTimeout(function(){
                    witch.className = "wrong-two"
                    witch.setAttribute("src", "/img/noun_Witch_3572374.png")
                    witch.classList.add("wrong")
                }, 1500)
            }

            if (Guess.wrongGuesses === 4){
                score.innerText = "Her blood is on your hands..."
                score.classList.add("final-message")
                witch.classList.add("shake")
                witch.setAttribute("src", "/img/witchface.png") 
                setTimeout(function(){ 
                    dying.play()
                    witch.classList.add("dead-witch")
                 }, 2000);
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
                    laugh.play()
                    witch.classList.add("fly-out")
                 }, 3500);
            }
        }
    }

    function Get(yourUrl){
        var Httpreq = new XMLHttpRequest() // a new request
        Httpreq.open("GET",yourUrl,false)
        Httpreq.send(null)
        return Httpreq.responseText         
    }

    function getWord() {
        // grab object from api
        let json_obj = JSON.parse(Get("https://api.datamuse.com/words?ml=horror"))

        // tap into the word key and grab values
        let horrorSyn = json_obj.map(horrorWord => horrorWord.word)


        horrorSyn = horrorSyn.filter(word => word.indexOf(" ") == -1)
        
        // select random keyword from new array
        let keyword = horrorSyn[Math.floor(Math.random() * horrorSyn.length)]
    

        document.getElementById("secret").value = keyword

        gameStart()
        
    }

})





