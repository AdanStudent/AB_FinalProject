class SteeringBehaviors{
  constructor(agent, target)
  {
    this.Agent = agent;
    this.target = target;
    this.SteeringForce = new THREE.Vector3();
    this.Acceleration;

    this.Behavior = 10;
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

  updateBehaviors()
  {
    //no Behavior running
    if (this.Behavior === 1)
    {
      return this.SteeringForce = new THREE.Vector3(0, 0, 0);
    }
    //Seeking Behavior
    else if (this.Behavior === 10)
    {
      return this.SteeringForce = Seek(this.target);
    }
    //Fleeing Behavior
    else if (this.Behavior === 100)
    {
      return this.SteeringForce = Flee(this.target);
    }
  }

  updateForces()
  {
    //gets the behavior's SteeringForce and applys it to the agents movement
    let a = updateBehaviors();
    applyForce(a);

    //gets the Acceleration of the agent and scales it to the Agent's Mass
    this.Acceleration = this.SteeringForce.divideScalar(this.Agent.Mass);

    this.Agent.Direction.min(this.Agent.MaxSpeed);
    //moves the agent
    this.Acceleration.multiplyScalar(Clock.getDelta());
    this.Agent.Direction.add(this.Acceleration);

    //checks if the magnitude of the Agent's Direction is greater than small number
    if (this.Agent.Direction.lengthSq() > 0.00001)
    {
      let heading = this.Agent.Direction;
      this.Agent.Heading = heading.normalize();
    }

    this.SteeringForce = new THREE.Vector3(0, 0, 0);

  }

  applyForce(force)
  {
    if (!sumForces(force))
    {
      this.SteeringForce.add(force);
    }
  }

  sumForces(forceToAdd)
  {
    let magSoFar = this.SteeringForce.length();

    let magRemaining = this.Agent.MaxForce - magSoFar;

    if (magRemaining <= 0)
    {
      return false;
    }

    let magToAdd = forceToAdd.length();

    if (magToAdd < magRemaining)
    {
      this.SteeringForce.addScalar(forceToAdd);
    }
    else
    {
      let vec1 = forceToAdd.normalize();
      vec1.multiplyScalar(magRemaining);

      this.SteeringForce.addScalar(vec1);
    }
    return true;

  }
}
