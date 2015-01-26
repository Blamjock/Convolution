using UnityEngine;
using System.Collections;

public class FadeOut : MonoBehaviour {

	
	public float duration = 3;
	private float alpha = 0;
	private float alphaDecrement = 0;

	public float startDelay = 0;

	private SpriteRenderer renderer2D = null;
	private GameObject menu;

	// Use this for initialization
	void Start () {
		alpha = 1;
		alphaDecrement = 1 / duration / 60;
		renderer2D = GetComponent<SpriteRenderer>();
		renderer2D.color = new Color (renderer2D.color.r,
		                                renderer2D.color.g,
		                                renderer2D.color.b,
		                                1);
		menu = GameObject.FindGameObjectWithTag("menu");
	}
	
	// Update is called once per frame
	void Update () {
		if(menu.GetComponent<Menu>().fadingOut){
			if(renderer2D.color.a <= 0 || Time.time < startDelay){
				Debug.Log (name);

				if( renderer2D.color.a <= 0 && menu.GetComponent<Menu>().buttonClicked.Equals("PlayButton")){
					Application.LoadLevel("Cupola");
				}else if(renderer2D.color.a <= 0 && menu.GetComponent<Menu>().buttonClicked.Equals("CreditsButton")){
					Application.LoadLevel("Credits");
				}
				return;
			}else{
				if(menu==null || (menu!=null && menu.GetComponent<Menu>().fadingOut)){
					GetComponent<SpriteRenderer>().color = new Color(renderer2D.color.r,
					                                                 renderer2D.color.g,
					                                                 renderer2D.color.b,
					                                                 alpha);
					alpha = renderer2D.color.a - alphaDecrement;
				}
			}
		}

	}
}
