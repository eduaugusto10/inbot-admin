const baseUrlDev = "https://hsm-dev.in.bot/api/report"
const baseUrlProd = "https://hsm.in.bot/table-pme/report"
let resp = [];
axios
    .get(baseUrlDev)
    .then((response) => {
        resp = response.data;
        dynamicList(response.data);
    })
    .catch((error) => console.log(error));

const dynamicList = (bots) => {
    const body = document.body;
    let color = false;
    bots.map((bot) => {
        const tableBots = document.createElement("table");
        tableBots.style.backgroundColor =
            color == false ? "#E0EBF6" : "#D0CECE";
        const name = document.createElement("th");
        const id = document.createElement("th");
        const contract = document.createElement("th");
        const indicator = document.createElement("th");
        const m3 = document.createElement("th");
        const m2 = document.createElement("th");
        const m1 = document.createElement("th");
        const m0 = document.createElement("th");
        name.id = "bot-name";
        name.innerHTML = "Nome do Projeto";
        id.innerHTML = "Bot ID";
        contract.innerHTML = "Tipo de Contrato";
        indicator.innerHTML = "Indicador";
        m3.innerHTML = monthByName(3); //"Current month - 3";
        m2.innerHTML = monthByName(2); //"Current month - 2";
        m1.innerHTML = monthByName(1); // "Current month - 1";
        m0.innerHTML = monthByName(0); //"Current month";
        tableBots.appendChild(name);
        tableBots.appendChild(id);
        tableBots.appendChild(contract);
        tableBots.appendChild(indicator);
        tableBots.appendChild(m3);
        tableBots.appendChild(m2);
        tableBots.appendChild(m1);
        tableBots.appendChild(m0);
        for (let i = 0; i < 3; i++) {
            const newCell = document.createElement("tr");
            const botName = document.createElement("td");
            const botID = document.createElement("td");
            const contract = document.createElement("td");
            const indicator = document.createElement("td");
            const month3 = document.createElement("td");
            const month2 = document.createElement("td");
            const month1 = document.createElement("td");
            const monthActual = document.createElement("td");
            botName.innerHTML = bot.bot_name;
            botID.innerHTML = bot.bot_id;
            contract.innerHTML =
                bot.bot_customer_contract_type == undefined
                    ? "--"
                    : bot.bot_customer_contract_type;
            switch (i) {
                case 0:
                    indicator.innerHTML = "Quantidade de Atendimentos Total";
                    month3.innerHTML =
                        bot.months[3] == undefined
                            ? 0
                            : bot.months[3].total == undefined
                                ? 0
                                : bot.months[3].total;
                    month2.innerHTML =
                        bot.months[2] == undefined
                            ? 0
                            : bot.months[2].total == undefined
                                ? 0
                                : bot.months[2].total;
                    month1.innerHTML =
                        bot.months[1] == undefined
                            ? 0
                            : bot.months[1].total == undefined
                                ? 0
                                : bot.months[1].total;
                    monthActual.innerHTML =
                        bot.months[0] == undefined
                            ? 0
                            : bot.months[0].total == undefined
                                ? 0
                                : bot.months[0].total;
                    break;
                case 1:
                    indicator.innerHTML = "Quantidade de Atendimentos via Whatsapp";
                    month3.innerHTML =
                        bot.months[3] == undefined
                            ? 0
                            : bot.months[3].whatsapp == undefined
                                ? 0
                                : bot.months[3].whatsapp;
                    month2.innerHTML =
                        bot.months[2] == undefined
                            ? 0
                            : bot.months[2].whatsapp == undefined
                                ? 0
                                : bot.months[2].whatsapp;
                    month1.innerHTML =
                        bot.months[1] == undefined
                            ? 0
                            : bot.months[1].whatsapp == undefined
                                ? 0
                                : bot.months[1].whatsapp;
                    monthActual.innerHTML =
                        bot.months[0] == undefined
                            ? 0
                            : bot.months[0].whatsapp == undefined
                                ? 0
                                : bot.months[0].whatsapp;
                    break;
                case 2:
                    indicator.innerHTML = "Quantidade de IDKs";
                    month3.innerHTML =
                        bot.months[3] == undefined
                            ? 0
                            : bot.months[3].idk == undefined
                                ? 0
                                : bot.months[3].idk;
                    month2.innerHTML =
                        bot.months[2] == undefined
                            ? 0
                            : bot.months[2].idk == undefined
                                ? 0
                                : bot.months[2].idk;
                    month1.innerHTML =
                        bot.months[1] == undefined
                            ? 0
                            : bot.months[1].idk == undefined
                                ? 0
                                : bot.months[1].idk;
                    monthActual.innerHTML =
                        bot.months[0] == undefined
                            ? 0
                            : bot.months[0].idk == undefined
                                ? 0
                                : bot.months[0].idk;
                    break;
            }
            tableBots.appendChild(newCell);
            newCell.appendChild(botName);
            newCell.appendChild(botID);
            newCell.appendChild(contract);
            newCell.appendChild(indicator);
            newCell.appendChild(month3);
            newCell.appendChild(month2);
            newCell.appendChild(month1);
            newCell.appendChild(monthActual);
            body.appendChild(tableBots);
        }
        color = ~color;
    });
};
function search() {
    let obj = resp;

    obj = statusBot(obj);

    obj = subscribers(obj);

    removeChild();
    obj = newQuery(obj);
    dynamicList(obj);
}

function removeChild() {
    let element = document.getElementsByTagName("table");
    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }
}

function newQuery(obj) {
    const radioStatus = document.getElementById("project-radio").checked;
    const query = document.getElementById("input-search").value;
    const regex = new RegExp(query, "gi");
    if (radioStatus == true)
        obj = obj.filter((item) => item.bot_name.match(regex));
    else obj = obj.filter((item) => item.bot_id.toString().match(regex));
    return obj;
}

function monthByName(monthID) {
    let date = new Date();
    let sumDate = date.getMonth() - monthID;
    date.setMonth(sumDate);
    const month = date.toLocaleString("default", {
        month: "2-digit",
        year: "2-digit",
    });
    return month;
}

function subscribers(objSub) {
    const subscriber = document.getElementById("subscriber").checked;
    const nonSubscriber = document.getElementById("non-subscriber").checked;
    if (subscriber === true && nonSubscriber === false) {
        objSub = objSub.filter((item) => item.bot_customer_paid === "1");
    }
    if (subscriber === false && nonSubscriber === true) {
        objSub = objSub.filter((item) => item.bot_customer_paid === "0");
    }
    if (subscriber === false && nonSubscriber === false) {
        objSub = [];
    }
    return objSub;
}

function statusBot(objStatus) {
    let botsEnable = document.getElementById("bot-enable").checked;
    let botsDisable = document.getElementById("bot-disable").checked;
    if (botsEnable === true && botsDisable === false) {
        objStatus = objStatus.filter((item) => item.bot_active === "1");
    }
    if (botsEnable === false && botsDisable === true) {
        objStatus = objStatus.filter((item) => item.bot_active === "0");
    }
    if (botsEnable === false && botsDisable === false) {
        objStatus = [];
    }
    return objStatus;
}