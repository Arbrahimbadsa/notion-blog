import Image from "next/image";

const ImageBlock = ({ block }) => {
  const { image } = block;
  const imageUrl = image?.file?.url;
  const loader = ({ src }) => imageUrl;

  if (!imageUrl) {
    return null;
  }

  return (
    <div>
      <Image loader={loader} src={imageUrl} alt="" width={600} height={300} />
    </div>
  );
};
export default ImageBlock;
