import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const ManageMembers = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users and filter members
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data.filter(user => user.role === 'member');
    },
  });

  // Mutation: Change role to 'user'
  const { mutate: removeMemberRole, isPending } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/${userId}/remove-member`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['members']);
      Swal.fire('Success', 'Member role removed.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update role.', 'error');
    },
  });

  if (isLoading) return <div className="p-4 text-center">Loading members...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Members</h2>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.displayName || 'No Name'}</td>
                <td>{member.email}</td>
                <td>
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: 'Are you sure?',
                        text: "This will remove member role.",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, remove',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          removeMemberRole(member._id);
                        }
                      })
                    }
                    disabled={isPending}
                    className="btn btn-sm btn-error"
                  >
                    {isPending ? 'Removing...' : 'Remove'}
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
