const battleBackgroundImage = new Image()
battleBackgroundImage.src = './Images/battleBackground.png'
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
})

let draggle
let emby
let renderedSprites
let queue
let battleAnimationId

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('.dialogue').style.display = 'none'
    document.querySelector('#enemyHealth').style.width = '100%'
    document.querySelector('#userHealth').style.width = '100%'
    document.querySelector('.attacks').replaceChildren()

    draggle = new Monster(monsters.Draggle)
    emby = new Monster(monsters.Emby)
    renderedSprites = [draggle, emby]
    queue = []

    emby.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector(".attacks").append(button)
    })
    // attack button event listener 
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites
      })
  
      if (draggle.health <=0) {
          queue.push(() => {
              draggle.faint()
              })
          queue.push(() => {
              gsap.to('#overlappingDiv', {
                  opacity: 1,
                  onComplete: () => {
                      cancelAnimationFrame(battleAnimationId)
                      animation()
                      document.querySelector('#userInterface').style.display = 'none'
                      gsap.to('#overlappingDiv', {
                          opacity:0
                      })
                      battle.initiated = false
                      audio.map.play()
                      
                  }
              })
          })
      }
      // Enemy attacks
      const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
  
      queue.push(() => {
          draggle.attack({
              attack: randomAttack,
              recipient: emby,
              renderedSprites
            })
  
            if (emby.health <=0) {
              queue.push(() => {
                  emby.faint()
                  })
                  queue.push(() => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animation()
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv', {
                                opacity:0
                            })
                            battle.initiated = false
                            audio.map.play()
                        }
                    })
                })
              }
          })
      })
      // Changes attack type 
      button.addEventListener('mouseenter', (e) => {
          const selectedAttack = attacks[e.currentTarget.innerHTML]
          document.querySelector('#attackType').innerHTML = selectedAttack.type
          document.querySelector('#attackType').style.color = selectedAttack.color
      })
  }) 
}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()

    renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animation()

document.querySelector(".dialogue").addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})