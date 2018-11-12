var BehaviorEnum = Object.freeze({"none":0, "seek":1, "flee":2});

﻿class SteeringBehaviors{
  constructor(agent)
  {
    this.Agent = agent;
    this.SteeringForce = new THREE.Vector3();
    this.Acceleration;
    this.Behavior = BehaviorEnum.seek;
    console.log(agent);
  }

  Seek(target){
    let desire = target.sub(this.Agent.position);
    let desiredVelocity = desire.multiplyScalar(this.Agent.MaxSpeed);

    desiredVelocity.normalize();

    return desiredVelocity.sub(this.Agent.Direction);
  }

  Flee(target){
    let desiredVelocity = (this.Agent.position - target) * this.Agent.MaxSpeed;

    desiredVelocity.normalize();

    return desiredVelocity - this.Agent.Direction;
  }

  UpdateFocres(){

  }

  ApplyForce(force){

  }

  SumForces(forceToAdd){
    
  }
}
