var inGame = false

class Board{
    constructor(){
        this.board = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        this.enteredWordsArray = []
        this.boardWords = []
        this.points = 0
        this.highscore = 0

    }


    //When the start game button is pressed. Unusable once timer starts.
    start(){
        if (inGame){
          return
            } 
            this.enteredWordsArray = []
            this.points = 0
            this.boardWords = []
            alert("Begin Round!")
            inGame = true
            this.shuffleBoard(this.board)
            //game in session - timer starts
            var timerMinutes = 60 * 8,
            display = document.querySelector('#title');
            this.startTimer(timerMinutes, display); 
    }

    
    startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        let timerCount = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    //once timer ends, game is "over" and points are displayed. Press button again to play a new game. High score is tracked.
            if (--timer < 0) {
                timer = duration;
                clearInterval(timerCount)
                inGame = false
                alert(`Points Earned: ${newBoard.points}`)
                if (newBoard.points > newBoard.highscore){
                    newBoard.highscore = newBoard.points
                }
                updateHTML(newBoard.board, document.getElementById('prompt').value, 'points', newBoard.highscore)
                
            }
        }, 1000);
    }


   
//shuffles the board - ensuring no letters are duplicated.
    shuffleBoard(){
        if(!inGame){
           return
        }
        this.boardWords = []
        for (let i=0; i <= 15;){
        let newDie = new Die()
        this.board[i] = newDie.side
        this.boardWords.push(this.board[i])
        i++
        }
        updateHTML(this.board)
       
            

        
    }

    //code runs when a value is entered into the HTML input AND timer is running.
    enterInput(){
        if(inGame){
            let enteredWord = document.getElementById('prompt').value.split(" ").join("").toUpperCase()
            let isValidWord = this.validWordCheck(enteredWord)
            
            
        if(isValidWord){
            updateHTML(this.board, enteredWord, 'green')
            if (this.enteredWordsArray.includes(enteredWord)){
                updateHTML(this.board, enteredWord, 'used')
            } else {
                this.enteredWordsArray.push(enteredWord)
                this.points ++
                console.log(this.enteredWordsArray)
                

            }
            
            } else {
                updateHTML(this.board, enteredWord, 'red')
            }

            const inputField = document.getElementById("prompt");
            inputField.value = " ";

        }
       
    }

    
//algorithm for ensuring words are connected. 
//Problem 1 - Unlike normal boggle, you can reuse a letter multiple times in the same word. (Not a huge deal to me)
//Problem 2 - You can enter any string of words that connect, I need some external database to validate entry is an english word.
//Problem 3 - I had to ensure there were no duplicate letters on the board, because this algorithm will fail if a letter is on the board more than once.
    validWordCheck(enteredWord){
        const validConnections = [
            [this.board[1], this.board[4], this.board[5]], //index 0
            [this.board[0], this.board[4], this.board[5], this.board[6], this.board[2]], //index 1
            [this.board[1], this.board[3], this.board[5], this.board[6], this.board[7]], //index 2
            [this.board[2], this.board[6], this.board[7]], //index 3
            [this.board[0], this.board[1], this.board[5], this.board[8], this.board[9]], //index 4
            [this.board[0], this.board[1], this.board[2], this.board[4], this.board[8], this.board[9], this.board[10], this.board[6]], //index 5
            [this.board[1], this.board[2], this.board[3], this.board[5], this.board[9], this.board[10], this.board[11], this.board[7]], //index 6
            [this.board[2], this.board[3], this.board[6], this.board[11], this.board[10]], //index 7
            [this.board[9], this.board[4], this.board[5], this.board[12], this.board[13]], //index 8
            [this.board[6], this.board[4], this.board[5],this.board[8],this.board[10],this.board[12],this.board[13], this.board[14]], //index 9
            [this.board[5], this.board[6], this.board[7],this.board[9],this.board[11],this.board[13],this.board[14],this.board[15]], //index 10
            [this.board[6], this.board[7], this.board[10],this.board[14],this.board[15]], //index 11
            [this.board[8], this.board[9], this.board[13]], //index 12
            [this.board[8], this.board[9], this.board[10],this.board[12],this.board[14]], //index 13
            [this.board[9], this.board[10], this.board[11],this.board[13],this.board[15]], //index 14
            [this.board[10], this.board[11], this.board[14]] //index 15
        ]
        //the first step is validate that the first letter of enteredWord is on the board
        if (this.boardWords.indexOf(enteredWord[0]) !== -1){
            let nestedArray = []
            //then we need to create an array of objects to identify the letter name and what index value it was found on.
            for (let i=0; i <= this.boardWords.length; i++){
                if (enteredWord[0] === this.boardWords[i]){
                    let obj = {}
                    obj["letter"] = this.boardWords[i];
                    obj["index"] = i;
                    obj["word"] = this.boardWords[i]
                    nestedArray.push(obj)  
                } 
        } 

        //now that I have the object array created, I need to find a way to add to the word object until it matches the length of the entered word.
        var currentPosition = 1
        for (let p=0; p <= enteredWord.length-1; p++){
            nestedArray = this.checkNextValidValue(nestedArray, enteredWord, validConnections, currentPosition)
            currentPosition++
            for (let h=0; h <= nestedArray.length - 1; h++){
                if (nestedArray[h].word.length === enteredWord.length && dictionaryArray.indexOf(nestedArray[h].word.toLowerCase()) !== -1){ //here's where we would check if it was an english word
                    console.log(nestedArray)
                    return true
                    
                }

            }

        } 
        console.log(nestedArray)
        return false
       } 
    }

    checkNextValidValue(nestedArray, enteredWord, validConnections, currentPosition){   
        for (let k=0; k <= nestedArray.length - 1; k++){
            let connectPos = nestedArray[k].index
            //this is asking is validConnections at the current index of nested array "index" value contains the next letter
            //this is also where I'd need to check if the word being entered is not in the last position (no repeat letters)
            if (validConnections[connectPos].includes(enteredWord[currentPosition])){ 
                nestedArray[k].word += enteredWord[currentPosition]
                }
              
            
               
        }
        for (let j=0; j <= nestedArray.length - 1; j++){
            
            if (validConnections[nestedArray[j].index].includes(nestedArray[j].word.slice(-1))){ //in theory, the index value is still the previous one, but the slice is the most current end letter. thus, it's checking if the new letter is a connection of the old one.
                for (let p=0; p <= this.board.length;p++){

                    if (this.board[p] === nestedArray[j].word.slice(-1) && validConnections[nestedArray[j].index].includes(nestedArray[j].word.slice(-1))){
                        nestedArray[j].index = p

                    }
                }
            }
        }
            return nestedArray
            
    
    }
    
}



class Die{
    constructor(){
        this.letters = ['A', 'E', 'I', 'O', 'U', 'T', 'W', 'Q', 'P', 'F', 'C', 'B', 'M', 'N', 'R', 'Y', 'P', 'S', 'D', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'A', 'E', 'I', 'O', 'U']
        this.side = this.randomIndexPick()
        

    }

    randomIndexPick(){
        return this.letters[Math.floor(Math.random() * this.letters.length)];
    }
}


let newBoard = new Board()