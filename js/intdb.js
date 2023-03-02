//variables used in both video loading functions
var pin;
var bandwidth;
// Inbound Courtroom Variables 

var ib_video;
var ib_conference;
//var ib_muteaudio;
//var ib_mutevideo;
var ib_cleanup;
//var ib_mutemic_on;
//var ib_mutemic_off;
var ib_rtc = null;

// Outbound Language Channel Variables 
var ob_video;
var ob_conference;
//var ob_muteaudio;
//var ob_mutevideo;
var ob_cleanup;
//var ob_mutemic_on;
//var ob_mutemic_off;
var ob_rtc = null;
//this.ibinitialise = ibinitialise;
//this.ib_endCall = ib_endCall;


/* ~~~ INBOUND ROOM SETUP AND TEARDOWN ~~~ */

function ibfinalise(event) {
    ib_rtc.disconnect();
    ib_video.src = "";
}

function ibremoteDisconnect(reason) {
    cleanup();
    alert(reason);
    window.removeEventListener('beforeunload', ib_finalise);
    window.close();
}

function ibdoneSetup(videoURL, pin_status) {
    console.log("PIN status: " + pin_status);
    ib_rtc.connect(pin);
}

function ibconnected(videoURL) {
    ib_video.poster = "";
    if (typeof(MediaStream) !== "undefined" && videoURL instanceof MediaStream) {
        ib_video.srcObject = videoURL;
    } else {
        ib_video.src = videoURL;
    }
}

function ibinitialise(node, conference, name, userbw, userpin) {
    ib_video = document.getElementById("ib_video");
    //ib_muteaudio = document.getElementById('ib_muteaudio');
    //ib_mutevideo = document.getElementById('ib_mutevideo');

    console.log("Video: " + ib_video);
    //console.log("Bandwidth: " + ib_userbw);
    pin = userpin;
    bandwidth = parseInt(userbw);
    //name = decodeURIComponent(username).replace('+', ' ');

    ib_rtc = new PexRTC();

    window.addEventListener('beforeunload', ibfinalise);

    ib_rtc.onSetup = ibdoneSetup;
    ib_rtc.onConnect = ibconnected;
    //rtc.onError = handleError;
    ib_rtc.onDisconnect = ibremoteDisconnect;

    ib_rtc.makeCall(node, conference, name, bandwidth);
}

function ibendCall() {
    console.log("Local user has disconnected from Courtroom");
    ib_rtc.disconnect();
  }


//this.obinitialise = obinitialise;
//this.ob_endCall = ob_endCall;

/* ~~~ OUTBOUND ROOM SETUP AND TEARDOWN ~~~ */

function obfinalise(event) {
    ob_rtc.disconnect();
    ob_video.src = "";
}

function obremoteDisconnect(reason) {
    cleanup();
    alert(reason);
    window.removeEventListener('beforeunload', ob_finalise);
    window.close();
}

function obdoneSetup(videoURL, pin_status) {
    console.log("PIN status: " + pin_status);
    ob_rtc.connect(pin);
}

function obconnected(videoURL) {
    ob_video.poster = "";
    if (typeof(MediaStream) !== "undefined" && videoURL instanceof MediaStream) {
        ob_video.srcObject = videoURL;
    } else {
        ob_video.src = videoURL;
    }
}

function obinitialise(node, conference, name, userbw, userpin) {
    ob_video = document.getElementById("ob_video");
    //ob_muteaudio = document.getElementById('ob_muteaudio');
    //ob_mutevideo = document.getElementById('ob_mutevideo');

    console.log("Video: " + ob_video);
    //console.log("Bandwidth: " + ob_userbw);
    pin = userpin;
    bandwidth = parseInt(userbw);
    //name = decodeURIComponent(username).replace('+', ' ');

    ob_rtc = new PexRTC();

    window.addEventListener('beforeunload', obfinalise);

    ob_rtc.onSetup = obdoneSetup;
    ob_rtc.onConnect = obconnected;
    //rtc.onError = handleError;
    ob_rtc.onDisconnect = obremoteDisconnect;

    ob_rtc.makeCall(node, conference, name, bandwidth);
}

function obendCall() {
    console.log("Local User has Disconnected from Language Channel");
    ob_rtc.disconnect();
  }


