using UnityEngine;
using System.Collections;

public class FadeIn : MonoBehaviour {
	
	
	public float duration = 3;
	private float alpha = 0;
	private float alphaIncrement = 0;

	public float startDelay = 0;

	private SpriteRenderer renderer2D = null;
	
	// Use this for initialization
	void Start () {
		alpha = 0;
		alphaIncrement = 1 / duration / 60;
		renderer2D = GetComponent<SpriteRenderer>();
		renderer2D.color = new Color (renderer2D.color.r,
		                                renderer2D.color.g,
		                                renderer2D.color.b,
		                                0);
	}
	
	// Update is called once per frame
	void Update () {

		if(renderer2D.color.a >= 1 || Time.time < startDelay){
			if(renderer2D.color.a >= 1){
				GetComponent<FadeOut>().enabled = true;
				this.enabled = false;
			}
			return;
		}
		
		GetComponent<SpriteRenderer>().color = new Color(renderer2D.color.r,
		                                                 renderer2D.color.g,
		                                                 renderer2D.color.b,
		                                                 alpha);
		alpha = renderer2D.color.a + alphaIncrement;
		
	}
}
