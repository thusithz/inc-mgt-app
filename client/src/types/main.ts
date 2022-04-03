export type CallBackType = (messsage: string, statusCode: string | number) => void;

export type UserSession = {
  user?: {
    username?: string | null;
    email?: string | null;
    token?: string | null;
  };
  expires: string;
};
