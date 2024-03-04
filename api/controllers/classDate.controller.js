const ClassDate = require('../models/classDate.model')

async function getAllClassDates(req, res) {
    try {
        const classDates = await ClassDate.findAll()
        if (classDates) {
            return res.status(200).json(classDates)
        } else {
            return res.status(404).send('No classDates found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneClassDate(req, res) {
    try {
        const classDate = await ClassDate.findByPk(req.params.id)
        if (classDate) {
            return res.status(200).json(classDate)
        } else {
            return res.status(404).send('ClassDate not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createClassDate(req, res) {
    try {
        const classDate = await ClassDate.create({
            comments: req.body.comments,
        })
        return res.status(200).json('ClassDate created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateClassDate(req, res) {
    try {
        const [classDateExist, classDate] = await ClassDate.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (classDateExist !== 0) {
            return res.status(200).json('ClassDate updated')
        } else {
            return res.status(404).send('ClassDate not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteClassDate(req, res) {
    try {
        const classDate = await ClassDate.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (classDate) {
            return res.status(200).json('ClassDate deleted')
        } else {
            return res.status(404).send('ClassDate not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getClassDateByUserEmail(req, res) {
    try {
        const classDate = await ClassDate.findOne({
            where: {
                email: req.params.userEmail,
            },
        })
        if (classDate) {
            return res.status(200).json('classDate deleted')
        } else {
            return res.status(404).send('classDate not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllClassDates,
    getOneClassDate,
    createClassDate,
    updateClassDate,
    deleteClassDate,
    getClassDateByUserEmail
}
