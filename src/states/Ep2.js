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
import Stalacites from "../prefabs/Stalacites.js"
import EnemyStops from "../prefabs/EnemyStops.js"
import Popup from "../prefabs/Popup.js"
import Tools from "../components/Tools.js"
import CheeseScore from "../prefabs/CheeseScore.js"
import TitleText from "../prefabs/TitleText.js"

export default class Ep2 extends Phaser.State{

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
    this.map = this.add.tilemap('ep2');
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
    this.damageZone = new Phaser.Rectangle(1700,3580,800,100);

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

    //add weapons
    this.map.createFromObjects('weapons',190,'objects2','sword1',true,false,this.collectablesGroup,Collectables);

    //add the stalacites
    this.stalacitesGroup = this.add.group();
    Tools.findUniqueGIDInLayer(this.map, 'stalacites').forEach((element)=>{
      this.map.createFromObjects('stalacites',element.gid,'objects2',element.name,true,false,this.stalacitesGroup,Stalacites);
    });

    //add toriis
    this.map.createFromObjects('torii1',193,'objects2','torii1');
    //create two graphics rectangle to the world
    this.toriiGroup = this.add.group();
    this.toriiRect1 = this.add.graphics(1480,800,this.toriiGroup);
    //this.toriiRect2 = this.add.graphics(1560,900,this.toriiGroup);
    this.toriiRect1.clear();
    this.toriiRect1.drawRect(0,0,530,28);
    //this.toriiRect2.clear();
    //this.toriiRect2.drawRect(0,0,480,26);
    this.physics.p2.enable(this.toriiRect1,false);
    //this.physics.p2.enable(this.toriiRect2,true);
    this.toriiRect1.body.static = true;
    //this.toriiRect2.body.static = true;
    Tools.convertTileCoorToP2(1480,800,530,28,this.toriiRect1.body);
    //Tools.convertTileCoorToP2(1560,900,480,26,this.toriiRect2.body);

    //add entrance door
    this.map.createFromObjects('door',176,'objects1','entrancedoor',true,false,this.world,EntranceDoor);
    this.entrancedoor = this.world.getTop();

    //add player & player properties
    this.player = new Player(this.game,260,this.world._height-200);
    //this.player = new Player(this.game,1150,320);
    //this.player = new Player(this.game,1545,1240);
    //this.player = new Player(this.game,258,270);

