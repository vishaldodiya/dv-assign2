import data from "./data";
import util from "./util";
import scatterPlot from "./scatter-plot";
import matchPlot from "./match-plot";

const scatterPlotData = util.getScatterPlotData(data);

scatterPlot.plot(scatterPlotData);
matchPlot.plot();