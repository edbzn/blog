export interface IResource {
  _id: string;
  _v: number;
}

export interface ITimeStampableResource {
  createdAt: string;
  updatedAt: string;
}
