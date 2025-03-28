document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board")
    const squares = document.getElementsByClassName("square")
    const players = ["X", "O"]
    let currentPlayer = players[0]
    const endMessage = document.getElementById("endMessage")
    const themeToggle = document.getElementById("themeToggle")
    const restartBtn = document.getElementById("restartButton")
  
    let someoneWon = false
    const winning_combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
  
    // Theme toggle functionality
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      localStorage.setItem("darkMode", document.body.classList.contains("dark"))
    })
  
    // Check for saved theme preference
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark")
    }
  
    // Add click event listeners to squares
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener("click", () => {
        if (someoneWon || squares[i].textContent !== "") {
          return
        }
  
        // Place move with animation
        squares[i].textContent = currentPlayer
        squares[i].classList.add(currentPlayer === "X" ? "x-move" : "o-move")
        squares[i].style.animation = "appear 0.5s forwards"
  
        // Check for win
        if (checkWin(currentPlayer)) {
          someoneWon = true
          endMessage.textContent = `Game over! ${currentPlayer} wins!`
          endMessage.style.animation = "slideIn 0.5s forwards"
          return
        }
  
        // Check for tie
        if (checkTie()) {
          someoneWon = true
          endMessage.textContent = `Game is tied!`
          endMessage.style.animation = "slideIn 0.5s forwards"
          return
        }
  
        // Switch player
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
        endMessage.textContent = `${currentPlayer}'s turn!`
        endMessage.style.animation = "fadeIn 0.5s forwards"
      })
    }
  
    function checkWin(currentPlayer) {
      for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i]
        if (
          squares[a].textContent === currentPlayer &&
          squares[b].textContent === currentPlayer &&
          squares[c].textContent === currentPlayer
        ) {
          // Highlight winning combination
          squares[a].classList.add("winning")
          squares[b].classList.add("winning")
          squares[c].classList.add("winning")
          return true
        }
      }
      return false
    }
  
    function checkTie() {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === "") {
          return false
        }
      }
      return true
    }
  
    function restartGame() {
      someoneWon = false
  
      // Reset squares with staggered animation
      for (let i = 0; i < squares.length; i++) {
        setTimeout(() => {
          squares[i].textContent = ""
          squares[i].className = "square"
          squares[i].style.animation = ""
        }, i * 50)
      }
  
      // Reset message
      endMessage.textContent = `X's turn!`
      endMessage.style.animation = "fadeIn 0.5s forwards"
      currentPlayer = players[0]
    }
  
    // Restart button event listener
    restartBtn.addEventListener("click", restartGame)
  })
  
  
