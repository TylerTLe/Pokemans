const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundry {
    static height = 48
    static width = 48
    constructor({ position}) {
        this.position = position
        this.height = 48
        this.width = 48
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
offset = {
    x: -810,
    y: -600
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundry({
                    position: {
                        x: j * Boundry.width + offset.x,
                        y: i * Boundry.height + offset.y
                    }
                })
            )
    })
})


// Map Image
const image = new Image()
image.src = './Images/Pellet Town.png'
// Player Image
const playerImage = new Image()
playerImage.src = './Images/playerDown.png'

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}



const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
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
    boundaries.forEach(boundry =>  {
        boundry.draw()
    })
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

    if (keys.w.pressed) background.position.y = background.position.y + 3
    else if (keys.a.pressed) background.position.x = background.position.x + 3
    else if (keys.s.pressed) background.position.y = background.position.y - 3
    else if (keys.d.pressed) background.position.x = background.position.x - 3
    
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
