import {
  SupportedModels,
  MediaPipeFaceMeshTfjsModelConfig,
  createDetector,
} from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";

export class Eyetracker {

  async init() {
    const model = SupportedModels.MediaPipeFaceMesh;

    const detectorConfig: MediaPipeFaceMeshTfjsModelConfig = {
      runtime: "tfjs",
      refineLandmarks: true,
    };

    const detector = await createDetector(model, detectorConfig);

    console.log(detector);
  }

  /**
   * This is a function to add two numbers together.
   *
   * @param a A number to add
   * @param b A number to add
   * @returns The sum of both numbers
   */
  add(a: number, b: number): number {
    return a + b;
  }

  async getCameraPermission(): Promise<any> {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
      return stream;
    } catch (err) {
      console.log('No available devices or permission rejected.');
      return null;
    }
  }

  async getListOfCameras(): Promise<Array<MediaDeviceInfo>> {
    const devices = await navigator.mediaDevices.enumerateDevices()
    // for (let i = 0; i < devices.length; i++) {
    //   if (devices[i].kind === "videoinput") {
    //     cameraList.push(devices[i].deviceId)
    //   }
    // }
    const videoDevices = devices.filter((d) => {
      d.kind === 'videoinput'
      return d.kind === 'videoinput'
    })
  
    return videoDevices
  }

  async setCamera(device: MediaDeviceInfo): Promise<MediaStream> {
    //console.log(device.deviceId)
    const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: device.deviceId }})
    return stream
  }

}
