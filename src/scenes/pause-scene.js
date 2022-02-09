class PauseScene extends Phaser.Scene {
    constructor() {
        super("PauseScene")
    }

    create(){
        this.add.image(gWidth/2, gHeight/2, "pause-scene-bg-pause")
        this.pause=this.add.image(gWidth/2, gHeight/2-1000, "pause-scene-pause")
        gLastScene="PauseScene"
        this.music=this.sound.add("music", {loop:true})
        this.music.play()

        this.btnClose = new Button(this, gWidth*0.68, gHeight * 0.38-1000, "buttons-close", {
            onClick: ()=> {
                this.tweens.add({
                    targets: [this.btnClose, this.btnHelp, this.btnHome, this.btnMusic, this.btnSound, this.pause],
                    y: "-= 1000",
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

        this.btnMusic = new Button(this, gWidth*0.38, gHeight * 0.53-1000, "buttons-music", {
            onClick: ()=> {
                gMusic=gMusic*-1
            }
        })
        
        this.btnSound = new Button(this, gWidth*0.46, gHeight * 0.53-1000, "buttons-sound", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Helados Espaciales}}','GameCategory':'{{game}}','Show':'{{Agente Binky}'})
                console.log("DKW - Sound")
                gSound=gSound*-1
            }
        })

        this.btnHelp = new Button(this, gWidth*0.54, gHeight * 0.53-1000, "buttons-help", {
            onClick: ()=> {
                this.tweens.add({
                    targets: [this.btnClose, this.btnHelp, this.btnHome, this.btnMusic, this.btnSound, this.pause],
                    y: "-= 1000",
                    ease: "Back",
                    duration: 600
                })
                this.timer1 = this.time.addEvent({
                    delay: 300,
                    loop: false,
                    callback: () => {
                        this.BackHelp();
                    }
                })
            }
        })

        this.btnHome = new Button(this, gWidth*0.62, gHeight *0.53-1000, "buttons-home", {
            onClick: ()=> {
                this.sound.stopAll()
                this.scene.stop()
                this.scene.start("SplashScene")
            }
        })

        this.tweens.add({
            targets: [this.btnClose, this.btnHelp, this.btnHome, this.btnMusic, this.btnSound, this.pause],
            y: "+= 1000",
            ease: "Back",
            duration: 600
        })

    }

    Back(){
        this.scene.stop()
        this.scene.resume("PlayGame")
    }

    BackHelp(){
        this.scene.stop()
        this.scene.launch("HelpScene")
    }

    update(){
        if(gMusic==-1){
            this.music.setMute(true)
        }
        else{
            this.music.setMute(false)
        }
    }
}