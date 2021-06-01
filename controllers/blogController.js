const express = require('express');
const posts = express.Router();
const postsModel = require('../models/postsModel');
const userModel = require('../models/userModel');



// GET (index) list of holidays
posts.get('/', (req, res)=>{

	userModel.findById(req.session.currentUser._id).populate('posts').exec(( error, foundUser ) => {
		if (error){

			return res.status(400).json(error);
		}
		else{
     console.log(foundUser);
			return res.status(200).json(foundUser.posts);

	  	}
		})

	})




// POST ROUTE
posts.post('/', (req, res)=>{
	console.log(req.session.currentUser);

	postsModel.create(req.body, (error, createPosts)=>{
		if (error){
			return res.status(400).json({error: error.message})
		}
		else{

			userModel.findById(req.session.currentUser._id, (error, foundUser)=>{
				if (error) {
					return res.status(400).json({ error: error.message })
				}
				else{

					foundUser.posts.push(createPosts)
						foundUser.save((err, updatedModel) => {
	    res.status(201).json(createPosts)
	})
				}
			})
		}
	})
});


// DELETE ROUTE
posts.delete('/:id', (req, res)=>{

	postsModel.findByIdAndDelete(req.params.id, (error, deletedPosts)=>{
		if (error){

			return res.status(400).json({error: error.message})
		}
		else if (deletedPosts === null){
			return res.status(404).json({message: 'Post id not Found'})
		}
		else{
			return res.status(200).json({message: `Post ${deletedPosts.name} deleted successfully`})
		}
	})
})


// UPDATE ROUTE
posts.put('/:id', (req, res)=>{

postsModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedPosts)=>{
		if (error){

			return res.status(400).json({error: error.message})
		}
		else{
			return res.status(200).json({
				message: `Post ${updatedPosts.id} updated successfully`,
				data: updatedPosts
			})
		}
	})
})



module.exports = posts;
