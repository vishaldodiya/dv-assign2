import data from "./data";
import util from "./util";
import * as d3 from "d3";

const matchPlot = {
    width: 500,
    height: 550,
    barHeight: 10,
    barMargin: 35,
    matchSvg: {},
    padding: 50,
    redColor: "#DC143C",
    scale: {
        firstServe: {},
        ace: {},
        double: {},
        firstPointWon: {},
        secPointWon: {},
        fastServe: {},
        avgFirstServe: {},
        avgSecServe: {},
        break: {},
        return: {},
        total: {},
        winner: {},
        error: {},
        net: {}
    },
    label: [
        "First Serve",
        "Ace",
        "Double Fault",
        "First Point Won",
        "Second Point Won",
        "Fast Serve",
        "Avg First Serve",
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
            [row.firstServe1, row.firstServe2, "firstServe"],
            [row.ace1, row.ace2, "ace"],
            [row.double1, row.double2, "double"],
            [row.firstPointWon1, row.firstPointWon2, "firstPointWon"],
            [row.secPointWon1, row.secPointWon2, "secPointWon"],
            [row.fastServe1, row.fastServe2, "fastServe"],
            [row.avgFirstServe1, row.avgFirstServe2, "avgFirstServe"],
            [row.avgSecServe1, row.avgSecServe2, "avgSecServe"],
            [row.break1, row.break2, "break"],
            [row.return1, row.return2, "return"],
            [row.total1, row.total2, "total"],
            [row.winner1, row.winner2, "winner"],
            [row.error1, row.error2, "error"],
            [row.net1, row.net2, "net"]
        ];
    },
    getPlayers: function(index) {
        const row = data[index];

        return [row.player1, row.player2];
    },
    plot: function() {
        const _self = matchPlot;

        for (const key in _self.scale) {
            _self.setScale(key);
        }

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
                return i * _self.barMargin + 20 + _self.padding;
            })
            .attr("width", function(d, i) {
                console.log(d);
                return _self.getScale(d[2], util.getInt(d[1]));
            })
            .attr("height", _self.barHeight)
            .style("fill", (d) => {
                return (d[1] > d[0]) ? _self.redColor: "";    
            });

        // Left Bar.
        _self.matchSvg.selectAll("g.bar")
            .append("rect")
            .attr("class", "left")
            .attr("x", function(d, i) {
                return (_self.width / 2) - _self.getScale(d[2], util.getInt(d[0])) - 1;
            })
            .attr("y", function(d, i) {
                return i * _self.barMargin + 20 + _self.padding;
            })
            .attr("width", function(d, i) {
                return _self.getScale(d[2], util.getInt(d[0]));
            })
            .attr("height", _self.barHeight)
            .style("fill", (d) => {
                return (d[0] > d[1]) ? _self.redColor: "";    
            });
        
        _self.matchSvg.selectAll("g.bar")
            .append("text")
            .text((d, i) => d[1])
            .attr("class", "value-right")
            .attr("x", 465)
            .attr("y", (d, i) => i * _self.barMargin + 15 + _self.padding);
        
        _self.matchSvg.selectAll("g.bar")
            .append("text")
            .text((d, i) => d[0])
            .attr("class", "value-left")
            .attr("x", 0)
            .attr("y", (d, i) => i * _self.barMargin + 15 + _self.padding);
        
        _self.matchSvg.selectAll("g.bar")
            .append("text")
            .text((d, i) => _self.label[i])
            .attr("x", (d, i) => (_self.width / 2) - ((_self.label[i].length / 2) * 8))
            .attr("y", (d, i) => i * _self.barMargin + 15 + _self.padding);
        
        const players = _self.getPlayers(0);

        _self.matchSvg.append("g")
            .attr("class", "players")
            .append("text")
            .text(players[0])
            .attr("x", 0)
            .attr("y", 20)
            .attr("class", "player1");

        _self.matchSvg.select("g.players")
            .append("text")
            .text(players[1])
            .attr("x", (_self.width - players[1].length * 10))
            .attr("y", 20)
            .attr("class", "player2");
            
    },
    updateMatchStat: function(index) {

        const _self = matchPlot;
        const players = _self.getPlayers(index);

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
                return i * _self.barMargin + 20 + _self.padding;
            })
            .attr("width", function(d, i) {
                return _self.getScale(d[2], util.getInt(d[1]));
            })
            .attr("height", _self.barHeight)
            .style("fill", (d) => {
                return (d[1] > d[0]) ? _self.redColor: "";    
            });
    
        let leftRects = _self.matchSvg.selectAll("rect.left")
                                .data(plotData);
        
        leftRects.exit().remove();
    
        leftRects.enter().append("rect");
    
        leftRects.transition()
            .duration(500)
            .attr("class", "left")
            .attr("x", function(d, i) {
                return (_self.width / 2) - _self.getScale(d[2], util.getInt(d[0])) - 1;
            })
            .attr("y", function(d, i) {
                return i * _self.barMargin + 20 + _self.padding;
            })
            .attr("width", function(d, i) {
                return _self.getScale(d[2], util.getInt(d[0]));
            })
            .attr("height", _self.barHeight)
            .style("fill", (d) => {
                return (d[0] > d[1]) ? _self.redColor: "";    
            });
        
        let leftValues = _self.matchSvg.selectAll("text.value-left")
            .data(plotData);
        
        leftValues.exit().remove();
    
        leftValues.enter().append("text");

        leftValues.transition()
            .duration(500)
            .text((d, i) => d[0])
            .attr("class", "value-left")
            .attr("x", 0)
            .attr("y", (d, i) => i * _self.barMargin + 15 + _self.padding);

        let rightValues = _self.matchSvg.selectAll("text.value-right")
            .data(plotData);
        
        rightValues.exit().remove();
    
        rightValues.enter().append("text");

        rightValues.transition()
            .duration(500)
            .text((d, i) => d[1])
            .attr("class", "value-right")
            .attr("x", 465)
            .attr("y", (d, i) => i * _self.barMargin + 15 + _self.padding);

        let leftPlayer = _self.matchSvg.select("text.player1");

        leftPlayer.exit().remove();

        leftPlayer.enter().append("text")

        leftPlayer.text(players[0])
            .attr("x", 0)
            .attr("y", 20)
            .attr("class", "player1");

        let rightPlayer = _self.matchSvg.select("text.player2");

            rightPlayer.exit().remove();
    
            rightPlayer.enter().append("text")
    
            rightPlayer.text(players[1])
                .attr("x", (_self.width - players[1].length * 10))
                .attr("y", 20)
                .attr("class", "player2");
    },
    getScale: function(key, data) {
        return matchPlot.scale[key](data);
    },
    setScale: (key) => {
        const _self = matchPlot;

        let domain1 = util.getScaleDomain(data, `${key}1`);
        let domain2 = util.getScaleDomain(data, `${key}2`);
        let min = Math.min(...domain1, ...domain2);
        let max = Math.max(...domain1, ...domain2);

        console.log(key, min, max);

        _self.scale[key] = d3.scaleLinear()
            .domain([min, max])
            .range([0, _self.width / 2]);
    }
};

export default matchPlot;