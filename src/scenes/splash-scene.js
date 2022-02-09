class SplashScene extends Phaser.Scene {
    constructor() {
        super("SplashScene")
    }

    create()
    {
        this.sound.stopAll()
        this.add.image(gWidth/2, gHeight/2, "splash-scene-bgsplash")
        this.starts=this.physics.add.image(gWidth/2, gHeight*0.40-1000, "splash-scene-starts")
        this.bee2=this.physics.add.image(gWidth*0.30, gHeight*0.33-1000, "splash-scene-main-bee2").setVelocityX(-140)
        this.bee1=this.physics.add.image(gWidth*0.70, gHeight*0.40-1000, "splash-scene-main-bee1").setVelocityX(80)
        this.bee3=this.physics.add.image(gWidth*0.70, gHeight*0.20-1000, "splash-scene-main-bee3").setVelocityX(200)
        this.music=this.sound.add("music", {loop:true})
        this.splash=this.sound.add("splashLocucion", {loop:false})
        gMiniGame=1
        gLastScene="SplashScene"
        if(gSound==1){
            this.music.play()
            this.splash.play()
        }
        
        this.tweens.add({
            targets: this.add.image(gWidth/2, gHeight *0.60, "splash-scene-title").setScale(1.30,1.30),
            duration: 120,
            repeat: -1,
            repeatDelay: 500,
            ease: "Circ",
            yoyo: 1,
            scale: 1.50
        })

        

        this.green = this.add.image(gWidth*0.07, gHeight*0.87+1000, "splash-scene-purple")
        this.purple = this.add.image(gWidth*0.17, gHeight*0.85+1000, "splash-scene-green")
        this.turtle = this.add.image(gWidth*0.27, gHeight*0.88+1000, "splash-scene-turtle")
        this.fish = this.add.image(gWidth*0.73, gHeight*0.83+1000, "splash-scene-fish")
        this.binky = this.add.image(gWidth*0.90, gHeight*0.80+1000, "splash-scene-binky")
        

        this.tweens.add({
            targets: this.green,
            y: "-= 1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })
        this.tweens.add({
            targets: this.purple,
            y: "-= 1000",
            ease: "Back",
            delay: 400,
            duration: 600
        })
        this.tweens.add({
            targets: this.turtle,
            y: "-= 1000",
            ease: "Back",
            delay: 500,
            duration: 600
        })
        this.tweens.add({
            targets: this.fish,
            y: "-= 1000",
            ease: "Back",
            delay: 600,
            duration: 600
        })
        this.tweens.add({
            targets: this.binky,
            y: "-= 1000",
            ease: "Power3",
            delay: 700,
            duration: 600
        })

        this.btnPlay = new Button(this, gWidth/2, gHeight * 0.85 + 400, "splash-scene-btn-play", {
            onClick: ()=> {
                this.splash.stop()
                this.music.stop()
                this.scene.start("PlayGame")
            }
        })

        this.btnMusic = new Button(this, gWidth*0.825, gHeight * 0.10-1000, "buttons-music", {
            onClick: ()=> {
                gMusic=gMusic*-1
            }
        })
        
        this.btnSound = new Button(this, gWidth*0.89, gHeight * 0.10-1000, "buttons-sound", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Helados Espaciales}}','GameCategory':'{{game}}','Show':'{{Agente Binky}'})
                console.log("DKW - Sound")
                gSound=gSound*-1
            }
        })

        this.btnHelp = new Button(this, gWidth*0.95, gHeight * 0.097-1000, "buttons-help", {
            onClick: ()=> {
                this.scene.pause()
                this.scene.launch("HelpScene")
            }
        })


        this.tweens.add({
            targets: [this.starts, this.bee1, this.bee2, this.bee3, this.btnMusic, this.btnSound, this.btnHelp],
            y: "+= 1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })

        /*this.btnHelp =new Button(this, gWidth*0.95, gHeight * 0.10-1000, "ui-btn-help", {
            onClick: ()=>{
                this.scene.pause()
                this.scene.launch("HelpScene")
            }
        })

        this.btnSound = new Button(this, gWidth*0.87, gHeight * 0.10-1000, "ui-btn-sound", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                g_music=g_music*-1;
                if(g_music==1){
                    this.sound.stopAll()
                    this.splash.play();
                }
                else{
                    this.sound.stopAll()
                }
            }
        })

        this.btnMute = new Button(this, gWidth*0.87, gHeight * 0.10-1000, "ui-btn-mute", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                g_music=g_music*-1;
                if(g_music==1){
                    this.sound.stopAll()
                    this.splash.play();
                }
                else{
                    this.sound.stopAll()
                }
            }
        })
        this.btnMute.setScale(0.80,0.80)*/

        this.tweens.add({
            targets: this.btnPlay,
            y: "+= -400",
            ease: "Back",
            delay: 300,
            duration: 600
        })

        /*this.tweens.add({
            targets: [this.btnHelp, this.btnSound, this.btnMute],
            y: "+= 1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })*/

        // -- flash --
        this.tweens.add({
            targets: this.add.rectangle(0, 0, gWidth, gHeight, 0xffffff, 1).setOrigin(0, 0),
            alpha: 0,
            duration: 200,
            delay: 100
        })
    }

    update(){
        
        if(this.bee1.x>gWidth*0.90){
            this.bee1.setVelocityX(-80)
            this.bee1.flipX=true
        }
        else if(this.bee1.x<200){
            this.bee1.setVelocityX(80)
            this.bee1.flipX=false
        }

        if(this.bee2.x>gWidth*0.90){
            this.bee2.setVelocityX(-140)
            this.bee2.flipX=false
        }
        else if(this.bee2.x<gWidth*0.10){
            this.bee2.setVelocityX(140)
            this.bee2.flipX=true
        }

        if(this.bee3.x>gWidth*0.90){
            this.bee3.setVelocityX(-200)
            this.bee3.flipX=true
        }
        else if(this.bee3.x<gWidth*0.10){
            this.bee3.setVelocityX(200)
            this.bee3.flipX=false
        }


        if(gMusic==-1){
            this.music.setMute(true)
        }
        else{
            this.music.setMute(false)
        }
        
    }
}