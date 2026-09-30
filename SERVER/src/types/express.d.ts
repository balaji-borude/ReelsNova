declare namespace Express {
  export interface Request {
    /**
     * Authenticated user information attached by AuthMiddleware.
     */
    user?: {
      id: string;
      email: string;
    };
  }
}
