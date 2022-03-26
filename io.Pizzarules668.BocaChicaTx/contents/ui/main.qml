import QtQuick 2.14
import Qt.labs.qmlmodels 1.0
import org.kde.plasma.components 2.0 as PlasmaComponents

import "../code/api.js" as Api

// Create Plasmoid 
// https://techbase.kde.org/Development/Tutorials/Plasma5/QML2/GettingStarted

Item {
    id: root

    width: 640
    height: 380

    Rectangle {
        id: closuresHeader
        width: 90
        height: 20

        x: (parent.width - closuresHeader.width)/2

        color: "#bab9b1"

        Text {            
            id: closuresHeaderText
            text: "Road Closures"
            anchors.centerIn: parent
            anchors.fill: parent
        }
    }

    TableView {
        id: closuresTable
        width: 640
        height: 200

        y: 20

        columnSpacing: .5
        rowSpacing: 1

        data: Api.getClosures();
        Timer {
            id: closureTimer
            interval: 3600000
            running: true
            repeat: true
            onTriggered: {
                Api.getClosures();
            }
        }

        model: TableModel {
            id: closuresTableModel

            TableModelColumn { display: "Type" }
            TableModelColumn { display: "Date" }
            TableModelColumn { display: "Time" }
            TableModelColumn { display: "Status" }

            rows: []
        }

        // https://stackoverflow.com/questions/57928843/qml-tableview-with-dynamic-width-columns
        property var columnWidths: [120, 200, 150, 120]
        columnWidthProvider: function(column) { return columnWidths[column] }

        delegate: Rectangle {
            width: closuresTable.columnWidthProvider(column)
            height: 20
            border.width: 1
            color: "#bab9b1"

            Text {
                text: display
                anchors.centerIn: parent
            }
        }
    }

    Rectangle {
        id: tfrHeader
        width: 85
        height: 20

        y: closuresTable.height + closuresTable.y
        x: (parent.width - tfrHeaderText.width)/2

        color: "#bab9b1"

        Text {            
            id: tfrHeaderText
            text: "TFRs Closures"
            anchors.centerIn: parent
            anchors.fill: parent
        }
    }

    TableView {
        id: tfrTable
        width: 640
        height: 60

        y: closuresTable.height + closuresTable.y + 20

        columnSpacing: .5
        rowSpacing: 1

        data: Api.getTFR();
        Timer {
            id: tfrTime
            interval: 3600000
            running: true
            repeat: true
            onTriggered: {
                Api.getTFR();
            }
        }

        model: TableModel {
            id: tfrTableModel

            TableModelColumn { display: "NotamID" }
            TableModelColumn { display: "EffectiveStart" }
            TableModelColumn { display: "EffectiveEnd" }
            TableModelColumn { display: "Altitude" }

            rows: []
        }

        // https://stackoverflow.com/questions/57928843/qml-tableview-with-dynamic-width-columns
        property var columnWidths: [120, 120, 120, 230]
        columnWidthProvider: function(column) { return columnWidths[column] }

        delegate: Rectangle {
            width: tfrTable.columnWidthProvider(column)
            height: 30
            border.width: 1
            color: "#bab9b1"

            Text {
                text: display
                anchors.centerIn: parent
            }
        }
    }
}