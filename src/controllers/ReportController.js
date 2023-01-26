const ReportService = require('../Service/ReportService')

class ReportController {
    async getAll(req, res) {
        const reportService = new ReportService()
        try {
            const data = await reportService.getAll()
            res.json(data)
        } catch (error) {
            res.json({ message: 'Error' })
        }
    }
}

module.exports = ReportController