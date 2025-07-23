import dbConnect from "@/config/database";
import Student from "@/models/Student";

export async function GET(_, { params }) {
  try {
    await dbConnect();
    const student = await Student.findById(params.id).populate(
      "userId",
      "name email"
    );
    if (!student)
      return new Response(JSON.stringify({ error: "Student not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(student), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Error fetching student",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const updates = await req.json();
    await dbConnect();

    const updated = await Student.findByIdAndUpdate(params.id, updates, {
      new: true,
    });
    if (!updated)
      return new Response(JSON.stringify({ error: "Student not found" }), {
        status: 404,
      });

    return new Response(
      JSON.stringify({ message: "Updated successfully", student: updated }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Update failed", details: error.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    const deleted = await Student.findByIdAndDelete(params.id);
    if (!deleted)
      return new Response(JSON.stringify({ error: "Student not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify({ message: "Student deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Delete failed", details: error.message }),
      { status: 500 }
    );
  }
}
