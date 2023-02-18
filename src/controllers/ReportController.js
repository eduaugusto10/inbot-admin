const ReportService = require('../Service/ReportService')

class ReportController {
    async getAll(req, res) {
        const reportService = new ReportService()
        try {
            const data = await reportService.getAll()
            if (data.statusCode == 500) {
                res.status(500).json(data)
            }
            res.json(data)
        } catch (error) {
            res.json({ message: 'Server internal error' })
        }
    }
}

module.exports = ReportController