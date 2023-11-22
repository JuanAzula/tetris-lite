/* eslint-disable indent */
import './style.css'
import { BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, EVENT_MOVEMENTS } from './consts'

// 1. Inicializar el canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const $score = document.querySelector('#score')

let score = 0
const audio = new window.Audio('./my-nigga.mp3')
audio.volume = 0.5
canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// 3. board
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

function createBoard (width, height) {
  return Array(height).fill().map(() => Array(width).fill(0))
}

// 2. game loop
// function update () {
//   draw()
//   window.requestAnimationFrame(update)
// }

// Random colors

const COLORS = [
  ['red'],
  ['blue'],
  ['green'],
  ['orange'],
  ['cyan'],
  ['yellow'],
  ['pink'],
  ['white']
]

// Random pieces
const PIECES = [
  [[1, 0, 0],
  [1, 1, 1]],
  [[1, 1, 1],
  [1, 0, 0]],
  [[0, 1, 0],
  [1, 1, 1]],
  [[1],
  [1],
  [1],
  [1]],
  [[1, 1],
  [1, 1]],
  [[0, 0, 0, 0],
  [1, 1, 1, 1]],
  [[1, 1, 1],
  [0, 1, 0]],
  [[1],
  [1]],
  [[1, 1, 0],
  [0, 1, 1]],
  [[0, 0, 1],
    [1, 1, 1]]
]
// 4. pieza player
const piece = {
  position: { x: 6, y: 0 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

// 3. auto drop
let dropCounter = 0
let lastTime = 0
function update (time = 0) {
  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  if (dropCounter > 100) {
    piece.position.y++
    dropCounter = 0
  }
  if (checkCollisions()) {
    piece.position.y--
    solidifyPiece()
    removeRows()
    piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
    // reset position
    piece.position.y = 0
    piece.position.x = Math.floor(Math.random() * 10)
    if (checkCollisions()) {
      window.alert('Game Over! Try again.')
      board.forEach((row) => row.fill(0))
      score = 0
      update()
    }
  }
  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'purple'
        context.fillRect(x, y, 1, 1)
      }
    })
  })

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)]
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })
  $score.innerText = score
}

const UP = document.getElementById('up')
const DOWN = document.getElementById('down')
const LEFT = document.getElementById('left')
const RIGHT = document.getElementById('right')

document.addEventListener('click', function () {
  LEFT.addEventListener('click', function () {
    piece.position.x--
    if (checkCollisions()) {
      piece.position.x++
    }
  })
  RIGHT.addEventListener('click', function () {
    piece.position.x++
    if (checkCollisions()) {
      piece.position.x--
    }
  })
  DOWN.addEventListener('click', function () {
    piece.position.y++
    if (checkCollisions()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  })
  UP.addEventListener('click', function () {
    const rotated = []

    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollisions()) {
      piece.shape = previousShape
    }
  })
})

document.addEventListener('keydown', (event) => {
  if (event.code === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--
    if (checkCollisions()) {
      piece.position.x++
    }
  }
  if (event.code === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++
    if (checkCollisions()) {
      piece.position.x--
    }
  }
  if (event.code === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++
    if (checkCollisions()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }
  if (event.code === EVENT_MOVEMENTS.UP) {
    const rotated = []

    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollisions()) {
      piece.shape = previousShape
    }
  }
})

function checkCollisions () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 &&
        (piece.position.y + y < 0 ||
          board[piece.position.y + y]?.[piece.position.x + x] !== 0)
      )
    })
  })
}

function solidifyPiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[piece.position.y + y][piece.position.x + x] = 1
      }
    })
  })
  // get random shape
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
  // reset position
  piece.position.x = Math.floor(Math.random() * (BOARD_WIDTH - piece.shape[0].length + 1))
  piece.position.y = 0

  if (checkCollisions()) {
    window.alert('Game Over! Try again.')
    board.forEach((row) => row.fill(0))
    score = 0
    update()
  }
}

function removeRows () {
  for (let y = 0; y < board.length; y++) {
    if (board[y].every((value) => value === 1)) {
      board.splice(y, 1)
      board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      score += 100
    }
  }
}

document.querySelector('section').addEventListener('click', () => {
  audio.addEventListener('ended', () => {
    audio.currentTime = 0
    audio.play()
  })
  audio.play()
  update()
})
