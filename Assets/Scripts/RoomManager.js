class RoomManager extends UnityEngine.MonoBehaviour{  
	
	public var crystalsArray : GameObject[];

	//call an instance with: 
	//instance = FindObjectOfType(RoomManager);
	
	function Start(){
	    
	}  

	function Awake(){  
		GameObject.DontDestroyOnLoad(this);
	}
	
}