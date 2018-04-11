import Player from "../prefabs/Player.js";
import EntranceDoor from "../prefabs/EntranceDoor.js";
import BlockingObjects from "../prefabs/BlockingObjects.js"
import Collectables from "../prefabs/Collectables.js"
import WavesObjects from "../prefabs/WavesObjects.js"
import Platforms from "../prefabs/Platforms.js"
import HealthBar from "../prefabs/HealthBar.js"
import EnergyBar from "../prefabs/EnergyBar.js"
import RatSoldier from "../prefabs/RatSoldier.js"
import RatNinja from "../prefabs/RatNinja.js"
import RatBoss from "../prefabs/RatBoss.js"
import CatFinale from "../prefabs/CatFinale.js"
import Stalacites from "../prefabs/Stalacites.js"
import EnemyStops from "../prefabs/EnemyStops.js"
import Popup from "../prefabs/Popup.js"
import Tools from "../components/Tools.js"
import CheeseScore from "../prefabs/CheeseScore.js"
import ShurikenHUD from "../prefabs/ShurikenHUD.js"
import TitleText from "../prefabs/TitleText.js"

export default class Ep6 extends Phaser.State{

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
    this.map = this.add.tilemap('ep6');
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
    this.map.setCollisionBetween(1,122,true,this.layer);
    let tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

    //----------------------------
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

    //add large rock
    this.map.createFromObjects('largerock',27,'objects5','largerock',true,false,this.blockingGroup,BlockingObjects);
    this.largerock  = this.blockingGroup.getTop();
    console.log("this largerock? "+ this.largerock.frameName);

    //add entrance door -- behind of collectables
    this.map.createFromObjects('door',5,'objects1','entrancedoor',true,false,this.world,EntranceDoor);
    this.entrancedoor = this.world.getTop();
    this.entrancedoor.kill();

    //add collectables
    this.collectablesGroup = this.add.group();
    Tools.findUniqueGIDInLayer(this.map, 'collectables').forEach((element)=>{
      this.map.createFromObjects('collectables',element.gid,'objects1',element.name,true,false,this.collectablesGroup,Collectables);
    });

    this.map.createFromObjects('cheesepule',26,'objects5','cheesepule',true,false,this.collectablesGroup,Collectables);


    //add weapons
    this.map.createFromObjects('weapons',29,'objects4','shurikens',true,false,this.collectablesGroup,Collectables);

    //add the stalacites
    this.stalacitesGroup = this.add.group();
    Tools.findUniqueGIDInLayer(this.map, 'stalacites').forEach((element)=>{
      this.map.createFromObjects('stalacites',element.gid,'objects2',element.name,true,false,this.stalacitesGroup,Stalacites);
    });
    //-----------------------------
    this.player = new Player(this.game,60,1575);//start pos

