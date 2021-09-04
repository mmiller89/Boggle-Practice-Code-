//STEPS (CURRENT STEP - 9)
//1 - Create classes - Board to handle the shuffling and maitenance of the board itself and Die to handle the letters and shuffling of the individual dies.
//Tie each slot on the board to an array value for later on (e.g. first row [0,1,2,3])
//2 - Create properties and methods to shuffle both the "dice" on the board and the letters of the die.
//3 - Create basic HTML table to display values. 
//4 - Create a shuffle button that performs methods in step 2, displays them to the board.
//5 - Begin a timer of 3 minutes that starts ticking down, once it hits 0 the round is over. While ticking down, a prompt bar is displayed to enter words.
//6 - Develop algorithm that determines letters that are connected with each other on the board(across, vertical or diagonal)
//7 - BONUS (Return later) - Find a library or something that holds an english dictionary to check if word is legit (for now, any words are valid.)
//8 - If words are connected, enter them into a list of correct words and display on the page.
//9 - Display high score somewhere on the board. BONUS: Hold this value in a text file for retrieval next time the page is loaded.




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
        if (!inGame){
            this.enteredWordsArray = []
            this.points = 0
            this.boardWords = []
            alert("Begin Round!")
            this.shuffleBoard(this.board)
            updateHTML(this.board)
            inGame = true
            //game in session - timer starts
            var threeMinutes = 60 * 1,
            display = document.querySelector('#title');
            this.startTimer(threeMinutes, display);
            }  
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
    shuffleBoard(row){
        for (let i=0; i <= 15;){
            let newDie = new Die()
            if (this.boardWords.includes(newDie.side)){
                
            } else {
                row[i] = newDie.side
                this.boardWords.push(row[i])
                i++
            }
            

        }
    }

    //code runs when a value is entered into the HTML input AND timer is running.
    enterInput(){
        if(inGame){
            let enteredWord = document.getElementById('prompt').value.split(" ").join("").toUpperCase()
            let isValidWord = this.boardLogic(enteredWord)
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
    boardLogic(enteredWord){
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
          if (this.boardWords.indexOf(enteredWord[0]) !== -1){
              let currentLetterIndex = this.boardWords.indexOf(enteredWord[0])
              let currentLetter = this.board[currentLetterIndex]
              let validConnects = 1

              for (let i=1; i <= enteredWord.length; i++){   
                  if (validConnections[currentLetterIndex].indexOf(enteredWord[i]) !== -1){
                    currentLetterIndex = this.boardWords.indexOf(enteredWord[i])
                    currentLetter = this.board[currentLetterIndex]
                    validConnects++
                  } 
              } if (validConnects === enteredWord.length){
                  return true
                }

          
          } else {
              return false
          }

    }
    
}



class Die{
    constructor(){
        this.letters = ['A', 'E', 'I', 'O', 'U', 'T', 'W', 'Q', 'P', 'F', 'C', 'B', 'M', 'N', 'R', 'Y', 'P', 'S', 'D', 'G', 'H', 'J', 'K', 'L', 'Z', 'X']
        this.side = this.randomIndexPick(this.letters)
        

    }

    randomIndexPick(array){
        return array[Math.floor(Math.random() * array.length)];
    }
}


let newBoard = new Board()


