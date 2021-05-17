window.addEventListener("DOMContentLoaded", () => {
    // global event listeners
    let witch = document.getElementById("witch")
    let keywordHoldingArea = document.querySelector("#wordToGuess")
    let score = document.querySelector("#scoreboard")
    
    
    // create prompt for keyword
    // var keyword = prompt("Player one, type in a keyword")
    
    // check for alphabet only (no numbers or characters)
    // while (!keyword || !keyword.match(/^[a-z]+$/)) {
    //     alert("Only letters are allowed, no spaces or special characters.");
    //     var keyword = prompt("Player one, type in a keyword")
    // }

    var keyword = "banana"

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


    document.querySelectorAll(".alphabet").forEach(item => {
        item.addEventListener("click", event => {
          let letter = event.target.id
          console.log(`${letter} was clicked! 🤘🏽`)

          let guess = new Guess (letter)
          guess.compare()
          
        })
      })



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
            console.log(arr[i])
                if (this.letter === arr[i]) {
                    let divs = Array.from(document.getElementsByClassName(this.letter))
                    divs.forEach(element => {
                        element.classList.remove("hidden")
                    });
                    Guess.rightGuesses++
                    console.log(Guess.rightGuesses)
                    letterFound = true
                }
            }
            if (!letterFound) {
                Guess.wrongGuesses++
                score.innerText = `Wrong guesses: ${Guess.wrongGuesses}`

            }
        }
    }

})





