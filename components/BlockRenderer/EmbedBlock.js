const EmbedBlock = ({ block }) => {
  const { url } = block.embed;

  // Helper function to extract YouTube video ID from the URL
  const extractYouTubeVideoId = (url) => {
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?&v=|watch\?.+&v=))([\w-]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  // Render YouTube video embed
  const renderYouTubeEmbed = () => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      return (
        <div className="youtube-embed">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            width="560"
            height="315"
            frameBorder="0"
            allowFullScreen
            title="YouTube Embed"
          ></iframe>
        </div>
      );
    }
  };

  // Render Twitter tweet embed
  const renderTwitterEmbed = () => {
    const tweetIdMatch = url.match(
      /(?:status\/|statuses\/|\/status\/|\/statuses\/)(\d+)/
    );
    const tweetId = tweetIdMatch ? tweetIdMatch[1] : null;
    if (tweetId) {
      return (
        <div className="twitter-embed">
          <blockquote className="twitter-tweet">
            <a href={url}></a>
          </blockquote>
        </div>
      );
    }
  };

  // Render Spotify embed
  const renderSpotifyEmbed = () => {
    return (
      <div className="spotify-embed">
        <iframe
          src={`https://open.spotify.com/embed/${
            url.split("https://open.spotify.com/")[1]
          }`}
          width="100%"
          height="300px"
          frameBorder="0"
          allowTransparency="true"
          allow="encrypted-media"
          title="Spotify Embed"
        ></iframe>
      </div>
    );
  };

  // Determine the embed type based on the URL
  const getEmbedType = () => {
    if (url.includes("youtube.com")) {
      return "youtube";
    } else if (url.includes("twitter.com")) {
      return "twitter";
    } else if (url.includes("spotify.com")) {
      return "spotify";
    }
    // Unsupported or unrecognized embed type
    return "unsupported";
  };

  // Render embed based on the embed type
  const renderEmbed = () => {
    const embedType = getEmbedType();

    switch (embedType) {
      case "youtube":
        return renderYouTubeEmbed();
      case "twitter":
        return renderTwitterEmbed();
      case "spotify":
        return renderSpotifyEmbed();
      default:
        return <p>Unsupported embed type: {embedType}</p>;
    }
  };

  return <div className="embed-block">{renderEmbed()}</div>;
};

export default EmbedBlock;
