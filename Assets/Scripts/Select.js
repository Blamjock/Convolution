#pragma strict

var hit : RaycastHit;
var normalMaterial : Material;
var highlightMaterial : Material;
var distance : float;

var screamObj : GameObject;
var screamForce : float = 4000;
private var spawnPoint : GameObject = null;

private var selectedObj : GameObject = null;

var screamTimeout : float = 1;
private var screamTimeoutTemp : float = 0;

private var canRotate : boolean = false;
public var interactionButtonGui : GameObject = null;
private var curCrystal : OnSelected = null;

public var screams : AudioClip[];

//safe var
var SCREAM_SOURCE = 0;

var gateSound : AudioClip;

private var flag = false;

function Start () {
	spawnPoint = transform.FindChild("SpawnPoint").gameObject;
	screamTimeoutTemp = 0;
	Screen.lockCursor = true;
}


function Update () {
	
	if(Input.GetKeyDown(KeyCode.Escape)){
		Application.LoadLevel("Menu");
	}
	
	if(Input.GetMouseButtonDown(0)
		&& Time.time > screamTimeoutTemp){
		
		//start scream sound
		AudioSource.PlayClipAtPoint(screams[Random.Range (0,screams.Length)], Camera.main.transform.position);
		
		Launch();
		screamTimeoutTemp = Time.time + screamTimeout;
	}	
	
	if(canRotate && curCrystal!=null){
	
		if(Input.GetMouseButtonDown(1)){
			curCrystal.RotateCrystal();
		}
	}
	
	//safe part
		var cameraCenter = Camera.main.ScreenToWorldPoint (
		new Vector3 (Screen.width / 2, Screen.height /2, Camera.main.nearClipPlane));
	
	if (selectedObj != null)
		selectedObj.GetComponent(OnSelected).OnDeselected();
	
	if (Physics.Raycast (cameraCenter, transform.forward, hit, distance)) {
//		Debug.Log (hit.collider.gameObject.name);
		if (hit.collider.gameObject.tag == "selectable") {
			selectedObj = hit.collider.gameObject;
			selectedObj.GetComponent(OnSelected).OnSelectedM();
//			if (Input.GetKeyDown ("space")) {
//				playScream ();
//				selectedObj.GetComponent(OnSelected).OnClick ();
//				Debug.Log("dghetyjuhsyertjmfktr");
//				OnClick ();
//				selectedObj = null;
//			}
		}
	}
	else if (selectedObj != null) {
		selectedObj.GetComponent(OnSelected).OnDeselected();
		selectedObj = null;
	}
		
	if (flag) {
		
		//move the object forward (towards the portal)
		transform.Translate(Vector3.forward * Time.deltaTime * 4);
		//change dome texture color
		var dome = GameObject.FindGameObjectWithTag ("DomeEst");
		var oldColor = dome.renderer.material.color;
		dome.renderer.material.color = new Color (oldColor.r + 0.05, oldColor.g, oldColor.b);
	}
		
}

function Launch(){
	//launch obj
	var screamIn = GameObject.Instantiate(screamObj, spawnPoint.transform.position, spawnPoint.transform.rotation);
	screamIn.rigidbody.AddForce(transform.forward * screamForce);
	
}

function OnTriggerEnter(collider : Collider){
	if(collider.CompareTag("crystal") 
	&& !collider.transform.parent.FindChild("Cristallo finale").FindChild("Hedra001").GetComponent(OnSelected).rotationStarted){
		//show interaction gui button
//		interactionButtonGui.GetComponent(SpriteRenderer).enabled = true;
		interactionButtonGui.SetActive(true);
		canRotate = true;
		
		curCrystal = collider.transform.parent.FindChild("Cristallo finale").FindChild("Hedra001").GetComponent(OnSelected);
		
				Debug.Log("Show Interaction, currentPos: "+curCrystal.currentPos);
	}
}

function OnTriggerStay(collider : Collider){
	if(collider.CompareTag("crystal") 
	&& !collider.transform.parent.FindChild("Cristallo finale").FindChild("Hedra001").GetComponent(OnSelected).rotationStarted){
//		interactionButtonGui.GetComponent(SpriteRenderer).enabled = true;
		interactionButtonGui.SetActive(true);
		canRotate = true;
		
		curCrystal = collider.transform.parent.FindChild("Cristallo finale").FindChild("Hedra001").GetComponent(OnSelected);
	}
}

function OnTriggerExit(collider : Collider){
	if(collider.CompareTag("crystal") 
	&& !collider.transform.parent.FindChild("Cristallo finale").FindChild("Hedra001").GetComponent(OnSelected).rotationStarted){
//		interactionButtonGui.GetComponent(SpriteRenderer).enabled = false;
	interactionButtonGui.SetActive(false);
		
		curCrystal = null;
	}	
}

//safe methods

function OnClick () {
	GetComponent (CharacterController).enabled = false;
	Destroy (GetComponent (MouseLook));
	
	var components = GetComponents (AudioSource);
	for (var audio : AudioSource in components)
		if (audio.clip.name == "ambient_3") {
			audio.Pause();
			Destroy (audio);
			break;
	}
	
	for (var audio : AudioSource in components) {
		if (audio.clip.name == "GGJ15_gate_sound") {
			audio.Play ();
			break;
		}
	}
			
	flag = true;
}

function playScream () {
	var screamAudio : AudioSource;
	screamAudio = this.GetComponents(AudioSource)[SCREAM_SOURCE];
	screamAudio.Play (44100);
}

