import React, {Component} from 'react';
import PropTypes from 'prop-types'
//pubsub-js 处理兄弟组件通信
import PubSub from 'pubsub-js'
class UsersSearch extends Component {
    // static propTypes = {
    //     setSearchName : PropTypes.func.isRequired
    // }
    state = {}
    handleSearch = () =>{
        const searchName = this.text.value.trim()
        if(searchName){
            /**
             * @name: 使用pubsub 首先发布消息
             * @test: test font
             * @msg:
             * @param {消息名称,回调函数传递数据}
             * @return:
             */
            PubSub.publish('searchName',searchName)
            // this.props.setSearchName(searchName)
        }
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text" placeholder="enter the name you search" ref={input => this.text = input} />
                    <button onClick={this.handleSearch}>Search</button>
                </div>
            </section>
        );
    }
}

export default UsersSearch;