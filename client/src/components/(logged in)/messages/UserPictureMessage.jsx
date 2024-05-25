export const UserPictureMessage = ({ href }) => {
  return (
    <img
      src={href}
      className="min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] rounded-xl object-cover"
    />
  );
};
