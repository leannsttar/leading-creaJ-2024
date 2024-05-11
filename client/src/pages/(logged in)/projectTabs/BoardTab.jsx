import { TaskCardProject } from "@/components/(logged in)/TaskCardProject";

import plusTasksIcon from "../../../assets/plusTasksIcon.svg";

const HeaderTaskCards = ({ title, numCards }) => {
  return (
    <div className="bg-[#F7F7F7] flex justify-between py-3 px-5 rounded-[1.5rem]">
      <div>
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-[#959595]">{numCards} cards de tareas</p>
      </div>
      <img src={plusTasksIcon} alt="add icon" className="w-8" />
    </div>
  );
};

const ColTasks = ({ title, numCards, children }) => {
  return (
    <div className="space-y-3 lg:w-[30%] lg:space-y-8">
      <HeaderTaskCards title={title} numCards={numCards} />
      <div className="flex gap-3 overflow-auto pb-2 lg:flex-col">
        {children}
      </div>
    </div>
  );
};

export const BoardTab = () => {
  return (
    <div className="mx-5 my-9 space-y-10 lg:flex lg:space-y-0 lg:justify-around">
      <ColTasks title={"Próximo"} numCards={12}>
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
      </ColTasks>
      <ColTasks title={"En proceso"} numCards={12}>
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
      </ColTasks>
      <ColTasks title={"Terminadas"} numCards={12}>
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
        <TaskCardProject
          title={"Payment method via e-commerce"}
          tags={["Research", "UX"]}
          subTasks={[2, 10]}
          date={"Nov 16"}
          files={3}
          members={[
            "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
            "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
            "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
          ]}
          comments={0}
          mobile
        />
      </ColTasks>
    </div>
  );
};
