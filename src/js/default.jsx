
let React=require('react');
let ReactDOM=require('react-dom');
require('../less/reactlist.less');


var MyFirst=React.createClass({
		getInitialState(){
			{/*{初始我们的状态}*/}
			return{
				tmpData:null,
			}
		},
		componentWillMount(ev){
			var that=this;
			$.ajax({
				type:'GET',
				url:'../src/json/story.json',
				dataType:'JSON',
				success:function(data){
					that.setState({tmpData:data});
				}
			});
		},
		componentDidMount() {
			this.initEvent();
		},
		initEvent() {
			let that = this;
			let i = 0;
			$('#ok').on('click', function() {
				// 1. 模板
				let newData  ={
			        "content": i++,
			        "hashId": "1",
			        "unixtime": 1418814837,
			        "updatetime": "2014-12-17 19:13:57"
			    };

				that.addContent(newData);
				// 5. 隐藏
				$('#weibo').hide();
				$('#talk').hide();

			});

			$('#cancel').click(function(){
				$('#weibo').hide();
				$('#talk').hide();
			});

			$('#title span').click(function(){
				$('#weibo').hide();
				$('#talk').hide();
			})
		},
		addContent(newData) {
			let that = this;
			// 2. 取state，换内容
			let currentStateData = [...that.state.tmpData];


			newData.hashId=currentStateData.length+1;
			console.log(new Date())
			$("#inputText").val('');

			// 3. 操作state
			currentStateData.unshift(newData);

			// 4. 更新state
			that.setState({
				tmpData: currentStateData,
			}, () => {
				console.log('currentStateData', currentStateData);
			});
		},
		add(){
			$('#weibo').css({
				display:'block'
			});
			$('#talk').css({
				display:'block'
			});
		},
		render(){
			var temp=this.state.tmpData;
			var tempArr = null;
			if(temp != null && temp.length){
				tempArr = temp.map((data, index) => {
					let myKey = `${index}`;
					return (
						<MyFirstList
							key={myKey}
							temp={data} 
						/>
					)
				});
			}
			var style={
				color:'pink',
			}
			return(
				<div className='all' style={style}>
					<button onClick={this.add}>dianji</button>
					<div className='bigBox'>{ tempArr }</div>
					
				</div>
			)
		}
	})

var MyFirstList=React.createClass({
	
	delete(event){
		let det=event.target.parentNode;
		det.style.display='none';
	},
	render(){
		var temp=this.props.temp;
		if(temp.hashId===0) return;
		return(
			<div className="box">
				<div className="left">{temp.content}</div>
				<div className="right" onClick={this.delete}>删除</div>
			</div>
		)
	}
})


ReactDOM.render(
  <MyFirst />,
  document.getElementById('container')
);

