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
            const getInchat = await ReportRepository.getInchat(date)
            let month = []
            for (let i = 0; i < 4; i++) {
                let monthValue = new Date().getMonth() - i + 1
                monthValue = monthValue <= 0 ? 12 - i + 2 : monthValue
                month.push({ month: monthValue })
            }
            let data = []
            for (var i in getAllBots) {
                const clonedMonthArray = [...month]
                data[i] = { ...getAllBots[i], months: clonedMonthArray }
            }
            let dados = JSON.parse(JSON.stringify(data))
            for (var i in dados) {
                for (var j in getSessions) {
                    if (dados[i].bot_id === getSessions[j].bot_id) {
                        for (let w = 0; w <= 3; w++) {
                            if (dados[i].months[w].month === getSessions[j].month) {
                                dados[i].months[w] = ({ ...dados[i].months[w], ...getSessions[j] })
                            }
                        }
                    }
                }
            }
            let datas = JSON.parse(JSON.stringify(dados))
            for (var i in datas) {
                for (var j in getIDK) {
                    if (datas[i].bot_id == getIDK[j].bot_id)
                        for (let w = 0; w <= 3; w++) {
                            if (datas[i].months[w].month == getIDK[j].month) {
                                datas[i].months[w].idk = getIDK[j].idk !== undefined ? getIDK[j].idk : 0
                            }
                        }
                }
            }
            let dado = JSON.parse(JSON.stringify(datas))
            for (var i in dado) {
                for (var j in getFichas) {
                    if (dado[i].bot_id == getFichas[j].bot_id)
                        for (let w = 0; w <= 3; w++) {
                            if (dado[i].months[w].month == getFichas[j].month)
                                dado[i].months[w].fichas = getFichas[j].fichas !== undefined ? getFichas[j].fichas : 0
                        }
                }
            }
            let inchatData = JSON.parse(JSON.stringify(dado))
            for (var i in inchatData) {
                for (var j in getInchat) {
                    if (inchatData[i].bot_id == getInchat[j].bot_id)
                        for (let w = 0; w <= 3; w++) {
                            if (inchatData[i].months[w].month == getInchat[j].month)
                                inchatData[i].months[w].inchat = getInchat[j].inchat !== undefined ? getInchat[j].inchat : 0
                        }
                }
            }

            return inchatData
        } catch (error) {
            return ({ message: error, statusCode: 500 })
        }
    }
}

module.exports = ReportService