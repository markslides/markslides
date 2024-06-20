import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
