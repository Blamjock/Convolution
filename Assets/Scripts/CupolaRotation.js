function Update() {

		// ... at the same time as spinning relative to the global 
		// Y axis at the same speed.
		transform.Rotate(Vector3.up * Time.deltaTime * 5, Space.World);
	}	