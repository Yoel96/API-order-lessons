const TeacherRatings = require('../models/teacherRatings.model')

async function getAllRatings(req, res) {
    try {
        const ratings = await TeacherRatings.findAll()
        if (ratings) {
            return res.status(200).json(ratings)
        } else {
            return res.status(404).send('No ratings found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneRating(req, res) {
    try {
        const rating = await TeacherRatings.findByPk(req.params.id)
        if (rating) {
            return res.status(200).json(rating)
        } else {
            return res.status(404).send('Rating not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createRating(req, res) {
    try {
        const rating = await TeacherRatings.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json('Rating created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateRating(req, res) {
    try {
        const [ratingExist, rating] = await TeacherRatings.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (ratingExist !== 0) {
            return res.status(200).json('Rating updated')
        } else {
            return res.status(404).send('Rating not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteRating(req, res) {
    try {
        const rating = await TeacherRatings.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (rating) {
            return res.status(200).json('Rating deleted')
        } else {
            return res.status(404).send('Rating not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getTeacherRatingByEmail(req, res) {
    try {
        const rating = await TeacherRatings.findOne({
            where: {
                email: req.params.userEmail,
            },
        })
        if (rating) {
            return res.status(200).json('rating deleted')
        } else {
            return res.status(404).send('rating not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllRatings,
    getOneRating,
    createRating,
    updateRating,
    deleteRating,
    getTeacherRatingByEmail
}
