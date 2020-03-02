import * as d3 from "d3";

const util = {
    getScatterPlotData: (data) => {
        let output = [];

        data.forEach((d, i) => {
            let index;

            if (d.player1 == "Roger Federer") {
                index = 1;
            } else {
                index = 2;
            }
            output.push([d["error" + index], parseInt(d["return" + index]), i]);
        });

        return output;
    },
    getScaleDomain: (data, key) => {
        return [
            d3.min(data, (d) => d[key]),
            d3.max(data, (d) => d[key])
        ];
    },
    getInt: (num) => {
        let temp = parseInt(num);
        return Number.isNaN(temp) ? 0 : temp;
    },
    getToolTip: (className) => {
        return d3.select("body")
                .append("div")
                .attr("class", className)
                .style("opacity", 0);
    }
}

export default util;