import Player from "../prefabs/Player.js";
import BlockingObjects from "../prefabs/BlockingObjects.js"
import Collectables from "../prefabs/Collectables.js"
import WavesObjects from "../prefabs/WavesObjects.js"
import Platforms from "../prefabs/Platforms.js"
import HealthBar from "../prefabs/HealthBar.js"
import EnergyBar from "../prefabs/EnergyBar.js"
import Enemy from "../prefabs/Enemy.js"
import Popup from "../prefabs/Popup.js"

export default class Ep1 extends Phaser.State{

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
    this.map = this.add.tilemap('ep1');
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

    let tileObjects = this.physics.p2.convertTilemap(this.map, this.layer);

    //add arch layer
    this.map.createLayer('decorative');

    //add moving waves objects
    //this guy has same gid 184 for all the tiles... depending on how this function is written, it might just grabbed all the
    //objects for this gid
    this.map.createFromObjects('movingwaves',184,'objects','watertile',true,false,this.world,WavesObjects);
    //add the damage zone associated with the water area
    this.damageZone = new Phaser.Rectangle(1200,2100,400,100);

    //this.add.tween(this.watertile[0]).to({ y: -10 }, 800, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);

    //add custom platforms
    this.map.createFromObjects('platforms',183,'objects','slippery2',true,false,this.world,Platforms);
    //custom properties to this
    this.slippery = this.world.getTop();
    console.log("this "+this.slippery.frameName);
    let slipperyMaterial = this.physics.p2.createMaterial('slipperyMaterial',this.slippery.body);

    //add blocking objects
    //this.blockingobjectsgroup = this.add.group();
    //use this function to find all objects if your gid is unique
    this.findObjectsInLayer(this.map, 'blockingobjects').forEach((element)=>{
       this.map.createFromObjects('blockingobjects',element.gid,'objects',element.name,true,false,this.world,BlockingObjects);
    });

    //add collectables
    this.collectablesGroup = this.add.group();
    this.findObjectsInLayer(this.map, 'collectables').forEach((element)=>{
      this.map.createFromObjects('collectables',element.gid,'objects',element.name,true,false,this.collectablesGroup,Collectables);
    });
    this.collectablesGroup.forEach((collectable)=>{collectable.body.onBeginContact.add(this.contactListener,this,0,collectable)},this);

