function game(p1Name, p2Name) {
    // player objects
    let playerOne = document.getElementById('player-one')
    let playerTwo = document.getElementById('player-two')

    let characterMargin = 20
    let playerWidth = playerOne.offsetWidth
    let playerHeight = playerOne.offsetHeight

    // scoreboard
    let p1 = document.getElementById('p1')
    p1.innerText = `${p1Name} - 0`
    let p2 = document.getElementById('p2')
    p2.innerText = `${p2Name} - 0`
    let p1Score = 0
    let p2Score = 0

    let gameField = document.getElementById('game-field')
    let fieldWidth = gameField.offsetWidth

    // change from hard coded to flexible
    // game properties
    let p1Top = 250
    let p2Top = 250
    const speed = 10

    // movement keys, allows for both player to move at the same time
    let activeKeys = {
        'w': false,
        's': false,
        'ArrowUp': false,
        'ArrowDown': false
    }

    // handles player movement - pretty buggy because of the way event listener is fired
    document.addEventListener('keydown', e => {
        // update pressed key
        activeKeys[e.key] = true

        // player one movement
        if (activeKeys['w'] == true && p1Top > 0) {
            p1Top -= speed
        }
        if (activeKeys['s'] == true && p1Top < 490) {
            p1Top += speed
        }
        // player two movement
        if (activeKeys['ArrowUp'] == true && p2Top > 0) {
            p2Top -= speed
        }
        if (activeKeys['ArrowDown'] == true && p2Top < 490) {
            p2Top += speed
        }
        playerOne.style.top = p1Top + 'px'
        playerTwo.style.top = p2Top + 'px'
    })
    document.addEventListener('keyup', e => {
        // update released key, stopping the movement
        activeKeys[e.key] = false
    })


    let ball = document.getElementById('ball')
    let ballHeight = ball.offsetHeight
    let ballTopStart = 310
    let ballLeftStart = 310
    let ballTop = ballTopStart
    let ballLeft = ballLeftStart
    // anything over 10 breaks the game
    const ballSpeed = 10
    

    let movingLeft = false
    let movingTop = false
    
    let ballMovement = setInterval(() => {    
        // change the direction of the ball when it hits an edge by either adding or subtracting "speed"
        if (movingLeft) {
            ballLeft -= ballSpeed
        }
        else {
            ballLeft += ballSpeed
        }

        if (movingTop) {
            ballTop -= ballSpeed
        }
        else {
            ballTop += ballSpeed
        }
        ball.style.top = ballTop + 'px'
        ball.style.left = ballLeft + 'px'

        if (ballLeft == 0) {
            movingLeft = false
            p2Score++
            p2.innerText = `${p2Name} - ${p2Score}`
        }
        // checks if the ball hit the player instead of the wall
        if (ballLeft == characterMargin + playerWidth && ballTop >= p1Top && ballTop <= p1Top + playerHeight) {
            movingLeft = false
        }

        if (ballLeft == fieldWidth - ballHeight) {
            movingLeft = true
            p1Score++
            p1.innerText = `${p1Name} - ${p1Score}`
        }
        if (ballLeft == (fieldWidth - ballHeight) - (characterMargin + playerWidth) && ballTop >= p2Top && ballTop <= p2Top + playerHeight) {
            movingLeft = true
        }

        // change y direction when the ball "hits" the edge
        if (ballTop == 0) {
            movingTop = false
        }
        if (ballTop == 610) {
            movingTop = true
        }
    
        // first to 10 wins
        if (p1Score == 10) {
            clearInterval(ballMovement)
            gameOver(p1Name)
        }
        if (p2Score == 10) {
            clearInterval(ballMovement)
            gameOver(p2Name)
        }

    }, 70)
}

function startGame() {
    // if player doesn't select a name, default to "Player One" or "Player Two"
    // if the name is too big, shorten so it doesn't fill too much of the screen
    let p1Name = document.getElementById('p1name').value
    if (p1Name.length == 0) {
        p1Name = 'Player One'
    }
    else if (p1Name.length > 10) {
        let tempName = Array.from(p1Name)
        tempName = tempName.slice(0, 10)
        p1Name = tempName.join('') + '...'
    }
    let p2Name = document.getElementById('p2name').value
    if (p2Name.length == 0) {
        p2Name = 'Player Two'
    }
    else if (p2Name.length > 10) {
        let tempName = Array.from(p2Name)
        tempName = tempName.slice(0, 10)
        p2Name = tempName.join('') + '...'
    }

    // change displays
    document.getElementById('player-creator-wrapper').style.display = 'none'
    document.getElementById('game-wrapper').style.display = 'block'
    
    // wait before starting the game
    setTimeout(() => {
        game(p1Name, p2Name)
    }, 1000)
}

function gameOver(winner) {
    let winnerText = document.getElementById('winner-text')
    winnerText.innerText = `${winner} WINS!`
    document.getElementById('game-wrapper').style.display = 'none'
    document.getElementById('end-screen').style.display = 'flex'
}

