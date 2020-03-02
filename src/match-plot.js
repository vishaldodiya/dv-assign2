import data from "./data";
import util from "./util";
import * as d3 from "d3";

const matchPlot = {
    width: 500,
    height: 500,
    barHeight: 10,
    barMargin: 35,
    matchSvg: {},
    redColor: "#DC143C",
    label: [
        "First Serve",
        "Ace",
        "Double Fault",
        "First Point Won",
        "Second Point Won",
        "Fast Serve",
        "Avg Fast Serve",
        "Avg Second Serve",
        "Break",
        "Return",
        "Total",
        "Winner",
        "Error",
        "Net"
    ],
    getMatchPlotData: function(index) {
        const row = data[index];

        return [
            [row.firstServe1, row.firstServe2],
            [row.ace1, row.ace2],
            [row.double1, row.double2],
            [row.firstPointWon1, row.firstPointWon2],
            [row.secPointWon1, row.secPointWon2],
            [row.fastServe1, row.fastServe2],
            [row.avgFirstServe1, row.avgFirstServe2],
            [row.avgSecServe1, row.avgSecServe2],
            [row.break1, row.break2],
            [row.return1, row.return2],
            [row.total1, row.total2],
            [row.winner1, row.winner2],
            [row.error1, row.error2],
            [row.net1, row.net2]
        ];
    },
    plot: function() {
        const _self = matchPlot;

        _self.matchSvg = d3.select("#match")
                .append("svg")
                .attr("width", _self.width)
                .attr("height", _self.height);

        _self.matchSvg.selectAll("g")
            .data(_self.getMatchPlotData(0))
            .enter()
            .append("g")
            .attr("class", "bar")
            // Right Bar.
            .append("rect")
            .attr("class", "right")
            .attr("x", (_self.width / 2) + 1)
            .attr("y", function(d, i) {
                return i * _self.barMargin + 20;
            })
            .attr("width", function(d, i) {
                return util.getInt(d[0]);
            })
            .attr("height", _self.barHeight)
            .style("fill", (d) => {
                return (d[0] > d[1]) ? _self.redColor: "";    
            });

        // Left Bar.
        _self.matchSvg.selectAll("g.bar")
            .append("rect")
            .attr("class", "left")
            .attr("x", function(d, i) {
                return (_self.width / 2) - util.getInt(d[1]) - 1;
            })
            .attr("y", function(d, i) {
                return i * _self.barMargin + 20;
            })
            .attr("width", function(d, i) {
                return util.getInt(d[1]);
            })
            .attr("height", _self.barHeight)
            .style("fill", (d) => {
                return (d[1] > d[0]) ? _self.redColor: "";    
            });
        
        _self.matchSvg.selectAll("g.bar")
            .append("text")
            .text((d, i) => d[0])
            .attr("class", "value-right")
            .attr("x", 0)
            .attr("y", (d, i) => i * _self.barMargin + 15);
        
        _self.matchSvg.selectAll("g.bar")
            .append("text")
            .text((d, i) => d[1])
            .attr("class", "value-left")
            .attr("x", 450)
            .attr("y", (d, i) => i * _self.barMargin + 15);
        
        _self.matchSvg.selectAll("g.bar")
            .append("text")
            .text((d, i) => _self.label[i])
            .attr("x", (d, i) => (_self.width / 2) - ((_self.label[i].length / 2) * 8))
            .attr("y", (d, i) => i * _self.barMargin + 15);
    },
    updateMatchStat: function(index) {

        const _self = matchPlot;

        let plotData = _self.getMatchPlotData(index);

        let rightRects = _self.matchSvg.selectAll("rect.right")
                                .data(plotData);
    
        rightRects.exit().remove();
                
        rightRects.enter().append("rect");
                
        rightRects.transition()
            .duration(500)
            .attr("class", "right")
            .attr("x", (_self.width / 2) + 1)
            .attr("y", function(d, i) {
                return i * _self.barMargin + 20;
            })
            .attr("width", function(d, i) {
                return util.getInt(d[0]);
            })
            .attr("height", _self.barHeight)
            .style("fill", (d) => {
                return (d[0] > d[1]) ? _self.redColor: "";    
            });
    
        let leftRects = _self.matchSvg.selectAll("rect.left")
                                .data(plotData);
        
        leftRects.exit().remove();
    
        leftRects.enter().append("rect");
    
        leftRects.transition()
            .duration(500)
            .attr("class", "left")
            .attr("x", function(d, i) {
                return (_self.width / 2) - util.getInt(d[1]) - 1;
            })
            .attr("y", function(d, i) {
                return i * _self.barMargin + 20;
            })
            .attr("width", function(d, i) {
                return util.getInt(d[1]);
            })
            .attr("height", _self.barHeight)
            .style("fill", (d) => {
                return (d[1] > d[0]) ? _self.redColor: "";    
            });
        
        let leftValues = _self.matchSvg.selectAll("text.value-left")
            .data(plotData);
        
        leftValues.exit().remove();
    
        leftValues.enter().append("text");

        leftValues.transition()
            .duration(500)
            .text((d, i) => d[1])
            .attr("class", "value-left")
            .attr("x", 450)
            .attr("y", (d, i) => i * _self.barMargin + 15);

        let rightValues = _self.matchSvg.selectAll("text.value-right")
            .data(plotData);
        
        rightValues.exit().remove();
    
        rightValues.enter().append("text");

        rightValues.transition()
            .duration(500)
            .text((d, i) => d[0])
            .attr("class", "value-right")
            .attr("x", 0)
            .attr("y", (d, i) => i * _self.barMargin + 15);
    }
};

export default matchPlot;