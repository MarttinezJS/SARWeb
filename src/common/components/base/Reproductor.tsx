import ReactAudioPlayer from "react-audio-player";

export const Reproductor = () => {
  // return (
  //   <iframe
  //     src="http://192.168.1.81:3000/public/milanesa/embed"
  //     allowTransparency={false}
  //     allow="autoplay"
  //     style={{
  //       width: "100%",
  //       border: "0",
  //     }}
  //   ></iframe>
  // );
  return (
    <ReactAudioPlayer
      src="https://server2.ejeserver.com:8826/stream"
      autoPlay
      controls
      style={{
        width: "100%",
      }}
    />
  );
};
