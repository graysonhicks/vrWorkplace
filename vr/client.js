// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'vrWorkplace', parent, {
    // Add custom options here

    ...options,
  });


  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here

  };
  vr.rootView.context.worker.addEventListener('message', onVRMessage);
  // Begin the animation loop
  vr.start();
  window.playerCamera = vr.player._camera;
  window.vr = vr;

  return vr;
}

function onVRMessage(e) {

    switch (e.data.type) {
      case 'sceneChanged':
          document.getElementById('loader').style.display = 'block';
          document.getElementById('blur-container').style.display = 'block';
          window.vr.player.resetAngles();
          console.log(window.playerCamera);
          if (window.playerCamera.zoom != 1) {
            window.playerCamera.zoom = 1;
            window.playerCamera.updateProjectionMatrix();
          }


      break;
      case 'sceneLoadStart':
        document.getElementById('loader').style.display = 'block';
        document.getElementById('blur-container').style.display = 'block';
      break;
      case 'sceneLoadEnd':
        document.getElementById('loader').style.display = 'none';
        document.getElementById('blur-container').style.display = 'none';
      break;
      default:
      return;
    }
  }

window.ReactVR = {init};
