const Subject = require('../models/subject.model.js')
const Teacher = require('../models/teacher.model.js')
const LessonType = require('../models/lessonType.model.js')
const TimeTable = require('../models/timetable.model.js')


async function getAllSubjects(req, res) {
  try {
    if (!Object.values(req.query).length) {
      const subject = await Subject.findAll()
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
    const subject = await Subject.findByPk(parseInt(req.params.id))

    if (subject) {
      return res.status(200).json(subject)
    } else {
      return res.status(404).send('Subject not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function createSubject(req, res) {
  try {
    const subject = await Subject.create(req.body)
    if (req.body.lessonType_Id) {

      const lessonType = await LessonType.findByPk(parseInt(req.body.lessonType_Id))
      if (!lessonType) return res.status(500).send("Lesson type not found")
      await subject.addLesson_type(lessonType)

    }
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
      return res.status(200).json({ message: 'Subject updated', subject: subject })
    } else {
      return res.status(404).send('Subject not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}



async function deleteSubject(req, res) {
  try {
    const subject = await Subject.findByPk(parseInt(req.params.id))
    if(!subject) return res.status(404).send('subject not found')
    const deletedSubject = await subject.destroy()

    if (deletedSubject) {
      return res.status(200).json('Subject deleted')
    } else {
      return res.status(404).send('subject not deleted')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function getSubjectsByLessonTypeName(req, res) {
  try {

    const lessonTypes = await LessonType.findAll(
      {
        where:
          { name: req.params.name },
        include:  { model: Subject}
      })
     if (lessonTypes) {
       
      
        return res.status(200).json(lessonTypes)
     
    }   else {
    return res.status(404).send('Subjects not found')
  } 
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function getSubjectsByTeacher(req, res) {
  try {
    const teacher = await Teacher.findByPk(parseInt(req.params.id))
    if (teacher) {
      const subjects = await teacher.getSubjects()
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


async function getAvailableSubject(req, res) {
  try {
    
    const timeTable = await TimeTable.findAll(
      {include:{
        model:Teacher,
        as:"teacherId",
        include:{
          model:Subject
        }
      }}
    )
      
      if (timeTable) {
        return res.status(200).json(timeTable)
      } else {
        return res.status(404).send('Subjects not found')
      }
    }
  
    catch (error) {
     return res.status(500).send(error.message)
  }
}



module.exports = {
  getAllSubjects,
  getOneSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectsByLessonTypeName,
  getSubjectsByTeacher,
  getAvailableSubject

}