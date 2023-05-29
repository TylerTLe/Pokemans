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

class Sprite {
    constructor({posistion, velocity, image}) {
        this.posistion = posistion
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.posistion.x, this.posistion.y)
    }
}

const background = new Sprite({
    posistion: {
        x: -810,
        y: -600
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animation() {
    window.requestAnimationFrame(animation)
    background.draw()
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height,
    )

    if (keys.w.pressed) background.posistion.y = background.posistion.y + 3
    else if (keys.a.pressed) background.posistion.x = background.posistion.x + 3
    else if (keys.s.pressed) background.posistion.y = background.posistion.y - 3
    else if (keys.d.pressed) background.posistion.x = background.posistion.x - 3
    
}
animation()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
        keys.w.pressed = true
            break
        case 'a':
        keys.a.pressed = true
            break
        case 's':
        keys.s.pressed = true
            break
        case 'd':
        keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
        keys.w.pressed = false
            break
        case 'a':
        keys.a.pressed = false
            break
        case 's':
        keys.s.pressed = false
            break
        case 'd':
        keys.d.pressed = false
            break
    }
})
