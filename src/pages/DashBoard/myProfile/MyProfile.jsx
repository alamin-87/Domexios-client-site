import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  // 1. Fetch user info from 'users' collection
  const { data: currentUser = {}, isLoading: loadingUser } = useQuery({
    queryKey: ['current-user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // 2. Fetch agreements (only if member or admin)
  const isAgreementUser = currentUser?.role === 'member' || currentUser?.role === 'admin';

  const { data: agreements = [], isLoading: loadingAgreements } = useQuery({
    queryKey: ['user-agreements', user?.email],
    enabled: !!user?.email && isAgreementUser,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/user/${user.email}`);
      return res.data;
    },
  });

  if (loadingUser || (isAgreementUser && loadingAgreements)) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-md shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>

      {/* User Info */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user?.photoURL || 'https://i.ibb.co/2YjNZ3t/user.png'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-2"
        />
        <div className="text-center sm:text-left">
          <p className="text-xl font-semibold">Name: {user?.displayName}</p>
          <p className="text-gray-600">Email: {user?.email}</p>
          <p className="text-gray-600 capitalize">Role: {currentUser?.role}</p>
        </div>
      </div>

      {/* Agreement Section (for member or admin) */}
      {isAgreementUser && agreements.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-6 text-green-700">
            {currentUser?.role === 'admin' ? 'Assigned Apartment(s)' : 'Your Agreement(s)'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agreements.map((agreement) => (
              <div
                key={agreement._id}
                className="border p-5 rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-gradient-to-br from-green-50 to-white"
              >
                <h4 className="text-xl font-bold mb-2 text-green-800">Apartment: {agreement.apartmentNo}</h4>
                <p><strong>Block:</strong> {agreement.blockName}</p>
                <p><strong>Floor:</strong> {agreement.floorNo}</p>
                <p><strong>Rent:</strong> {agreement.rent} TK</p>
                <p><strong>Status:</strong> {agreement.status}</p>
                <p><strong>Agreement Date:</strong> {new Date(agreement.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Agreements */}
      {isAgreementUser && agreements.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No agreements found.</p>
      )}
    </div>
  );
};

export default MyProfile;
