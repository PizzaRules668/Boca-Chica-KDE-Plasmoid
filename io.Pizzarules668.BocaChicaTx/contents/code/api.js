var BASE_API_URL = "https://spacex-boca-chica-api.pizzarules668.repl.co/"
var CLOSURES_API_URL = BASE_API_URL + "/road"
var TFR_API_URL = BASE_API_URL + "/tfr"

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
                        closuresTableModel.appendRow({
                            Type: closuresData[i]["Type"],
                            Date: closuresData[i]["Date"],
                            Time: closuresData[i]["Time"],
                            Status: closuresData[i]["Status"].replace("Intermittent ", "      Intermittent\n").replace(" / ", "\n")
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
                        tfrTableModel.appendRow({
                            NotamID: tfrData[i]["notam"],
                            EffectiveStart: tfrData[i]["date"].split(" To ")[0],
                            EffectiveEnd: tfrData[i]["date"].split(" To ")[1],
                            Altitude: tfrData[i]["altitude"]
                        });
                    }
                }

                console.log("[BocaChicaTx] TFR refreshed");
            }
        }
    }

    tfrs.send();
}