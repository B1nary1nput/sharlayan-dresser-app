export interface IGlam {
  _id?: string;
  name: string;
  description?: string;
  jobs?: [];
  minLevel?: number;
  gender?: string;
  screenshots?: [];
  items?: Record<string, never>;
  created_at?: Date;
  updated_at?: Date;
}