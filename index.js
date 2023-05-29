const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

// Map Image
const image = new Image()
image.src = './Images/Pellet Town.png'
// Player Image
const playerImage = new Image()
playerImage.src = './Images/playerDown.png'

image.onload = () => {
    c.drawImage(image, -810, -600)
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height,)
}