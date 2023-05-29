import Image from "next/image";
import dateFormat from "dateformat";

function BlogCardHeader({ avatar, author, created }) {
  const loader = ({ src }) => avatar;
  return (
    <div className="flex gap-3">
      <div className="w-[40px] h-[40px]">
        <Image
          className="rounded-full"
          loader={loader}
          src={avatar}
          alt={author}
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col text-[18px]">
        <h4 className="font-medium">{author}</h4>
        <span className="text-[12px] text-white-200">
          {dateFormat(created, "dddd, mmmm dS yyyy")}
        </span>
      </div>
    </div>
  );
}

export default BlogCardHeader;
