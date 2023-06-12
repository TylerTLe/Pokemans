const embyImage = new Image()
embyImage.src = './Images/embySprite.png'

const draggleImage = new Image()
draggleImage.src = './Images/draggleSprite.png'

const monsters = {
    Emby: {
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
        name: "Fyre",
        attacks: [attacks.Tackle, attacks.Fireball]
      },
    Draggle: {
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
        name: "Draggle",
        attacks: [attacks.Tackle, attacks.Fireball]
      }
}


