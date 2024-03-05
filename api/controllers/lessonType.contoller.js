const LessonType =('../models/lessonType.model.js')

async function getAllLessonTypes(req, res) {
    try {
      if (!Object.values(req.query).length) {
        const lessonType = await LessonType.findAll()
        if (lessonType) {
          return res.status(200).json(lessonType)
        } else {
          return res.status(404).send('No lessonTypes found')
        }
      } else {
        const lessonType = await LessonType.findAll({
          where: {
            [Op.and]: [
              req.query
            ]
          }
        })
        if (lessonType.length !== 0) {
          return res.status(200).json(lessonType)
        } else {
          return res.status(404).send('No lessonType found')
        }
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

async function getOneLessonType(req, res) {
try {
    const lessonType = await LessonType.findByPk(req.params.id)

    if (lessonType) {
    return res.status(200).json(lessonType)
    } else {
    return res.status(404).send('LessonType not found')
    }
} catch (error) {
    return res.status(500).send(error.message)
}
}

async function createLessonType(req, res) {
    try {
      const lessonType = await LessonType.create(req.body)
      return res.status(200).json({ message: 'LessonType created', lessonType: lessonType })
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  async function updateLessonType(req, res) {
    try {
      const [lessonTypeExist, lessonType] = await LessonType.update(req.body, {
        returning: true,
        where: {
          id: req.params.id
        }
      })
      if (lessonTypeExist !== 0) {
        return res.status(200).json({ message: 'LessonType updated', timetable: timetable })
      } else {
        return res.status(404).send('LessonType not found')
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function deleteLessonType(req, res) {
    try {
        const lessonType = await LessonType.destroy({
        where: {
            id: req.params.id
        }
        })
        if (lessonType) {
        return res.status(200).json('LessonType deleted')
        } else {
        return res.status(404).send('LessonType not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { 
    getAllLessonTypes,
    getOneLessonType,
    createLessonType,
    updateLessonType,
    deleteLessonType,
 }