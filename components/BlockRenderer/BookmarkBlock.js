const BookmarkBlock = ({ block }) => {
  const { link, title, description, bookmark_cover } = block.bookmark;

  return (
    <div className="bookmark">
      {bookmark_cover && (
        <img src={bookmark_cover?.url} alt={title[0].plain_text} />
      )}
      <a href={link?.url} target="_blank" rel="noopener noreferrer">
        <h2>{title[0]?.plain_text}</h2>
      </a>
      {description && <p>{description[0].plain_text}</p>}
      <a href={link?.url} target="_blank" rel="noopener noreferrer">
        {link?.url}
      </a>
    </div>
  );
};

export default BookmarkBlock;
