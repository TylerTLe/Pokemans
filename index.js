const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let  i = 0; i < collisions.length; i+= 70) {
    collisionsMap.push(collisions.slice(i,i+70))
}

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

    if (keys.w.pressed && lastKey === 'w') background.posistion.y += 3
    else if (keys.a.pressed && lastKey === 'a') background.posistion.x += 3
    else if (keys.s.pressed && lastKey === 's') background.posistion.y -= 3
    else if (keys.d.pressed && lastKey === 'd') background.posistion.x -= 3
    
}
animation()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
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
