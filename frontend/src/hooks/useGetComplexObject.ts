import { useContext } from 'react';

export default function useGetComplexObject<C>(context: any) {
  const object: C = useContext(context);
  if (!object) {
    throw new Error('useGetComplexObject must be used within a Provider');
  } else return object;
}
