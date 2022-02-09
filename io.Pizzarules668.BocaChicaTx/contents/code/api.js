var BASE_API_URL = "https://spacex-boca-chica-api.pizzarules668.repl.co/"
var CLOSURES_API_URL = BASE_API_URL + "/road"

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
                closuresTable.clear();
                closuresTable.appendRow({
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
                        closuresTable.appendRow({
                            Type: closuresData[i]["Type"],
                            Date: closuresData[i]["Date"],
                            Time: closuresData[i]["Time"],
                            Status: closuresData[i]["Status"].replace("Intermittent ", "      Intermittent\n")
                        });
                    }
                }

                console.log("[BocaChicaTx] Closures refreshed");
            }
        }
    }

    closures.send();

    return [
        {
            Type: "Closure Type",
            Date: "Closure Date",
            Time: "Closure Time",
            Status: "Closure Status"
        }
    ]
}

function refreshData()
{
    getClosures();
}