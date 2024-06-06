import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const Loader = ({screen}) => {
  return (
    <div className={`w-full ${screen ? 'h-screen' : 'h-full'} grid place-content-center`}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 30,
              color: "black",
            }}
            spin
          />
        }
      />
    </div>
  );
};
