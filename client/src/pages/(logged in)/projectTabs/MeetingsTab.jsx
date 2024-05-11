import allMeetingsIcon from "../../../assets/allMeetingsIcon.svg";
import upcomingMeetingsIcon from "../../../assets/UpcomingMeetingsIcon.svg";
import pastMeetingsIcon from "../../../assets/pastMeetingsIcon.svg";

const MeetingsSection = ({ icon, title, numMeetings }) => {
  return (
    <div className="flex items-center gap-7">
      <div className="bg-white rounded-full grid place-content-center h-[5rem] w-[5rem]">
        <img src={icon} alt="" className="p-5" />
      </div>
      <div>
        <p className="text-[1.1rem] text-[#343434]">{title}</p>
        <div className="flex items-center gap-5">
          <p className="text-2xl font-semibold">{numMeetings}</p>
          <p className="text-[#8A8A8A]">Meet</p>
        </div>
      </div>
    </div>
  );
};

const MeetingCard = ({
  userName,
  userPicture,
  time,
  going,
  pending,
  teamPictures,
}) => {
  return (
    <div className="bg-[#f7f7f7] p-4 rounded-2xl space-y-10">
      <div className=" flex items-center gap-3">
        <img
          src={userPicture}
          alt=""
          className="rounded-full object-cover min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem]"
        />
        <div className="space-y-1">
          <p className="text-2xl leading-8">{userName}</p>
          <p className="text-xl text-[#8A8A8A]">{time}</p>
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex justify-between">
          <p className="text-[#3694FF]">{going} members going</p>
          <p className="text-[#E95050]">{pending} members pending</p>
        </div>
        <div className="flex">
          {teamPictures.map((picture, index) => {
            return <img key={index} src={picture} className={`rounded-full object-cover relative ${
              index === 1 ? " right-[1.25rem]" : index === 2 ? "right-[2.5rem]" : index === 3 ? "right-[3.75rem]" : ""
            } min-w-[4rem] min-h-[4rem] max-w-[4rem] max-h-[4rem]`} />;
          })}
        </div>
        <button className="bg-[#202020] w-full text-white py-2 rounded-lg">Ver detalles</button>
      </div>
    </div>
  );
};

export const MeetingsTab = () => {
  return (
    <div className="m-5">
      <div className="bg-[#f7f7f7] p-8 rounded-2xl space-y-5">
        <MeetingsSection
          icon={allMeetingsIcon}
          title={"No. de Reuniones"}
          numMeetings={36}
        />
        <hr className="border-[1px] border-[#e0e0e0]" />
        <MeetingsSection
          icon={upcomingMeetingsIcon}
          title={"Reuniones próximas"}
          numMeetings={15}
        />
        <hr className="border-[1px] border-[#e0e0e0]" />
        <MeetingsSection
          icon={pastMeetingsIcon}
          title={"Reuniones pasadas"}
          numMeetings={21}
        />
      </div>
      <div className="mt-14">
        <p className="text-[1.5rem] font-semibold">Reuniones próximas</p>
        <div className="bg-[#5B5B5B] w-[6rem] h-[5px] rounded-full" />
      </div>
      <div className="mt-4 space-y-6">
        <MeetingCard
          userName={"Mashle Burnedead"}
          userPicture={
            "https://i.pinimg.com/564x/ab/a6/bb/aba6bb42cb08e35ac0d71e6044566b0a.jpg"
          }
          time={"11:00 AM"}
          going={14}
          pending={9}
          teamPictures={[
            "https://i.pinimg.com/564x/5e/c5/99/5ec599c89cd988a416d361a123c14faa.jpg",
            "https://i.pinimg.com/736x/01/4d/59/014d59542d152dd54e9c94091c3d8dd4.jpg",
            "https://i.pinimg.com/736x/93/d4/ae/93d4aeb0fdf135036c70448e610dd78b.jpg",
            "https://i.pinimg.com/736x/7c/d1/ab/7cd1abc221a4ad00720a989ac89a6218.jpg",
          ]}
        />
         <MeetingCard
          userName={"Mashle Burnedead"}
          userPicture={
            "https://i.pinimg.com/564x/ab/a6/bb/aba6bb42cb08e35ac0d71e6044566b0a.jpg"
          }
          time={"11:00 AM"}
          going={14}
          pending={9}
          teamPictures={[
            "https://i.pinimg.com/564x/5e/c5/99/5ec599c89cd988a416d361a123c14faa.jpg",
            "https://i.pinimg.com/736x/01/4d/59/014d59542d152dd54e9c94091c3d8dd4.jpg",
            "https://i.pinimg.com/736x/93/d4/ae/93d4aeb0fdf135036c70448e610dd78b.jpg",
            "https://i.pinimg.com/736x/7c/d1/ab/7cd1abc221a4ad00720a989ac89a6218.jpg",
          ]}
        />
         <MeetingCard
          userName={"Mashle Burnedead"}
          userPicture={
            "https://i.pinimg.com/564x/ab/a6/bb/aba6bb42cb08e35ac0d71e6044566b0a.jpg"
          }
          time={"11:00 AM"}
          going={14}
          pending={9}
          teamPictures={[
            "https://i.pinimg.com/564x/5e/c5/99/5ec599c89cd988a416d361a123c14faa.jpg",
            "https://i.pinimg.com/736x/01/4d/59/014d59542d152dd54e9c94091c3d8dd4.jpg",
            "https://i.pinimg.com/736x/93/d4/ae/93d4aeb0fdf135036c70448e610dd78b.jpg",
            "https://i.pinimg.com/736x/7c/d1/ab/7cd1abc221a4ad00720a989ac89a6218.jpg",
          ]}
        />
      </div>
    </div>
  );
};