    let playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);

    this.add.existing(this.player);

    this.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);

    //stop all previous playing sound first
    this.sound.stopAll();
    this.sfx = this.add.audioSprite('sfx');
    this.theme = this.add.audioSprite('boss');
    if(Tools.getData('mutesound'))Tools.muteOrPlay(this.sfx,true);
    if(Tools.getData('mutetheme'))Tools.muteOrPlay(this.theme,true);

    this.player.sfx = this.sfx;

    //------- enemies rats only initialized after rat boss speech
    //add enemy rat soldiers
    this.ratGroup = this.add.group(this.world,'rats');
    this.map.createFromObjects('ratsoldiers',20,'ratsoldier','hitframe0',true,false,this.ratGroup,RatSoldier);
    /*
    this.ratGroup.forEach((ratSoldier)=>{
      ratSoldier.paused=true;
    },this);*/
    this.ratGroup.setAll('paused',true); //-- set all paused to true at first

    //add enemy rat ratninjas
    this.map.createFromObjects('ratninjas',28,'ratninja','throwframe1',true,false,this.ratGroup,RatNinja);

    this.map.createFromObjects('ratboss',24,'ratboss','bodyf1',true,false,this.ratGroup,RatBoss);

    this.ratGroup.forEach((rat)=>{
      rat.player = this.player;
      rat.sfx = this.sfx;
    },this);

    let ratboss = this.ratGroup.getTop();
    console.log('ratboss? '+ratboss.key);
    //ratboss.sfx = this.sfx;
    let rightarm = ratboss.rightarm;
    let ratbossmaterial =  this.physics.p2.createMaterial('ratbossmaterial', ratboss.body);
    let armmaterial = this.physics.p2.createMaterial('armmaterial', rightarm.body);

    this.physics.p2.createContactMaterial(playerMaterial,armmaterial,{friction:0.35,restitution:0.8});
    this.physics.p2.createContactMaterial(playerMaterial,ratbossmaterial,{friction:0.35,restitution:0.8});

    //contact material with slippery platforms..
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[0],{friction:0.35,surfaceVelocity:-1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[1],{friction:0.35,surfaceVelocity:1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[2],{friction:0.35,surfaceVelocity:1000});
    this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[3],{friction:0.35,surfaceVelocity:1000});


    //bring the rats group to front, the arm to back
    this.world.bringToTop(this.ratGroup);

    //add enemy stops
    this.stopsGroup = this.add.group();
    Tools.findUniqueGIDInLayer(this.map, 'enemystops').forEach((element)=>{
      this.map.createFromObjects('enemystops',element.gid,'objects1',element.name,true,false,this.stopsGroup,EnemyStops);
    });

    //UI setup
    this.healthBar = new HealthBar(this.game,20,20);
    this.energyBar = new EnergyBar(this.game,31,80);
    this.player.energyBar = this.energyBar;
    this.player.healthBar = this.healthBar;

    this.cheeseScore = new CheeseScore(this.game,460,20,109);
    this.shurikenHUD = new ShurikenHUD(this.game,870,25,18);
    this.player.shurikenHUD = this.shurikenHUD;

    //add collision groups
    //  Turn on impact events for the world, without this we get no collision callbacks
    this.physics.p2.setImpactEvents(true);

    let tilesCG = this.physics.p2.createCollisionGroup();
    let platformsCG = this.physics.p2.createCollisionGroup();
    let stalacitesCG = this.physics.p2.createCollisionGroup();
    let playerCG = this.physics.p2.createCollisionGroup();
    let hitboxCG = this.physics.p2.createCollisionGroup();
    let shurikenboxCG = this.physics.p2.createCollisionGroup();
    let ratHitboxCG = this.physics.p2.createCollisionGroup();
    let ninjaShurikenCG = this.physics.p2.createCollisionGroup();
    let blockingObjectsCG = this.physics.p2.createCollisionGroup();
    let collectablesCG = this.physics.p2.createCollisionGroup();
    let ratCG = this.physics.p2.createCollisionGroup();
    let stopsCG = this.physics.p2.createCollisionGroup();
    this.catCG = this.physics.p2.createCollisionGroup();
    this.entrancedoorCG = this.physics.p2.createCollisionGroup();

    let armCG = this.physics.p2.createCollisionGroup();

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
      child.body.collides(playerCG,this.enemyHitListener,this)
    },this);
    this.player.body.setCollisionGroup(playerCG);
    this.player.body.collides([tilesCG,stalacitesCG,blockingObjectsCG,platformsCG,collectablesCG,ratCG,ratHitboxCG,armCG,ninjaShurikenCG],this.platformHitListener,this);
    this.player.hitbox1.body.setCollisionGroup(hitboxCG);
    this.player.hitbox1.body.collides([ratCG,ninjaShurikenCG],this.playerHitListener,this);
    this.player.shurikens.forEach((shuriken)=>{
      shuriken.body.setCollisionGroup(shurikenboxCG);
      shuriken.body.collides([ninjaShurikenCG,armCG]);
      shuriken.body.collides(ratCG,this.playerHitListener,this);
    },this);
    this.blockingGroup.forEach((child)=>{
      child.body.setCollisionGroup(blockingObjectsCG);
      child.body.collides([playerCG,collectablesCG,ratCG,tilesCG]);
    },this);
    this.collectablesGroup.forEach((child)=>{
      child.body.setCollisionGroup(collectablesCG);
      child.body.collides([tilesCG,platformsCG,blockingObjectsCG]);
      child.body.collides(playerCG,this.collectablesListener,this);
    },this);
    this.ratGroup.forEach((child)=>{
      child.body.setCollisionGroup(ratCG);
      child.body.collides([tilesCG,platformsCG,blockingObjectsCG,stopsCG,hitboxCG,shurikenboxCG]);
      child.body.collides(playerCG,this.enemyHitListener,this)
      if(child.key=='ratsoldier'){
        //for rat soldiers only
        child.hitbox1.body.setCollisionGroup(ratHitboxCG);
        child.hitbox1.body.collides(playerCG,this.enemyHitListener,this);
      }
      if(child.key=='ratninja'){
        child.shurikens.forEach((shuriken)=>{
          shuriken.body.setCollisionGroup(ninjaShurikenCG);
          shuriken.body.collides([hitboxCG,shurikenboxCG]);
          shuriken.body.collides(playerCG,this.enemyHitListener,this);
        },this);
      }
    },this);
    rightarm.body.setCollisionGroup(armCG);
    rightarm.body.collides([playerCG,shurikenboxCG]);
    rightarm.body.onBeginContact.add(this.playerArmed,this);
    this.stopsGroup.forEach((child)=>{
      child.body.setCollisionGroup(stopsCG);
      child.body.collides([ratCG]);
    },this);
    this.entrancedoor.body.setCollisionGroup(this.entrancedoorCG);
    this.entrancedoor.body.collides(this.catCG,this.finalEpisode,this);

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
    this.theme.sounds['Improv for Evil'].play('Improv for Evil',null,0.4,true);

    this.titletext =  new TitleText(this.game,"Ep 6. The O'Mighty Claw");
    this.add.existing(this.titletext);

    //To get the FPS
    this.time.advancedTiming = true;

    this.scenesmarker = [false,false,false,false];
    //first scene - scan room , boss speech
    //second scene -
    this.cameratimer = 0;
    this.scenecounter = 0;

  }

  addCat(){
    //add the special cat
    if(this.catfinale)return;
    this.catGroup = this.add.group(this.world,'cats');
    this.map.createFromObjects('cats',23,'catfinale','catf1',true,false,this.catGroup,CatFinale);
    this.catfinale = this.catGroup.getTop();//cat is the top no 28
    this.catfinale.body.setCollisionGroup(this.catCG);
    this.catfinale.body.collides(this.entrancedoorCG);
  }

  update(){

    if(this.player.x>=250&&!this.scenesmarker[0]){
      //first scene - freeze player and refocus to rat boss
      this.player.paused = true;
      //scan rat 3 - 6 - 5 - boss
      if(this.game.time.now > this.cameratimer){
        switch(this.scenecounter++){
          case 0:
            this.camera.follow(this.ratGroup.getChildAt(3),null,0.02,0.02);
          break;
          case 1:
            this.camera.follow(this.ratGroup.getChildAt(6),null,0.03,0.03);
          break;
          case 2:
            this.camera.follow(this.ratGroup.getChildAt(5),null,0.03,0.03);
          break;
          case 3:
            let boss = this.ratGroup.getTop()
            this.camera.follow(boss,null,0.01,0.01);
            boss.startscene = true;
            this.scenesmarker[0] = true;
          break;
        }
        this.cameratimer = this.game.time.now + 4000;
      }
    }
    let ratboss = this.ratGroup.getTop();
    //first scene finished
    if(this.player.paused&&this.scenesmarker[0]&&ratboss.alive&&!ratboss.startscene){
      console.log("set once only!")
      this.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);
      this.ratGroup.setAll('paused',false); //reactivate rat soldiers
      this.player.paused = false;//reactivate dossier
      this.ratGroup.getTop().attack = true;
    }

    //after boss died
    if(!ratboss.alive&&!this.scenesmarker[1]){
      this.largerock.destroy();
      this.scenecounter = 0;
      this.scenesmarker[1] = true;
    }

    if(this.scenesmarker[1]&&this.scenesmarker[2]&&!this.scenesmarker[3]){
      if(this.game.time.now > this.cameratimer){
        switch(this.scenecounter++){
          case 0:
            this.player.say("Yes! We've got the lost cheese! Let's go home!");
          break;
          case 1:
            this.player.paused = true;
            this.ratGroup.setAll('paused',true); //-- set all paused to true at first
            this.entrancedoor.revive();
            this.addCat();
            this.camera.follow(this.catfinale,null,0.02,0.02);
          break;
          case 2:
            console.log("marina text here");
            this.catfinale.say("Dossier! Save me! Don't let him take me away!!");
          break;
          case 3:
            console.log("camera pans to the door");
            this.camera.follow(this.entrancedoor,null,0.02,0.02);
          break;
          case 4:
            console.log("camera moves back to player, enables player, enables cat flying");
            this.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);
            this.player.paused = false;
            this.ratGroup.setAll('paused',false);
            this.catfinale.paused = false;
            this.scenecounter = 0;
            this.scenesmarker[3]=true;
          break;
        }
        this.cameratimer = this.game.time.now + 4000;
      }

    }

    if(this.scenesmarker[3]){
      let interval = 6500;
      if(this.game.time.now > this.cameratimer){
        switch(this.scenecounter++){
          case 1:
            console.log("camera focus on cat, player paused, cat and marina fades away");
            this.player.paused = true;
            this.ratGroup.setAll('paused',true); //-- set all paused to true at first
            this.camera.follow(this.catfinale,null,0.02,0.02);
          break;
          case 2:
            console.log("camera moves to player, player text");
            this.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);
            this.player.paused = false;
            interval = 900;
          break;
          case 3://need time for camera to shift in place
            this.player.say("Marina! Noooooo~!!");
            interval = 3000;
          break;
          case 4:
            console.log("screen fades away start won page");
            this.camera.fade(0x000000,3500);
            interval = 4500;
          break;
          case 5:
            this.state.start('preload',true,false,'won');
          break;
        }
        this.cameratimer = this.game.time.now + interval;
      }
    }

    //marina text

    //marina text finished, camera moves slowly to door, moves quickly back to player, enables player

    //camera touches door, camera focus on cat, player paused. Cat and marina fades away

    //camera moves quickly back to player. player text.

    //player text finished, screen fades away

  }

  finalEpisode(thisBody,thatBody){
    if(thatBody.sprite&&thatBody.sprite.key==='catfinale'){
      console.log("cat touched door. end.");
      this.cheeseScore.addToTotalScore(6);
      this.catfinale.fadeout();
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
        this.state.start('ep6');
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
        case 'shurikens':
          if(!this.player.throwEnabled) this.player.throwBody();

          //increase player shurikens count
          this.player.increaseShuriken(5);
          this.sfx.play('Rise04');
        break;
        case 'cheesepule':
          console.log("yay cheese pule!");
          this.player.replenishEnergy(100);
          this.player.replenishLife(100);
          this.cheeseScore.increaseScore(100);
          this.sfx.play('collectsword');
          this.scenesmarker[2] = true;
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
        //console.log('player hit by: '+thisBody.sprite.key+ ' '+thisBody.sprite.name);
        switch(thisBody.sprite.key){
          case 'ratgrunt'://rat grunt
            if(thisShape===thisBody.data.shapes[0])this.player.damagePlayer(5);
          break;
          case 'ratsoldier'://rat soldier
          case 'ratninja':
            if (/^s\d{1}/.test(thisBody.sprite.frameName)){
              this.player.damagePlayer(5,200);
              thisBody.sprite.kill();
            }else if(thisShape===thisBody.data.shapes[0])this.player.damagePlayer(8);
          break;
          case 'ratboss':
            this.player.damagePlayer(12);
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
        //console.log("player hit that body "+thatBody.sprite.key);
        if(thisBody.sprite&&/^s\d{1}/.test(thisBody.sprite.frameName)){
          //kill the shuriken body
          switch(thatBody.sprite.key){
            case 'ratgrunt':
            case 'ratsoldier':
            case 'ratninja':
            case 'ratboss':
              thatBody.sprite.damageRat(6,400);
            break;
            case 'cat':
              thatBody.sprite.damageCat(6,400);
            break;
          }
          thisBody.sprite.kill();

        }else{
          switch(thatBody.sprite.key){
            case 'ratgrunt':
            case 'ratsoldier':
            case 'ratninja':
            case 'ratboss':
              thatBody.sprite.damageRat(8,400);
            break;
            case 'cat':
              thatBody.sprite.damageCat(8,400);
            break;
          }
        }
      }
  }

  playerArmed(bodyA,bodyB){

    if(bodyA&&bodyA.sprite&&bodyA.sprite.key=='player'){
      this.player.damagePlayer(10);
    }
  }

  render() {
    //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
  }

  shutdown(){

  }

}
