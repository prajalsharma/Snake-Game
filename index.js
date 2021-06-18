const canvas = document.getElementById( 'board' )
const ctx = canvas.getContext( '2d' )

class SnakePart
{
    constructor( x, y ) {
        this.x = x
        this.y = y
    }
}

let gameOver = false;
let speed = 10;
let tileCount = 20
let tileSize = canvas.width / tileCount - 2
let headX = 10
let headY = 10
let prevX
let prevY
let length = 0
let tail = []

let xVelocity = 0
let yVelocity = 0

let score = 0

//ensuring fruit doesn't render on edges of canvas
const randomPosition = () => Math.floor(Math.random() * ( tileCount - 2 )) + 2
let fruitX = randomPosition()
let fruitY = randomPosition()

const drawGame = () => 
{
    if(!isGameOver(gameOver))
    {
        clearScreen()
        changeSnakePosition()
        logic()
        drawFruit()
        drawSnake()
        drawTail()
        drawScore()
        setTimeout( drawGame, 1000 / speed )
    }
    if(isGameOver(gameOver))
    {
        ctx.fillStyle = "white"
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
    }
}

const clearScreen = () => 
{
    ctx.fillStyle = 'black'
    ctx.fillRect( 0, 0, canvas.width, canvas.height )
}

const changeSnakePosition = () => 
{
    prevX = headX
    prevY = headY
    headX = headX + xVelocity
    headY = headY + yVelocity
}

const drawScore = () =>
{
    ctx.fillStyle = "white"
    ctx.font = "20px Verdana"
    ctx.fillText("Score " + score, canvas.width - 100, 20)
  }

const drawSnake = () => 
{
    ctx.fillStyle = 'orange'
    ctx.fillRect( headX * tileCount, headY * tileCount, tileSize, tileSize )
}

const drawFruit = () =>
{
    ctx.fillStyle = 'red'
    ctx.fillRect( fruitX * tileCount, fruitY * tileCount, tileSize, tileSize )
}

const drawTail = () =>
{
    ctx.fillStyle = 'green'
    for(let i = 0; i < length; i++)
    {
        ctx.fillRect( tail[i]?.x * tileCount, tail[i]?.y * tileCount, tileSize, tileSize )
    }
}

const keyDown = ( e ) => 
{
    if( e.keyCode == 38 || e.keyCode == 87 ) 
    {
        if(yVelocity !== 1)
        {
            yVelocity = -1
            xVelocity = 0
        }
    }
    if( e.keyCode == 40 || e.keyCode == 83 ) 
    {
        if( yVelocity !== -1 )
        {
            yVelocity = 1
            xVelocity = 0
        }
    }
    if( e.keyCode == 37 || e.keyCode == 65 ) 
    {
        if( xVelocity !== 1 )
        {
            yVelocity = 0
            xVelocity = -1
        }
    }
    if( e.keyCode == 39 || e.keyCode == 68 ) 
    {
        if( xVelocity !== -1 )
        {
            yVelocity = 0
            xVelocity = 1
        }
    }
}

document.body.addEventListener('keydown', keyDown)

const logic = () =>
{
    if ( headX == 0 || headY == 0 || headX == 20 || headY == 20 )
    {
        gameOver = true
    }
    if( headX == fruitX && headY == fruitY )
    {
        fruitX = randomPosition()
        fruitY = randomPosition()
        length++
        speed++
        score++
    }
    let prev2 = {}
    for( let i = 0; i < length; i++ )
    {
        prev2 = tail[i]
        tail[i] = new SnakePart( prevX, prevY )
        prevX = prev2?.x
        prevY = prev2?.y
        if(tail[i]?.x == headX && tail[i]?.y == headY)
        {
            gameOver = true
        }
        //if fruit spawns in snake tail
        if(fruitX == tail[i]?.x && fruitY == tail[i]?.x)
        {
            
        }
    }
}

const isGameOver = input => input

drawGame()
