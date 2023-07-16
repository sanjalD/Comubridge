function voice(){
    var recognition =  new webkitSpeechRecognition();
    recognition.lang="en-GB";
    recognition.onresult = function(event){
        document.getElementById("speech").value = event.results[0][0].transcript;
    }
    recognition.start();
}

const speakButton = document.getElementById('speak-button');
    speakButton.addEventListener('click', e=>{
    e.preventDefault();
    if(document.getElementById('speech').value!==""){
        speakText(document.getElementById('speech').value);
    }
});
function speakText() {
    const textToSpeak = document.getElementById('speech').value;
    const message = new SpeechSynthesisUtterance(textToSpeak);
    const speech = window.speechSynthesis;
    speech.speak(message);
}