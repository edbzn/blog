export const findById = ({ _id }: { _id: string }) => <T extends { _id: string }>(
  target: T
): boolean => _id === target._id;
