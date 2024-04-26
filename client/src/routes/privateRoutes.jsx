import React from "react";
import { DashboardScreen } from "../pages/(logged in)/DashboardScreen.jsx";
import { LayoutWorkspace } from "../components/LayoutWorkspace.jsx";
import { TasksScreen } from "../pages/(logged in)/TasksScreen.jsx";
import { MessagesScreen } from "../pages/(logged in)/MessagesScreen.jsx";
import { NotificationsScreen } from "../pages/(logged in)/NotificationsScreen.jsx";
import { ProjectScreen } from "../pages/(logged in)/ProjectScreen.jsx";
import { OverviewTab } from "../pages/(logged in)/projectTabs/OverviewTab.jsx";
import { BoardTab } from "../pages/(logged in)/projectTabs/BoardTab.jsx";
import { TimelineTab } from "../pages/(logged in)/projectTabs/TimelineTab.jsx";
import { MeetingsTab } from "../pages/(logged in)/projectTabs/MeetingsTab.jsx";
import { FilesTab } from "../pages/(logged in)/projectTabs/FilesTab.jsx";
import { ConfigTab } from "../pages/(logged in)/projectTabs/ConfigTab.jsx";

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
            element: <OverviewTab />
          },
          {
            path: "board",
            element: <BoardTab />
          },
          {
            path: "timeline",
            element: <TimelineTab />
          },
          {
            path: "meetings",
            element: <MeetingsTab />
          },
          {
            path: "files",
            element: <FilesTab />
          },
          {
            path: "config",
            element: <ConfigTab />
          }
        ]
      },
    ],
  },
];

export default privateRoutes;
