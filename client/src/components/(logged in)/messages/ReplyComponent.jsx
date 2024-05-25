import { UserPictureMessage } from "./UserPictureMessage";
import { MessageComponent } from "./MessageComponent";

export const ReplyComponent = ({ img, messages, me }) => {
  return (
    <div className={`flex gap-2 ${me ? "flex-row-reverse" : ""}`}>
      <UserPictureMessage href={img} />
      <div className={`flex flex-col gap-1 ${me ? "items-end" : ""}`}>
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
