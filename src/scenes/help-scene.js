class HelpScene extends Phaser.Scene {
    constructor() {
        super("HelpScene")
    }

    create(){
        this.add.image(gWidth/2, gHeight/2, "pause-scene-bg-pause")
        this.help=this.add.image(gWidth/2, gHeight/2-1000, "help-scene-help").setVisible(false)
        this.helpp=this.add.image(gWidth/2, gHeight/2-1000, "help-scene-helpp")
        this.help1=this.add.image(gWidth/2, gHeight*0.68-1000, "help-scene-help1")
        this.help2=this.add.image(gWidth/2, gHeight*0.68-1000, "help-scene-help2").setVisible(false)
        this.help3=this.add.image(gWidth/2, gHeight*0.68-1000, "help-scene-help3").setVisible(false)
        this.green=this.add.image(gWidth*0.525, gHeight*0.59-1000, "help-scene-green-icecream")
        this.brown=this.add.image(gWidth*0.473, gHeight*0.59-1000, "help-scene-brown-icecream")
        this.brown2=this.add.image(gWidth*0.525, gHeight*0.47-1000, "help-scene-brown-icecream")
        this.brown3=this.add.image(gWidth*0.525, gHeight*0.705-1000, "help-scene-brown-icecream")
        this.atencion=this.sound.add("atencion", {loop:false})
        this.help4=this.sound.add("help1", {loop:false})
        this.help5=this.sound.add("help2", {loop:false})
        this.help6=this.sound.add("sinMovimientos", {loop:false})
        this.aux1=1
        this.aux2=1
        this.aux3=1
        if(gSound==1){
            this.atencion.play()
        }
        this.helpcont=1
        this.aux=0

        this.btnClose = new Button(this, gWidth*0.75, gHeight * 0.25-1000, "buttons-close", {
            onClick: ()=> {
                this.tweens.add({
                    targets: [this.btnRigth, this.btnLeft, this.btnClose, this.help1, this.help2, this.help, this.help3, this.brown, this.brown2, this.brown3, this.green, this.helpp],
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
                this.atencion.stop()
                this.help4.stop()
                this.help5.stop()
                this.help6.stop()
            }
        })

        this.btnLeft = new Button(this, gWidth*0.25, gHeight*0.53-1000, "buttons-left", {
            onClick: ()=> {
                this.helpcont--
                this.help4.stop()
                this.help5.stop()
                this.help6.stop()
                console.log(this.helpcont)
                if(gSound==1){
                    if(this.helpcont==1){
                        this.help4.play() 
                    }
                    else if(this.helpcont==2){
                        this.help5.play()
                    }
                             
                }
            }
        })
        this.btnRigth = new Button(this, gWidth*0.75, gHeight*0.53-1000, "buttons-rigth", {
            onClick: ()=> {
                this.helpcont++
                this.help4.stop()
                this.help5.stop()
                this.help6.stop()
                if(gSound==1){
                    if(this.helpcont==2){
                        this.help5.play() 
                    }
                    else if(this.helpcont==3){
                        this.help6.play()
                    }
                }
            }
        })

        this.tweens.add({
            targets: [this.btnRigth, this.btnLeft, this.btnClose, this.help1, this.help2, this.help, this.help3, this.brown, this.brown2, this.brown3, this.green, this.helpp],
            y: "+= 1000",
            ease: "Back",
            duration: 600
        })

        this.tweens.add({
            targets: this.brown,
            x: "+= 120",
            ease: "Power3",
            duration: 600,
            yoyo: 1,
            repeat: -1,
            repeatDelay: 2500,
            delay: 500
        })

        this.tweens.add({
            targets: this.green,
            x: "-= 120",
            ease: "Power3",
            duration: 600,
            yoyo: 1,
            repeat: -1,
            repeatDelay: 2500,
            delay: 500
        })

        this.timer2 = this.time.addEvent({
            delay: 4000,
            loop: false,
            callback: () => {
                this.Aux();
            }
        })
    }

    update(){
        if(this.helpcont==1){
            this.help1.setVisible(true)
            this.help2.setVisible(false)
            this.help2.setVisible(false)
            this.btnLeft.setVisible(false)
            this.btnRigth.setVisible(true)
            this.brown.setVisible(true)
            this.brown2.setVisible(true)
            this.brown3.setVisible(true)
            this.green.setVisible(true)
            this.help.setVisible(false)
            this.helpp.setVisible(true)
            this.help5.stop()
        }
        else if(this.helpcont==2){       
            this.help1.setVisible(false)
            this.help2.setVisible(true)
            this.help3.setVisible(false)
            this.btnLeft.setVisible(true)
            this.btnRigth.setVisible(true)
            this.brown.setVisible(false)
            this.brown2.setVisible(false)
            this.brown3.setVisible(false)
            this.green.setVisible(false)
            this.help.setVisible(true)
            this.helpp.setVisible(false)
            this.atencion.stop()
            this.help4.stop()
            this.help6.stop()
            
        }
        else{
            this.help1.setVisible(false)
            this.help2.setVisible(false)
            this.help3.setVisible(true)
            this.btnLeft.setVisible(true)
            this.btnRigth.setVisible(false)
            this.help.setVisible(true)
            this.helpp.setVisible(false)
            this.help5.stop()
        }
    }

    Back(){
        if(gLastScene=="PlayGame"){
            this.scene.stop()
            this.scene.resume(gLastScene)
        }
        else if(gLastScene=="PauseScene"){
            this.sound.stopAll()
            this.scene.stop()
            this.scene.launch("PauseScene")
        }
        else{
            this.scene.stop()
            this.scene.resume("SplashScene")
        }
        
    }

    Aux(){
        this.aux=1
    }
}