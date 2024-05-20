export const NotificationsScreen = () => {
  return (
    <div className="">
      <div className=" m-8 space-y-4">
        <p>
          {" "}
          <span></span>🎉First view on{" "}
          <span className="font-bold">Peters Big Cool Idea</span>
        </p>
        <div className="flex items-center gap-3">
          <img src="../../../public/comment-image.png" alt="" />
          <p className="text-md">
            <span className="font-bold">Someone</span> watched・about{" "}
            <span>13 hours</span> ago
            
          </p>
        </div>
        <hr className="bg-[#ECECEC] mr-16" />
      </div>
    </div>
  );
};
