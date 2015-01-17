var bardata= [];


var tempColor;

d3.tsv('data.tsv', function(data){

	for (key in data){
		bardata.push(data[key].value)
	}

var margin = { top: 30, right: 30, bottom: 40, left: 70 };
var height = 400 - margin.top - margin.bottom; 
var width = 600 -margin.left - margin.right, barWidth = 50 , barOffset = 5;

var colors = d3.scale.linear()
				.domain([0,bardata.length*.33, bardata.length*.66, bardata.length])
				.range(['#B58929','#C61C6F','#268BD2','#85992C']);

var yScale = d3.scale.linear()
				.domain([0, d3.max(bardata)])
				.range([0, height]); // scales out data to see that the graph wont exceed the height of the SVG element


var xScale = d3.scale.ordinal()
				.domain(d3.range(0,bardata.length))
				.rangeBands([0, width], .2); // takes care of resizing the width of each band and hence keps up to the width of the svg element

var tooltip = d3.select('body').append('div') 
				.style('position','absolute')
				.style('padding','0 10px')
				.style('background','white')
				.style('opacity',0)

 var myChart = d3.select('#chart').append('svg')
	.attr('width',width+margin.left+margin.right)
	.attr('height',height+margin.top+margin.bottom)

	.append('g')
	.attr('transform','translate('+margin.left+','+margin.top+')')
	.selectAll('rect').data(bardata)
	.enter().append('rect')
		.style('fill', function(d,i){
			return colors(i);
		})
		.attr('width',xScale.rangeBand())
		
		.attr('x', function(d,i){
			return xScale(i);
		})

		.attr('height', 0)

		.attr('y', height)
		
		.on('mouseover', function (d) {
			
			tooltip.transition()
				.style('opacity', .9)

			tooltip.html(d)
				.style('left', (d3.event.pageX - 35) + 'px')
				.style('top', (d3.event.pageY - 30) + 'px')

			tempColor = this.style.fill;
			d3.select(this)
				.style('opacity', .5)
				.style('fill','#819090')

		})

		.on('mouseout', function (d) {
			
			d3.select(this)
				.style('opacity', 1)
				.style('fill', tempColor)

		})

		myChart.transition()
			.attr('height', function  (d) {
				return yScale(d);
			})

			.attr('y', function  (d) {
				return height- yScale(d);
			})

			.delay(function (d,i){
				return i * 20;
			})
			.duration(1000)
			.ease('elastic')



		var vGuideScale = d3.scale.linear()
			.domain([3000, d3.max(bardata)])
			.range([height, 0])

		var vAxis = d3.svg.axis()
			.scale(vGuideScale)
			.orient('left')
			.ticks(10)	

		var vGuide = d3.select('svg').append('g')
			vAxis(vGuide)
			vGuide.attr('transform','translate('+margin.left+','+margin.top+')')
			vGuide.selectAll('path')
				.style({fill : 'none', stroke: "#000"})
			vGuide.selectAll('line')
				.style({ stroke: "#000"})

			var hAxis = d3.svg.axis()
			.scale(xScale)
			.orient('bottom')
			.tickValues(xScale.domain().filter( function(d,i){
				return i+1;
			}))		

		var hGuide = d3.select('svg').append('g')
			hAxis(hGuide)
			hGuide.attr('transform','translate('+margin.left+','+(height+margin.top)+')')
			hGuide.selectAll('path')
				.style({fill : 'none', stroke: "#000"})
			hGuide.selectAll('line')
				.style({ stroke: "#000"})
});














