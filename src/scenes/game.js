let game;
let gameOptions = {
    fieldSize: 6,
    gemColors: 5,
    gemSize: 135,
    swapSpeed: 200,
    fallSpeed: 100,
    destroySpeed: 200,
    marginLeft: 1330,
    marginTop: 132
}
var gWidth = 2380;
var gHeight = 1080;
const HORIZONTAL = 1;
const VERTICAL = 2;

/*window.onload = function() {
    let gameConfig = {
        width: 2380,
        height: 1080,
        scene: playGame,
    }
    game = new Phaser.Game(gameConfig);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}*/
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    create(){
        
        this.background=this.add.image(gWidth/2, gHeight/2, "game-bggame")
        this.redline=this.add.image(gWidth*0.36, gHeight*0.57, "game-redline")
        var xPosition = -8500
        this.clients = ["game-client1","game-client3", "game-client2", "game-client4"]
        this.flavors = ["game-pink", "game-brown", "game-green", "game-orange", "game-yellow" ]
        var y = [250, 420, 600, 750]
        var xPosition = -8500
        this.lastClient = 49
        this.lifes=3
        this.orange = 0
        this.pink = 0
        this.green = 0
        this.yellow = 0
        this.brown = 0
        this.vAux = []
        this.vAuxClients = []
        this.floor = ["game-floor-pink","game-floor-green","game-floor-white","game-floor-yellow"]
        this.filesCompleted = 0
        this.points=0
        this.barAux=0
        this.bar = new Bar(this, gWidth*0.23, gHeight*0.955, gWidth*2, 600, 0)
        this.combo1=this.sound.add("combo1", {loop:false})
        this.combo2=this.sound.add("combo2", {loop:false})
        this.wrong=this.sound.add("wrong", {loop:false})
        this.music=this.sound.add("music", {loop:true})
        this.coin=this.sound.add("coin", {loop:false})
        this.check=this.sound.add("check", {loop:false})
        this.floor1=this.add.image(0, 0, this.floor[0]).setAlpha(0)
        this.floor2=this.add.image(0, 0, this.floor[1]).setAlpha(0)
        this.floor3=this.add.image(0, 0, this.floor[2]).setAlpha(0)
        this.floor4=this.add.image(0, 0, this.floor[3]).setAlpha(0)
        this.floor5=this.add.image(0, 0, this.floor[1]).setAlpha(0)
        this.totalPoints=0
        this.lifesAux=0
        const layer4 = this.add.layer()
        const layer3 = this.add.layer()
        const layer2 = this.add.layer()
        const layer1 = this.add.layer()
        if(gMusic==1){
            this.music.play()
        }

        this.btnPause = new Button(this, gWidth*0.95, gHeight * 0.07-1000, "buttons-pause", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Pause','label':'{{Helados Espaciales}}','GameCategory':'{{game}}','Show':'{{Agente Binky}}'})
                console.log("DKW - Pause")
                this.sound.stopAll()
                this.scene.pause()
                this.scene.launch("PauseScene")
            }
        })

        this.btnMusic = new Button2(this, gWidth*0.825, gHeight * 0.07-1000, "buttons-music", {
            onClick: ()=> {
                gMusic=gMusic*-1
            }
        })
        this.btnMusic.setScale(0.85,0.85)
        
        this.btnSound = new Button2(this, gWidth*0.89, gHeight * 0.07-1000, "buttons-sound", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Helados Espaciales}}','GameCategory':'{{game}}','Show':'{{Agente Binky}'})
                console.log("DKW - Sound")
                gSound=gSound*-1
            }
        })
        this.btnSound.setScale(0.85,0.85)

        this.btnRestart = new Button(this, gWidth*0.95+1000, gHeight * 0.45, "buttons-restart", {
            onClick: ()=> {
                destroyGems()
                function destroyGems(){
                    let destroyed = 0;
                    for(let i = 0; i < gameOptions.fieldSize; i ++){
                        for(let j = 0; j < gameOptions.fieldSize; j ++){
                            
                                destroyed ++;
                                thisScene.tweens.add({
                                    targets: thisScene.gameArray[i][j].gemSprite,
                                    alpha: 0.5,
                                    duration: gameOptions.destroySpeed,
                                    callbackScope: thisScene,
                                    onComplete: function(){
                                        destroyed --;
                                        thisScene.gameArray[i][j].gemSprite.visible = false;
                                        thisScene.poolArray.push(thisScene.gameArray[i][j].gemSprite);
                                        if(destroyed == 0){
                                            thisScene.makeGemsFall();
                                            thisScene.replenishField();
                                        }
                                    }
                                });
                                thisScene.gameArray[i][j].isEmpty = true;
                            
                        }
                    }
                    thisScene.tweens.add({
                        targets: thisScene.mezclando,
                        alpha: { from: 0, to: 1 },
                        ease: 'Linear',      
                        duration: 800,
                        repeat: 0,
                        yoyo: true           
                    })
                }
            }
        })

        this.tweens.add({
            targets: [this.btnSound, this.btnMusic, this.btnPause],
            y: "+= 1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })
        this.tweens.add({
            targets: [this.btnRestart],
            x: "-= 1000",
            ease: "Back",
            delay: 400,
            duration: 600
        })
        
        this.clientsGroup = this.physics.add.group({
            frameQuantity: 50,
        })
        this.clientsChildren=this.clientsGroup.getChildren()

        this.flavorsGroup = this.physics.add.group({
            frameQuantity: 50,
        })
        this.flavorsChildren=this.flavorsGroup.getChildren()

        this.floorGroup = this.physics.add.group({
            frameQuantity: 0,
        })
        this.floorChildren=this.floorGroup.getChildren()
        
      
        var clientRepeat = -1
        var clientRepeat2 = -1
        var yPositionRepeat = -1
        var aux2 
        var aux3
        var flavorRepeat = -1
        var flavorRepeat2 = -1
        var flavorRepeat3 = -1
        var flavorRepeat4 = -1

        // =======================================  SPAWNER DE CLIENTES Y PEDIDOS ==========================================

        for(var i=0; i<50; i++){
            while(aux==clientRepeat || aux==clientRepeat2){
                var aux = Phaser.Math.Between(0,3)
            }
            
            if(aux>1){
                while(yPosition==yPositionRepeat){
                    var yPosition = Phaser.Math.Between(1,3)
                }
            }
            else{
                while(yPosition==yPositionRepeat){
                    var yPosition = Phaser.Math.Between(0,3)
                }
            }
 
            // CLIENTES
            if(yPosition==0){
                this.clientsChildren[i]=this.clientsGroup.create(-1000,-1000,this.clients[aux])
                this.clientsChildren[i].x=xPosition
                this.clientsChildren[i].y=y[yPosition]
            }
            else{
                if(aux<2){
                    this.clientsChildren[i]=this.clientsGroup.create(-1000,-1000,this.clients[aux])
                    this.clientsChildren[i].x=xPosition
                    this.clientsChildren[i].y=y[yPosition]
                }
                else{
                    this.clientsChildren[i]=this.clientsGroup.create(-1000,-1000,this.clients[aux])
                    this.clientsChildren[i].x=xPosition
                    this.clientsChildren[i].y=y[yPosition]-100
                }
                
            }
            this.clientsChildren[i].setAlpha(1)
            this.vAuxClients[i]=aux

            // PEDIDOS
            while(aux2==flavorRepeat || aux2==flavorRepeat2 || aux2==flavorRepeat3 || aux2==flavorRepeat4){
                aux2 = Phaser.Math.Between(0,4)
            }
            this.flavorsChildren[i]=this.flavorsGroup.create(-1000,-1000, this.flavors[aux2])
            this.vAux[i]=aux2
            this.flavorsChildren[i].x=xPosition-100
            if(aux==0 || aux==1){
                this.flavorsChildren[i].y=y[yPosition]-150
            }
            else{
                this.flavorsChildren[i].y=y[yPosition]-280
            }

            // LAYERS
            if(yPosition==0){
                layer4.add([this.clientsChildren[i], this.flavorsChildren[i]])
            }
            if(yPosition==1){
                layer3.add([this.clientsChildren[i], this.flavorsChildren[i]])
            }
            if(yPosition==2){
                layer2.add([this.clientsChildren[i], this.flavorsChildren[i]])
            }
            if(yPosition==3){
                layer1.add([this.clientsChildren[i], this.flavorsChildren[i]])
            }

            xPosition+=175
            clientRepeat2 = clientRepeat
            clientRepeat = aux
            yPositionRepeat = yPosition

            flavorRepeat4=flavorRepeat3
            flavorRepeat3=flavorRepeat2
            flavorRepeat2=flavorRepeat
            flavorRepeat=aux2
        }

        this.clientsChildren[0].x=-1000
        this.clientsChildren[0].y=-1000
        this.flavorsChildren[0].x=-1000
        this.flavorsChildren[0].y=-1000
        // ===============================================================================================================
        
        this.truck=this.add.image(gWidth*0.67, gHeight/2, "game-truck")
        this.grid=this.add.image(gWidth*0.73, gHeight/2, "game-planilla")
        this.lifesHUD = this.add.image(gWidth*0.95, gHeight*0.60, "game-lifes")
        this.cero=this.add.image(gWidth*0.97, gHeight*0.64, "game-0")
        this.one=this.add.image(gWidth*0.97, gHeight*0.64, "game-1")
        this.two=this.add.image(gWidth*0.97, gHeight*0.64, "game-2")
        this.three=this.add.image(gWidth*0.97, gHeight*0.64, "game-3")
        this.flags=this.add.image(gWidth*0.665, gHeight*0.12, "game-flags")
        

        // ================================================  MOVIMIENTO  =====================================================
        this.timer1 = this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => {
                MovementOne();
            }
        })
        
        let thisScene= this
        this.cont=49

        function MovementOne(){
            thisScene.timer2 = thisScene.time.addEvent({
                delay: 140,
                loop: false,
                repeat: thisScene.lastClient,
                callback: () => {
                    MovementClient();
                }
            })
        }

        function MovementClient(){
            thisScene.randomNumber=Phaser.Math.Between(100, 2500)
            thisScene.tweens.add({
                targets: [thisScene.clientsChildren[thisScene.cont], thisScene.flavorsChildren[thisScene.cont]],
                x: "+= 175",
                ease: "Back",
                duration: 600,
                delay: thisScene.randomNumber
            })
            //  =====================================================  PISOS  ==============================================================
            if(thisScene.cont==thisScene.lastClient){
                thisScene.height=thisScene.clientsChildren[thisScene.lastClient].y+110
                if(thisScene.vAuxClients[thisScene.lastClient]>1){
                    thisScene.floor1.setPosition(thisScene.clientsChildren[thisScene.lastClient].x+15+175, thisScene.height+100)
                }
                else{
                    thisScene.floor1.setPosition(thisScene.clientsChildren[thisScene.lastClient].x+15+175, thisScene.height)
                }
                thisScene.tweens.add({
                    targets: thisScene.floor1,
                    alpha: { from: 0, to: 1 },
                    ease: 'Linear',      
                    duration: 400,
                    repeat: 0,
                    delay: thisScene.randomNumber+200,
                    yoyo: true  
                })
            }
            if(thisScene.cont==thisScene.lastClient-1){
                thisScene.height=thisScene.clientsChildren[thisScene.lastClient-1].y+110
                if(thisScene.vAuxClients[thisScene.lastClient-1]>1){
                    thisScene.floor2.setPosition(thisScene.clientsChildren[thisScene.lastClient-1].x+15+175, thisScene.height+100)
                }
                else{
                    thisScene.floor2.setPosition(thisScene.clientsChildren[thisScene.lastClient-1].x+15+175, thisScene.height)
                }
                thisScene.tweens.add({
                    targets: thisScene.floor2,
                    alpha: { from: 0, to: 1 },
                    ease: 'Linear',      
                    duration: 400,
                    repeat: 0,
                    delay: thisScene.randomNumber+200,
                    yoyo: true  
                })
            }
            if(thisScene.cont==thisScene.lastClient-2){
                thisScene.height=thisScene.clientsChildren[thisScene.lastClient-2].y+110
                if(thisScene.vAuxClients[thisScene.lastClient-2]>1){
                    thisScene.floor3.setPosition(thisScene.clientsChildren[thisScene.lastClient-2].x+15+175, thisScene.height+100)
                }
                else{
                    thisScene.floor3.setPosition(thisScene.clientsChildren[thisScene.lastClient-2].x+15+175, thisScene.height)
                }
                thisScene.tweens.add({
                    targets: thisScene.floor3,
                    alpha: { from: 0, to: 1 },
                    ease: 'Linear',      
                    duration: 400,
                    repeat: 0,
                    delay: thisScene.randomNumber+200,
                    yoyo: true  
                })
            }
            if(thisScene.cont==thisScene.lastClient-3){
                thisScene.height=thisScene.clientsChildren[thisScene.lastClient-3].y+110
                if(thisScene.vAuxClients[thisScene.lastClient-3]>1){
                    thisScene.floor4.setPosition(thisScene.clientsChildren[thisScene.lastClient-3].x+15+175, thisScene.height+100)
                }
                else{
                    thisScene.floor4.setPosition(thisScene.clientsChildren[thisScene.lastClient-3].x+15+175, thisScene.height)
                }
                thisScene.tweens.add({
                    targets: thisScene.floor4,
                    alpha: { from: 0, to: 1 },
                    ease: 'Linear',      
                    duration: 400,
                    repeat: 0,
                    delay: thisScene.randomNumber+200,
                    yoyo: true  
                })
            }
            if(thisScene.cont==thisScene.lastClient-4){
                thisScene.height=thisScene.clientsChildren[thisScene.lastClient-4].y+110
                if(thisScene.vAuxClients[thisScene.lastClient-4]>1){
                    thisScene.floor5.setPosition(thisScene.clientsChildren[thisScene.lastClient-4].x+15+175, thisScene.height+100)
                }
                else{
                    thisScene.floor5.setPosition(thisScene.clientsChildren[thisScene.lastClient-4].x+15+175, thisScene.height)
                }
                thisScene.tweens.add({
                    targets: thisScene.floor5,
                    alpha: { from: 0, to: 1 },
                    ease: 'Linear',      
                    duration: 400,
                    repeat: 0,
                    delay: thisScene.randomNumber+200,
                    yoyo: true  
                })
            }
            thisScene.cont--
        }
        //=====================================================================================================================

        this.canPick = true;
        this.dragging = false;
        this.drawField();
        this.selectedGem = null;
        this.input.on("pointerdown", this.gemSelect, this);
        this.input.on("pointermove", this.startSwipe, this);
        this.input.on("pointerup", this.stopSwipe, this);
        gLastScene="PlayGame"
        this.scene.pause()
        this.scene.launch("HelpScene")
    }

    // ===================================================      CUADRILLA      ========================================================
    drawField(){
        this.gameArray = [];
        this.poolArray = [];
        this.gemGroup = this.add.group();
        for(let i = 0; i < gameOptions.fieldSize; i ++){
            this.gameArray[i] = [];
            for(let j = 0; j < gameOptions.fieldSize; j ++){
                let gem = this.add.sprite(gameOptions.gemSize * j + gameOptions. gemSize / 2, gameOptions.gemSize * i + gameOptions.gemSize / 2, "gems");
                this.gemGroup.add(gem);
                var container = this.add.container(gameOptions.marginLeft, gameOptions.marginTop);
                container.add([gem]);
                do{
                    let randomColor = Phaser.Math.Between(0, gameOptions.gemColors - 1);
                    gem.setFrame(randomColor);
                    this.gameArray[i][j] = {
                        gemColor: randomColor,
                        gemSprite: gem,
                        isEmpty: false
                    }
                } while(this.isMatch(i, j));
            }
        }
        this.binky = this.add.image(gWidth*0.94, gHeight*0.85+1000, "game-binky")
        this.tweens.add({
            targets: this.binky,
            y: "-= 1000",
            ease: "Power3",
            delay: 300,
            duration: 600
        })
        this.combo3brown=this.add.image(gWidth*0.73, gHeight/2, "game-combox3-brown").setAlpha(0).setVisible(false)
        this.combo3green=this.add.image(gWidth*0.73, gHeight/2, "game-combox3-green").setAlpha(0).setVisible(false)
        this.combo3orange=this.add.image(gWidth*0.73, gHeight/2, "game-combox3-orange").setAlpha(0).setVisible(false)
        this.combo3pink=this.add.image(gWidth*0.73, gHeight/2, "game-combox3-pink").setAlpha(0).setVisible(false)
        this.combo3yellow=this.add.image(gWidth*0.73, gHeight/2, "game-combox3-yellow").setAlpha(0).setVisible(false)
        this.combo4=this.add.image(gWidth*0.73, gHeight/2, "game-combo4").setAlpha(0)
        this.excelent=this.add.image(gWidth*0.73, gHeight/2, "game-excelent").setAlpha(0)
        this.quinientos=this.add.image(gWidth*0.05, gHeight*0.95, "game-500").setAlpha(0)
        this.mini1=this.add.image(gWidth*0.167, gHeight*0.95, "game-miniicecream")
        this.mini2=this.add.image(gWidth*0.26, gHeight*0.95, "game-miniicecream")
        this.mini3=this.add.image(gWidth*0.351, gHeight*0.95, "game-miniicecream")
        this.mezclando=this.add.image(gWidth*0.728, gHeight*0.50, "game-mezclando").setAlpha(0)
        this.toca=this.add.image(gWidth*0.85+1000, gHeight*0.28, "game-toca").setScale(0.70, 0.70)
        this.tweens.add({
            targets: [this.toca],
            x: "-= 1000",
            ease: "Back",
            delay: 500,
            duration: 600
        })
        this.tweens.add({
            targets: [this.toca],
            x: "+= 1000",
            ease: "Back",
            delay: 5000,
            duration: 600
        })
    }
    isMatch(row, col){
         return this.isHorizontalMatch(row, col) || this.isVerticalMatch(row, col);
    }
    isHorizontalMatch(row, col){
         return this.gemAt(row, col).gemColor == this.gemAt(row, col - 1).gemColor && this.gemAt(row, col).gemColor == this.gemAt(row, col - 2).gemColor;
    }
    isVerticalMatch(row, col){
         return this.gemAt(row, col).gemColor == this.gemAt(row - 1, col).gemColor && this.gemAt(row, col).gemColor == this.gemAt(row - 2, col).gemColor;
    }
    gemAt(row, col){
        if(row < 0 || row >= gameOptions.fieldSize || col < 0 || col >= gameOptions.fieldSize){
            return -1;
        }
        return this.gameArray[row][col];
    }
    gemSelect(pointer){
        if(this.canPick){
            this.dragging = true;
            let row = Math.floor(pointer.y / gameOptions.gemSize-gameOptions.marginTop/gameOptions.gemSize);
            let col = Math.floor(pointer.x / gameOptions.gemSize-gameOptions.marginLeft/gameOptions.gemSize);
            let pickedGem = this.gemAt(row, col)
            if(pickedGem != -1){
                if(this.selectedGem == null){
                    pickedGem.gemSprite.setScale(1.2);
                    pickedGem.gemSprite.setDepth(1);
                    this.selectedGem = pickedGem;
                }
                else{
                    if(this.areTheSame(pickedGem, this.selectedGem)){
                        this.selectedGem.gemSprite.setScale(1);
                        this.selectedGem = null;
                    }
                    else{
                        if(this.areNext(pickedGem, this.selectedGem)){
                            this.selectedGem.gemSprite.setScale(1);
                            this.swapGems(this.selectedGem, pickedGem, true);
                        }
                        else{
                            this.selectedGem.gemSprite.setScale(1);
                            pickedGem.gemSprite.setScale(1.2);
                            this.selectedGem = pickedGem;
                        }
                    }
                }
            }
        }
    }
    startSwipe(pointer){
        if(this.dragging && this.selectedGem != null){
            let deltaX = pointer.downX - pointer.x;
            let deltaY = pointer.downY - pointer.y;
            let deltaRow = 0;
            let deltaCol = 0;
            if(deltaX > gameOptions.gemSize / 2 && Math.abs(deltaY) < gameOptions.gemSize / 4){
                deltaCol = -1;
            }
            if(deltaX < -gameOptions.gemSize / 2 && Math.abs(deltaY) < gameOptions.gemSize / 4){
                deltaCol = 1;
            }
            if(deltaY > gameOptions.gemSize / 2 && Math.abs(deltaX) < gameOptions.gemSize / 4){
                deltaRow = -1;
            }
            if(deltaY < -gameOptions.gemSize / 2 && Math.abs(deltaX) < gameOptions.gemSize / 4){
                deltaRow = 1;
            }
            if(deltaRow + deltaCol != 0){
                let pickedGem = this.gemAt(this.getGemRow(this.selectedGem) + deltaRow, this.getGemCol(this.selectedGem) + deltaCol);
                if(pickedGem != -1){
                    this.selectedGem.gemSprite.setScale(1);
                    this.swapGems(this.selectedGem, pickedGem, true);
                    this.dragging = false;
                }
            }
        }
    }
    stopSwipe(){
        this.dragging = false;
    }
    areTheSame(gem1, gem2){
        return this.getGemRow(gem1) == this.getGemRow(gem2) && this.getGemCol(gem1) == this.getGemCol(gem2);
    }
    getGemRow(gem){
        return Math.floor(gem.gemSprite.y / gameOptions.gemSize);
    }
    getGemCol(gem){
        return Math.floor(gem.gemSprite.x / gameOptions.gemSize);
    }
    areNext(gem1, gem2){
        return Math.abs(this.getGemRow(gem1) - this.getGemRow(gem2)) + Math.abs(this.getGemCol(gem1) - this.getGemCol(gem2)) == 1;
    }
    swapGems(gem1, gem2, swapBack){
        this.swappingGems = 2;
        this.canPick = false;
        let fromColor = gem1.gemColor;
        let fromSprite = gem1.gemSprite;
        let toColor = gem2.gemColor;
        let toSprite = gem2.gemSprite;
        let gem1Row = this.getGemRow(gem1);
        let gem1Col = this.getGemCol(gem1);
        let gem2Row = this.getGemRow(gem2);
        let gem2Col = this.getGemCol(gem2);
        this.gameArray[gem1Row][gem1Col].gemColor = toColor;
        this.gameArray[gem1Row][gem1Col].gemSprite = toSprite;
        this.gameArray[gem2Row][gem2Col].gemColor = fromColor;
        this.gameArray[gem2Row][gem2Col].gemSprite = fromSprite;
        this.tweenGem(gem1, gem2, swapBack);
        this.tweenGem(gem2, gem1, swapBack);
    }
    tweenGem(gem1, gem2, swapBack){
        let row = this.getGemRow(gem1);
        let col = this.getGemCol(gem1);
        this.tweens.add({
            targets: this.gameArray[row][col].gemSprite,
            x: col * gameOptions.gemSize + gameOptions.gemSize / 2,
            y: row * gameOptions.gemSize + gameOptions.gemSize / 2,
            duration: gameOptions.swapSpeed,
            callbackScope: this,
            onComplete: function(){
                this.swappingGems --;
                if(this.swappingGems == 0){
                    if(!this.matchInBoard() && swapBack){
                        this.swapGems(gem1, gem2, false);
                        if(gSound==1){
                            this.wrong.play()
                        }
                    }
                    else{
                        if(this.matchInBoard()){
                            this.handleMatches();
                        }
                        else{
                            this.canPick = true;
                            this.selectedGem = null;
                        }
                    }
                }
            }
        });
    }
    matchInBoard(){
        for(let i = 0; i < gameOptions.fieldSize; i ++){
            for(let j = 0; j < gameOptions.fieldSize; j ++){
                if(this.isMatch(i, j)){
                    return true;
                }
            }
        }
        return false;
    }
    handleMatches(){
        this.removeMap = [];
        for(let i = 0; i < gameOptions.fieldSize; i ++){
            this.removeMap[i] = [];
            for(let j = 0; j < gameOptions.fieldSize; j ++){
                this.removeMap[i].push(0);
            }
        }
        this.markMatches(HORIZONTAL);
        this.markMatches(VERTICAL);
        this.destroyGems();
    }
    markMatches(direction){
        var timeline = this.tweens.createTimeline()
        var timeline2 = this.tweens.createTimeline()
        var timeline3 = this.tweens.createTimeline()
        var timeline4 = this.tweens.createTimeline()
        timeline.add({
            targets: [this.combo3brown, this.combo3orange, this.combo3pink, this.combo3yellow, this.combo3green],
            alpha: { from: 0, to: 1 },
            ease: 'Linear',      
            duration: 600,
            repeat: 0,
            yoyo: true           
        })
        timeline2.add({
            targets: this.combo4,
            alpha: { from: 0, to: 1 },
            ease: 'Linear',      
            duration: 600,
            repeat: 0,
            yoyo: true           
        })
        timeline3.add({
            targets: this.excelent,
            alpha: { from: 0, to: 1 },
            ease: 'Linear',      
            duration: 600,
            repeat: 0,
            yoyo: true           
        })
        timeline4.add({
            targets: this.quinientos,
            alpha: { from: 0, to: 1 },
            ease: 'Linear',      
            duration: 600,
            repeat: 0,
            yoyo: true           
        })

        for(let i = 0; i < gameOptions.fieldSize; i ++){
            let colorStreak = 1;
            let currentColor = -1;
            let startStreak = 0;
            let colorToWatch = 0;
            for(let j = 0; j < gameOptions.fieldSize; j ++){
                if(direction == HORIZONTAL){
                    colorToWatch = this.gemAt(i, j).gemColor;
                }
                else{
                    colorToWatch = this.gemAt(j, i).gemColor;
                }
                if(colorToWatch == currentColor){
                    colorStreak ++;
                }
                if(colorToWatch != currentColor || j == gameOptions.fieldSize - 1){
                    if(colorStreak >= 3){
                        this.filesCompleted++
                        this.points+=0.02
                        this.randomSound=Phaser.Math.Between(0,1)
                        if(gSound==1){
                            this.coin.play()
                        }
                        

                        if(direction == HORIZONTAL  || direction == VERTICAL){
                            if(currentColor==this.vAux[this.lastClient]){
                                this.flavorsChildren[this.lastClient].setTexture("game-check")
                                this.check.play()
                                this.tweens.add({
                                    targets: this.flavorsChildren[this.lastClient],
                                    duration: 150,
                                    repeat: 0,
                                    ease: "Circ",
                                    yoyo: 1,
                                    scale: 1.50
                                })
                                this.timer3 = this.time.addEvent({
                                    delay: 700,
                                    loop: false,
                                    callback: () => {
                                        this.Destroy1()
                                    }
                                })
                                
                            }

                            if(this.clientsChildren[this.lastClient].x>100){
                                if(currentColor==this.vAux[this.lastClient-1]){
                                    this.flavorsChildren[this.lastClient-1].setTexture("game-check")
                                    this.check.play()
                                    this.tweens.add({
                                        targets: this.flavorsChildren[this.lastClient-1],
                                        duration: 150,
                                        repeat: 0,
                                        ease: "Circ",
                                        yoyo: 1,
                                        scale: 1.50
                                    })
                                    this.timer3 = this.time.addEvent({
                                        delay: 700,
                                        loop: false,
                                        callback: () => {
                                            this.Destroy2()
                                        }
                                    })
                                    
                                }
                            }
                            
                            if(this.clientsChildren[this.lastClient-1].x>100){
                                if(currentColor==this.vAux[this.lastClient-2]){
                                    this.flavorsChildren[this.lastClient-2].setTexture("game-check")
                                    this.check.play()
                                    this.tweens.add({
                                    targets: this.flavorsChildren[this.lastClient-2],
                                        duration: 150,
                                        repeat: 0,
                                        ease: "Circ",
                                        yoyo: 1,
                                        scale: 1.50
                                    })
                                    this.timer3 = this.time.addEvent({
                                        delay: 700,
                                        loop: false,
                                        callback: () => {
                                            this.Destroy3()
                                        }
                                    })
                                    
                                }
                            }

                            if(this.clientsChildren[this.lastClient-2].x>100){
                                if(currentColor==this.vAux[this.lastClient-3]){  
                                    this.flavorsChildren[this.lastClient-3].setTexture("game-check")
                                    this.check.play()
                                    this.tweens.add({
                                        targets: this.flavorsChildren[this.lastClient-3],
                                        duration: 150,
                                        repeat: 0,
                                        ease: "Circ",
                                        yoyo: 1,
                                        scale: 1.50
                                    })
                                    this.timer3 = this.time.addEvent({
                                        delay: 700,
                                        loop: false,
                                        callback: () => {
                                            this.Destroy4()
                                        }
                                    })                               
                                    
                                }
                            }

                            if(this.clientsChildren[this.lastClient-3].x>100){
                                if(currentColor==this.vAux[this.lastClient-4]){
                                    this.flavorsChildren[this.lastClient-4].setTexture("game-check")
                                    this.check.play()
                                    this.tweens.add({
                                        targets: this.flavorsChildren[this.lastClient-4],
                                        duration: 150,
                                        repeat: 0,
                                        ease: "Circ",
                                        yoyo: 1,
                                        scale: 1.50
                                    })
                                    this.timer3 = this.time.addEvent({
                                        delay: 700,
                                        loop: false,
                                        callback: () => {
                                            this.Destroy5()
                                        }
                                    })
                                    
                                }
                            }

                            if(this.clientsChildren[this.lastClient-4].x>100){
                                if(currentColor==this.vAux[this.lastClient-5]){
                                    this.flavorsChildren[this.lastClient-5].setTexture("game-check")
                                    this.check.play()
                                    this.tweens.add({
                                        targets: this.flavorsChildren[this.lastClient-5],
                                        duration: 150,
                                        repeat: 0,
                                        ease: "Circ",
                                        yoyo: 1,
                                        scale: 1.50
                                    })
                                    this.timer3 = this.time.addEvent({
                                        delay: 700,
                                        loop: false,
                                        callback: () => {
                                            this.Destroy6()
                                        }
                                    })
                                    
                                }
                            }

                            //console.log("HORIZONTAL :: Length = " + colorStreak + " :: Start = (" + i + "," + startStreak + ") :: Color = " + currentColor);
                            if(colorStreak == 3){
                                this.totalPoints+=500
                                if(currentColor==0){
                                    this.combo3pink.setVisible(true)
                                }
                                if(currentColor==1){
                                    this.combo3brown.setVisible(true)
                                }
                                if(currentColor==2){
                                    this.combo3green.setVisible(true)
                                }
                                if(currentColor==3){
                                    this.combo3orange.setVisible(true)
                                }
                                if(currentColor==4){
                                    this.combo3yellow.setVisible(true)
                                }
                                timeline.play()
                                this.timer3 = this.time.addEvent({
                                    delay: 650,
                                    loop: false,
                                    callback: () => {
                                        setFalse();
                                    }
                                })
                                let thisScene=this
                                function setFalse(){
                                    thisScene.combo3pink.setVisible(false)
                                    thisScene.combo3brown.setVisible(false)
                                    thisScene.combo3green.setVisible(false)
                                    thisScene.combo3yellow.setVisible(false)
                                    thisScene.combo3orange.setVisible(false)
                                }
                                timeline4.play()
                            }
                            else if(colorStreak == 4){
                                this.totalPoints+=1000
                                timeline2.play()
                                timeline4.play()
                            }
                            else if(colorStreak >= 5){
                                this.totalPoints+=1500
                                timeline3.play()
                                timeline4.play()
                            }
                        }
                        for(let k = 0; k < colorStreak; k ++){
                            if(direction == HORIZONTAL){
                                this.removeMap[i][startStreak + k] ++;
                            }
                            else{
                                this.removeMap[startStreak + k][i] ++;
                            }
                        }
                    }
                    startStreak = j;
                    colorStreak = 1;
                    currentColor = colorToWatch;
                }
            }
        }
    }
    destroyGems(){
        let destroyed = 0;
        for(let i = 0; i < gameOptions.fieldSize; i ++){
            for(let j = 0; j < gameOptions.fieldSize; j ++){
                if(this.removeMap[i][j] > 0){
                    destroyed ++;
                    this.tweens.add({
                        targets: this.gameArray[i][j].gemSprite,
                        alpha: 0.5,
                        duration: gameOptions.destroySpeed,
                        callbackScope: this,
                        onComplete: function(){
                            destroyed --;
                            this.gameArray[i][j].gemSprite.visible = false;
                            this.poolArray.push(this.gameArray[i][j].gemSprite);
                            if(destroyed == 0){
                                this.makeGemsFall();
                                this.replenishField();
                            }
                        }
                    });
                    this.gameArray[i][j].isEmpty = true;
                }
            }
        }
    }
    makeGemsFall(){
        for(let i = gameOptions.fieldSize - 2; i >= 0; i --){
            for(let j = 0; j < gameOptions.fieldSize; j ++){
                if(!this.gameArray[i][j].isEmpty){
                    let fallTiles = this.holesBelow(i, j);
                    if(fallTiles > 0){
                        this.tweens.add({
                            targets: this.gameArray[i][j].gemSprite,
                            y: this.gameArray[i][j].gemSprite.y + fallTiles * gameOptions.gemSize,
                            duration: gameOptions.fallSpeed * fallTiles
                        });
                        this.gameArray[i + fallTiles][j] = {
                            gemSprite: this.gameArray[i][j].gemSprite,
                            gemColor: this.gameArray[i][j].gemColor,
                            isEmpty: false
                        }
                        this.gameArray[i][j].isEmpty = true;
                    }
                }
            }
        }
    }
    holesBelow(row, col){
        let result = 0;
        for(let i = row + 1; i < gameOptions.fieldSize; i ++){
            if(this.gameArray[i][col].isEmpty){
                result ++;
            }
        }
        return result;
    }
    replenishField(){
        let replenished = 0;
        for(let j = 0; j < gameOptions.fieldSize; j ++){
            let emptySpots = this.holesInCol(j);
            if(emptySpots > 0){
                for(let i = 0; i < emptySpots; i ++){
                    replenished ++;
                    let randomColor = Phaser.Math.Between(0, gameOptions.gemColors - 1);
                    this.gameArray[i][j].gemColor = randomColor;
                    this.gameArray[i][j].gemSprite = this.poolArray.pop()
                    this.gameArray[i][j].gemSprite.setFrame(randomColor);
                    this.gameArray[i][j].gemSprite.visible = true;
                    this.gameArray[i][j].gemSprite.x = gameOptions.gemSize * j + gameOptions.gemSize / 2;
                    this.gameArray[i][j].gemSprite.y = gameOptions.gemSize / 2 - (emptySpots - i) * gameOptions.gemSize;
                    this.gameArray[i][j].gemSprite.alpha = 1;
                    this.gameArray[i][j].isEmpty = false;
                    this.tweens.add({
                        targets: this.gameArray[i][j].gemSprite,
                        y: gameOptions.gemSize * i + gameOptions.gemSize / 2,
                        duration: gameOptions.fallSpeed * emptySpots,
                        callbackScope: this,
                        onComplete: function(){
                            replenished --;
                            if(replenished == 0){
                                if(this.matchInBoard()){
                                    this.time.addEvent({
                                        delay: 250,
                                        callback: this.handleMatches()
                                    });
                                }
                                else{
                                    this.canPick = true;
                                    this.selectedGem = null;
                                }
                            }
                        }
                    });
                }
            }
        }
    }
    holesInCol(col){
        var result = 0;
        for(let i = 0; i < gameOptions.fieldSize; i ++){
            if(this.gameArray[i][col].isEmpty){
                result ++;
            }
        }
        return result;
    }



    // ==================================================   UPDATE  ==============================================
    update(){
        let thisScene=this
        if(this.clientsChildren[this.lastClient].x>gWidth*0.38){
            /*this.tweens.add({
                targets: [this.clientsChildren[this.lastClient], this.flavorsChildren[this.lastClient]],
                alpha: { from: 1, to: 0 },
                ease: 'Linear',      
                duration: 400,
                repeat: 0,        
            })*/

            this.clientsGroup.killAndHide(this.clientsChildren[this.lastClient])
            this.clientsChildren[this.lastClient].body.enable = false
            this.flavorsGroup.killAndHide(this.flavorsChildren[this.lastClient])
            this.flavorsChildren[this.lastClient].body.enable = false
            this.lifes--

            /*this.timer3 = this.time.addEvent({
                delay: 400,
                loop: false,
                callback: () => {
                    this.Destroy();
                }
            })*/

        
        }
        if(this.clientsChildren[this.lastClient].body.enable==false){
            this.lastClient--
            this.tweens.add({
                targets: [this.three, this.two, this.one],
                scale: 1.30,
                ease: "Circ",
                duration: 200,
                repeat: 0,
                yoyo: 1
            })
        }

        if(this.cont<=0){
            this.cont=this.lastClient
        }

        if(gMiniGame==1){
            if(this.filesCompleted>=30){
                this.scene.pause()
                this.scene.launch("MinigameScene")
            }
        }

        /*if(this.filesCompleted>=10){
            if(gLogin==false){
                thisScene.scene.pause()
                try {
                    document.getElementById("modalFrame").setAttribute("style", "display:block;")
                } catch {
                    console.log('modal')
                }


                (function(window) {
                    var el = document.getElementById('login-btn');
                    el.addEventListener('click', (e) => {
                        e.preventDefault();
                        // Dispatch deep-link
                        document.location = 'dkids-latam://discoverykidsplus.com/login';
                        // Redirect to the parent if deep-link is not available
                        gLogin = true
                        setTimeout(function() {
                            if (window.location !== window.top.location) {
                                window.top.location = window.top.location.protocol + '//' + window.top.location.host + '/login';
                            }
                        }, 300);
                    }, false);
                    var el2 = document.getElementById('later-btn')
                    el2.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log("closeModal")
                        document.getElementById("modalFrame").setAttribute("style", "display:none;")
                        thisScene.sound.stopAll()
                        thisScene.scene.stop()
                        thisScene.scene.start("SplashScene")
                    }, false);
                })(this);
               
            }
        }*/

        if(this.clientsChildren[this.lastClient].body.enable==false){
            this.floor1.setVisible(false)
        }
        else{
            this.floor1.setVisible(true)
        }
        if(this.clientsChildren[this.lastClient-1].body.enable==false){
            this.floor2.setVisible(false)
        }
        else{
            this.floor2.setVisible(true)
        }
        if(this.clientsChildren[this.lastClient-2].body.enable==false){
            this.floor3.setVisible(false)
        }
        else{
            this.floor3.setVisible(true)
        }
        if(this.clientsChildren[this.lastClient-3].body.enable==false){
            this.floor4.setVisible(false)
        }
        else{
            this.floor4.setVisible(true)
        }
        if(this.clientsChildren[this.lastClient-4].body.enable==false){
            this.floor5.setVisible(false)
        }
        else{
            this.floor5.setVisible(true)
        }

        if(gMusic==-1){
            this.music.setMute(true)
        }
        else{
            this.music.setMute(false)
        }
        

        // =====================================================  HUD VIDAS  ========================================================
        if(this.lifes==0){
            this.cero.setVisible(true)
            this.one.setVisible(false)
            this.two.setVisible(false)
            this.three.setVisible(false)
            this.scene.pause()
            this.scene.launch("DefeatScene")
        }
        if(this.lifes==1){
            this.cero.setVisible(false)
            this.one.setVisible(true)
            this.two.setVisible(false)
            this.three.setVisible(false)
        }
        if(this.lifes==2){
            this.cero.setVisible(false)
            this.one.setVisible(false)
            this.two.setVisible(true)
            this.three.setVisible(false)
        }
        if(this.lifes==3){
            this.cero.setVisible(false)
            this.one.setVisible(false)
            this.two.setVisible(false)
            this.three.setVisible(true)
        }
        //  ==========================================================================================================================
        // =========================================================  BARRA DE PUNTOS  ================================================
        if(this.points>=1){
            gPoints+=this.totalPoints
            this.scene.pause()
            this.scene.launch("VictoryScene")
        }
        if(this.points<1){
            this.bar.update(this.points, this.barAux)
        }
        
        if(this.barAux==0){
            if(this.points>=0.30){
                this.tweens.add({
                    targets: this.mini1,
                    scale: 1.60,
                    ease: "Circ",
                    duration: 400,
                    repeat: 0,
                    yoyo: 1
                })
                this.barAux++
            }
        }
        if(this.barAux==1){
            if(this.points>=0.60){
                this.tweens.add({
                    targets: this.mini2,
                    scale: 1.60,
                    ease: "Circ",
                    duration: 400,
                    repeat: 0,
                    yoyo: 1
                })
                this.barAux++
            }
        }
        if(this.barAux==2){
            if(this.points>=0.98){
                this.tweens.add({
                    targets: this.mini3,
                    scale: 1.60,
                    ease: "Circ",
                    duration: 400,
                    repeat: 0,
                    yoyo: 1
                })
                this.barAux++
            }
        }
        
    // ===============================================================================================================================    
    }
    Destroy1(){
        this.clientsGroup.killAndHide(this.clientsChildren[this.lastClient])
        this.clientsChildren[this.lastClient].body.enable = false
        this.flavorsGroup.killAndHide(this.flavorsChildren[this.lastClient])
        this.flavorsChildren[this.lastClient].body.enable = false
    }
    Destroy2(){
        this.clientsGroup.killAndHide(this.clientsChildren[this.lastClient-1])
        this.clientsChildren[this.lastClient-1].body.enable = false
        this.flavorsGroup.killAndHide(this.flavorsChildren[this.lastClient-1])
        this.flavorsChildren[this.lastClient-1].body.enable = false
    }
    Destroy3(){
        console.log("ENTRO AL 3")
        this.clientsGroup.killAndHide(this.clientsChildren[this.lastClient-2])
        this.clientsChildren[this.lastClient-2].body.enable = false
        this.flavorsGroup.killAndHide(this.flavorsChildren[this.lastClient-2])
        this.flavorsChildren[this.lastClient-2].body.enable = false
    }
    Destroy4(){
        this.clientsGroup.killAndHide(this.clientsChildren[this.lastClient-3])
        this.clientsChildren[this.lastClient-3].body.enable = false
        this.flavorsGroup.killAndHide(this.flavorsChildren[this.lastClient-3])
        this.flavorsChildren[this.lastClient-3].body.enable = false   
    }
    Destroy5(){
        this.clientsGroup.killAndHide(this.clientsChildren[this.lastClient-4])
        this.clientsChildren[this.lastClient-4].body.enable = false
        this.flavorsGroup.killAndHide(this.flavorsChildren[this.lastClient-4])
        this.flavorsChildren[this.lastClient-4].body.enable = false
    }
    Destroy6(){
        this.clientsGroup.killAndHide(this.clientsChildren[this.lastClient-5])
        this.clientsChildren[this.lastClient-5].body.enable = false
        this.flavorsGroup.killAndHide(this.flavorsChildren[this.lastClient-5])
        this.flavorsChildren[this.lastClient-5].body.enable = false
    }
}



function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}