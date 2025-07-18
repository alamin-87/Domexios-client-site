import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';

const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: roleData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data; // expected to be { role: 'admin' }
    },
  });

  return {
    role: roleData?.role || null, // safe fallback to null
    isRoleLoading: isLoading || authLoading,
    isRoleError: isError,
    refetchRole: refetch,
  };
};

export default useUserRole;
