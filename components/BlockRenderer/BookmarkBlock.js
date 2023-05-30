import { useState, useEffect } from "react";
import Image from "next/image";

const BookmarkBlock = ({ block }) => {
  const { bookmark } = block;
  const { caption, url } = bookmark;
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}`
        );
        const data = await response.json();
        console.log(data.data);
        setPreview(data.data);
      } catch (error) {
        console.error("Error fetching web preview:", error);
      }
    };

    fetchPreview();
  }, [url]);

  const loader = ({ src }) => preview?.image?.url;
  const loader1 = ({ src }) => preview?.logo?.url;

  return (
    <div
      style={{
        display: "flex",
        padding: "16px",
        border: "1px solid grey",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flexGrow: "1" }}>
        <p>{preview?.title}</p>
        <p style={{ color: "grey" }}>{preview?.author}</p>
        <a
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "16px",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "8px",
          }}
          href={preview?.url}
        >
          <Image
            style={{
              height: "20px",
              width: "20px",
            }}
            src={preview?.logo?.url}
            loader={loader1}
            height={20}
            width={20}
          />
          <span style={{ overflow: "hidden", wordBreak: "break-word" }}>
            {preview?.url}
          </span>
        </a>
      </div>
      <div>
        <Image
          style={{
            height: "100px",
          }}
          src={preview?.image?.url}
          loader={loader}
          height={100}
          width={200}
        />
      </div>
    </div>
  );
};

export default BookmarkBlock;
