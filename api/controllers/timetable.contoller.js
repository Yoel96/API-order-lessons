const Timetable = require('../models/timetable.model.js')
const Subject= require('../models/subject.model.js')
const Teacher = require('../models/teacher.model.js')
async function getAllTimetables(req, res) {
    try {
      if (!Object.values(req.query).length) {
        const timetables = await Timetable.findAll()
        
        if (timetables) {
          return res.status(200).json(timetables)
        } else {
          return res.status(404).send('No timetables found')
        }
      } else {
        const timetable = await Timetable.findAll({
          where: {
            [Op.and]: [
              req.query
            ]
          }
        })
        if (timetable.length !== 0) {
          return res.status(200).json(timetable)
        } else {
          return res.status(404).send('No timetable found')
        }
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function getOneTimetableByTeacher(req, res) { 
    try {
      const timetable = await Timetable.findByPK(req.params.id)
  
      if (timetable) {
        return res.status(200).json(timetable)
      } else {
        return res.status(404).send('Timetable not found')
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

 async function TeacherTimetable (req,res) {
  try {
    const teacher = await res.locals.user.getTeacher_info()
    const teacherTimeTable= await teacher.getTimetables()
    if(!teacherTimeTable) return res.status(400).send("Teacher doesnt has hours set")
    res.status(200).json(teacherTimeTable)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function TeacherCreateTimetable(req, res) {
    try {
      const teacher = await res.locals.user.getTeacher_info()
      const teacherTimeTable= await teacher.getTimetables()

      for (const timeTable of teacherTimeTable){
        if(timeTable.dataValues.date==req.body.date && timeTable.dataValues.time==req.body.time  ){
          return res.status(500).send("That date and time is already created")
        }
      }
      const timetable = await Timetable.create(req.body)
      await teacher.addTimetable(timetable)
      return res.status(200).json({ message: 'Timetable created', timetable: timetable })
    } catch (error) {
      return res.status(500).send(error.message)
    }
} 

async function TeacherupdateTimetable(req, res) {
    try {
      const teacher = await res.locals.user.getTeacher_info()
      const teacherTimeTable= await teacher.getTimetables()
      for (const timeTable of teacherTimeTable){
         if(timeTable.dataValues.date==req.body.date && timeTable.dataValues.time==req.body.time  ){
          return res.status(500).send("That date and time is already created")
        }
      }
      const [timetableExist, timetable] = await Timetable.update(req.body, {
        returning: true,
        where: {
          id: req.params.id
        }
      })
      if (timetableExist !== 0) {
        return res.status(200).json({ message: 'Timetable updated', timetable: timetable })
      } else {
        return res.status(404).send('Timetable not found')
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function TeacherDeleteTimetable(req, res) {
try {
    const timetable = await Timetable.destroy({
    where: {
        id: req.params.id
    }
    }) 
    if (timetable) {
    return res.status(200).json('Timetable deleted')
    } else {
    return res.status(404).send('Timetable not found')
    }
} catch (error) {
    return res.status(500).send(error.message)
}
}

async function getTimetableBysubject(req, res) { 
  try {
    const subject = await Subject.findByPk(parseInt(req.params.subject_id))
    if(!subject) return res.status(400).send("Subject not found")
    const teachers = await subject.getTeacher_infos()
    if(teachers.length==0) return res.status(400).send("Teacher doesn't has subject")
    const timeTables= []
    for(const teacher of teachers){
      timeTable= await teacher.getTimetables()
      timeTables.push(timeTable)
    }

    res.status(200).json(timeTables)

 
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function getTimeTableByTeacher(req, res) {
  try {
    const teacher = await Teacher.findByPk(parseInt(req.params.teacher_id))
    const teacherTimeTable= await teacher.getTimetables()
    if(!teacherTimeTable) return res.status(400).send("Teacher doesnt has hours set")
    res.status(200).json(teacherTimeTable)
  } catch (error) {
    return res.status(500).send(error.message)

  }

}


module.exports =  { 
    getAllTimetables,
    getOneTimetableByTeacher,
    TeacherCreateTimetable,
    TeacherupdateTimetable,
    TeacherDeleteTimetable,
    getTimetableBysubject,
    getTimeTableByTeacher,
    TeacherTimetable
}

