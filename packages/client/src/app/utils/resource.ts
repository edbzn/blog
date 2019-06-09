export interface Resource {
  _id: string;
  _v: number;
}

export interface TimeStampableResource {
  createdAt: string;
  updatedAt: string;
}
