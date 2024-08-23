import React from "react";
import { Calendar, Badge, Popover } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";
import "../../../index.css";

const MiniCalendar = ({ tasks }) => {
  const getBadgeColor = (status) => {
    switch (status) {
      case "proximo":
        return "#FECF63"; // Brighter Pastel Yellow
      case "en progreso":
        return "#7FB8FF"; // Brighter Pastel Blue
      case "terminado":
        return "#5EE0A0"; // Brighter Pastel Green
      default:
        return "#D1D5DB"; // Neutral Gray
    }
  };

  const dateCellRender = (value) => {
    const listData = tasks.filter(
      (task) =>
        dayjs(task.due_date).format("YYYY-MM-DD") === value.format("YYYY-MM-DD")
    );

    if (listData.length === 0) {
      return null;
    }

    const content = (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge color={getBadgeColor(item.status)} text={item.name} />
          </li>
        ))}
      </ul>
    );

    return (
      <Popover content={content} trigger="hover">
        <div className="task-count">
          <Badge
            count={listData.length}
            style={{
              borderColor: "#000",
              backgroundColor: "#000",
              color: "white",
              boxShadow: "0 0 0 1px #1890ff inset",
            }}
          />
        </div>
      </Popover>
    );
  };

  return (
    <Calendar
      locale={locale}
      fullscreen={false}
      cellRender={dateCellRender}
    />
  );
};

export default MiniCalendar;
