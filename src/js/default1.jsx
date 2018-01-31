
let React=require('react');
let ReactDOM=require('react-dom');
require('../less/reactlist.less');


let MyFirst=React.createClass({
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
			$('#ok').on('click', function() {
				// 1. 模板
				let newData  ={
			        "content": "xxxxxx",
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

			$('#title .close').click(function(){
				$('#weibo').hide();
				$('#talk').hide();
			})
		},
		addContent(newData) {
			let that = this;
			// 2. 取state，换内容
			let currentStateData = [...that.state.tmpData];


			newData.content=$("#inputText").val();
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
			$('#weibo').show();
			$('#talk').show();
		},
		handleDelete(index) {
			let currentStateData = [...this.state.tmpData];
			currentStateData.splice(index, 1);
			this.setState({
				tmpData: currentStateData,
			});
		},
		render(){
			var temp=this.state.tmpData;
			var tempArr = null;
			let that = this;
			if(temp != null && temp.length){
				tempArr = temp.map((data, index) => {
					let myKey = `${temp.content}-${index}`;
					return (
						<MyFirstList
							key={myKey}
							temp={data} 
							onDelete={that.handleDelete.bind(that, index)}
						/>
					)
				});
			}
			var style={
				color:'blue',
			}
			return(
				<div className='all' style={style}>
					<button id='button' onClick={this.add}>点击</button>
					<div className='bigBox'>{ tempArr }</div>
					<AddStory />
				</div>
			)
		}
	})

let MyFirstList=React.createClass({
	
	delete(){
		this.props.onDelete && this.props.onDelete();
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

let AddStory=React.createClass({
	render(){
		return(
			<div>
				<div id="story"></div>
				<div id ="talk">
				    <div id="title">
				    	<span></span>
				        <span>添加故事</span>
				        <span className='close'>X关闭</span>
				    </div>
				    <div id="content">
				        <p>请输入故事内容</p>
				        <textarea id="inputText" ></textarea>
				        <p id="center">
					        <button id="ok">确定</button> 
					        <button id="cancel">取消</button>
				        </p>
				    </div>
				</div>
			</div>
		)
	}
})


ReactDOM.render(
  <MyFirst />,
  document.getElementById('container')
);


