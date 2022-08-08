// **** WEBRTC UI **** //


var video;
var bandwidth;
var conference;
var pin;

var rtc = null;

/* ~~~ SETUP AND TEARDOWN ~~~ */

function finalise(event) {
    rtc.disconnect();
    video.src = "";
}

function remoteDisconnect(reason) {
    /* cleanup(); */
    rtc.disconnect();
    video.src = "";
    /* alert(reason); */
    video.style.display = "none";
    window.removeEventListener('beforeunload', finalise);
    console.log("Conference Discconnected");
     /*location.href = "index.html";
    window.close(); */
}

function doneSetup(videoURL, pin_status) {
    console.log("PIN status: " + pin_status);
    rtc.connect(pin);
}

function connected(videoURL) {
    /*video.poster = "";*/
    if (typeof(MediaStream) !== "undefined" && videoURL instanceof MediaStream) {
        video.srcObject = videoURL;
    } else {
        video.src = videoURL;
    }
}

function initialise(node, conference, userbw, name, userpin) {
    

	video = document.getElementById("video");
	video.style.display = "block";
    console.log("Bandwidth: " + userbw);
    console.log("Conference: " + conference);

    pin = userpin;
    bandwidth = parseInt(userbw);

    rtc = new PexRTC();

    window.addEventListener('beforeunload', finalise);

    rtc.onSetup = doneSetup;
    rtc.onConnect = connected;
    rtc.onError = remoteDisconnect;
    rtc.onDisconnect = remoteDisconnect;

    rtc.makeCall(node, conference, name, bandwidth);
}
