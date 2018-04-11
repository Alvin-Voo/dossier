import Tools from "../components/Tools.js";

export default class RatGrunt extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    this.animations.add('walk',Phaser.Animation.generateFrameNames('frame', 1, 4, '', 0),6,false,false);
    this.attacking = this.animations.add('attack',['frame0','ratattack'],4,false,false);
    this.speed = 200 + game.rnd.pick([-20,+20]);//need to flip the images
    this.detectionrange = 150;
    this.game.physics.p2.enable(this,false);//debug is true
    this.paused = false;

    this.body.clearShapes();
    this.body.setRectangle(this.width*0.4,Math.round(this.height*0.9),0,0);//setRectange will apply the shape with anchor to middle
    //reset the body location after setShapes method.. //if I dont want the hassle of setting offsets
    Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);
    //add a non colliding shape on its head as base to jump - with no damage to player
    this.body.addRectangle(80,5,0,-110);
    this.anchor.setTo(0.6,0.45);//it is better to adjust by anchor rather than using offset above coz the body will sink
    this.body.fixedRotation = true;
    this.body.damping = 0.4;

    //add a timer to check whether its blocked upon an obstacle
    this.lastPositionX = this.x;
    this.stumbledInterval = 1200;
    this.stumbledChecker = this.game.time.create(false);
    this.stumbledChecker.loop(this.stumbledInterval, this.stumbledCheck,this);
    this.stumbledChecker.start();
    this.reverseNow = false;

    this.animations.play('walk',null,true);

    //set health-internal built in params
    this.damageTimer = 0;
    this.setHealth(24);//default maxHealth is 100


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
      this.revive(24);
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

  stumbledCheck(){
    if(!this.attacking.isPlaying){
      if(Math.abs(this.x-this.lastPositionX)>20){
        this.lastPositionX = this.x;
      }else{
        //console.log("help rat is stucked");
        this.reverseNow = true;
      }
    }
  }

  damageRat(amt,interval){
      if(this.health<=0.5)return;

      if(this.game.time.now>this.damageTimer){//player cannot keep taking damage every tick!
        this.damage(amt);//use interal function, which will activate the kill if health = 0;
        console.log("rat health "+this.health);

        this.flash('red');

        this.damageTimer = this.game.time.now + interval;
      }
  }

  attack(distFromPlayer){
    if(!this.attacking.isPlaying&&this.alive)this.sfx.play(this.game.rnd.pick(['mnstr7','mnstr8','mnstr9']));
    if(this.player.x < this.x) this.scale.x = -1;//face the player
    else this.scale.x = 1;
    this.animations.play('attack');
  }

  update(){
    if(this.paused) return;
    let distFromPlayer = Phaser.Math.distance(this.x,this.y,this.player.x,this.player.y);//where does the x y starts, is it based on the anchor?
    if(Math.round(distFromPlayer)<this.detectionrange){
      this.attack(distFromPlayer);
    }

    if(!this.attacking.isPlaying){
        this.body.velocity.x = this.speed;
        this.animations.play('walk',null,true);

        //if stumbled upon an obstacle
        if(this.reverseNow){
          this.speed *= -1;
          this.scale.x = (this.speed>0)?1:-1;
          this.reverseNow = false;
        }

        this.scale.x = (this.speed>0)?1:-1;
    }

  }


}
