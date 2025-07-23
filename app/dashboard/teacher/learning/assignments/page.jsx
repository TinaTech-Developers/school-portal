import React from "react";
import TeacherLayout from "../../components/TeacherLayout";
import UploadAssignmentPage from "./_components/UploadAssignmentPage";
import ViewAssignmentsPage from "./_components/ViewAssignmentPage";

function page() {
  return (
    <TeacherLayout>
      <UploadAssignmentPage />
      {/* <ViewAssignmentsPage /> */}
    </TeacherLayout>
  );
}

export default page;
