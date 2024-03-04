const Timetable = require('../models/timetable.model.js')

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

async function getOneTimetable(req, res) { //Cambiar por un get subject
    try {
      const timetable = await Timetable.findByPk(req.params.id)
  
      if (actor) {
        return res.status(200).json(timetable)
      } else {
        return res.status(404).send('Timetable not found')
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
}

async function createTimetable(req, res) {
    try {
      const timetable = await Timetable.create(req.body)
      return res.status(200).json({ message: 'Timetable created', timetable: timetable })
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

async function updateTimetable(req, res) {
    try {
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

async function deleteTimetable(req, res) {
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

async function getOneTimetable(req, res) { // corregir incluir get teacher
  try {
    const timetable = await Timetable.findByPk(req.params.id)

    if (actor) {
      return res.status(200).json(timetable)
    } else {
      return res.status(404).send('Timetable not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


module.exports =  { 
    
    getAllTimetables,
    getOneTimetable,
    createTimetable,
    updateTimetable,
    deleteTimetable
}