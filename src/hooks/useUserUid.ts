import { useAppSelector } from '../app/hooks';
import { selectUser } from '../redux/slices/authorizedSlice';

/**
 * Hook for returning uid of current user
 *
 * @returns string | null
 */
export default function useUserUid(): null | string {
    const user = useAppSelector(selectUser);

    return user?.uid || null;
}
