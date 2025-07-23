import TeacherLayout from "../components/TeacherLayout";

export default function TeacherProfile({ params }) {
  const { id } = params;

  return (
    <TeacherLayout className="p-6 ">
      <div className="flex justify-between items-center mt-10"></div>
      <h1 className="text-2xl font-bold mb-2 text-gray-600">
        👩‍🏫 Teacher ID: {id}
      </h1>
      <p className="text-gray-600">
        More profile info and subjects will go here.
      </p>
    </TeacherLayout>
  );
}
