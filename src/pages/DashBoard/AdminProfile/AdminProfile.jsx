import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const AdminProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  // Fetch all users
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch all apartments
  const { data: apartments = [], isLoading: loadingApartments } = useQuery({
    queryKey: ["all-apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartment");
      return res.data;
    },
  });

  if (loadingUsers || loadingApartments)
    return <div className="p-4">Loading...</div>;

  const admins = users.filter((u) => u.role === "admin");
  const currentAdmin = admins.find((a) => a.email === user?.email);
  const totalUsers = users.filter((u) => u.role === "user").length;
  const totalMembers = users.filter((u) => u.role === "member").length;

  // Apartment stats
  const totalApartments = apartments.length;
  const availableApartments = apartments.filter(
    (a) => a.availability === true
  ).length;
  const unavailableApartments = apartments.filter(
    (a) => a.availability === false
  ).length;

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">All Admins</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Admin Image</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={admin.photoURL || user.photoURL}
                    alt={admin.displayName || "Admin"}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{admin.displayName || user.displayName|| "No name"}</td>
                <td>{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentAdmin && (
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Current Logged-in Admin
          </h3>
          <div className="flex items-center gap-4">
            <img
              src={currentAdmin.photoURL ||user.photoURL}
              alt="Admin"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <p>
                <strong>Name:</strong> {currentAdmin.displayName || user.displayName|| "No name"}
              </p>
              <p>
                <strong>Email:</strong> {currentAdmin.email}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h4 className="font-bold text-lg">Total Apartments</h4>
          <p className="text-xl">{totalApartments}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h4 className="font-bold text-lg">Available Apartments</h4>
          <p className="text-xl">{availableApartments}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h4 className="font-bold text-lg">Unavailable Apartments</h4>
          <p className="text-xl">{unavailableApartments}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h4 className="font-bold text-lg">Total Users</h4>
          <p className="text-xl">{totalUsers}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <h4 className="font-bold text-lg">Total Members</h4>
          <p className="text-xl">{totalMembers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
