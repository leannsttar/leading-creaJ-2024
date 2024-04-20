import React from "react";
import { DashboardScreen } from "../pages/(logged in)/DashboardScreen.jsx";
import { LayoutWorkspace } from "../components/LayoutWorkspace.jsx";
import { TasksScreen } from "../pages/(logged in)/TasksScreen.jsx";
import { MessagesScreen } from "../pages/(logged in)/MessagesScreen.jsx";
import { NotificationsScreen } from "../pages/(logged in)/NotificationsScreen.jsx";

const privateRoutes = [
  {
    path: "/dashboard",
    element: <LayoutWorkspace />,
    children: [
      {
        path: "",
        element: <DashboardScreen />,
      },
      {
        path: "tasks",
        element: <TasksScreen />,
      },
      {
        path: "messages",
        element: <MessagesScreen />,
      },
      {
        path: "notifications",
        element: <NotificationsScreen />,
      },
    ],
  },
];

export default privateRoutes;
