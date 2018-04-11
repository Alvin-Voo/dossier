import Tools from "../components/Tools.js";

export default class RatBoss extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    this.action = this.animations.add('action',['bodyf1','bodyf2'],4,false,false);
    game.physics.p2.enable(this,false);//debug is true
    this.body.clearShapes();
    this.body.loadPolygon('bossbody','bossbody');
    Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);
    //this.anchor.setTo(0.5,0.5);//it is better to adjust by anchor rather than using offset above coz the body will sink
    this.body.fixedRotation = true;
    //this.body.kinematic = true;
    this.body.mass = 100;//anchor this dynamic body to ground

    this.detectionrange = 220;
    this.damageTimer = 0;
    this.health = {
      max: 80,
      now: 80
    };

    this.attack = false;
    this.startscene = false;
    this.attackTimer = 0;

    this.bosstext = game.add.text(this.x,this.y," ",{
      font:'17px Century',fill:'#ffffff'
    });
    this.bosstext.anchor.setTo(0.5,0.5);
    this.bosstext.kill();

    //add arm

    this.rightarm = game.add.sprite(this.x,this.y,key,'rightarm');
    this.rightarm.name = 'rightarm';
    game.physics.p2.enable(this.rightarm,false);
    this.rightarm.body.clearShapes();
    this.rightarm.body.loadPolygon('rightarm','rightarm');
    this.rightarm.body.data.gravityScale = 0.8;
    this.bossconstraint = game.physics.p2.createRevoluteConstraint(this, [ 0 , -50 ], this.rightarm, [ 600, -165 ],3000);

    this.rightarm.body.onBeginContact.add(this.shake,this);

    //damage animation
    this.flashRedEffect = this.game.add.tween(this) //blink blink when hit
        .to({tint:0xFF0000},50,Phaser.Easing.Bounce.out)
        .to({tint:0xFB8989},50,Phaser.Easing.Bounce.out)
        .to({tint:0xFFFFFF},150,Phaser.Easing.Circular.out);


    this.heartBeat = this.game.time.create(false);
    this.heartBeat.loop(4200, this.heartBeatCheck,this);
    this.heartBeat.start();

    this.events.onKilled.add(()=>{
      //remove rock

    },this);

  }

  shake(bodyA,bodyB,shapeA,shapeB,contactEq,sfx){
    if(bodyB) {
      //console.log("bodyB "+ bodyB.id);
      if(bodyB.id == this.player.body.id){
        console.log("body player");
        return;
      }
      //touched floor. shake it!
      this.game.camera.shake(0.03,600,true,Phaser.Camera.SHAKE_VERTICAL,true);
      this.sfx.play('bosshit');
    }
  }

  damageRat(amt,interval){
      if(this.health.now<=0.5){
        //say something?

        this.say('NooooOOOOooOOOoOOOooooo....')

        //kill the guy
        this.game.physics.p2.removeConstraint(this.bossconstraint);
        this.rightarm.kill();
        this.kill();
        return;
      }

      if(this.game.time.now>this.damageTimer){//player cannot keep taking damage every tick!
        this.health.now-=amt;//use interal function, which will activate the kill if health = 0;
        console.log("rat boss health "+this.health.now);

        if(!this.flashRedEffect.isRunning)this.flashRedEffect.start();

        this.damageTimer = this.game.time.now + interval;
      }
  }


  heartBeatCheck(){
    if(this.startscene){
     if(this.textarray){
       if(this.textcounter==4){
         this.startscene = false;
         return;
       }
       this.say(this.textarray[this.textcounter++]);
     }else{
       this.textarray = Object.values(this.game.cache.getJSON('config').popup.ep6.bosstext);
       this.textcounter = 0;
     }
    }

    if(this.attack&&this.alive){
      //left side attack
        //this.rightarm.body.applyForce([-800,1000],this.rightarm.body.x-50,this.rightarm.body.y);
        this.rightarm.body.applyForce([4000,5000],this.rightarm.body.x+50,this.rightarm.body.y);
    }
  }

  say(speech){

      this.bosstext.setText(speech);
      this.bosstext.reset(this.x-20,this.y-172);
      this.bosstext.lifespan = 3000;

      //console.log('text location ' + this.bosstext.x + ' '+ this.bosstext.y + ' '+ this.x + ' ' + this.y);
  }

  update(){


    /*
    if(this.player.x < this.x){
      this.scale.x = 1;//face the player
    }
    else{
      this.scale.x = -1;
    }*/

    let distFromPlayer = Phaser.Math.distance(this.x,this.y,this.player.x,this.player.y);//where does the x y starts, is it based on the anchor?
    if(this.alive&&Math.round(distFromPlayer)<this.detectionrange){
      if(this.player.x < this.x){
        //to left
        this.body.moveLeft(200);
      }
      else{
        this.body.moveRight(200);
      }
    }

    if(this.attack&&!this.action.isPlaying&&this.alive)  this.animations.play('action',null,true);


  }

}
