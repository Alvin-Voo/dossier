import RatGrunt from "./RatGrunt.js";

export default class RatSoldier extends RatGrunt{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    this.attacking = this.animations.add('attack',['hitframe0','hitframe1','hitframe2','hitframe3'],2.5,false,false);
    this.detectionrange = 260;
    this.hitrange = 150;
    this.hitspeed = 140;//slower hit approch velocity
    this.hitinterval = 1200;
    this.hittimer = 0;
    //set health-internal built in params
    this.setHealth(40);//default maxHealth is 100

    this.hitbox1 = this.addChild(game.make.sprite(this.x,this.y,'objects1','stop'));
    this.game.physics.p2.enable(this.hitbox1,false);//debug is false
    this.hitbox1.body.kinematic = true;
    this.hitbox1.name = 'soldierclub';
    this.hitbox1.alpha = 0;
    this.hitbox1.kill();

  }

  afterKilled(){
    //when a rat its dead, its gone - any hitbox should be killed too
    this.hitbox1.kill()
    this.game.time.events.add(7200,()=>{
      this.revive(40);
      this.hitbox1.revive();
    },this.game);
  }

  attack(distFromPlayer){
    if(this.player.x < this.x){
      this.scale.x = -1;//face the player
    }
    else{
      this.scale.x = 1;
    }
    let faceDir = this.scale.x;
    if(Math.round(distFromPlayer)>160) this.body.velocity.x = faceDir*this.hitspeed;//keep pushing n hitting the player
    if(!this.hitbox1.exists){//there should be a DELAY between hitting player..
      this.animations.play('attack');//need to sync the animation action and the hit timer
      if(this.game.time.now>this.hittimer&&this.alive){
        this.hitbox1.reset(this.x+faceDir*10,this.y+30);
        this.hitbox1.body.velocity.x = faceDir * 150;
        this.hitbox1.lifespan = 600;
        this.hittimer = this.game.time.now + this.hitinterval;
      }
    }

  }

  update(){
    super.update();

    if(!this.attacking.isPlaying&&this.hitbox1.exists){
      this.hitbox1.kill();
    }
  }
}
