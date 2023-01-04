import bcrypt from 'bcrypt';
import Image from '../models/image';
import fs from 'fs';

const Mutation = {
	// for image upload
	singleUpload: async (parent, { link, file }) => {
		const name = file.name;

		console.log('link: ',link)
		console.log('file: ',file)
		console.log('link(type): ', typeof link);
		console.log('filedata(type): ', typeof file);
		// console.log(file.lastModified)
		// console.log(file.lastModifiedDate)
		// console.log(file.name)
		// console.log(file.size)
		// console.log(file.type)
		// console.log(file.webkitRelativePath)

		// console.log(file.toString('base64'))
		// console.log(file.toString('base64'))

		// 	const getBase64StringFromDataURL = (dataURL) =>
		// dataURL.replace('data:', '').replace(/^.+,/, '');
		// 	const base64 = getBase64StringFromDataURL(link);
		// 	console.log(base64);

		// link = Buffer.from(link.split(",")[1],"base64");
		link = Buffer.from(link.split(",")[1].toString("base64"));
		file = Buffer.from(file.toString('base64'));

		// console.log('link: ',link)
		// console.log('file: ',file.toString('base64'))
		// console.log('link: ',link)
		// console.log('file: ',file)
		// console.log(typeof file)
		const img = new Image({name: name, link: link, img: file});
		try{
			img.save();
		}
		catch(err) {
			console.log(`Error in Saving User: ${err}`);
		}
		console.log("image saved successfully");
	},

	// for login system
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
		console.log('login resolver called');
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
		console.log('successfully logged in');
		return user;
	}
};
  
export { Mutation as default };