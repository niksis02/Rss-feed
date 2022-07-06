interface User {
  id?: string;
  username?: string;
}

declare namespace Express {
  interface Request {
    user: user | string;
  }
}
