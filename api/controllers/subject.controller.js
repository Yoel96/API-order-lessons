const Subject = require('../models/subject.model.js')
const Teacher = require('../models/teacher.model.js')


async function getAllSubjects(req, res) {
    try {
      if (!Object.values(req.query).length) {
        const subject = await Timetable.findAll()
        if (subject) {
          return res.status(200).json(subject)
        } else {
          return res.status(404).send('No subject found')
        }
      } else {
        const subject = await Subject.findAll({
          where: {
            [Op.and]: [
              req.query
            ]
          }
        })
        if (subject.length !== 0) {
          return res.status(200).json(subject)
        } else {
          return res.status(404).send('No subject found')
        }
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function getOneSubject(req, res) {
    try {
      const subject = await Subject.findByPk(req.params.id)
  
      if (actor) {
        return res.status(200).json(subject)
      } else {
        return res.status(404).send(' not found')
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function createSubject(req, res) {
    try {
      const subject = await Subject.create(req.body)
      return res.status(200).json({ message: 'Subject created', subject: subject })
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function updateSubject(req, res) {
    try {
        const [subjectExist, subject] = await Subject.update(req.body, {
        returning: true,
        where: {
            id: req.params.id
        }
        })
        if (subjectExist !== 0) {
        return res.status(200).json({ message: 'Subject updated', timetable: timetable })
        } else {
        return res.status(404).send('Subject not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteSubject(req, res) {
    try {
        const subject = await subject.destroy({
        where: {
            id: req.params.id
        }
        })
        if (subject) {
        return res.status(200).json('Subject deleted')
        } else {
        return res.status(404).send('subject not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getSubjectsByLessonType(req, res) {
    try {
        const subject = await subject.destroy({
        where: {
            id: req.params.id
        }
        })
        if (subject) {
        return res.status(200).json('Subject deleted')
        } else {
        return res.status(404).send('Subject not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getSubjectsByTeacher(req, res) { 
  try {

      const teacher = await Teacher.findByPk(req.params.id)
    
      if(teacher){
      const subjects= await teacher.getSubjects()
      if (subjects) {
      return res.status(200).json(subjects)
      } else {
      return res.status(404).send('Subjects not found')
      }
    }
    res.status(404).send('Teacher not found')
    
  } catch (error) {
      return res.status(500).send(error.message)
  }
  }

module.exports = { 
    getAllSubjects,
    getOneSubject,
    createSubject,
    updateSubject,
    deleteSubject,
    getSubjectsByLessonType,
    getSubjectsByTeacher
 }