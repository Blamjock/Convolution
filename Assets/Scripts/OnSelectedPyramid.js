#pragma strict

var currentPos : int = 0;

var selectedMaterial : Material;
var unselectedMaterial : Material;

var rotationSpeed : float;
private var rotationStarted : boolean = false;
var from : Quaternion;
var to : Quaternion;

private var colors = [Color.red, Color.green, Color.yellow];
private var colorIndex = 0;

private var flag : boolean = false;
private var player : GameObject;
private var controller : CharacterController;
private var lookAt : MouseLook;
private var dest : Vector3;

function OnStart () {
}

function Update () {
	if (rotationStarted) {
		Debug.Log ("rotating");
		if(transform.rotation.eulerAngles.y >= to.eulerAngles.y - 1){
				rotationStarted = false;
			}else{
				transform.rotation =
					  Quaternion.Lerp (transform.rotation, to, Time.time * rotationSpeed);
	  		}
	  }
}
 
function OnSelected () {
	//Debug.Log("selected " + this.name);
	this.gameObject.renderer.material = selectedMaterial;
}

function OnDeselected () {
	this.gameObject.renderer.material = unselectedMaterial;
}

function OnScreamLow () {
	from = transform.rotation;
	to = Quaternion.Euler(new Vector3(from.eulerAngles.x,
										from.eulerAngles.y+30,
										from.eulerAngles.z));
	rotationStarted = true;
	
	if(currentPos < 3){
		currentPos +=1;
	}else{
		currentPos = 0;
	}
}

function OnScreamHigh () {
	Debug.Log("screamHigh");
}

