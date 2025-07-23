import React from "react";
import TeacherLayout from "../../../components/TeacherLayout";
import ViewAssignmentsPage from "../_components/ViewAssignmentPage";

function page() {
  return (
    <TeacherLayout>
      <ViewAssignmentsPage />
    </TeacherLayout>
  );
}

export default page;
