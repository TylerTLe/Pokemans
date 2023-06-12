const battleBackgroundImage = new Image()
battleBackgroundImage.src = './Images/battleBackground.png'
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
})

const draggleImage = new Image()
draggleImage.src = './Images/draggleSprite.png'
const draggle = new Sprite({
  position: {
    x:800,
    y:100
  },
  image: draggleImage,
  frames: {
    max: 4,
    hold: 70
  },
  animate: true,
  isEnemy: true,
  name: "Draggle"
}) 

const embyImage = new Image()
embyImage.src = './Images/embySprite.png'
const emby = new Sprite({
  position: {
    x:280,
    y:325
  },
  image: embyImage,
  frames: {
    max: 4,
    hold: 40
  },
  animate: true,
  name: "Fyre"
}) 

const renderedSprites = [draggle, emby]
function animateBattle() {
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw()

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

// // remove this when pushing code
animateBattle()

const queue = []

// attack button event listener 
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    emby.attack({
      attack: selectedAttack,
      recipient: draggle,
      renderedSprites
    })
    queue.push(() => {
        draggle.attack({
            attack: attacks.Tackle,
            recipient: emby,
            renderedSprites
          })
    })
  })
}) 

document.querySelector(".dialogue").addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})