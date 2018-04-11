import Tools from "../components/Tools.js";

export default class Player extends Phaser.Sprite{
  constructor(game,x,y){
    super(game,x,y,'player','runframe0');
    //player properties
    this.speed = 450;
    this.airSpeed =300;
    this.jumpPower = 680;
    this.jumpTimer = 0;
    this.hitGroundTimer = 0;
    this.jumpInterval = 750;
    this.damageTimer = 0;
    this.damageInterval = 1200;
    this.heartBeatInterval = 800;//need a timer event to keep check every interval - since energy is going to be spent often!
    this.jump = false;
    this.isMoving = false;
    this.isJumping = false;

    this.game.physics.p2.enable(this,false);//debug is true
    this.body.clearShapes();//adding any shapes will shift the anchor to 0.5, 0.5
    this.body.addCapsule(30,35,0,0);//cannot add offset!!!, else will have collision trouble with the side tiles
    this.anchor.setTo(.5,.6);

    this.body.fixedRotation = true;
    this.body.damping = 0.2;

    this.attackEnabled = Tools.getData('attackEnabled');
    this.throwEnabled = Tools.getData('throwEnabled');

    if(!this.attackEnabled){
      this.animations.add('run',Phaser.Animation.generateFrameNames('runframe', 1, 8, '', 0),18,false,false);
      this.stillFrame = 'runframe0';
      this.jumpUpFrame = 'jumpframe1';
      this.jumpDownFrame = 'jumpframe2';
    }else{
      this.changeBody();
    }

    //attack box
    this.hitbox1 = this.addChild(game.make.sprite(this.x,this.y,'objects1','stop'));
    this.game.physics.p2.enable(this.hitbox1,false);//debug is false
    this.hitbox1.body.kinematic = true;
    this.hitbox1.alpha = 0;
    this.hitbox1.kill();

    if(this.throwEnabled) this.throwBody();
    //create 5 shurikens with first frame
    this.shurikens = this.game.add.group(this.game.world,'shurikens',false,true,1);
    this.shurikens.createMultiple(20,'player','s1');

    this.shurikens.forEach((shuriken)=>{
      shuriken.body.clearShapes();
      shuriken.body.setCircle(shuriken.width/2);
      shuriken.animations.add('fly',Phaser.Animation.generateFrameNames('s', 1, 3, '', 0),25,true,false);
      shuriken.body.kinematic = true;
      shuriken.body.damping = 0.2;
      //shuriken.body.debug=true;
    },this.game.world);

    this.playertext = this.game.add.text(this.x,this.y," ",{
      font:'15px Century',fill:'#ffffff'
    });
    this.playertext.anchor.setTo(0.5,0.5);
    this.playertext.kill();
    this.texttimer = 0;

    //damage animation
    this.flashRedEffect = this.game.add.tween(this) //blink blink when hit
        .to({tint:0xFF0000},50,Phaser.Easing.Bounce.out)
        .to({tint:0xFB8989},50,Phaser.Easing.Bounce.out)
        .to({tint:0xFFFFFF},150,Phaser.Easing.Circular.out);

    //power up animation
    this.flashGreenEffect = this.game.add.tween(this) //blink blink when hit
        .to({tint:0x00FF00},50,Phaser.Easing.Bounce.out)
        .to({tint:0x83ff83},50,Phaser.Easing.Bounce.out)
        .to({tint:0xFFFFFF},150,Phaser.Easing.Circular.out);

    //set health-internal built in params
    this.setHealth(this.maxHealth);//default maxHealth is 100
    //custom energy params
    this.maxEnergy = 100;
    this.energy = this.maxEnergy;
    this.heartBeat = this.game.time.create(false);
    this.heartBeat.loop(this.heartBeatInterval, this.heartBeatCheck,this);
    this.heartBeat.start();
    //check for death
    this.events.onKilled.add(()=>{this.game.state.start('preload',true,false,'gameover')},this);

    this.resting = false;
    this.onslippyplatform = false;

    this.paused = false;

    //keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.keys = this.game.input.keyboard.addKeys({'A': Phaser.Keyboard.A,'S': Phaser.Keyboard.S});
    this.keys.A.onDown.add(()=>{if(this.paused)return; if(this.attackEnabled)this.attacking=true;},this);
    this.keys.S.onDown.add(()=>{
      if(this.paused)return;
      if(this.throwEnabled&&this.shurikenHUD){
          if(this.shurikenHUD.count<1){
            let out = this.game.cache.getJSON('config').popup.outofammo;
            this.say(this.game.rnd.pick(Object.values(out)));
          }
          else {
            this.throwing=true;
          }
      }
      //console.log("dossier position: "+this.x+" "+this.y)
    }
    ,this);

  }

