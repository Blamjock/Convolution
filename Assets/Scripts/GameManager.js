class GameManager extends UnityEngine.MonoBehaviour{  
	

	//call an instance with: 
	//instance = FindObjectOfType(GameManager);
	
	function Start(){
	    
	}  

	function Awake(){  
		GameObject.DontDestroyOnLoad(this);
	}
	
}


