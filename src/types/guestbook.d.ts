export interface Ghostbook {
  id?: number;
  username: string;
  body: string;
  createdAt?: long;
  updatedAt?: long;
}

export interface FindingGhostbook{
  page?: number;
  size?: number;
  sort?: string;
  username?: string;
  id?: number;
  keyword?: string;
}