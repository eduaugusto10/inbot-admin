const db = require('../config/db')

module.exports = {
    getAllBots: () => {
        return new Promise((accept, reject) => {
            db.query("select bots_view.bot_id, bots_view.bot_name, bots_view.bot_active, bots_view.bot_customer_paid,"
                + " bots_view.bot_customer_contract_type  from bots_view where bots_view.bot_is_small_company='1' order by bots_view.bot_name asc;"//
                , (error, results) => {
                    if (error) {
                        return reject("Request getAllBots error");
                    }
                    accept(results);
                });

        })
    },
    getIDKs: (dateQuery) => {
        return new Promise((accept, reject) => {
            db.query("select bot_id, count(bot_id) as idk, month(idk_date) as month,"
                + "year(idk_date) as year from idk where idk_date>= ? and bot_server_type='production' group by month(idk_date), year(idk_date), bot_id"
                + " order by year desc, month desc;", [dateQuery], (error, results) => {
                    if (error) {
                        return reject("Request getIDKs error");
                    }
                    accept(results);
                });
        })
    },
    getSessions: (dateQuery) => {
        return new Promise((accept, reject) => {
            db.query("select a.bot_id, count(a.bot_id) as total,count(if(a.log_channel='whatsapp',a.bot_id,null)) as whatsapp,"
                + "month(a.session_date_start) as month,year(a.session_date_start) as year from sessions a "
                + "where a.session_date_start>= ? and bot_server_type='production' group by a.bot_id, month(a.session_date_start),"
                + "year(a.session_date_start)"
                + " order by year desc, month desc;", [dateQuery], (error, results) => {
                    if (error) {
                        return reject("Request getSessions error");
                    }
                    accept(results);
                });
        })
    },
    getFichas: (dateQuery) => {
        return new Promise((accept, reject) => {
            db.query("select a.bot_id, count(ficha_id) as fichas,"
                + "month(a.ficha_date_creation) as month,year(a.ficha_date_creation) as year from fichas a "
                + "where a.ficha_status='ok' AND a.ficha_date_creation>= ? group by a.bot_id, month(a.ficha_date_creation),"
                + "year(a.ficha_date_creation)"
                + "order by year desc, month desc;", [dateQuery], (error, results) => {
                    if (error) {
                        return reject("Request getFichas error");
                    }
                    accept(results);
                });
        })
    }
}