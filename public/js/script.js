

let resp = [];
axios
    .get("http://localhost:3000/report")
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
        name.id = "bot-name"
        name.innerHTML = "Nome do Projeto";
        id.innerHTML = "Bot ID";
        contract.innerHTML = "Tipo de Contrato";
        indicator.innerHTML = "Indicador";
        m3.innerHTML = "Mês - 3";
        m2.innerHTML = "Mês - 2";
        m1.innerHTML = "Mês - 1";
        m0.innerHTML = "Mês Atual";
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
                        bot.month[3] == undefined ? 0 : bot.month[3].total;
                    month2.innerHTML =
                        bot.month[2] == undefined ? 0 : bot.month[2].total;
                    month1.innerHTML =
                        bot.month[1] == undefined ? 0 : bot.month[1].total;
                    monthActual.innerHTML =
                        bot.month[0] == undefined ? 0 : bot.month[0].total;
                    break;
                case 1:
                    indicator.innerHTML = "Quantidade de Atendimentos via Whatsapp";
                    month3.innerHTML =
                        bot.month[3] == undefined ? 0 : bot.month[3].whatsapp;
                    month2.innerHTML =
                        bot.month[2] == undefined ? 0 : bot.month[2].whatsapp;
                    month1.innerHTML =
                        bot.month[1] == undefined ? 0 : bot.month[1].whatsapp;
                    monthActual.innerHTML =
                        bot.month[0] == undefined ? 0 : bot.month[0].whatsapp;
                    break;
                case 2:
                    indicator.innerHTML = "Quantidade de IDKs";
                    month3.innerHTML =
                        bot.month[3] == undefined
                            ? 0
                            : bot.month[3].idk == undefined
                                ? 0
                                : bot.month[3].idk;
                    month2.innerHTML =
                        bot.month[2] == undefined
                            ? 0
                            : bot.month[2].idk == undefined
                                ? 0
                                : bot.month[2].idk;
                    month1.innerHTML =
                        bot.month[1] == undefined
                            ? 0
                            : bot.month[1].idk == undefined
                                ? 0
                                : bot.month[1].idk;
                    monthActual.innerHTML =
                        bot.month[0] == undefined
                            ? 0
                            : bot.month[0].idk == undefined
                                ? 0
                                : bot.month[0].idk;
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

    let botsEnable = document.getElementById("bot-enable").checked;
    let botsDisable = document.getElementById("bot-disable").checked;
    if (botsEnable === true && botsDisable === false) {
        obj = obj.filter((item) => item.bot_active === "1");
    }
    if (botsEnable === false && botsDisable === true) {
        obj = obj.filter((item) => item.bot_active === "0");
    }
    if (botsEnable === false && botsDisable === false) {
        obj = [];
    }

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
