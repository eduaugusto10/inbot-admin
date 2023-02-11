const ReportRepository = require("../repositories/ReportRepository")

class ReportService {
    async getAll() {
        try {
            const date = new Date()
            let newDate = date.getDate() - 120
            date.setDate(newDate)
            date.setDate(1)
            const getAllBots = await ReportRepository.getAllBots()
            const getIDK = await ReportRepository.getIDKs(date)
            const getSessions = await ReportRepository.getSessions(date)
            const getFichas = await ReportRepository.getFichas(date)
            let month = []
            let data = []
            let dados = new Object()
            for (let i = 0; i < 4; i++) {
                let monthValue = new Date().getMonth() - i + 1
                monthValue = monthValue <= 0 ? 12 - i + 1 : monthValue
                month.push({ month: monthValue })
            }
            for (var i in getAllBots) {
                const clonedMonthArray = [...month]
                data[i] = { ...getAllBots[i], months: clonedMonthArray }
            }
            dados = JSON.parse(JSON.stringify(data))
            for (var i in data) {
                for (var j in getSessions) {
                    if (data[i].bot_id === getSessions[j].bot_id) {
                        for (let w = 0; w <= 3; w++) {
                            if (data[i].months[w].month === getSessions[j].month) {
                                dados[i].months[w] = ({ ...dados[i].months[w], ...getSessions[j] })
                            }
                        }
                    }
                }
            }

            for (var i in data) {
                for (var j in getIDK) {
                    if (data[i].bot_id == getIDK[j].bot_id)
                        for (var k in data[i].months) {
                            for (let w = 0; w <= 3; w++) {
                                if (data[i].months[w].month == getIDK[j].month)
                                    dados[i].months[w] = { ...dados[i].months[k], ...getIDK[j] }
                            }

                        }
                }
            }
            let dado = JSON.parse(JSON.stringify(dados))
            for (var i in dados) {
                for (var j in getFichas) {
                    if (dados[i].bot_id == getFichas[j].bot_id)
                        for (var k in dados[i].months) {
                            for (let w = 0; w <= 3; w++) {
                                if (dados[i].months[w].month == getFichas[j].month)
                                    dado[i].months[w].fichas = getFichas[j].fichas
                            }

                        }
                }
            }

            return dado
        } catch (error) {
            return ({ message: error, statusCode: 500 })
        }
    }
}

module.exports = ReportService