  attack(){
    if(this.attackEnabled){
      //enable hit box
      if(!this.hitbox1.exists){
        this.animations.play('attack');
        this.sfx.play(this.game.rnd.pick(['pull','pull1','swipe1']));
        let faceDir = this.scale.x;
        this.hitbox1.reset(this.x+faceDir*70,this.y-60);
        this.hitbox1.body.velocity.x = faceDir * 150;
        this.drainEnergy(6);
      }
    }
  }

  throwstars(){
    //console.log("throwstars "+ this.throwEnabled + " " + this.shurikenscount);
    if(this.throwEnabled){
      this.animations.play('throw');
      this.sfx.play('swish');
      let faceDir = this.scale.x;
      let shuriken = this.shurikens.getFirstDead(false,this.x,this.y-70);
      if(shuriken){
        shuriken.lifespan = 2500;
        shuriken.body.velocity.x = faceDir * 400;
        shuriken.animations.play('fly');

        this.decreaseShuriken(1);
        this.drainEnergy(4);
      }
    }
  }

  heartBeatCheck(){
    if(this.paused) return;
    //check for energy drainage
    if(this.isMoving)this.drainEnergy(2);
    else if(this.isJumping)this.drainEnergy(4);
    else this.replenishEnergy(2);

    //if this player energy/life lower than 20, flash warning
    //health priority is first when displaying dialogue
    if(this.health<30){
      this.healthBar.startWarning();
      if(!this.playertext.alive&&this.game.time.now > this.texttimer){
        let dyingobj = this.game.cache.getJSON('config').popup.dying;
        let texttosay = this.game.rnd.pick(Object.values(dyingobj));
        this.say(texttosay);
        this.texttimer = this.game.time.now +6000;
      }

    }

    if(this.energy<30){
      this.energyBar.startWarning();
      if(!this.playertext.alive&&this.game.time.now > this.texttimer){
        let tiringobj = this.game.cache.getJSON('config').popup.tiring;
        let texttosay = this.game.rnd.pick(Object.values(tiringobj));
        this.say(texttosay);
        this.texttimer = this.game.time.now +6000;
      }
    }
  }

  say(speech){
    if(!this.playertext.alive){
      this.playertext.fixedToCamera = false;
      this.playertext.setText(speech);
      this.playertext.reset((this.x-this.game.camera.position.x),(this.y-this.game.camera.position.y)-120);
      this.playertext.lifespan = 2500;

      this.playertext.fixedToCamera = true;
      //console.log(this.game.camera.position.x+" "+this.game.camera.position.y +" "+ this.playertext.cameraOffset.x+" " + this.playertext.cameraOffset.y+ " " + this.x + " " + this.y);
    }
  }

  animationState(){

    if(this.attacking&&!this.inAir&&this.frameName==this.stillFrame){
      //console.log("hitbox body location "+this.hitbox1.body.x+" "+this.hitbox1.body.y);
      if(!this.resting)this.attack();
    }

    if(this.throwing&&!this.inAir&&this.frameName==this.stillFrame){
      if(!this.resting)this.throwstars();
    }

    if(this.inAir){
      if(this.body.velocity.y<-500)this.frameName = this.jumpUpFrame;
      else if(this.body.velocity.y>100)this.frameName = this.jumpDownFrame;

    }else if(!this.inAir){
      if(Math.abs(this.body.velocity.x)>150){
        //running
        //drain energy every fixed interval
        this.animations.play('run');
        this.isMoving = true;
      }
      else{
        //idling
        //add energy slowly
        this.isMoving = false;
        this.isJumping = false;

        if(this.attackEnabled&&this.attackAnimation.isPlaying){}
        else if(this.throwEnabled&&this.throwAnimation.isPlaying){}//if any of these animation is playing, do nothing
        else {
            this.frameName = this.stillFrame;
        }

      }
    }

  }

