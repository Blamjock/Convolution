using UnityEngine;
using System.Collections;

public class RotateOnZ : MonoBehaviour {

	public float speed = 80f;
	public bool antiorario = false;
	
	// Update is called once per frame
	void Update () {
		if (antiorario) {
			transform.Rotate (Vector3.forward * speed * Time.deltaTime);
		} else {
			transform.Rotate (Vector3.back * speed * Time.deltaTime);
		}

	}
}
