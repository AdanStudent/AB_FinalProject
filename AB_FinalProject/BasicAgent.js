//import { Math } from "./build/three.module";

class BasicAgent
{
    constructor(pos)
    {
        //its position in the scene
        this.Position = pos;

        //visual element
        this.Geometry = new THREE.ConeGeometry(5, 20, 32);
        this.Material = new THREE.MeshNormalMaterial();
        this.Mesh = new THREE.Mesh(this.Geometry, this.Material);

        //id
        this.ID = CreateID();
        print(this.ID);
    }

    CreateID()
    {
        //creates a random ID for this instance of the Agent
        return (Math.floor(Math.random() * 10000));
    }

}


class MovingAgent extends BasicAgent
{
    constructor(_MaxSpeed, _MaxForce, _Mass)
    {
        super();
        //MaxSpeed
        this.MaxSpeed = 0.0;
        //MaxForce
        this.MaxForce = 0.0;
        //Mass
        this.Mass = 0.0;
    }

}

