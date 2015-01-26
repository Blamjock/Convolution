
@script RequireComponent(GUITexture); @script RequireComponent(AudioSource);

var lowScream : AudioClip;
var highScream : AudioClip;

var externSpeaker : GameObject;
private var externSource : AudioSource;

private var width: int = 400; // texture width
private var height: int = 100; // texture height
var backgroundColor: Color = Color.black;
var waveformColor: Color = Color.green;
var size = 4096; // size of sound segment displayed in texture

private var flag = 1;

private var aud : AudioSource;

private var blank: Color[]; // blank image array
private var texture: Texture2D;
private var samples: float[]; // audio samples array


private var highCount = 0;
private var lowCount = 0;
private var silenceCount = 0;

function Start() {
	var source = GetComponent (AudioSource);
	Debug.Log(source);
	//source.Play();
	samples = new float[size]; // create the texture and assign to the guiTexture:
	texture = new Texture2D(width, height);
	guiTexture.texture = texture; // create a 'blank screen' image
	blank = new Color[width * height];
	for (var pixel in blank){
		pixel = backgroundColor; 
	} // refresh the display each 100mS
	
	
	Debug.Log ("request permissions");
	yield Application.RequestUserAuthorization (UserAuthorization.Microphone);

	if (Application.HasUserAuthorization(UserAuthorization.WebCam | UserAuthorization.Microphone))
	{
		
		aud = GetComponent(AudioSource);
		Debug.Log ("start record");
		aud.clip = Microphone.Start(Microphone.devices[0], true, 1, 44100);
		
		externSource = externSpeaker.GetComponent("AudioSource");
		
	}
	else
	{
		// no permission. Show error here.
	}
	
}

function Update () {
	var source : AudioSource = GetComponent("AudioSource");
	Debug.Log(source.isPlaying);
	GetCurWave();
	
	if (!externSource.isPlaying) {
		//Debug.Log ("r: " + highCount + " - y: " + lowCount + " - g: " + silenceCount);
		
		if (highCount > lowCount && highCount > silenceCount) {
			externSource.clip = highScream;
			externSource.Play ();
		}
		else if (silenceCount > lowCount && silenceCount > highCount);
			//Debug.Log("è silenzio");
		else{
			externSource.clip = lowScream;
			externSource.Play ();
		}
			
	}
		
	highCount = lowCount = silenceCount = 0;
		
}

function OnGUI () {
		//audio.Play();
}


function GetCurWave(){
	// clear the texture
	texture.SetPixels(blank, 0);
	// get samples from channel 0 (left)
	aud.clip.GetData(samples, 1); // draw the waveform
	//audio.GetOutputData(samples, 0);
	for (i = 0; i < size; i++){
		if (samples[i] > 0.2 || samples[i] < -0.2) {
			//filteredTexture.SetPixel(((width * i) / size), (height * (samples[i]+1f)/2), waveformColor);
			texture.SetPixel(((width * i) / size), (height * (samples[i]+0.5f)/2), Color.red);
			highCount ++;
		}
		else if (samples[i] > 0.05 || samples[i] < -0.05) {
			texture.SetPixel(((width * i) / size), (height * (samples[i]+0.5f)/2), Color.yellow);
			lowCount++;
		}
		else {
			texture.SetPixel(((width * i) / size), (height * (samples[i]+0.5f)/2), Color.green);
			silenceCount++;
		}
	}
	
	// upload to the graphics card
	texture.Apply();
	//filteredTexture.Apply();
	yield WaitForSeconds(0.1);
}
