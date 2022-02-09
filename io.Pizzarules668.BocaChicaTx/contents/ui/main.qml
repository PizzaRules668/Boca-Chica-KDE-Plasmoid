import QtQuick 2.14
import Qt.labs.qmlmodels 1.0
import org.kde.plasma.components 2.0 as PlasmaComponents

import "../code/api.js" as Api

// Create Plasmoid 
// https://techbase.kde.org/Development/Tutorials/Plasma5/QML2/GettingStarted

TableView {
    id: root
    columnSpacing: 1
    rowSpacing: 1
    clip: true

    implicitWidth: 640
    implicitHeight: 200

    // https://stackoverflow.com/questions/57928843/qml-tableview-with-dynamic-width-columns
    property var columnWidths: [120, 200, 150, 120]
    columnWidthProvider: function(column) { return columnWidths[column] }

    model: TableModel {
        id: closuresTable

        TableModelColumn { display: "Type" }
        TableModelColumn { display: "Date" }
        TableModelColumn { display: "Time" }
        TableModelColumn { display: "Status" }


        rows: Api.getClosures()
    }

    delegate: Rectangle {
        implicitWidth: columnWidthProvider(column)
        implicitHeight: 30
        border.width: .5
        color: "#bab9b1"

        Text {
            text: display
            anchors.centerIn: parent
        }
    }
}
