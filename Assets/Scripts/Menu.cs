using UnityEngine;
using System.Collections;

public class Menu : MonoBehaviour {

	public AudioClip[] notes;
	public bool fadingOut = false;

	public float clickTimeout = 3;
	private float clickTimeoutTemp = 0;

	public string buttonClicked = "";

	// Use this for initialization
	void Start () {
		clickTimeoutTemp = 0;
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetMouseButtonDown(0) 
		   && notes.Length>0
		   && Time.time > clickTimeoutTemp){
			AudioSource.PlayClipAtPoint(notes[Random.Range (0,notes.Length)], Input.mousePosition);
			clickTimeoutTemp = Time.time + clickTimeout;
		}		
	}

}
