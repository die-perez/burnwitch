window.addEventListener("DOMContentLoaded", () => {
    let keywordHoldingArea = document.querySelector("#wordToGuess")

    // create prompt for keyword
    var keyword = prompt("Player one, type in a keyword")
    
    // check for alphabet only (no numbers or characters)
    while (!keyword || !keyword.match(/^[a-z]+$/)) {
        alert("Only letters are allowed, no spaces or special characters.");
        var keyword = prompt("Player one, type in a keyword")
    }

    // convert into array for comparison
    var arr = keyword.split("")
    console.log(arr)

    // have number empty slots on screen display keyword length
    function pushKeywordToMain(){
        for (i=0; i< arr.length; i++){
            var div = document.createElement("div")
            div.innerText = (arr[i])
            keywordHoldingArea.appendChild(div)
            div.classList.add("border")
            div.classList.add("hidden")
        }
    }
    
    pushKeywordToMain()


})





