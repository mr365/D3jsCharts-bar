
var width = 960,
    height = 600;

var rateById = d3.map();
d3.tsv, "data.tsv", function(d) {
					rateById.set("line1",+d.line1);
					rateById.set("line2",+d.line2); 
				}
				

console.log(rateById);