namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const player1 = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Ball, SpriteKind.Player, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    currentBall.vx = currentBall.vx * -1
    currentBall.vy = currentBall.vy * -2
    info.player1.changeScoreBy(1)
    pause(200)
    otherSprite.setFlag(SpriteFlag.Ghost, false)
})
sprites.onOverlap(SpriteKind.Ball, SpriteKind.player1, function (sprite, otherSprite) {
    currentBall.setFlag(SpriteFlag.Ghost, true)
    currentBall.vx = currentBall.vx * -1
    currentBall.vy = currentBall.vy * -2
    info.player2.changeScoreBy(1)
    pause(200)
    currentBall.setFlag(SpriteFlag.Ghost, false)
})
let currentBall: Sprite = null
let Player1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . 8 8 8 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.player1.moveSprite(Player1, 0, 100)
Player1.x = 0
Player1.setStayInScreen(true)
info.setScore(0)
let Player2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.player1)
Player2.x = scene.screenWidth()
Player1.setStayInScreen(true)
info.player2.setScore(0)
controller.player2.moveSprite(Player2, 0, 100)
currentBall = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Ball)
if (Math.percentChance(50)) {
    currentBall.vx = -50
    currentBall.vy = randint(-50, 50)
} else {
    currentBall.vx = 75
    currentBall.vy = randint(-50, 50)
}
game.onUpdate(function () {
    if (currentBall.y <= 0) {
        currentBall.y = 0
        currentBall.vy = currentBall.vy * -1
    } else if (currentBall.y >= scene.screenHeight()) {
        currentBall.y = scene.screenHeight()
        currentBall.vy += currentBall.vy * -1
    }
    if (currentBall.x <= 0) {
        info.player2.changeScoreBy(1)
        currentBall.setFlag(SpriteFlag.DestroyOnWall, true)
        currentBall.destroy()
        currentBall.x = 0
        game.reset()
    } else if (currentBall.x >= scene.screenWidth()) {
        info.player1.changeScoreBy(1)
        currentBall.setFlag(SpriteFlag.DestroyOnWall, true)
        currentBall.destroy()
        game.reset()
    }
})
