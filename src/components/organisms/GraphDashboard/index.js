import React,{propTypes} from 'react'
import ReactDOM from 'react-dom'
import {} from 'components'
import {Link} from 'react-router'
import styled from 'styled-components'
import api from 'components/api'
import * as d3 from "d3";
import {findDOMNode as dom} from 'react-dom'
import {Tabs, Tab} from 'material-ui/Tabs';

const Wrapper = styled.div`
    padding:80px 0 80px 0;

`
const Chart = styled.div`
    g {
        font-family:'nunito';
    }
    .area{
        fill:#1EB2CF;
        opacity:0.4;
    }
    .line{
        fill:none;
        stroke-width:3px;
        stroke:#1EB2CF;
    }
`
const X = styled.g`
    path{
        fill: none;
        stroke: #fff;
    }
    line{
       stroke:#f4f4f4;
    }
    text{
        x:-10;
    }
`
const Label = styled.div`
    display:inline;
    font-size:16px;
    font-weight:bold;
`

var Axis=React.createClass({
    propTypes: {
        h:React.PropTypes.number,
        axis:React.PropTypes.func,
        axisType:React.PropTypes.oneOf(['x','y'])
    },
    componentDidUpdate() { this.renderAxis(); },
    componentDidMount() { this.renderAxis(); },
    renderAxis() {
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);
    },
    render() {
        var translate = "translate(0,"+(this.props.h+30)+")";
        return (
            <X className="axis" transform={this.props.axisType=='x'?translate:""} >
            </X>
        );
    }
});

var Dots=React.createClass({
    propTypes: {
        data:React.PropTypes.array,
        x:React.PropTypes.func,
        y:React.PropTypes.func
    },
    render(){
        var _self=this;
        //remove last & first point
        var data=this.props.data.splice(1);
        data.pop();

        var circles=data.map(function(d,i){
            return (<circle className="dot" r="7" cx={_self.props.x(d.date)} 
                      cy= {_self.props.y(d.count)} fill="#7dc7f4"
                       stroke="#3f5175" strokeWidth="5px" key={i} />);
        });
        return(
            <g>
                {circles}
            </g>
        );
    }
});


var LineChart=React.createClass({
    propTypes: {
        fill:React.PropTypes.string,
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        chartId:React.PropTypes.string
    },
    getDefaultProps() {
        return {
            width: 600,
            height: 300,
            chartId: 'v1_chart'
        };
    },
    getInitialState(){
        return {
            width:this.props.width,
            area:''
        };
    },

    // zoomed() {
    //     var t = d3.event.transform, xt = t.rescaleX(x);
    //     g.select(".area").attr("d", area.x(function(d) { return xt(d.date); }));
    //     g.select(".axis--x").call(xAxis.scale(xt));
    // },

    type(d) {
        d.date = parseDate(d.date);
        d.price = +d.price;
        return d;
    },
    render(){
        var data=[
            {day:'02-11-2016',count:180},
            {day:'02-12-2016',count:250},
            {day:'02-13-2016',count:150},
            {day:'02-14-2016',count:496},
            {day:'02-15-2016',count:140},
            {day:'02-16-2016',count:380},
            {day:'02-17-2016',count:100},
            {day:'02-18-2016',count:150}
        ];

        var margin = {top: 50, right: 80, bottom: 50, left: 80},
            w = this.state.width - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);

        var parseDate =  d3.timeParse("%m-%d-%Y");

        data.forEach(function (d) {
            d.date = parseDate(d.day);
        });

        var x = d3.scaleTime().domain(d3.extent(data, function(d) { return d.date; })).range([30, w]),
            y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.count; })]).range([h,0]);
      
       var xAxis = d3.axisBottom(x).tickSize(-h-30).ticks(8),
           yAxis = d3.axisLeft(y).tickSize(-w-30).ticks(6)

       function zoomed() {
         var t = d3.event.transform, xt = t.rescaleX(x);
         g.select(".area").attr("d", area.x(function(d) { return xt(d.date); }));
         g.select(".axis--x").call(xAxis.scale(xt));
       }

       var zoom = d3.zoom()
         .scaleExtent([1, 32])
         .translateExtent([[0, 0], [w, h]])
         .extent([[0, 0], [w, h]])
         .on("zoom", zoomed);

       var area = d3.area()
        .curve(d3.curveLinear)
        .x(function(d) { return x(d.date); })
        .y0(h)
        .y1(function(d) { return y(d.count); });

       var line=  d3.line()
        .curve(d3.curveLinear)
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.count); })

        var transform='translate(' + margin.left + ',' + margin.top + ')';

        return (
            <Chart>
                <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
                    <g transform={transform}>
                        {/*<Grid h={h} grid={yGrid} gridType="y"/>*/}
                        <Axis h={h} axis={yAxis} axisType="y" />
                        <Axis h={h} axis={xAxis} axisType="x"/>
                        <path  className='area' d={area(data)}  />
                        <path  className='line' d={line(data)}  />
                    </g>
                </svg>
            </Chart>
        );
    }
});

const GraphDashboard = React.createClass({
	getInitialState(){
		return {

		}
	},

	componentWillReceiveProps(nextProps){

	},

	componentDidMount(){

	},

	render(){
    var {theme} = this.context.setting.publisher
    const styles = {
        headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
        },
        };
	return (
        <Wrapper>
            <Tabs style={{width:500}} tabItemContainerStyle={{background:theme.primaryColor,color:'#000'}} tabTemplateStyle={{background:'none',color:'#000'}} inkBarStyle={{background:theme.accentColor}}>
                <Tab label="View" >
                </Tab>
                <Tab label="Share" >
                </Tab>
                <Tab label="Number of Stories">
                </Tab>
            </Tabs>
            <div className='row'>
                <Label className="sans-font">Start:</Label><Label className="sans-font">End:</Label>
            </div>
            <LineChart width={1200} height={500}/>
        </Wrapper>
	  )
	}
});

GraphDashboard.contextTypes = {
	setting: React.PropTypes.object
};


export default GraphDashboard;
