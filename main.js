Webcam.set({
  height:300,
  width:350,
  image_format:'png',  
  png_quality:100
});

camera = document.getElementById("webcam_view");

Webcam.attach(camera);

function take_snapshot(){
  Webcam.snap(function (data_uri){
      document.getElementById("snapshot_view").innerHTML= "<img id='snapshot' src="+data_uri+">";
  });
}

console.log("ml5 version is "+ ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/b34Fpt4OL/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "First Prediction is:" + prediction1;
    speak_data_2 = "And the second prediction is:" + prediction2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}

function check(){
  img = document.getElementById("captured_img");
  classifier.classify(img, gotResult);
}

function gotResult(error, results){
  if(error){
    console.log(error);
  }
  else{
    console.log(results);
    document.getElementById("emotion_name1").innerHTML = results[0].label;
    document.getElementById("emotion_name2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();

    if(results[0].label == 'happy'){
      document.getElementById("emoji1").innerHTML = "&#128522";
    }
    if(results[0].label == 'sad'){
      document.getElementById("emoji1").innerHTML = "&#128532";
    }

    if(results[0].label == 'angry'){
      document.getElementById("emoji1").innerHTML = "&#128545";
    }

    if(results[1].label == 'happy'){
      document.getElementById("emoji2").innerHTML = "&#128522";
    }
    if(results[1].label == 'sad'){
      document.getElementById("emoji2").innerHTML = "&#128532";
    }

    if(results[1].label == 'angry'){
      document.getElementById("emoji2").innerHTML = "&#128545";
    }
  }
}