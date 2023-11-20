import { Fragment } from "react";
import "./App.css";
import VideoChat from "./VideoChat";
// import ReactPlayer from "react-player";

function App() {
  return (
    <Fragment>
      <div>
        <video controls={true}>
          <source src="/demo_video.mp4" type="video/mp4" />
          Your browser does not support the HTML5 Video element.
        </video>
        {/* <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" /> */}
      </div>
      <VideoChat />
    </Fragment>
  );
}

export default App;
