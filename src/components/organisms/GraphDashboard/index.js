import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import 'components'
import { Link } from 'react-router'
import styled from 'styled-components'
import api from 'components/api'
import * as d3 from 'd3'
import { findDOMNode as dom } from 'react-dom'
import { Tabs, Tab } from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Popover from 'material-ui/Popover'

require('react-datepicker/dist/react-datepicker.css')
const Wrapper = styled.div`
    width:${props => props.width}px;
    .row{
        overflow:hidden;
        display:block;
    }
    .total{
        float:right;
        margin:0 18px;
    }
    .inputDate{
        outline:none;
    }
`
const Chart = styled.div`
    g {
        font-family:'nunito';
    }
    .area{
        fill:${props => props.theme.accentColor};
        opacity:0.4;
    }
    .line{
        fill:none;
        stroke-width:3px;
        stroke:${props => props.theme.accentColor};
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
    font-size:14px;
`
const Num = styled.div`
    font-size:24px;
    font-weight:bold;

`

var Axis = React.createClass({
	propTypes: {
		h: React.PropTypes.number,
		axis: React.PropTypes.func,
		axisType: React.PropTypes.oneOf(['x', 'y'])
	},
	componentDidUpdate() {
		this.renderAxis()
	},
	componentDidMount() {
		this.renderAxis()
	},
	renderAxis() {
		var node = ReactDOM.findDOMNode(this)
		d3.select(node).call(this.props.axis)
	},
	render() {
		var translate = 'translate(0,' + (this.props.h + 30) + ')'
		return (
			<X
				className="axis"
				transform={this.props.axisType == 'x' ? translate : ''}
			/>
		)
	}
})

var Dots = React.createClass({
	propTypes: {
		data: React.PropTypes.array,
		x: React.PropTypes.func,
		y: React.PropTypes.func
	},
	render() {
		var _self = this
		//remove last & first point
		var data = this.props.data.splice(1)
		data.pop()

		var circles = data.map(function(d, i) {
			return (
				<circle
					className="dot"
					r="7"
					cx={_self.props.x(d.date)}
					cy={_self.props.y(d.value)}
					fill="#7dc7f4"
					stroke="#3f5175"
					strokeWidth="5px"
					key={i}
				/>
			)
		})
		return (
			<g>
				{circles}
			</g>
		)
	}
})

var LineChart = React.createClass({
	propTypes: {
		fill: React.PropTypes.string,
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		chartId: React.PropTypes.string
	},
	getDefaultProps() {
		return {
			width: 600,
			height: 300,
			chartId: 'v1_chart'
		}
	},
	getInitialState() {
		return {
			width: this.props.width,
			area: ''
		}
	},

	// zoomed() {
	//     var t = d3.event.transform, xt = t.rescaleX(x);
	//     g.select(".area").attr("d", area.x(function(d) { return xt(d.date); }));
	//     g.select(".axis--x").call(xAxis.scale(xt));
	// },

	type(d) {
		d.date = parseDate(d.date)
		d.price = +d.price
		return d
	},
	render() {
		var data = this.props.data
		//console.log(data)

		var margin = { top: 50, right: 30, bottom: 50, left: 30 },
			w = this.state.width - (margin.left + margin.right),
			h = this.props.height - (margin.top + margin.bottom)

		var parseDate = d3.timeParse('%m/%d/%Y')

		data.forEach(function(d) {
			d.date = parseDate(d.day)

			//console.log(d.date)
		})

		var x = d3
			.scaleTime()
			.domain(
				d3.extent(data, function(d) {
					return d.date
				})
			)
			.range([30, w]),
			y = d3
				.scaleLinear()
				.domain([
					0,
					d3.max(data, function(d) {
						return d.value
					})
				])
				.range([h, 0])

		var xAxis = d3.axisBottom(x).tickSize(-h - 30).ticks(8),
			yAxis = d3.axisLeft(y).tickSize(-w - 30).ticks(6)

		function zoomed() {
			var t = d3.event.transform, xt = t.rescaleX(x)
			g.select('.area').attr(
				'd',
				area.x(function(d) {
					return xt(d.date)
				})
			)
			g.select('.axis--x').call(xAxis.scale(xt))
		}

		var zoom = d3
			.zoom()
			.scaleExtent([1, 32])
			.translateExtent([[0, 0], [w, h]])
			.extent([[0, 0], [w, h]])
			.on('zoom', zoomed)

		var area = d3
			.area()
			.curve(d3.curveLinear)
			.x(function(d) {
				return x(d.date)
			})
			.y0(h)
			.y1(function(d) {
				return y(d.value)
			})

		var line = d3
			.line()
			.curve(d3.curveLinear)
			.x(function(d) {
				return x(d.date)
			})
			.y(function(d) {
				return y(d.value)
			})

		var transform = 'translate(' + margin.left + ',' + margin.top + ')'

		return (
			<Chart>
				<svg
					id={this.props.chartId}
					width={this.state.width}
					height={this.props.height}>
					<g transform={transform}>
						{/*<Grid h={h} grid={yGrid} gridType="y"/>*/}
						<Axis h={h} axis={yAxis} axisType="y" />
						<Axis h={h} axis={xAxis} axisType="x" />
						<path className="area" d={area(data)} />
						<path className="line" d={line(data)} />
					</g>
				</svg>
			</Chart>
		)
	}
})

