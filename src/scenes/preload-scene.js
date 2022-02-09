class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene")
    }
    preload() {
        this.load.image("preload-scene-bg", "assets/preload-scene/bg.png")
        this.load.image("preload-scene-logo", "assets/splash-scene/title.png")
        this.load.image("ui-fillbar-top", "assets/preload-scene/fillbar-top.png")
        this.load.image("ui-fillbar-bottom", "assets/preload-scene/fillbar-bottom.png")
        this.load.image("ui-fillbar-aux", "assets/ui/fillbar-aux.png")
        this.load.image("binky", "assets/preload-scene/binky.png")
        this.load.audio("music2", gameConfig.assetsPath + "sounds/music.mp3")
    }
    create() {
        this.scene.start("PreloadScene")
        dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Start Game','label':'{{Helados Espaciales}}','GameCategory':'{{game}}','Show':'{{Agente Binky}}','Vertical Traffic':'{{vertical traffic}}'})
        console.log("Start Game")
    }
}

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene')
    }

    preload() {
        this.music=this.sound.add("music2", {loop:true})
        this.music.play()
        let bg = this.add.image(gWidth/2, gHeight, "preload-scene-bg")
        let logo = this.add.image(gWidth/2, gHeight /2, "preload-scene-logo")
        this.binky = this.add.image(gWidth*0.20, gHeight*0.65+1000, "binky")
        this.time.add
        this.tweens.add({
            targets: logo,
            duration: 120,
            repeat: -1,
            repeatDelay: 2000,
            ease: "Circ",
            yoyo: 1,
            scale: 1.30
        })
        this.tweens.add({
            targets: this.binky,
            y: "-= 1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })
         
        bg.setOrigin(0.5, 1)
        ScaleImageToWidth(bg, gWidth)

        // --- load bar ---
        let bar = new FillBar(this, gWidth/2, gHeight*0.75, gWidth*2, 600, 0)

        this.load.on("progress", (p) => {
            bar.update(p)
        })
        this.load.on("complete", ()=> {
            this.time.delayedCall(200, ()=> {
                this.scene.start("SplashScene")
            })
        })


        // === SPRITE SHEETS ===

        this.load.spritesheet("gems", gameConfig.assetsPath + "game/gems.png", {
            frameWidth: 133.2,
            frameHeight: 135
        })
        this.load.spritesheet("clients", gameConfig.assetsPath + "game/clients.png", {
            frameWidth: 166.75,
            frameHeight: 483
        })
        this.load.spritesheet("numbers", gameConfig.assetsPath + "game/numbers.png", {
            frameWidth: 76,
            frameHeight: 50
        })
        this.load.spritesheet("redAnim", gameConfig.assetsPath + "minigame-scene/redAnim.png", {
            frameWidth: 1080,
            frameHeight: 1080
        })

        // === SOUNDS ===

        this.load.audio("bees", gameConfig.assetsPath + "sounds/bees.mp3")
        this.load.audio("combo1", gameConfig.assetsPath + "sounds/combo1.mp3")
        this.load.audio("combo2", gameConfig.assetsPath + "sounds/combo2.mp3")
        this.load.audio("music", gameConfig.assetsPath + "sounds/music.mp3")
        this.load.audio("truck", gameConfig.assetsPath + "sounds/truck.mp3")
        this.load.audio("wrong", gameConfig.assetsPath + "sounds/wrong.mp3")
        this.load.audio("coin", gameConfig.assetsPath + "sounds/coin.mp3")

        this.load.audio("atencion", gameConfig.assetsPath + "sounds/atencion.mp3")
        this.load.audio("help1", gameConfig.assetsPath + "sounds/help1.mp3")
        this.load.audio("help2", gameConfig.assetsPath + "sounds/help2.mp3")
        this.load.audio("splashLocucion", gameConfig.assetsPath + "sounds/splashLocucion.mp3")
        this.load.audio("win", gameConfig.assetsPath + "sounds/win.mp3")
        this.load.audio("lose", gameConfig.assetsPath + "sounds/lose.mp3")
        this.load.audio("helpBee", gameConfig.assetsPath + "sounds/helpMiniJuego.mp3")
        this.load.audio("sinMovimientos", gameConfig.assetsPath + "sounds/sinMovimientos.mp3")
        this.load.audio("check", gameConfig.assetsPath + "sounds/check.mp3")
        

        // === UI ===
        this.loadElements([
            
        ], "ui", "image")

         // === BUTTONS ===
        this.loadElements([
            "pause",
            "sound",
            "music",
            "home",
            "help",
            "close",
            "rigth",
            "left",
            "restart"
        ], "buttons", "image")

        // === GAME SCENE ===
        this.loadElements([
            "bggame",
            "planilla",
            "btn-pause",
            "binky",
            "truck",
            "lifes",
            "flags",
            "client1",
            "client2",
            "client3",
            "client4",
            "redline",
            "combox3-brown",
            "combox3-green",
            "combox3-orange",
            "combox3-pink",
            "combox3-yellow",
            "combo4",
            "excelent",
            "0",
            "1",
            "2",
            "3",
            "brown",
            "pink",
            "yellow",
            "green",
            "orange",
            "x1",
            "x2",
            "x3",
            "x4",
            "x5",
            "floor-green",
            "floor-pink",
            "floor-white",
            "floor-yellow",
            "500",
            "bar-top",
            "bar-bottom",
            "miniicecream",
            "mezclando",
            "toca",
            "check",
        ], "game", "image")

        // === SPLASH SCENE ===
        this.loadElements([
            "starts",
            "bgsplash",
            "btn-play",
            "title",
            "main-bee1",
            "main-bee2",
            "main-bee3",
            "green",
            "purple",
            "turtle",
            "fish",
            "binky"
        ], "splash-scene", "image")
            
        // === PAUSE SCENE ===
        this.loadElements([
            "pause",
            "bg-pause"
        ], "pause-scene", "image")

        // === HELP SCENE ===
        this.loadElements([
            "help",
            "helpp",
            "help1",
            "help2",
            "help3",
            "brown-icecream",
            "green-icecream",
            
        ], "help-scene", "image")

        // === VICTORY SCENE ===
        this.loadElements([
            "characters-victory",
            "victory",
            "icecream-left",
            "icecream-center",
            "icecream-rigth"

        ], "victory-scene", "image")

        // === DEFEAT SCENE ===
        this.loadElements([
            "defeat",
            "binky-defeat",
            "bee",
        ], "defeat-scene", "image")

        // === MINIGAME SCENE ===
        this.loadElements([
            "minigame",
            "red",
            "cursor",
            "bee1",
            "bee2",
            "bee3",
            "bar-top",
            "bar-bottom",
            "conter"
        ], "minigame-scene", "image")

         // === FINISH SCENE ===
         this.loadElements([
            
        ], "finish-scene", "image")
    }

    loadElements(array, folder, type) {
        for (let elem of array) {
            switch(type) {
                case "image": {
                    this.load.image(folder + "-" + elem, gameConfig.assetsPath + folder + "/" + elem + ".png")
                    break
                }
            }
        }
    }
}