    //player materials
    let playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
    //contact material with slippery platforms..
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[0],{friction:0.35,surfaceVelocity:-1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[1],{friction:0.35,surfaceVelocity:1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[2],{friction:0.35,surfaceVelocity:-1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[3],{friction:0.35,surfaceVelocity:-1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[4],{friction:0.35,surfaceVelocity:-1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[5],{friction:0.35,surfaceVelocity:1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[6],{friction:0.35,surfaceVelocity:1000});

    this.add.existing(this.player);

    this.camera.follow(this.player);

    //add torii2 sprite in front of player
    this.map.createFromObjects('torii2',194,'objects2','torii2');

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

    //add enemy rat soldiers
    this.map.createFromObjects('ratsoldiers',195,'ratsoldier','hitframe0',true,false,this.ratGroup,RatSoldier);
    this.ratGroup.forEach((rat)=>{
      rat.player=this.player;
      rat.sfx = this.sfx;
      /*
      if(rat.name==='unique1'||rat.name==='unique2')rat.events.onKilled.add(()=>{
        this.uniquesdied++;
        console.log(rat.name+" died ");
      },this);*/
    },this);

    //this.uniquesdied = 0;
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

    this.cheeseScore = new CheeseScore(this.game,460,20,9);

    //add collision groups
    //  Turn on impact events for the world, without this we get no collision callbacks
    this.physics.p2.setImpactEvents(true);

    let tilesCG = this.physics.p2.createCollisionGroup();
    let platformsCG = this.physics.p2.createCollisionGroup();
    let stalacitesCG = this.physics.p2.createCollisionGroup();
    let toriiCG = this.physics.p2.createCollisionGroup();
    let playerCG = this.physics.p2.createCollisionGroup();
    let hitboxCG = this.physics.p2.createCollisionGroup();
    let ratHitboxCG = this.physics.p2.createCollisionGroup();
    let blockingObjectsCG = this.physics.p2.createCollisionGroup();
    let collectablesCG = this.physics.p2.createCollisionGroup();
    let ratCG = this.physics.p2.createCollisionGroup();
    let stopsCG = this.physics.p2.createCollisionGroup();
    let entrancedoorCG = this.physics.p2.createCollisionGroup();

    //update world bounds collision group  to collide with all the custom collision groups
    this.physics.p2.updateBoundsCollisionGroup();
    //set the collisions
    tilesBodies.forEach((tile)=>{
      tile.setCollisionGroup(tilesCG);
      tile.collides([playerCG,collectablesCG,blockingObjectsCG,ratCG]);
    });
    this.platformsGroup.forEach((child)=>{
      child.body.setCollisionGroup(platformsCG);
      child.body.collides([playerCG,collectablesCG,ratCG]);
    },this);
    this.stalacitesGroup.forEach((child)=>{
      child.body.setCollisionGroup(stalacitesCG);
      child.body.collides(ratCG);
      child.body.collides(playerCG,this.enemyHitListener,this)
    },this);
    this.toriiGroup.forEach((child)=>{
      child.body.setCollisionGroup(toriiCG);
      child.body.collides([playerCG,collectablesCG,ratCG]);
    },this);
    this.player.body.setCollisionGroup(playerCG);
    this.player.body.collides([tilesCG,stalacitesCG,toriiCG,blockingObjectsCG,platformsCG,collectablesCG,ratCG,ratHitboxCG,entrancedoorCG],this.platformHitListener,this);
    this.player.hitbox1.body.setCollisionGroup(hitboxCG);
    this.player.hitbox1.body.collides(ratCG,this.playerHitListener,this);

    this.blockingGroup.forEach((child)=>{
      child.body.setCollisionGroup(blockingObjectsCG);
      child.body.collides([playerCG,collectablesCG,ratCG,tilesCG]);
    },this);
    this.collectablesGroup.forEach((child)=>{
      child.body.setCollisionGroup(collectablesCG);
      child.body.collides([tilesCG,platformsCG,blockingObjectsCG,toriiCG]);
      child.body.collides(playerCG,this.collectablesListener,this);
    },this);
    this.ratGroup.forEach((child)=>{
      child.body.setCollisionGroup(ratCG);
      child.body.collides([tilesCG,platformsCG,toriiCG,stalacitesCG,blockingObjectsCG,stopsCG,hitboxCG]);
      child.body.collides(playerCG,this.enemyHitListener,this)
      if(child.key=='ratsoldier'){
        //for rat soldiers only
        child.hitbox1.body.setCollisionGroup(ratHitboxCG);
        child.hitbox1.body.collides(playerCG,this.enemyHitListener,this);
      }
    },this);
    this.stopsGroup.forEach((child)=>{
      child.body.setCollisionGroup(stopsCG);
      child.body.collides(ratCG);
    },this);
    this.entrancedoor.body.setCollisionGroup(entrancedoorCG);
    this.entrancedoor.body.collides(playerCG,this.nextEpisode,this);

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

    this.game.onPause.add(()=>{this.sound.unsetMute();},this);//<==enable the sound to continue play ';)'
    this.theme.sounds['Hiding Your Reality'].play('Hiding Your Reality',null,0.4,true);

    this.titletext =  new TitleText(this.game,'Ep 2. The Rat Infestation');
    this.add.existing(this.titletext);

    //To get the FPS
    this.time.advancedTiming = true;

    this.tipsmarker = [false,false];
  }

  update(){
    //water area hurts player
    if(this.damageZone.intersectsRaw(this.player.left,this.player.right,this.player.top,this.player.bottom)){
      Tools.playSound(this.sfx,['Footstep_Water_04','Footstep_Water_05','Footstep_Water_06']);
      this.player.damagePlayer(4);
    }

    //if(this.uniquesdied==2)this.tipspopper(1);
  }

  nextEpisode(thisBody,thatBody){
    if(thatBody.sprite&&thatBody.sprite.key==='player'){
      this.cheeseScore.addToTotalScore(2);
      this.state.start('preload',true,false,'ep3');
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
        this.state.start('ep2');
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
        case 'sword1':
          //pause the game, bring up the tip pop up
          this.sfx.play('collectsword');
          this.player.changeBody();
          this.tipspopper(0);

        break;

      }
      //flashy
      this.player.flash('green');
      //destroy the said sprite
      thisBody.sprite.destroy();
    }
  }

  tipspopper(index){
    if(this.tipsmarker[index])return;

    this.game.paused=true;
    let tippopup = new Popup(this.game,this.camera.x,this.camera.y,3);
    let tip = this.cache.getJSON('config').popup.ep2.tips[index];
    tippopup.setTitle(tip['title']);
    if(tip['description'])tippopup.setDescription(tip['description'],0);

    this.tipsmarker[index] = true;

    this.world.addChild(tippopup);
    this.enableCursorKeys(false);
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
        thatBody.sprite.damageRat(8,400);
      }

  }

  render() {
    //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
  }

  shutdown(){

  }

}
