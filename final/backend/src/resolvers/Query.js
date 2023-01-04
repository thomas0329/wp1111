import { ImageModel } from '../models/image';
import { UserModel } from '../models/user'


const Query = {
	image: async (parent, args ,{ ImageModel }) => {
		try {
			const work = await ImageModel.find()
			return work

		}
		catch (e) {
			console.log(e)
		}
	},

	user: async (parent, { id, name, email }, {UserModel}) => {
		console.log(name)
		const user = await UserModel.findOne({ name: name })
		return user
	}

};
export default Query