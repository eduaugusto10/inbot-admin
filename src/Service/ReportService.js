const ReportRepository = require("../repositories/ReportRepository")

class ReportService {
    async getAll() {
        try {
            const getAllBots = await ReportRepository.getAllBots()
            const getIDK = await ReportRepository.getIDKs()
            const getSessions = await ReportRepository.getSessions()

            let data = []

            for (var i in getAllBots) {
                let month = []
                for (var j in getSessions) {
                    if (getAllBots[i].bot_id == getSessions[j].bot_id)
                        month.push(getSessions[j])
                }
                data[i] = { ...getAllBots[i], month }
            }

            for (var i in data) {
                for (var j in getIDK) {
                    if (data[i].bot_id == getIDK[j].bot_id)
                        for (var k in data[i].month) {
                            if (data[i].month[k].month == getIDK[j].month)
                                data[i].month[k] = { ...data[i].month[k], ...getIDK[j] }
                        }
                }
            }

            return data
        } catch (error) {
            return 'Error'
        }
    }
}

module.exports = ReportService