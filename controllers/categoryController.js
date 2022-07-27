import slugify from 'slugify'
import Category from '../models/categoryModel.js'
import Product from '../models/productModel.js'
import Sub from '../models/subModel.js'

const getCategories = async (req, res) => {
	try {
		const categories = await Category.find({}).sort({ createdAt: -1 })
		res.json(categories)
	} catch (err) {
		return res.status(500).json({ msg: err.message })
	}
}

const createCategory = async (req, res) => {
	try {
		const { name } = req.body
		const newCategory = await new Category({ name, slug: slugify(name) }).save()
		res.json(newCategory)
	} catch (err) {
		res.status(400).send('Create category failed')
	}
}

const readCategory = async (req, res) => {
	let category = await Category.findOne({ slug: req.params.slug }).exec()
	const products = await Product.find({ category }).populate('category').exec()
	res.json({
		category,
		products,
	})
}

const updateCategory = async (req, res) => {
	const { nameEdit, id } = req.body
	try {
		const updated = await Category.findOneAndUpdate(
			{ _id: id },
			{ name: nameEdit, slug: slugify(nameEdit) },
			{ new: true }
		)
		res.json(updated)
	} catch (err) {
		res.status(400).send('Category update failed')
	}
}

const deleteCategory = async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({ _id: req.params.id })
		res.json(deleted)
	} catch (err) {
		res.status(400).send('Category delete failed')
	}
}

const getCategorySubs = async (req, res) => {
	let subs = await Sub.find({ parent: req.params.id }).exec()
	res.json(subs)
}

export {
	getCategories,
	createCategory,
	deleteCategory,
	updateCategory,
	readCategory,
	getCategorySubs,
}