const GraphDashboard = React.createClass({
	getDefaultProps() {
		return {
			width: 900,
			height: 400
		}
	},
	getInitialState() {
		return {
			startDate1: moment().zone('+07:00').subtract(30, 'days'),
			startDate2: moment().zone('+07:00'),
			swipPicker: true,
			open: false,
			selectTab: 'view',
			data: []
		}
	},
	componentWillReceiveProps(nextProps) {},
	componentWillMount() {},
	componentDidMount() {
		this.getPublisherInsight()
	},
	getPublisherInsight() {
		var { selectTab, startDate1, startDate2 } = this.state
		var pid = config.PID
		var action = selectTab
		var from = moment(startDate1).format('YYYYMMDD')
		var to = moment(startDate2).format('YYYYMMDD')
		//console.log(from,to)
		api.getPublisherInsight(pid, action, null, null, from, to).then(ins => {
			var data = []
			ins.insights.map((value, index) => {
				data[index] = {
					day: moment(value.date).format('MM/DD/YYYY'),
					value: value.value
				}
			})
			this.setState({ data: data,sum:ins.summary })

			//console.log(ins)
		})
	},

	handleChangeDate(e) {
		//console.log(e)
		if(e>new Date()){
			this.setState({
				open: false
			})
			return false
		}else{
			this.setState(
				{
					startDate1: e,
					open: false
				},
				() => {
					this.getPublisherInsight()
				}
			)
		}
	},
	handleRequestClose() {
		this.setState({
			open: false
		})
	},
	openDatePicker(e) {
		this.setState({
			open: true,
			swipPicker: true,
			anchorEl: e.currentTarget
		})
	},
	handleChangeDate2(e) {
		//console.log(e)
		if(e<=this.state.startDate1){
			this.setState({
				open: false
			})
			return false
		}else{
			this.setState(
				{
					startDate2: e,
					open: false
				},
				() => {
					this.getPublisherInsight()
				}
			)
		}
	},
	openDatePicker2(e) {
		this.setState({
			open: true,
			swipPicker: false,
			anchorEl: e.currentTarget
		})
	},
	handleChangeTab(e) {
		this.setState({selectTab: e},() => {
				this.getPublisherInsight()
			}
		)
	},
	render() {
		var { theme } = this.context.setting.publisher
		var {
			startDate1,
			startDate2,
			open,
			anchorEl,
			swipPicker,
			selectTab,
			data
		} = this.state
		const styles = {
			headline: {
				fontSize: 24,
				paddingTop: 16,
				marginBottom: 12,
				fontWeight: 400
			},
			tabs: {
				background: 'none',
				height: '60px',
				color: '#222222'
			},
			tab: {
				fontFamily: "'Nunito', 'Mitr'",
				fontSize: '16px',
				fontWeight: 'bold',
				textTransform: 'none'
			}
		}
		var { width, height, style } = this.props
		var { sum } = this.state
		//console.log(this.state.startDate1<this.state.startDate2)
		return (
			<Wrapper width={width} style={{ ...style }}>
				<Popover
					open={open}
					anchorEl={anchorEl}
					onRequestClose={this.handleRequestClose}
					style={{ background: 'none', boxShadow: 'none',margin:'0 5px 0 5px' }}>
					{swipPicker
						? <DatePicker
								selected={startDate1}
								selectsStart
								startDate={this.state.startDate1}
								endDate={this.state.startDate2}
								onChange={this.handleChangeDate}
								inline
							/>
						: <DatePicker
								selected={startDate2}
								selectsEnd
								startDate={this.state.startDate1}
								endDate={this.state.startDate2}
								onChange={this.handleChangeDate2}
								inline
							/>}
				</Popover>
				<Tabs
					style={{ width: 300 }}
					tabItemContainerStyle={{ ...styles.tabs }}
					inkBarStyle={{ background: theme.accentColor, height: 3 }}
					onChange={this.handleChangeTab}
					value={selectTab}>
					<Tab
						buttonStyle={{
							...styles.tab,
							color: selectTab == 'view' ? '#222' : '#c4c4c4'
						}}
						label="View"
						value={'view'}
					/>
					<Tab
						buttonStyle={{
							...styles.tab,
							color: selectTab == 'share' ? '#222' : '#c4c4c4'
						}}
						label="Share"
						value={'share'}
					/>
				</Tabs>
				<div className="row" style={{ marginTop: '50px' }}>
					<Label className="sans-font" style={{ margin: '2px 10px 0 0' }}>
						Start:
					</Label>
					<div style={{ display: 'inline-block' }}>
						<FlatButton
							onClick={this.openDatePicker}
							style={{
  							border: '1px solid #C4C4C4',
  							borderRadius: '20px',
  							padding: '0px 10px 0px 12px',
  							fontSize: '14px',
  							height: '28px',
  							lineHeight: '28px'
							}}
							icon={
								<FontIcon
									className="material-icons"
									style={{ color: '#c4c4c4', marginLeft: '15px' }}>
									keyboard_arrow_down
								</FontIcon>
							}>
							{moment(startDate1).format('MM/DD/YYYY')}
						</FlatButton>
					</div>
					<Label className="sans-font" style={{ margin: '2px 10px 0 15px' }}>
						End:
					</Label>
					<FlatButton
						onClick={this.openDatePicker2}
						style={{
							border: '1px solid #C4C4C4',
							borderRadius: '20px',
							padding: '0px 10px 0px 12px',
							fontSize: '14px',
							height: '28px',
							lineHeight: '28px'
						}}
						icon={
							<FontIcon
								className="material-icons"
								style={{ color: '#c4c4c4', marginLeft: '15px' }}>
								keyboard_arrow_down
							</FontIcon>
						}>
						{moment(startDate2).format('MM/DD/YYYY')}
					</FlatButton>
					<div className="total">
						<Label style={{ color: '#8e8e8e' }}>Number of Stories</Label>
						<Num className="serif-font">{sum&&sum.count}</Num>
					</div>
					<div className="total">
						<Label style={{ color: '#8e8e8e' }}>Average per story</Label>
						<Num className="serif-font">{sum&&sum.avg}</Num>
					</div>
					<div className="total">
						<Label style={{ color: '#8e8e8e' }}>Total</Label>
						<Num className="serif-font" style={{ color: theme.accentColor }}>
							{sum&&sum.total}
						</Num>
					</div>
				</div>
				<LineChart width={width} height={height} data={data} />
			</Wrapper>
		)
	}
})

GraphDashboard.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number
}
GraphDashboard.contextTypes = {
	setting: React.PropTypes.object
}

export default GraphDashboard
