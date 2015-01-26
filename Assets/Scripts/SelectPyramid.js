#pragma strict

var SCREAM_SOURCE = 0;

var hit : RaycastHit;
var distance : float;
var gateSound : AudioClip;

var screamLow : AudioClip;
var screamHigh : AudioClip;

private var selectedObj : GameObject = null;
private var flag = false;

function Start () {
	Screen.lockCursor = true;
}
function Update () {
	playScream ();

	var cameraCenter = Camera.main.ScreenToWorldPoint (
		new Vector3 (Screen.width / 2, Screen.height /2, Camera.main.nearClipPlane));
	
	Debug.Log(selectedObj);
	if (selectedObj != null)
		selectedObj.GetComponent(OnSelectedPyramid).OnDeselected();
		
	if (Physics.Raycast (cameraCenter, transform.forward, hit, distance)) {
		if (hit.collider.gameObject.tag == "selectable") {
			selectedObj = hit.collider.gameObject;
			selectedObj.GetComponent(OnSelectedPyramid).OnSelected();
			if (Input.GetMouseButtonDown (0)) {
				//playScream ();
				///Debug.Log ("btn0");
				selectedObj.GetComponent(OnSelectedPyramid).OnScreamLow ();
				OnScreamLow ();
			}
			if (Input.GetMouseButtonDown (1)) {
				//playScream ();
				//Debug.Log ("btn1");
				selectedObj.GetComponent(OnSelectedPyramid).OnScreamHigh ();
				OnScreamHigh ();
			}
		}
	}
	else if (selectedObj != null) {
		selectedObj.GetComponent(OnSelectedPyramid).OnDeselected();
		selectedObj = null;
	}
	else if (selectedObj != null) {
		selectedObj.GetComponent(OnSelectedPyramid).OnDeselected();
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

function OnScreamLow () {
	
}

function OnScreamHigh () {
}

function playScream () {
	var component : AudioSource = GetComponent (AudioSource);
	if (Input.GetMouseButtonDown (0)) {
		component.clip = screamLow;
		component.Play ();
	}
	else if (Input.GetMouseButtonDown (1)) {
		component.clip = screamHigh;
		component.Play ();
	}
		
}
