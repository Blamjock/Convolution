#pragma strict

var openMaterial : Material;

var crystalId : int = 0;
var isACrystal : boolean = false;
var activatePos : int = 0;
var currentPos : int = 0;
var activated : boolean = false;

var from : Quaternion;
var to : Quaternion;
var rotationSpeed : float = 5;
public var rotationStarted : boolean = false;

private var roomInstance : RoomManager = null;

//safe var
var selectedMaterial : Material;
var unselectedMaterial : Material;
var speed : float;

private var flag : boolean = false;
private var player : GameObject;
private var controller : CharacterController;
private var lookAt : MouseLook;
private var dest : Vector3;

private var flagAnim : boolean = false;

public var rotationSound : AudioClip;

function Start(){
	roomInstance = FindObjectOfType(RoomManager);
	flagAnim = false;
}

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag.Equals("scream")){
		// Debug-draw all contact points and normals
		
		Debug.Log("hit");
//		collision.gameObject.GetComponent(FadeOutSound).fadingOut = true;
		Destroy(collision.gameObject);
		
		if(isACrystal){
//			var activatedCrystals : int = 0;
			for(var i=0; i<roomInstance.crystalsArray.Length; i++){
				var cur : OnSelected = roomInstance.crystalsArray[i].transform.FindChild("Cristallo finale").FindChild("Hedra001").GetComponent(OnSelected);
				if(cur.crystalId==crystalId){
					if(activatePos==currentPos && !activated){
						
						Activate();
						CheckNextCrystals(i);
						return;
						//TODO light up
						
						//check the next
						
						
					}else if(activatePos!=currentPos 
								&& !cur.activated){
						WrongPosition();
						break;
					}
				}else{
					if((cur.currentPos 
					!= cur.activatePos) || (cur.currentPos == cur.activatePos && !cur.activated))
						break;
				}
			}

			
		}else if(!isACrystal){
			EnterRoomAnim ();
		}
		
//		var i : int = 0;
//		
//		for (var contact : ContactPoint in collision.contacts) {
//			Debug.DrawRay(contact.point, contact.normal, Color.green);
//			
//			
//			if(i<4){
//				var newInst = GameObject.Instantiate(collision.gameObject, 
//														contact.point, 
//														Quaternion.identity);
//
//				newInst.rigidbody.AddForce(new Vector3(collision.transform.forward.x, 
//														collision.transform.forward.y,
//												-collision.transform.forward.z) * 4000);
//			}
//			i++;
//		}
	}
}

function Activate(){
	Debug.Log("Activation...");
	activated = true;
	renderer.material = openMaterial;
}

function WrongPosition(){
	Debug.Log("Wrong Pos ");
}

function Floating(){

}

function Vibrating(){

}

function CheckNextCrystals(position : int){
	for(var i=position+1 ;i<roomInstance.crystalsArray.Length; i++){
		var cur : OnSelected = roomInstance.crystalsArray[i].transform.FindChild("Cristallo finale").FindChild("Hedra001").GetComponent(OnSelected);
		if(cur.activatePos==cur.currentPos){
			cur.Activate();
		}else{
			return;
		}
	}
}

public function RotateCrystal(){
	//TODO rotate crystal fisically
	AudioSource.PlayClipAtPoint(rotationSound, Camera.main.transform.position);
	
	from = transform.rotation;
	
	var toY : float = from.eulerAngles.y+30;
	
	if(toY+30>360){
		toY = toY + 30 - 360;
	}else if(toY>360){
		toY = toY - 360;
	}
	
	to = Quaternion.Euler(new Vector3(from.eulerAngles.x,
										toY,
										from.eulerAngles.z));
	rotationStarted = true;
	
	if(currentPos < 3){
		currentPos +=1;
	}else{
		currentPos = 0;
	}
}

function Update(){
	if(rotationStarted){
		if(transform.rotation.eulerAngles.y >= to.eulerAngles.y - 1){
			rotationStarted = false;
		}else{
			transform.rotation =
				  Quaternion.Lerp (transform.rotation, to, Time.time * rotationSpeed);
  		}
  	}
  	
  	if(flagAnim){
  		Application.LoadLevel ("Piramide");
  	}
  	
  	if(roomInstance.crystalsArray.Length>0 
  		&& roomInstance.crystalsArray[0]!=null){
		var activatedCrystals : int = 0;
		for(var i=0; i<roomInstance.crystalsArray.Length; i++){
						
			if( roomInstance.crystalsArray[i].transform.FindChild("Cristallo finale").FindChild("Hedra001").GetComponent(OnSelected).activated){
				activatedCrystals++;
				if(activatedCrystals>=roomInstance.crystalsArray.Length){
					//return to hub room
					Debug.Log("Returning to the hub room...");
					Application.LoadLevel("Cupola");
				}
			}
		}
	}
}

//safe methods
function OnSelectedM () {
	//Debug.Log("selected " + this.name);
	this.gameObject.renderer.material = selectedMaterial;
}

function OnDeselected () {
	this.gameObject.renderer.material = unselectedMaterial;
}

function OnClick () {
	Debug.Log("clicked");
	EnterRoomAnim ();
	
	yield WaitForSeconds (4);
	Application.LoadLevel ("Piramide");
}
	

function EnterRoomAnim () {
	Camera.main.GetComponent(Select).OnClick ();


	flag = true;
	Debug.Log(flag);
	
	player = GameObject.FindGameObjectWithTag ("MainCamera");
	controller = player.GetComponent (CharacterController);
	controller.enabled = false;
	lookAt = player.GetComponent (MouseLook);
	Destroy (lookAt);
	dest = this.transform.position;
	
	yield WaitForSeconds (4);
	flagAnim = true;
	
}