    //add player
    //this.player = new Player(this.game,260,this.world._height-200);
    this.player = new Player(this.game,712,776);
    //test objects
    /*
    this.testObj = this.add.graphics(620,1120);
    this.testObj.clear();
    this.testObj.beginFill(0xff0000);
    this.testObj.drawCircle(0,0,50);
    this.testObj.endFill();
    this.physics.p2.enable(this.testObj,true);
    this.testObj.body.clearShapes();//adding any shapes will shift the anchor to 0.5, 0.5
    this.testObj.body.addCapsule(30,35,0,0);//cannot add offset!!!, else will have collision trouble with the side tiles
    */
    let playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
    //contact material with slippery
    let contactMaterial = this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterial,{friction:0.35,surfaceVelocity:1000});

    this.world.addChild(this.player);//need to add this display object to the world group

    //add enemy rat grunt
    this.map.createFromObjects('enemy',187,'enemy',null,true,false,this.world,Enemy);
    this.enemy = this.world.getTop()
    this.enemy.player = this.player;
    //this.enemy.body.onBeginContact.add(this.enemyHitListener,this);

    //  Create our collision groups. One for the player, one for the enemy
    //  Turn on impact events for the world, without this we get no collision callbacks
    this.physics.p2.setImpactEvents(true);

    this.tilesCollisionGroup = this.physics.p2.createCollisionGroup();
    this.playerCollisionGroup = this.physics.p2.createCollisionGroup();
    this.enemyCollisionGroup = this.physics.p2.createCollisionGroup();
    //update world bounds collision group  to collide with all the custom collision groups
    this.physics.p2.updateBoundsCollisionGroup();
    //set the collisions
    tileObjects.forEach((tile)=>{
      tile.setCollisionGroup(this.tilesCollisionGroup);
      tile.collides([this.playerCollisionGroup,this.enemyCollisionGroup]);
    });
    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    this.enemy.body.setCollisionGroup(this.enemyCollisionGroup);
    this.enemy.body.collides(this.tilesCollisionGroup);
    this.enemy.body.collides(this.playerCollisionGroup,this.enemyHitListener2,this);
    this.player.body.collides(this.tilesCollisionGroup);
    this.player.body.collides(this.enemyCollisionGroup);

    //the most front layer which to be displayed in front of player
    this.map.createLayer('wave');

    //UI setup
    this.healthBar = new HealthBar(this.game,20,20);
    this.healthBar.fixedToCamera = true;
    this.energyBar = new EnergyBar(this.game,31,80);
    this.energyBar.fixedToCamera = true;
    this.player.energyBar = this.energyBar;
    this.player.healthBar = this.healthBar;

    this.camera.follow(this.player);

    this.physics.p2.setBoundsToWorld(true, true, true, true, false);

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
    this.naviKeys.up.onDown.add((target)=>{
      if(this.game.paused)this.popup.cursorMoved(target.keyCode);
    },this);
    this.naviKeys.down.onDown.add((target)=>{
      if(this.game.paused)this.popup.cursorMoved(target.keyCode);
    },this);
    this.naviKeys.enter.onDown.add(this.processSelection,this);

    //To get the FPS
    this.time.advancedTiming = true;
    //experiment
    //this.result = this.findObjectsByType('blockableobject', this.map, 'blockingobjects');
    //if(this.result)console.log("found some? "+this.result.length);

  }

  test(){
    console.log("test su");
  }

  update(){
    //water area hurts player
    if(this.damageZone.intersectsRaw(this.player.left,this.player.right,this.player.top,this.player.bottom)){
      this.damagePlayer(2);
    }
    //
  }

  render() {
    //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
  }

  shutdown(){

  }

  resumeGame(){
    this.world.removeChild(this.popup);
    this.popup.destroy();
    this.game.paused=false;
  }

  //processing for pop up menu items
  processSelection(){
    console.log("enter");
    let popupText = this.popup.optionEntered();
    //this guy has to do the lifting for the options
    switch(popupText){
      case 'Resume Game':
        this.resumeGame();
      break;
      case 'Restart Episode':
        this.resumeGame();//need to unpause the game before change state
        this.state.restart('Ep1');
      break;
      case 'Mute Music':
        console.log("muting music");
      break;
      case 'Mute Sound':
        console.log("muting Sound");
      break;
      case 'Play Music':
        console.log("Playing music");
      break;
      case 'Play Sound':
        console.log("Playing Sound");
      break;
      case 'Instructions':

        //if its current already this popup
        if(this.popupInstruction&&this.world.getTop()===this.popupInstruction){

          console.log("yes ");
          this.world.removeChild(this.popupInstruction);
          this.world.addChild(this.popup);
          this.enableCursorKeys(true);
        }else{
          this.popupInstruction = new Popup(this.game,this.camera.x,this.camera.y,3);
          this.popupInstruction.setTitle('Instructions');
          let desc  = this.cache.getJSON('config').popup.instructions;
          this.popupInstruction.setDescription(desc,0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupInstruction);
          this.enableCursorKeys(false);
        }

      break;
      case 'Quit to Main Menu':
        this.resumeGame();
        this.state.start('menu');
      break;
    }
  }

  enableCursorKeys(bool){
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
  }

  //player interaction functions
  damagePlayer(amt){
    if(this.game.time.now>this.player.damageTimer){//player cannot keep taking damage every tick!
      //console.log("damage health ");
      if(this.player.health<=0.5) this.state.start("gameover");
      this.player.drainLife(amt);
      console.log("player health "+this.player.health);
      this.player.flash('red');
      this.player.damageTimer = this.game.time.now + this.player.damageInterval;
    }
  }

  enemyHitListener(bodyA,bodyB, shapeA, shapeB,equation){
    if(bodyA&&bodyA.sprite&&bodyA.sprite.key==='player'){
      this.damagePlayer(5);
    }
  }

  enemyHitListener2(bodyA,bodyB,bodyAShape,bodyBShape){
    console.log("enemy collided");
    if(bodyB.sprite&&bodyB.sprite.key==='player'){
      this.damagePlayer(5);
    }
  }


  contactListener(bodyA,bodyB, shapeA, shapeB,equation,collectable){
    if(bodyA&&bodyA.sprite&&bodyA.sprite.key==='player'){
      switch(collectable.frameName){
        case 'cheese1':
          console.log("cheese1 am grabbed!");
          //increase player energy..
          this.player.replenishEnergy(10);
        break;
        case 'cheese2':
        case 'cheese3':

        break;
        case 'wineglass':
          console.log("wineglass am grabbed!");
          this.player.replenishLife(10);
        break;
        case 'winebottle':
          console.log("winebottle am grabbed!");
          this.player.replenishLife(20);
        break;

      }
      //flashy
      this.player.flash('green');
      //destroy the said sprite
      collectable.destroy();
      console.log("group size "+this.collectablesGroup.length);
    }
  }
  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        //element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  }

  findObjectsInLayer(map,layer){
    let result = new Array();
    map.objects[layer].forEach(function(element){
      //element.y -= element.height;
      result.push(element);
    });
    return result;
  }


}
