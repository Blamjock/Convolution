using UnityEngine;
using System.Collections;

public class Button : MonoBehaviour {

	public bool newGame = false;
	public bool exit = false;
	public bool credits = false;
	private GameObject menu;

	// Use this for initialization
	void Start () {
		menu = GameObject.FindGameObjectWithTag("menu");
	}
	
	// Update is called once per frame
	void Update () {

	}

	void OnMouseOver(){
		if (newGame) {

			GetComponent<SpriteRenderer>().enabled = true;
			if(Input.GetMouseButtonUp(0)){
				transform.parent.GetComponent<FadeOut>().enabled = true;
				transform.parent.GetComponent<FadeOut>().startDelay = Time.time 
					+ transform.parent.GetComponent<FadeOut>().startDelay;
				menu.GetComponent<Menu>().fadingOut = true;
				menu.GetComponent<Menu>().buttonClicked = "PlayButton";

//				Application.LoadLevel("Cupola");
			}
		} else if (exit) {

			GetComponent<SpriteRenderer>().enabled = true;

			if(Input.GetMouseButtonUp(0)){
				transform.parent.GetComponent<FadeOut>().enabled = true;
				transform.parent.GetComponent<FadeOut>().startDelay = Time.time 
					+ transform.parent.GetComponent<FadeOut>().startDelay;
				menu.GetComponent<Menu>().fadingOut = true;
				menu.GetComponent<Menu>().buttonClicked = "ExitButton";
				//				Application.Quit();
			}
		} else if (credits) {

			GetComponent<SpriteRenderer>().enabled = true;
			
			if(Input.GetMouseButtonUp(0)){
				transform.parent.GetComponent<FadeOut>().enabled = true;
				transform.parent.GetComponent<FadeOut>().startDelay = Time.time 
					+ transform.parent.GetComponent<FadeOut>().startDelay;
				menu.GetComponent<Menu>().fadingOut = true;
				menu.GetComponent<Menu>().buttonClicked = "CreditsButton";
				//				Application.LoadLevel("credits");
			}
		} else {
			GetComponent<SpriteRenderer>().enabled = false;
		}
	}

	void OnMouseExit(){
		if(newGame){
			GetComponent<SpriteRenderer>().enabled = false;
		} else if (exit) {
			GetComponent<SpriteRenderer>().enabled = false;
		} else if (credits) {
			GetComponent<SpriteRenderer>().enabled = false;
		}
	}
}
