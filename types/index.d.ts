import type { User as IUser } from '../schemas/user';
declare global {
	namespace Express {
		interface User extends IUser {}

		interface Request {
			token?: string;
			user?: User;
		}
	}

	export interface Error {
		status?: number;
	}
}
