import { UserPictureMessage } from "./UserPictureMessage";
import { MessageComponent } from "./MessageComponent";

export const ReplyComponent = ({ img, messages, name, me }) => {
  return (
    <div className={`flex gap-2 relative ${me ? "flex-row-reverse" : ""}`}>
      {img ? <p className="absolute bottom-12 text-sm text-[#a8a8a8]">{name}</p> : ""}
      {img ? <UserPictureMessage href={img} /> : ""}

      <div className={`flex flex-col gap-1 ${me ? "items-end" : ""} ${img && !me ? '' : 'ml-12'} ${img && me ? '' : 'mr-12'}`}>
        {messages.map((message, index) => {
          return (
            <MessageComponent
              key={index}
              message={message}
              index={index}
              me={me}
            />
          );
        })}
      </div>
    </div>
  );
};
