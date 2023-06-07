import React from "react";
import ReactPlayer from "react-player";

const VideoBlock = ({ block }) => {
  const { type } = block;
  const video = block[type];
  const url = video?.url ?? video?.file?.url ?? "";

  if (!url) return <p>Something went wrong while displaying the video.</p>;

  // Helper function to extract video ID from YouTube URL
  const extractYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?&v=|watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  // Helper function to extract video ID from Vimeo URL
  const extractVimeoVideoId = (url) => {
    const match = url.match(
      /(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/
    );
    return match ? match[1] : null;
  };

  // Determine the video platform and video ID
  const getVideoData = () => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = extractYouTubeVideoId(url);
      return { platform: "youtube", videoId };
    } else if (url.includes("vimeo.com")) {
      const videoId = extractVimeoVideoId(url);
      return { platform: "vimeo", videoId };
    } else {
      return { platform: "upload", videoId: url };
    }
  };

  const { platform, videoId } = getVideoData();

  // Render video based on the video platform
  const renderVideo = () => {
    switch (platform) {
      case "youtube":
        return (
          <div className="video">
            <iframe
              style={{ minHeight: "450px" }}
              width="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>
        );
      case "vimeo":
        return (
          <div className="video">
            <iframe
              src={`https://player.vimeo.com/video/${videoId}`}
              frameBorder="0"
              allowFullScreen
              title="Vimeo Video"
            ></iframe>
          </div>
        );
      case "upload":
        return (
          <video src={videoId} controls>
            Your browser doesn't support video, sorry!
          </video>
        );
      default:
        return <p>Unsupported video platform: {platform}</p>;
    }
  };

  return <div>{renderVideo()}</div>;
};

export default VideoBlock;
