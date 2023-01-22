var BASE_API_URL = "https://spacex-boca-chica-api.pizzarules668.repl.co/"
var CLOSURES_API_URL = BASE_API_URL + "/road"
var TFR_API_URL = BASE_API_URL + "/tfr"


function passed( end)
{
    var now = parseInt(new Date().getTime().toString().slice(0, -3));

    if (now > end)
        return true;

    return false;
}

function getClosures() {
    var closures = new XMLHttpRequest();
    var closuresData;

    closures.open("GET", CLOSURES_API_URL);

    closures.onerror = function()
    {
        console.log("[BocaChicaTx] Error getting closures");
    }

    closures.onreadystatechange = function ()
    {
        if (closures.readyState === 4)
        {
            if (closures.status === 200)
            {
                closuresTableModel.clear();
                closuresTableModel.appendRow({
                    Type: "Closure Type",
                    Date: "Closure Date",
                    Time: "Closure Time",
                    Status: "Closure Status"
                })

                closuresData = JSON.parse(closures.responseText);
                if (closuresData.length > 0)
                {
                    for (var i=0; i < closuresData.length; i++)
                    {
                        if (!passed(closuresData[i]["End"]))
                            if (!closuresData[i]["Status"].includes("Closure Canceled"))
                                closuresTableModel.appendRow({
                                    Type: closuresData[i]["Type"],
                                    Date: closuresData[i]["Date"],
                                    Time: closuresData[i]["Time"],
                                    Status: closuresData[i]["Status"].replace("Intermittent ", "      Intermittent\n").replace(" / ", "\n").replace(".", "\n")
                                });
                    }
                }

                console.log("[BocaChicaTx] Closures refreshed");
            }
        }
    }

    closures.send();
}

function getTFR() {
    // Table format
    // NotamID, Effective Start, Effective End, Altitude

    var tfrs = new XMLHttpRequest();
    var tfrData;

    tfrs.open("GET", TFR_API_URL);

    tfrs.onerror = function()
    {
        console.log("[BocaChicaTx] Error getting tfrs");
    }

    tfrs.onreadystatechange = function ()
    {
        if (tfrs.readyState === 4)
        {
            if (tfrs.status === 200)
            {
                tfrTableModel.clear();
                tfrTableModel.appendRow({
                    NotamID: "Notam ID",
                    EffectiveStart: "Effective Start",
                    EffectiveEnd: "Effective End",
                    Altitude: "Altitude"
                })

                tfrData = JSON.parse(tfrs.responseText);
                if (tfrData.length > 0)
                {
                    for (var i=0; i < tfrData.length; i++)
                    {
                        var notamId = tfrData[i]["Notam"]
                        var start   = tfrData[i]["Effective"].split(" to ")[0].split(" at ")[0]
                        var end     = tfrData[i]["Effective"].split(" to ")[1].split(" at ")[0]
                        var alt     = tfrData[i]["Altitude"].match(/.{1,26}/g).join("\n")

                        tfrTableModel.appendRow({
                            NotamID: notamId,
                            EffectiveStart: start,
                            EffectiveEnd: end,
                            Altitude: alt
                        });
                    }
                }

                console.log("[BocaChicaTx] TFR refreshed");
            }
        }
    }

    tfrs.send();
}