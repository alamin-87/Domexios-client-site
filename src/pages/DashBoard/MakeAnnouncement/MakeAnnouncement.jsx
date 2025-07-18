import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const MakeAnnouncement = () => {
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [announcements, setAnnouncements] = useState([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const res = await axiosSecure.get("/announcements");
      setAnnouncements(res.data);
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const onSubmit = async (data) => {
    if (editingAnnouncement) {
      // Update existing announcement
      try {
        const res = await axiosSecure.put(
          `/announcements/${editingAnnouncement._id}`,
          {
            title: data.title,
            description: data.description,
          }
        );
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated", "Announcement updated successfully", "success");
          reset();
          setEditingAnnouncement(null);
          fetchAnnouncements();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to update announcement.", "error");
      }
    } else {
      // Create new announcement
      const announcement = {
        title: data.title,
        description: data.description,
        createdAt: new Date(),
      };

      try {
        const res = await axiosSecure.post("/announcements", announcement);
        if (res.data.insertedId) {
          Swal.fire("Success", "Announcement posted successfully!", "success");
          reset();
          fetchAnnouncements();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to post announcement.", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/announcements/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Announcement has been deleted.", "success");
          fetchAnnouncements();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to delete announcement.", "error");
      }
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setValue("title", announcement.title);
    setValue("description", announcement.description);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">
        {editingAnnouncement ? "Update Announcement" : "Make an Announcement"}
      </h2>

      {/* Announcement Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-10">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter announcement title"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Write your announcement..."
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingAnnouncement ? "Update" : "Post"} Announcement
        </button>
      </form>

      {/* Announcements List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">All Announcements</h3>
        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements yet.</p>
        ) : (
          <div className="space-y-6">
            {announcements.map((item) => (
              <div
                key={item._id}
                className="w-full p-5 bg-gray-100 border border-gray-300 rounded-lg shadow flex flex-col md:flex-row md:justify-between md:items-start"
              >
                <div className="mb-4 md:mb-0 md:mr-6 w-full">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-gray-700 mt-1">{item.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Posted: {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-sm btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeAnnouncement;
