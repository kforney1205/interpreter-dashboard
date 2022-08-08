////////////////////////////////////////////////////////////////////////////////
// rtcFactory

function rtcFactory(video) {
  var bandwidth;
  var conference;
  var pin;
  var rtc = null;
  var video = video;

  this.initialise = initialise;
  this.endCall = endCall;

  function finalise(event) {
      rtc.disconnect();
      video.src = "";
  }

  function remoteDisconnect(reason) {
      alert(reason);
      window.removeEventListener('beforeunload', finalise);
      window.close();
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
      console.log("Bandwidth: " + userbw);
      console.log("Conference: " + conference);

      pin = userpin;
      bandwidth = parseInt(userbw);

      rtc = new PexRTC();
      this.rtc = rtc;

      window.addEventListener('beforeunload', finalise);

      rtc.onSetup = doneSetup;
      rtc.onConnect = connected;
      rtc.onError = remoteDisconnect;
      rtc.onDisconnect = remoteDisconnect;
      rtc.onChatMessage = onChatMessage;

      // rtc.makeCall(node, conference, name, bandwidth, 'audioonly');
      rtc.makeCall(node, conference, name, bandwidth);

  }

  function endCall() {
    console.log("Local user wants to end the call.");
    rtc.disconnect();
  }

  function onChatMessage(message) {
    console.log(message);
  }

} // End rtcFactory


const vmr1 = document.getElementById('vmr1');
const call1 = new rtcFactory(vmr1);

const vmr2 = document.getElementById('vmr2');
const call2 = new rtcFactory(vmr2);

/*const vmr3 = document.getElementById('vmr3');
const call3 = new rtcFactory(vmr3);

const vmr4 = document.getElementById('vmr4');
const call4 = new rtcFactory(vmr4); */




function joinVmr1() {
  call1.initialise("pex-gcc.com", "1235063748@pexip.com", "1200", "Interpreter", "");
}

function joinVmr2() {
  call2.initialise("pex-gcc.com", "uscourts-esp", "576", "Interpreter", "2022");
}

/* function joinVmr3() {
  call3.initialise("pex-gcc.com", "2003", "576", "Participant", "");
}

function joinVmr4() {
  call4.initialise("pex-gcc.com", "2004", "576", "Participant", ""); 
} */

