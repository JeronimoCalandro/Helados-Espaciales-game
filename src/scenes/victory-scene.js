class VictoryScene extends Phaser.Scene {
    constructor() {
        super("VictoryScene")
    }

    create(){
        dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Successful - Level {{Level}}','label':'{{Helados Espaciales}}','GameCategory':'{{game}}','Show':'{{Agente Binky}}'})
        console.log("DKW - Successful Level")
        this.bg=this.add.image(gWidth/2, gHeight/2, "pause-scene-bg-pause")
        this.victory=this.add.image(gWidth/2, gHeight/2-1000, "victory-scene-victory")
        this.characters=this.add.image(gWidth*0.30, gHeight*0.50+1000, "victory-scene-characters-victory")
        this.ice1=this.add.image(gWidth*0.43, gHeight*0.67, "victory-scene-icecream-left").setAlpha(0)
        this.ice2=this.add.image(gWidth*0.50, gHeight*0.63, "victory-scene-icecream-center").setAlpha(0)
        this.ice3=this.add.image(gWidth*0.57, gHeight*0.67, "victory-scene-icecream-rigth").setAlpha(0)
        this.text=this.add.text(gWidth*0.55,gHeight*0.45-1000, gPoints,{      
            fontSize:"40px",
            fill:"#f09800",
            fontFamily:"verdana,arial,sans-serif",
            stroke: "#f09800",
            strokeThickness: 4
        })
        this.win=this.sound.add("win", {loop:false})
        if(gSound==1){
            this.win.play()
        }
        gMiniGame=1

        this.btnHome = new Button(this, gWidth*0.68, gHeight * 0.67-1000, "buttons-home", {
            onClick: ()=> {
                this.sound.stopAll()
                this.scene.stop()
                this.scene.start("SplashScene")
            }
        })

        this.btnPlay = new Button(this, gWidth*0.73, gHeight * 0.80-1000, "splash-scene-btn-play", {
            onClick: ()=> {
                this.tweens.add({
                    targets: [this.btnPlay, this.btnHome, this.victory, this.ice1, this.ice2, this.ice3, this.text],
                    y: "-= 1000",
                    ease: "Back",
                    duration: 600
                })
                this.tweens.add({
                    targets: this.characters,
                    y: "+= 1000",
                    ease: "Back",
                    duration: 600
                })
                this.timer1 = this.time.addEvent({
                    delay: 300,
                    loop: false,
                    callback: () => {
                        this.Back();
                    }
                })
            }
        })

        this.timer5 = this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                this.Repeat();
            }
        })

        this.timer2 = this.time.addEvent({
            delay: 400,
            loop: false,
            callback: () => {
                this.Left();
            }
        })
        this.timer2 = this.time.addEvent({
            delay: 700,
            loop: false,
            callback: () => {
                this.Center();
            }
        })
        this.timer4 = this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
                this.Rigth();
            }
        })
        
        this.tweens.add({
            targets: [this.btnPlay, this.btnHome, this.victory, this.text],
            y: "+= 1000",
            ease: "Back",
            duration: 600
        })
        this.tweens.add({
            targets: this.characters,
            y: "-= 1000",
            ease: "Back",
            duration: 600
        })
    }

    Back(){
        this.sound.stopAll()
        this.scene.stop()
        this.scene.start("PlayGame")
    }

    Left(){
        this.ice1.setAlpha(1)
        this.tweens.add({
            targets: this.ice1,
            scale: 1.30,
            ease: "Circ",
            duration: 600,
            repeat: 0,
            yoyo: 1
        })
    }

    Center(){
        this.ice2.setAlpha(1)
        this.tweens.add({
            targets: this.ice2,
            scale: 1.30,
            ease: "Circ",
            duration: 600,
            repeat: 0,
            yoyo: 1
        })
    }

    Rigth(){
        this.ice3.setAlpha(1)
        this.tweens.add({
            targets: this.ice3,
            scale: 1.30,
            ease: "Circ",
            duration: 600,
            repeat: 0,
            yoyo: 1
        })
    }

    Repeat(){
        this.timer2 = this.time.addEvent({
            delay: 400,
            loop: false,
            callback: () => {
                this.Left();
            }
        })
        this.timer2 = this.time.addEvent({
            delay: 700,
            loop: false,
            callback: () => {
                this.Center();
            }
        })
        this.timer4 = this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
                this.Rigth();
            }
        })
    }
}