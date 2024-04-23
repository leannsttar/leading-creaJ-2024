import React from "react";
import { DashboardScreen } from "../pages/(logged in)/DashboardScreen.jsx";
import { LayoutWorkspace } from "../components/LayoutWorkspace.jsx";
import { TasksScreen } from "../pages/(logged in)/TasksScreen.jsx";
import { MessagesScreen } from "../pages/(logged in)/MessagesScreen.jsx";
import { NotificationsScreen } from "../pages/(logged in)/NotificationsScreen.jsx";
import { ProjectScreen } from "../pages/(logged in)/ProjectScreen.jsx";
import { Overview } from "../pages/(logged in)/projectTabs/Overview.jsx";

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
      {
        path: "project",
        element: <ProjectScreen />,
        children: [
          {
            path: "",
            element: <Overview />
          }
        ]
      },
    ],
  },
];

export default privateRoutes;
