#pragma strict

public var fadingOut : boolean = false;
public var fadingOutMultiplier : float = 0.05f;

function Start () {

}

function Update () {
	if(fadingOut){


		if(transform.localScale.x<=0 
			|| transform.localScale.y<=0
			|| transform.localScale.z<=0){

			Destroy(gameObject);
		}else{
			transform.localScale = new Vector3(transform.localScale.x-fadingOutMultiplier,
										transform.localScale.y-fadingOutMultiplier,
										transform.localScale.z-fadingOutMultiplier);
		}
	}
}