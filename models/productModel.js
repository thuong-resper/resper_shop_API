import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, text: true, index: true },
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
		description: { type: String, required: true, text: true, index: true },
		price: { type: Number, trim: true, required: true, maxlength: 32 },
		category: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Category',
		},
		subs: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Sub',
			},
		],
		quantity: { type: Number, required: true, default: 100 },
		sold: { type: Number, default: 0 },
		image: {
			type: Array,
		},
		shipping: {
			type: String,
		},
		color: {
			type: Array,
			default: null,
		},
		brand: {
			type: String,
			default: null,
		},
		rating: { type: Number, default: 0 },
		// required
		priceCompare: { type: Number, required: true },
		numReviews: { type: Number, default: 0 },
		//not required || special attributes
		//0. smartphone
		type: { type: String, default: null },
		sc: { type: String, default: null },
		ram: { type: Array, default: [] },
		rom: { type: Array, default: [] },

		//1. laptop
		res: { type: String, default: null },
		cpu: { type: String, default: null },

		//2. tablet

		//3. watch
		sex: { type: Array, default: null }, //both
		pin: { type: String, default: null }, //both
		face: { type: String, default: null }, //both
	},
	{ timestamp: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
