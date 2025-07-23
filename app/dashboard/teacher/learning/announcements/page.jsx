import React from "react";
import TeacherLayout from "../../components/TeacherLayout";
import AnnouncementsPage from "./_components/AnnouncementsPage";

function page() {
  return (
    <TeacherLayout>
      <AnnouncementsPage />
    </TeacherLayout>
  );
}

export default page;
