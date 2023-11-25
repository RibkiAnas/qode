import "next-auth";

declare module "next-auth" {
	// eslint-disable-next-line no-unused-vars
	interface User {
		_id: string;
	}
}