  movePlayer(){
    //move functions
    //if no energy just skip
    if(this.energy<=0.5||this.resting&&this.energy<5) {//if ftrueirst time exhaust, rest; second time is check whether is resting, until energy >5
        this.resting = true;
    }else if(this.resting&&this.energy>5)this.resting=false;

    let speedToUse = this.inAir?this.airSpeed:this.speed;

    if(this.cursors.left.isDown){
      this.scale.x = -1;//this will make the sprite falls through tilemap!
      if(!this.resting)this.body.moveLeft(speedToUse);
    }else if(this.cursors.right.isDown){
      this.scale.x = 1;
      if(!this.resting)this.body.moveRight(speedToUse);
    }else{
      //this.body.velocity.x = 0;//if i set this to 0, the slippery platform wont work!

      if(!this.inAir&&!this.onslippyplatform)this.body.velocity.x = 0;
    }

    if(!this.resting){
      if(this.cursors.up.isDown||this.spaceBar.isDown){
        this.jump=true;

      }
      else if(this.cursors.up.isUp||this.spaceBar.isUp)this.jump=false;

      this.checkJump();
    }
  }

  checkJump(){
    if(this.jump&&this.game.time.now > this.jumpTimer&&!this.inAir){
      this.body.moveUp(this.jumpPower);
      this.sfx.play('jump');
      this.jumpTimer = this.game.time.now + this.jumpInterval;
      this.isJumping = true;
    }
  }

  flash(tint){
    let flashEffect = undefined;
    switch (tint){
      case 'red':
        flashEffect = this.flashRedEffect;
      break;
      case 'green':
        flashEffect = this.flashGreenEffect;
      break;
    }

    if(!flashEffect.isRunning)flashEffect.start();
  }

  drainEnergy(amt){
    if(this.energy<=0.5)return;
    this.energy -= amt;
    this.energyBar.setValue(this.energy/this.maxEnergy);
  }

  replenishEnergy(amt){
    if(this.energy>=this.maxEnergy)return;
    if(this.energy+amt>this.maxEnergy)this.energy=this.maxEnergy;
    else this.energy += amt;
    this.energyBar.setValue(this.energy/this.maxEnergy);
  }

  drainLife(amt){
    if(this.health<=0.5)return;
    this.damage(amt);//use interal function, which will activate the kill if health = 0;
    this.healthBar.setValue(this.health/this.maxHealth);
  }

  replenishLife(amt){
    this.heal(amt);//this takes care of the checking of maxHealth ...
    this.healthBar.setValue(this.health/this.maxHealth);
  }

  increaseShuriken(amt){
    this.shurikenHUD.increaseCount(amt);
  }

  decreaseShuriken(amt){
    this.shurikenHUD.decreaseCount(amt);
  }

  damagePlayer(amt,dmgInterval){
    let interval = dmgInterval?dmgInterval:this.damageInterval;

    if(this.game.time.now>this.damageTimer){//player cannot keep taking damage every tick!
      this.drainLife(amt);
      console.log("player health "+this.health);
      this.flash('red');
      this.sfx.play('damaged');
      this.damageTimer = this.game.time.now + interval;
    }
  }

  changeBody(){
    //reset existing all animation frames
    this.animations.add('run',Phaser.Animation.generateFrameNames('swordframe', 1, 8, '', 0),18,false,false);
    this.stillFrame = 'hitframe0';
    this.jumpUpFrame = 'swordjumpframe1';
    this.jumpDownFrame = 'swordjumpframe2';

    //new attack animation
    this.attackAnimation = this.animations.add('attack',Phaser.Animation.generateFrameNames('hitframe', 1, 3, '', 0),12,false,false);

    Tools.storeData('attackEnabled',true);
    this.attackEnabled = true;
  }

  throwBody(){
    //add throw animation
    this.throwAnimation = this.animations.add('throw',Phaser.Animation.generateFrameNames('throwframe', 1, 4, '', 0),12,false,false);

    Tools.storeData('throwEnabled',true);
    this.throwEnabled = true;
  }

  update(){//override sprite's update function

    if(this.paused) return;

    let wasAir = this.inAir;//previously in the air?
    this.inAir = !Tools.checkIfOnFloor(this.game,this);
    if(!this.inAir&&wasAir){
      //console.log("hit ground");
      Tools.playSound(this.sfx,['land']);

    }
    this.animationState();

    this.movePlayer();

    if(this.attackEnabled&&!this.attackAnimation.isPlaying){
      if(this.hitbox1.exists)this.hitbox1.kill();
      this.attacking = false;
    }

    if(this.throwEnabled&&!this.throwAnimation.isPlaying){
      this.throwing = false;
    }

  }
}
