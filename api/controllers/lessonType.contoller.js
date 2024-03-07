const LessonType =require('../models/lessonType.model.js')
const Subject = require('../models/subject.model.js')
const Teacher = require('../models/teacher.model.js')

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


async function getLessonTypesByTeacher(req, res) { 
  try {
      const teacher = await Teacher.findByPk(parseInt(req.params.id))
      
      if (teacher) {
        
        const lessonTypes= await teacher.getLesson_types()

      return res.status(200).json(lessonTypes)
      } else {
      return res.status(404).send('LessonType not found')
      }
  } catch (error) {
      return res.status(500).send(error.message)
  }
  }




async function getLessonTypesBySubject(req, res) { 
  try {
      const subject = await Subject.findByPk(parseInt(req.params.id))
      
      if (subject) {
        
        const lessonTypes= await subject.getLesson_types()

      return res.status(200).json(lessonTypes)
      } else {
      return res.status(404).send('LessonType not found')
      }
  } catch (error) {
      return res.status(500).send(error.message)
  }
  }

async function createLessonType(req, res) {
    try {
      const lessonType = await LessonType.create({name: req.body.name})
      
      if(req.body.teacher_id && req.body.subject_id){

        const subject= await Subject.findByPk(parseInt(req.body.subject_id))
        const teacher= await Teacher.findByPk(parseInt(req.body.teacher_id))
        console.log(lessonType)
        await subject.addLesson_type(lessonType)
        await teacher.addLesson_type(lessonType)

      }
      return res.status(200).json({ message: 'LessonType created', lessonType: lessonType })
    } catch (error) {
      console.log(error)
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
        return res.status(200).json({ message: 'LessonType updated', lessonType: lessonType })
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
    getLessonTypesBySubject,
    getLessonTypesByTeacher,
    createLessonType,
    updateLessonType,
    deleteLessonType,
 }