#pragma strict

public var crystals : GameObject[];

	var instance : RoomManager = null;

function Start () {
	instance = FindObjectOfType(RoomManager);

	for(var i=0; i<crystals.Length; i++){
		instance.GetComponent(RoomManager).crystalsArray[i] = crystals[i];
	}
}

