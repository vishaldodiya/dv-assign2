import util from "./util";
import matchPlot from "./match-plot";

const scatterPlot = {
    width: 500,
    height: 500,
    padding: 50,
    plot: function(data) {

        let xScale = d3.scaleLinear()
            .domain(util.getScaleDomain(data, 0))
            .range([this.padding, this.width - this.padding]);

        let yScale = d3.scaleLinear()
                    .domain(util.getScaleDomain(data, 1))
                    .range([this.height - this.padding, this.padding]);

        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        const svg = d3.select("#scatter")
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

        const tooltip = util.getToolTip("tooltip");

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d, i) {
                return xScale(d[0]);
            })
            .attr("cy", function(d, i) {
                return yScale(d[1]);
            })
            .attr("r", 5)
            .on("mouseover", (d) => {
                matchPlot.updateMatchStat(d[2]);
                tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9)
                        .style("visibility", "visible");
                tooltip.html(`Error: ${d[0]} <br> Return: ${d[1]}%`)
                        .style("left", `${d3.event.pageX}px`)
                        .style("top", `${d3.event.pageY}px`);
            })
            .on("mouseout", (d) => {
                tooltip.transition()		
                    .duration(200)
                    .style("visibility", "hidden");
            });

        svg.append("g")
            .attr("transform", "translate(0, " + (this.height - this.padding) + ")")
            .call(xAxis);
        
        svg.append("text")
            .attr("transform", `translate(${this.width / 2}, ${this.height - 10})`)
            .style("text-anchor", "middle")
            .text("Federer's Error");
        
        svg.append("g")
            .attr("transform", "translate(" + this.padding + ", 0)")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x" , 0 - ( this.height / 2))
            .attr("y", 0)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Federer's Return");   
    }
};

export default scatterPlot;