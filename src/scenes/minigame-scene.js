class MinigameScene extends Phaser.Scene {
    constructor() {
        super("MinigameScene")
    }

    create(){
        this.cont=1000
        this.bg=this.add.image(gWidth/2, gHeight/2, "pause-scene-bg-pause")
        this.minigame=this.add.image(gWidth/2, gHeight/2-1000, "minigame-scene-minigame")
        this.bar = new BarMinigame(this, gWidth*0.67, gHeight*0.65-1000, gWidth*2, 600, 0)
        this.conter=this.add.image(gWidth*0.673, gHeight*0.33-1000, "minigame-scene-conter")
        this.text=this.add.text(gWidth*0.66, gHeight*0.308-1000, this.cont,{      
            fontSize:"50px",
            fill:"#ef9700",
            fontFamily:"verdana,arial,sans-serif",
            stroke: "#ef9700",
            strokeThickness: 7
        });
        this.aux=0
        this.red=this.physics.add.sprite(0,0, "redAnim").setVisible(false)
        this.anims.create({
            key: "redAnim",
            frames: this.anims.generateFrameNumbers("redAnim", {start: 5, end: 15 }),
            frameRate: 20,
            repeat: 0
        })
        let thisScene=this
        this.beesSound=this.sound.add("bees", {loop:true})
        this.helpBee=this.sound.add("helpBee", {loop:false})
        if(gSound==1){
            this.beesSound.play()
            this.helpBee.play()
        }

        

    // =============================================  ABEJAS  =========================================================
        this.beesGroup = this.physics.add.group({
            frameQuantity: 100,
        })
        this.beesChildren=this.beesGroup.getChildren()

        this.bees=["minigame-scene-bee1","minigame-scene-bee2","minigame-scene-bee3"]
        this.vAux=[]
        this.y=450
        for(var i=0; i<25; i++){
            this.beesChildren[i]=this.beesGroup.create(Phaser.Math.Between(950,1400), this.y-1000, this.bees[Phaser.Math.Between(0,2)])
            this.vAux[i]=Phaser.Math.Between(80,200)
            this.beesChildren[i].setVelocityX(this.vAux[i]).setInteractive()
            this.beesChildren[i].setSize(500,500)
            this.y+=20
        }
// ================================================================================================================

        this.timer1 = this.time.addEvent({
            delay: 100,
            loop: false,
            callback: () => {
                this.Start();
            }
        })

        this.timer2 = this.time.addEvent({
            delay: 1,
            loop: true,
            callback: () => {
                this.Conter();
            }
        })

        this.timer3 = this.time.addEvent({
            delay: 2500,
            loop: true,
            callback: () => {
                this.Spawner();
            }
        })

        this.tweens.add({
            targets: [this.btnPlay, this.minigame, this.bar, this.conter, this.text],
            y: "+= 1000",
            ease: "Back",
            duration: 600
        })

        for(var i=0; i<25; i++){
            this.tweens.add({
                targets: this.beesChildren[i],
                y: "+= 1000",
                ease: "Back",
                duration: 600
            })
        }
        
        this.beesChildren[0].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[0])
            thisScene.beesChildren[0].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[1].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[1])
            thisScene.beesChildren[1].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[2].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[2])
            thisScene.beesChildren[2].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[3].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[3])
            thisScene.beesChildren[3].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[4].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[4])
            thisScene.beesChildren[4].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[5].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[5])
            thisScene.beesChildren[5].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[6].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[6])
            thisScene.beesChildren[6].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[7].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[7])
            thisScene.beesChildren[7].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[1].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[1])
            thisScene.beesChildren[1].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[8].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[8])
            thisScene.beesChildren[8].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[9].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[9])
            thisScene.beesChildren[9].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[10].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[10])
            thisScene.beesChildren[10].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[11].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[11])
            thisScene.beesChildren[11].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[12].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[12])
            thisScene.beesChildren[12].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[13].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[13])
            thisScene.beesChildren[13].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[14].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[14])
            thisScene.beesChildren[14].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[15].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[15])
            thisScene.beesChildren[15].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[16].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[16])
            thisScene.beesChildren[16].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[17].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[17])
            thisScene.beesChildren[17].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[18].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[18])
            thisScene.beesChildren[18].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[19].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[19])
            thisScene.beesChildren[19].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[20].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[20])
            thisScene.beesChildren[20].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[21].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[21])
            thisScene.beesChildren[21].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[22].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[22])
            thisScene.beesChildren[22].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[23].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[23])
            thisScene.beesChildren[23].body.enable=false
            thisScene.aux++
        })
        this.beesChildren[24].on("pointerdown", ()=>{
            thisScene.red.anims.play("redAnim", true)
            thisScene.beesGroup.killAndHide(thisScene.beesChildren[24])
            thisScene.beesChildren[24].body.enable=false
            thisScene.aux++
        })
    }

    update(){
        if(gSound==-1){
            this.beesSound.setMute(true)
        }
        else{
            this.beesSound.setMute(false)
        }

        let thisScene= this
        for(var i=0; i<25; i++){
            if(this.beesChildren[i].x>1400){
                this.beesChildren[i].setVelocityX(this.vAux[i]*-1)
                this.beesChildren[i].flipX=true
            }
            if(this.beesChildren[i].x<950){
                this.beesChildren[i].setVelocityX(this.vAux[i])
                this.beesChildren[i].flipX=false
            }
        }


        if(this.cont<=0){
            this.beesSound.stop()
            this.tweens.add({
                targets: [this.btnPlay, this.minigame, this.bar, this.conter, this.text],
                y: "-= 2000",
                ease: "Back",
                duration: 600
            })
            for(var i=0; i<25; i++){
                this.tweens.add({
                    targets: this.beesChildren[i],
                    y: "-= 1000",
                    ease: "Back",
                    duration: 600
                })
            }
            this.timer1 = this.time.addEvent({
                delay: 500,
                loop: false,
                callback: () => {
                    this.Back();
                }
            })
        }   
        this.text.setText(this.aux);
        if(this.aux>=10 && this.aux<=11){
            this.text.setPosition(gWidth*0.653,gHeight*0.308)
        }
        this.bar.update(this.cont*0.001)
        gPoints=this.aux*100
    }

    Start(){
        let thisScene=this
        this.input.on("pointermove", function (pointer){
            thisScene.red.setVisible(true).setPosition(pointer.x, pointer.y).setScale(0.50,0.50)
            thisScene.red.flipX=true
        }, this) 
    }

    Back(){
        gMiniGame=0
        this.scene.stop()
        this.scene.resume("PlayGame")
    }

    Conter(){
        if(this.cont>-1){
            this.cont--
        }
    }

    Spawner(){
        this.y=450
        for(var i=25; i<50; i++){
            this.beesChildren[i]=this.beesGroup.create(Phaser.Math.Between(950,1400), this.y-1000, this.bees[Phaser.Math.Between(0,2)])
            this.vAux[i]=Phaser.Math.Between(80,200)
            this.beesChildren[i].setVelocityX(this.vAux[i])
            this.y+=20
        }
    }
}
