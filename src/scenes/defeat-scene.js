class DefeatScene extends Phaser.Scene {
    constructor() {
        super("DefeatScene")
    }

    create(){
        this.bg=this.add.image(gWidth/2, gHeight/2, "pause-scene-bg-pause")
        this.defeat=this.add.image(gWidth/2, gHeight/2-1000, "defeat-scene-defeat")
        this.binky=this.add.image(gWidth*0.25, gHeight*0.60+1000, "defeat-scene-binky-defeat")
        this.bee1=this.physics.add.image(gWidth*0.40, gHeight*0.35+1000, "defeat-scene-bee").setVelocityX(200)
        this.bee2=this.physics.add.image(gWidth*0.20, gHeight*0.55+1000, "defeat-scene-bee").setVelocityX(-140)
        this.bee2.flipX=true
        this.bee3=this.physics.add.image(gWidth*0.45, gHeight*0.65+1000, "defeat-scene-bee").setVelocityX(80)
        this.lose=this.sound.add("lose", {loop:false})
        if(gSound==1){
            this.lose.play()
        }
        gMiniGame=1

        this.beesSound=this.sound.add("bees", {loop:true})
        if(gSound==1){
            this.beesSound.play()
        }

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
                    targets: [this.btnPlay, this.btnHome, this.defeat],
                    y: "-= 1000",
                    ease: "Back",
                    duration: 600
                })
                this.tweens.add({
                    targets: [this.binky, this.bee1, this.bee2, this.bee3],
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
        
        this.tweens.add({
            targets: [this.btnPlay, this.btnHome, this.defeat],
            y: "+= 1000",
            ease: "Back",
            duration: 600
        })
        this.tweens.add({
            targets: [this.binky, this.bee1, this.bee2, this.bee3],
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

    update(){
        
        if(this.bee1.x>gWidth*0.70){
            this.bee1.setVelocityX(-200)
            this.bee1.flipX=true
        }
        else if(this.bee1.x<gWidth*0.15){
            this.bee1.setVelocityX(200)
            this.bee1.flipX=false
        }

        if(this.bee2.x>gWidth*0.70){
            this.bee2.setVelocityX(-140)
            this.bee2.flipX=true
        }
        else if(this.bee2.x<gWidth*0.15){
            this.bee2.setVelocityX(140)
            this.bee2.flipX=false
            
        }

        if(this.bee3.x>gWidth*0.70){
            this.bee3.setVelocityX(-80)
            this.bee3.flipX=true
        }
        else if(this.bee3.x<gWidth*0.15){
            this.bee3.setVelocityX(80)
            this.bee3.flipX=false
        }


        if(gSound==-1){
            this.beesSound.setMute(true)
        }
        else{
            this.beesSound.setMute(false)
        }
        
    }

}