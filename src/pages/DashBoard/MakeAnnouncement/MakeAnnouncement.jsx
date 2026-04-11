import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  Megaphone,
  Send,
  Edit3,
  Trash2,
  History,
  Calendar,
  Layers,
  FileText,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [announcements, setAnnouncements] = useState([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Watch fields for live preview
  const watchTitle = watch("title", "");
  const watchDescription = watch("description", "");

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
    setIsSubmitting(true);
    try {
      if (editingAnnouncement) {
        // Update existing announcement
        const res = await axiosSecure.put(
          `/announcements/${editingAnnouncement._id}`,
          {
            title: data.title,
            description: data.description,
          },
        );

        // MongoDB returns matchedCount if the document was found
        if (res.data.matchedCount > 0) {
          Swal.fire({
            title: res.data.modifiedCount > 0 ? "Success!" : "No Changes",
            text:
              res.data.modifiedCount > 0
                ? "Announcement updated successfully."
                : "No changes were made to the announcement.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            borderRadius: "1rem",
          });
          reset();
          setEditingAnnouncement(null);
          fetchAnnouncements();
        } else {
          throw new Error("Announcement not found");
        }
      } else {
        // Create new announcement
        const announcement = {
          title: data.title,
          description: data.description,
          createdAt: new Date(),
        };

        const res = await axiosSecure.post("/announcements", announcement);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Announcement posted successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            borderRadius: "1rem",
          });
          reset();
          fetchAnnouncements();
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong.",
        icon: "error",
        borderRadius: "1rem",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Announcement?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      borderRadius: "1rem",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/announcements/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted",
            text: "Announcement has been removed.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            borderRadius: "1rem",
          });
          fetchAnnouncements();
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete announcement.",
          icon: "error",
          borderRadius: "1rem",
        });
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
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-700 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Megaphone className="text-indigo-600 animate-bounce" />
            Announcement Portal
          </h2>
          <p className="text-gray-500 mt-1">
            Broadcast important updates to all residents and system users.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
          <History className="text-gray-400 w-5 h-5" />
          <span className="text-sm font-semibold text-gray-700">
            {announcements.length} Total Posts
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Form & Preview */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-gray-100 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-16 -mt-16"></div>

            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="text-indigo-500" />
              {editingAnnouncement ? "Edit Announcement" : "Create New Post"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-1">
                  Announcement Title
                </label>
                <div className="relative">
                  <input
                    {...register("title", { required: "Title is required" })}
                    type="text"
                    className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300 ${errors.title ? "border-red-500" : "border-gray-100"}`}
                    placeholder="e.g. Maintenance Scheduled"
                  />
                  {watchTitle && !errors.title && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
                  )}
                </div>
                {errors.title && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-1">
                  Broadcast Message
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300 min-h-[200px] ${errors.description ? "border-red-500" : "border-gray-100"}`}
                  placeholder="Describe the announcement in detail..."
                ></textarea>
                {errors.description && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : editingAnnouncement ? (
                    <Edit3 size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                  {editingAnnouncement
                    ? "Update Broadcast"
                    : "Publish Announcement"}
                </button>
                {editingAnnouncement && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAnnouncement(null);
                      reset();
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 px-6 rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Live Preview Card */}
          <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-30">
              <Megaphone
                size={80}
                className="text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-700"
              />
            </div>
            <div className="relative z-10">
              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
                Live Preview
              </span>
              <h4 className="text-2xl font-black text-white mt-4 break-words">
                {watchTitle || "Your Title Here"}
              </h4>
              <p className="text-slate-400 mt-4 leading-relaxed whitespace-pre-wrap break-words min-h-[60px]">
                {watchDescription ||
                  "Start typing your message to see how it looks to residents..."}
              </p>
              <div className="mt-8 flex items-center gap-3 text-slate-500 text-xs text-nowrap">
                <Calendar size={14} />
                <span>
                  {new Date().toLocaleDateString()} • System Broadcast
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Feed */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Layers className="text-indigo-500" />
              Recent Broadcasts
            </h3>
            <button
              onClick={fetchAnnouncements}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Refresh Feed
            </button>
          </div>

          {announcements.length === 0 ? (
            <div className="bg-white p-20 rounded-[2rem] border border-dashed border-gray-200 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <AlertCircle size={40} />
              </div>
              <p className="text-gray-500 font-bold">
                No announcements have been made yet.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                User your console on the left to start broadcasting.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {[...announcements].reverse().map((item, index) => (
                <div
                  key={item._id}
                  className="group bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                          {announcements.length - index}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-gray-500 leading-relaxed md:pl-13">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 md:pl-13 mt-4 text-xs font-semibold text-gray-400">
                        <span className="flex items-center gap-1.5 py-1 px-3 bg-slate-50 rounded-full border border-slate-100">
                          <Calendar size={12} />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5 py-1 px-3 bg-slate-50 rounded-full border border-slate-100">
                          <History size={12} />
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(item)}
                        title="Edit Post"
                        className="p-3 bg-amber-50 text-amber-600 rounded-2xl hover:bg-amber-600 hover:text-white transition-all transform active:scale-95"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        title="Delete Post"
                        className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all transform active:scale-95"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
