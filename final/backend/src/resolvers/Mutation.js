import bcrypt from 'bcrypt';

const Mutation = {
	signup: async (parent, { email, password, name }, { UserModel }, info) => {
		const passwd = await bcrypt.hash(password, 10);
		// const user = await context.prisma.user.create({
		// 	data: {...args, passwd}
		// });
		console.log(passwd);
		const existing = await UserModel.findOne({ email });
		if (existing){
			throw new Error('User exists! Login instead.');
		}
		// store hashed password
		const user = await new UserModel({ name, email, password: passwd }).save();
		console.log('new user created');
		console.log(user);
		return user;
		
	},
	login: async (parent, { email, password }, { UserModel }, info) => {

		const user = await UserModel.findOne({ email });
		if (!user) {
			throw new Error('No such user found');
		}
		const valid = await bcrypt.compare(
			password,
			user.password
		);
		if (!valid) {
			throw new Error('Invalid password');
		}
		return user;
	}
};
  
export { Mutation as default };