export const MessageComponent = ({ message, me, index }) => {
  return (
    <div
      key={index}
      className={`${
        me ? "bg-black text-white" : "bg-[#F1F1F1]"
      }  rounded-xl px-3 py-2 w-fit text-[.9rem]`}
    >
      <p>{message}</p>
    </div>
  );
};
