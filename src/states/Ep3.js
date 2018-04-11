import Player from "../prefabs/Player.js";
import EntranceDoor from "../prefabs/EntranceDoor.js";
import BlockingObjects from "../prefabs/BlockingObjects.js"
import Collectables from "../prefabs/Collectables.js"
import WavesObjects from "../prefabs/WavesObjects.js"
import Platforms from "../prefabs/Platforms.js"
import HealthBar from "../prefabs/HealthBar.js"
import EnergyBar from "../prefabs/EnergyBar.js"
import RatGrunt from "../prefabs/RatGrunt.js"
import RatSoldier from "../prefabs/RatSoldier.js"
import Cat from "../prefabs/Cat.js"
import Stalacites from "../prefabs/Stalacites.js"
import EnemyStops from "../prefabs/EnemyStops.js"
import Popup from "../prefabs/Popup.js"
import Tools from "../components/Tools.js"
import CheeseScore from "../prefabs/CheeseScore.js"
import TitleText from "../prefabs/TitleText.js"

export default class Ep3 extends Phaser.State{

  constructor() {
    //object level properties
    super();
  }

  create(){

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.gravity.y = 800;
    //this sets the default contact material to all P2 body in this world
    this.physics.p2.world.defaultContactMaterial.friction = 0.42;//perfect not to be AIRBORNE
    this.physics.p2.world.setGlobalStiffness(1e5);

    //map start
    this.map = this.add.tilemap('ep3');
    //add tileset image
    this.map.addTilesetImage('tile');
    //parallax background
    this.bg = this.map.createLayer('background');
    this.bg.scrollFactorX = .7;
    this.bg.scrollFactorY = .7;

    //walkable tiles
    this.layer = this.map.createLayer('tiles');

    //collision
    this.layer.resizeWorld();
    this.map.setCollisionBetween(1,106,true,this.layer);
    let tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

    this.map.createLayer('decorative');

    //general world properties above--------------------------------//

    //add water waves if any
    this.map.createFromObjects('movingwaves',184,'objects1','watertile',true,false,this.world,WavesObjects);
    //add the damage zone associated with the water area
    this.damageZone = new Phaser.Rectangle(150,3700,300,120);
    this.damageZone1 = new Phaser.Rectangle(1540,1160,400,120);

    //add platforms
    this.platformsGroup = this.add.group()
    let slipperyMaterials = new Array();
    Tools.findUniqueGIDInLayer(this.map, 'platforms').forEach((element)=>{
      //looks like doesnt support object unique id for now
      this.map.createFromObjects('platforms',element.gid,'objects1',element.name,true,false,this.platformsGroup,Platforms);
    });
    this.platformsGroup.forEach((child)=>{//this is NOT in order of the Tiled since the above add all gids 183 THEN 182
      slipperyMaterials.push(this.physics.p2.createMaterial('slipperyMaterial',child.body));
    },this);

    //add blocking objects
    this.blockingGroup = this.add.group();
    Tools.findUniqueGIDInLayer(this.map, 'blockingobjects').forEach((element)=>{
       this.map.createFromObjects('blockingobjects',element.gid,'objects1',element.name,true,false,this.blockingGroup,BlockingObjects);
    });

    //add collectables
    this.collectablesGroup = this.add.group();
    Tools.findUniqueGIDInLayer(this.map, 'collectables').forEach((element)=>{
      this.map.createFromObjects('collectables',element.gid,'objects1',element.name,true,false,this.collectablesGroup,Collectables);
    });

    //add the stalacites
    this.stalacitesGroup = this.add.group();
    Tools.findUniqueGIDInLayer(this.map, 'stalacites').forEach((element)=>{
      this.map.createFromObjects('stalacites',element.gid,'objects2',element.name,true,false,this.stalacitesGroup,Stalacites);
    });

    //add entrance door
    this.map.createFromObjects('door',176,'objects1','entrancedoor',true,false,this.world,EntranceDoor);
    this.entrancedoor = this.world.getTop();

    this.player = new Player(this.game,150,2850);//start pos
    //this.player = new Player(this.game,1975,150);
    //this.player = new Player(this.game,860,650);
    //this.player = new Player(this.game,297,200);
    //player materials
    let playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
    //contact material with slippery platforms..
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[0],{friction:0.35,surfaceVelocity:1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[1],{friction:0.35,surfaceVelocity:-1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[2],{friction:0.35,surfaceVelocity:1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[3],{friction:0.35,surfaceVelocity:-1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[4],{friction:0.35,surfaceVelocity:-1000});

    this.add.existing(this.player);

    this.camera.follow(this.player);

    //stop all previous playing sound first
    this.sound.stopAll();
    this.sfx = this.add.audioSprite('sfx');
    this.theme = this.add.audioSprite('theme');
    if(Tools.getData('mutesound'))Tools.muteOrPlay(this.sfx,true);
    if(Tools.getData('mutetheme'))Tools.muteOrPlay(this.theme,true);

    this.player.sfx = this.sfx;

    //add enemy rat grunt
    this.ratGroup = this.add.group();
    this.map.createFromObjects('ratgrunts',187,'ratgrunt','frame0',true,false,this.ratGroup,RatGrunt);
    this.ratGroup.forEach((ratGrunt)=>{
      ratGrunt.player=this.player;
      ratGrunt.sfx = this.sfx;
    },this);

    //add enemy rat soldiers
    this.map.createFromObjects('ratsoldiers',191,'ratsoldier','hitframe0',true,false,this.ratGroup,RatSoldier);
    this.ratGroup.forEach((ratSoldier)=>{
      ratSoldier.player=this.player;
      ratSoldier.sfx = this.sfx;
    },this);

    this.catGroup = this.add.group();
    this.map.createFromObjects('cats',194,'cat','frame0',true,false,this.catGroup,Cat);


    //add enemy stops
    this.stopsGroup = this.add.group();
    Tools.findUniqueGIDInLayer(this.map, 'enemystops').forEach((element)=>{
      this.map.createFromObjects('enemystops',element.gid,'objects1',element.name,true,false,this.stopsGroup,EnemyStops);
    });

    //the most front layer which to be displayed in front of player
    this.map.createLayer('decorative2');

    //UI setup
    this.healthBar = new HealthBar(this.game,20,20);
    this.energyBar = new EnergyBar(this.game,31,80);
    this.player.energyBar = this.energyBar;
    this.player.healthBar = this.healthBar;

    this.cheeseScore = new CheeseScore(this.game,460,20,15);

    //add collision groups
    //  Turn on impact events for the world, without this we get no collision callbacks
    this.physics.p2.setImpactEvents(true);

    let tilesCG = this.physics.p2.createCollisionGroup();
    let platformsCG = this.physics.p2.createCollisionGroup();
    let stalacitesCG = this.physics.p2.createCollisionGroup();
    let playerCG = this.physics.p2.createCollisionGroup();
    let hitboxCG = this.physics.p2.createCollisionGroup();
    let ratHitboxCG = this.physics.p2.createCollisionGroup();
    let catBallsCG = this.physics.p2.createCollisionGroup();
    let blockingObjectsCG = this.physics.p2.createCollisionGroup();
    let collectablesCG = this.physics.p2.createCollisionGroup();
    let ratCG = this.physics.p2.createCollisionGroup();
    let catCG = this.physics.p2.createCollisionGroup();
    let stopsCG = this.physics.p2.createCollisionGroup();
    let entrancedoorCG = this.physics.p2.createCollisionGroup();

    //update world bounds collision group  to collide with all the custom collision groups
    this.physics.p2.updateBoundsCollisionGroup();
    //set the collisions
    //tile materials
    let tileMaterial = this.physics.p2.createMaterial('tileMaterial');
    tilesBodies.forEach((tile)=>{
      tile.setMaterial(tileMaterial);
      tile.setCollisionGroup(tilesCG);
      tile.collides([playerCG,collectablesCG,blockingObjectsCG,ratCG,catCG,catBallsCG]);
    });
    this.platformsGroup.forEach((child)=>{
      child.body.setCollisionGroup(platformsCG);
      child.body.collides([playerCG,collectablesCG,ratCG,catCG,catBallsCG]);
    },this);
    this.stalacitesGroup.forEach((child)=>{
      child.body.setCollisionGroup(stalacitesCG);
      child.body.collides(playerCG,this.enemyHitListener,this)
    },this);
    this.player.body.setCollisionGroup(playerCG);
    this.player.body.collides([tilesCG,stalacitesCG,blockingObjectsCG,platformsCG,collectablesCG,ratCG,catCG,ratHitboxCG,catBallsCG,entrancedoorCG],this.platformHitListener,this);
    this.player.hitbox1.body.setCollisionGroup(hitboxCG);
    this.player.hitbox1.body.collides([ratCG,catCG,catBallsCG],this.playerHitListener,this);

    this.blockingGroup.forEach((child)=>{
      child.body.setCollisionGroup(blockingObjectsCG);
      child.body.collides([playerCG,collectablesCG,ratCG,tilesCG,catCG,catBallsCG]);
    },this);
    this.collectablesGroup.forEach((child)=>{
      child.body.setCollisionGroup(collectablesCG);
      child.body.collides([tilesCG,platformsCG,blockingObjectsCG]);
      child.body.collides(playerCG,this.collectablesListener,this);
    },this);
    this.ratGroup.forEach((child)=>{
      child.body.setCollisionGroup(ratCG);
      child.body.collides([tilesCG,platformsCG,blockingObjectsCG,stopsCG,hitboxCG]);
      child.body.collides(playerCG,this.enemyHitListener,this)
      if(child.key=='ratsoldier'){
        //for rat soldiers only
        child.hitbox1.body.setCollisionGroup(ratHitboxCG);
        child.hitbox1.body.collides(playerCG,this.enemyHitListener,this);
      }
    },this);
    let ballMaterial = this.physics.p2.createMaterial('ballMaterial');
    this.catGroup.forEach((child)=>{
      child.body.setCollisionGroup(catCG);
      child.body.collides([tilesCG,platformsCG,blockingObjectsCG,stopsCG,hitboxCG]);
      child.body.collides(playerCG,this.enemyHitListener,this);
      child.balls.forEach((ball)=>{
        ball.body.setMaterial(ballMaterial);
        ball.body.setCollisionGroup(catBallsCG);
        ball.body.collides([tilesCG,platformsCG,blockingObjectsCG,hitboxCG]);
        ball.body.collides(playerCG,this.enemyHitListener,this);
      },child);
    },this);
    this.stopsGroup.forEach((child)=>{
      child.body.setCollisionGroup(stopsCG);
      child.body.collides([ratCG,catCG]);
    },this);
    this.entrancedoor.body.setCollisionGroup(entrancedoorCG);
    this.entrancedoor.body.collides(playerCG,this.nextEpisode,this);

    this.physics.p2.createContactMaterial(tileMaterial, ballMaterial,{friction:0.2,restitution:0.8});


    //lock arrows key input from the browser
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE,Phaser.Keyboard.UP,Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT]);
    //initialize pop up panels,main pop up, instruction, tip1...N
    //add esc key to bring up pop up panel
    this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc':Phaser.KeyCode.ESC } );
    this.naviKeys.esc.onDown.add(()=>{
      if(!this.game.paused){
        this.game.paused=true;
        this.popup = new Popup(this.game,this.camera.x,this.camera.y,2);
        this.world.addChild(this.popup);
      }
      else{
        this.resumeGame();
      }

    },this);
    this.naviKeys.up.onDown.add((target)=>{//should this be added inside the Popup clas?
      //console.log("up");
      if(this.game.paused){
        this.popup.cursorMoved(target.keyCode);
      }
    },this);
    this.naviKeys.down.onDown.add((target)=>{
      //console.log("down");
      if(this.game.paused){
        this.popup.cursorMoved(target.keyCode);
      }
    },this);
    this.naviKeys.enter.onDown.add(()=>{
      if(this.game.paused)this.processSelection();
    },this);

    this.game.onPause.add(function(){this.sound.unsetMute();},this);//<==enable the sound to continue play ';)'
    this.theme.sounds['Obliteration'].play('Obliteration',null,0.3,true);

    this.titletext =  new TitleText(this.game,'Ep 3. The Flying Menace');
    this.add.existing(this.titletext);

    //To get the FPS
    this.time.advancedTiming = true;

  }

  update(){
    //water area hurts player
    if(this.damageZone.intersectsRaw(this.player.left,this.player.right,this.player.top,this.player.bottom)||this.damageZone1.intersectsRaw(this.player.left,this.player.right,this.player.top,this.player.bottom)){
      Tools.playSound(this.sfx,['Footstep_Water_04','Footstep_Water_05','Footstep_Water_06']);
      this.player.damagePlayer(4);
    }
  }

  nextEpisode(thisBody,thatBody){
    if(thatBody.sprite&&thatBody.sprite.key==='player'){
      this.cheeseScore.addToTotalScore(3);
      this.state.start('preload',true,false,'ep4');
    }
  }

  ////---> In Game Menu
  resumeGame(){
    let somepopup  = this.world.getTop();
    if(somepopup.key==='popup'){
      this.world.removeChild(somepopup);
      somepopup.destroy();
    }
    this.game.paused=false;
  }

  //processing for pop up menu items
  processSelection(){
    //let popupText = this.popup.optionEntered();
    let popupText = this.world.getTop().optionEntered();
    if(!popupText) return;

    console.log("enter "+popupText);
    //this guy has to do the lifting for the options
    switch(popupText){
      case 'Resume Game':
        this.resumeGame();
      break;
      case 'Restart Episode':
        this.resumeGame();//need to unpause the game before change state
        this.state.start('ep3');
      break;
      case 'Instructions':
        this.popupInstruction = new Popup(this.game,this.camera.x,this.camera.y,3);
        let instruction = this.cache.getJSON('config').popup.instructions;
        this.popupInstruction.setTitle(instruction['title']);
        this.popupInstruction.setDescription(instruction['description'],0);

        this.world.removeChild(this.popup);
        this.world.addChild(this.popupInstruction);
        this.enableCursorKeys(false);
      break;
      case 'Got it!':
        this.enableCursorKeys(true);
        this.resumeGame();
      break;
      case 'Quit to Main Menu':
        this.resumeGame();
        this.state.start('menu');
      break;
      case 'Mute Music':
        console.log("muting music ");
        Tools.storeData('mutetheme',true);
        Tools.muteOrPlay(this.theme,true);
      break;
      case 'Mute Sound':
        console.log("muting sound");
        Tools.storeData('mutesound',true);
        Tools.muteOrPlay(this.sfx,true);
      break;
      case 'Play Music':
        console.log("playing music");
        Tools.storeData('mutetheme',false);
        Tools.muteOrPlay(this.theme,false);
      break;
      case 'Play Sound':
        console.log("playing sound");
        Tools.storeData('mutesound',false);
        Tools.muteOrPlay(this.sfx,false);
      break;
    }
  }

  enableCursorKeys(bool){
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
  }

  platformHitListener(thisBody,thatBody,thisShape,thatShape){
    if(thatBody.sprite&&(thatBody.sprite.frameName=='slippery1'||thatBody.sprite.frameName=='slippery2')){
      Tools.playSound(this.sfx,['slime7','slime8','slime9']);
      this.player.onslippyplatform=true;
    }else{
      if(this.player.onslippyplatform)this.player.onslippyplatform=false;
    }
  }

  collectablesListener(thisBody,thatBody,thisShape,thatShape){
    if(thatBody.sprite&&thatBody.sprite.key==="player"){
      console.log("player contacted by "+thisBody.sprite.frameName);
      switch(thisBody.sprite.frameName){
        case 'cheese1':
          //increase player energy..
          this.player.replenishEnergy(10);
          this.cheeseScore.increaseScore(2);
          this.sfx.play('Rise04');

        break;
        case 'cheese2':
        case 'cheese3':
          //increase player energy..
          this.player.replenishEnergy(5);
          this.cheeseScore.increaseScore(1);
          this.sfx.play('Rise04');

        break;
        case 'wineglass':
        case 'martiniglass':
          this.player.replenishLife(10);
          this.sfx.play('Rise04');

        break;
        case 'winebottle':
          this.player.replenishLife(20);
          this.sfx.play('Rise04');

        break;
      }
      //flashy
      this.player.flash('green');
      //destroy the said sprite
      thisBody.sprite.destroy();
    }
  }

  enemyHitListener(thisBody,thatBody,thisShape,thatShape){
    if(thatBody.sprite&&thatBody.sprite.key==='player'){
      //Does the things that hit player all have sprite shape? and defined key?
      if(thisBody.sprite){
        console.log('player hit by: '+thisBody.sprite.key+ ' '+thisBody.sprite.name);
        switch(thisBody.sprite.key){
          case 'ratgrunt'://rat grunt
            if(thisShape===thisBody.data.shapes[0])this.player.damagePlayer(5);
          break;
          case 'ratsoldier'://rat soldier
            if(thisShape===thisBody.data.shapes[0])this.player.damagePlayer(8);
          break;
          case 'cat':
            this.player.damagePlayer(8);
          break;
          case 'objects3'://objects 3 are all balls
            this.player.damagePlayer(4);
          break;
          case 'objects2':
            let str = thisBody.sprite.frameName;
            //below match its a stalacites - upper{/d} and below {/d}
            if(/^upper\d{1}/.test(str)||/^below\d{1}/.test(str))this.player.damagePlayer(4);
          break;
          case 'objects1'://clubbed by soldier
            if(thisBody.sprite.frameName=='stop')this.player.damagePlayer(5,200);
          break;
        }
      }
    }
  }

  playerHitListener(thisBody,thatBody,thisShape,thatShape){
      //hitbox only target is enemy so pretty much no need to check
      if(thatBody.sprite){
        switch(thatBody.sprite.key){
          case 'ratgrunt':
          case 'ratsoldier':
            thatBody.sprite.damageRat(8,400);
          break;
          case 'cat':
            thatBody.sprite.damageCat(8,400);
          break;
        }

      }

  }

  render() {
    //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
  }

  shutdown(){

  }

}
