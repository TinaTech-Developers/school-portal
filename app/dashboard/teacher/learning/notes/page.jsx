import React from "react";
import TeacherLayout from "../../components/TeacherLayout";
import UploadNotesPage from "./_components/UploadNotesPage";

function page() {
  return (
    <TeacherLayout>
      <UploadNotesPage />
    </TeacherLayout>
  );
}

export default page;
