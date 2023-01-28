const db = require('../config/db')

module.exports = {
    getAllBots: () => {
        return new Promise((accept, reject) => {
            db.query("select bots_view.bot_id, bots_view.bot_name, bots_view.bot_active, bots_view.bot_customer_paid,"
                + " bots_view.bot_customer_contract_type  from bots_view  where bots_view.bot_is_small_company='1' order by bots_view.bot_name asc;"
                , (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    accept(results);
                });

        })
    },
    getIDKs: () => {
        return new Promise((accept, reject) => {
            db.query("select bot_id, count(bot_id) as idk, month(idk_date) as month,"
                + "year(idk_date) as year from idk group by month(idk_date), year(idk_date), bot_id"
                + " order by year desc, month desc;", (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    accept(results);
                });
        })
    },
    getSessions: () => {
        return new Promise((accept, reject) => {
            db.query("select a.bot_id, count(a.bot_id) as total,count(if(a.log_channel='whatsapp',a.bot_id,null)) as whatsapp,"
                + "month(a.inchat_queue_date_out_ok) as month,year(a.inchat_queue_date_out_ok) as year from inchat_sessions a "
                + "where a.inchat_queue_date_out_ok is not null group by a.bot_id, month(a.inchat_queue_date_out_ok),"
                + "year(a.inchat_queue_date_out_ok)"
                + " order by year desc, month desc;", (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    accept(results);
                });
        })
    }
}