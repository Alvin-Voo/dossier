import Tools from "../components/Tools.js";

export default class RatNinja extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    this.throwing = this.animations.add('throw',['throwframe1','throwframe2','throwframe3'],12,false,false);

    this.game.physics.p2.enable(this,false);//debug is true

    this.body.clearShapes();
    this.body.setRectangle(this.width*0.4,Math.round(this.height*0.8),0,0);//setRectange will apply the shape with anchor to middle
    //reset the body location after setShapes method.. //if I dont want the hassle of setting offsets
    Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);
    //add a non colliding shape on its head as base to jump - with no damage to player
    this.body.addRectangle(80,5,0,-100);
    this.anchor.setTo(0.6,0.45);//it is better to adjust by anchor rather than using offset above coz the body will sink
    this.body.fixedRotation = true;

    this.detectionrange = 500;
    //set health-internal built in params
    this.damageTimer = 0;
    this.throwTimer = 0;
    this.throwInterval = 2400;
    this.setHealth(40);//default maxHealth is 100

    //add shurikens
    this.shurikens = this.game.add.group(this.game.world,'ninjashurikens',false,true,1);
    this.shurikens.createMultiple(10,key,'s1');

    this.shurikens.forEach((shuriken)=>{
      shuriken.body.clearShapes();
      shuriken.body.setCircle(shuriken.width/2);
      shuriken.animations.add('fly',Phaser.Animation.generateFrameNames('s', 1, 3, '', 0),25,true,false);
      shuriken.body.kinematic = true;
      shuriken.body.damping = 0.2;
      //shuriken.body.debug=true;
    },this.game.world);

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

    this.events.onKilled.add(()=>{this.afterKilled();},this);
    this.events.onRevived.add(()=>{this.flash('green');},this);

  }

  afterKilled(){
    this.game.time.events.add(7800,()=>{
      this.revive(40);
    },this.game);
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

  damageRat(amt,interval){
      if(this.health<=0.5)return;

      if(this.game.time.now>this.damageTimer){//player cannot keep taking damage every tick!
        this.damage(amt);//use interal function, which will activate the kill if health = 0;
        console.log("rat ninja health "+this.health);
        this.flash('red');

        this.damageTimer = this.game.time.now + interval;
      }
  }

  throwStars(){
    this.animations.play('throw');
    let faceDir = this.scale.x;
    let shuriken = this.shurikens.getFirstDead(false,this.x+faceDir*50,this.y+15);
    if(shuriken){
      shuriken.lifespan = 2500;
      shuriken.body.velocity.x = faceDir * 320;
      shuriken.animations.play('fly');
    }
  }

  update(){
    if(this.paused) return;
    let distFromPlayer = Phaser.Math.distance(this.x,this.y,this.player.x,this.player.y);
    if(Math.round(distFromPlayer)<this.detectionrange){
      if(this.player.x < this.x) this.scale.x = -1;//face the player
      else this.scale.x = 1;

      if(this.game.time.now>this.throwTimer&&this.alive){
        this.throwStars();
        this.throwTimer = this.game.time.now + this.throwInterval;
      }
    }

    if(!this.throwing.isPlaying){
      this.frameName = 'throwframe1';

    }
  }
}
