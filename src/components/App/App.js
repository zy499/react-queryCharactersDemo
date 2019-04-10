import React, {Component} from 'react';
import './index.css'
import UsersSearch from '../UsersSearch/UsersSearch'
import UsersMian from '../UsersMian/UsersMian'
class UsersApp extends Component {
    // state = {
    //     searchName : ''
    // }
    // setSearchName = (searchName) =>{
    //     this.setState({searchName})
    // }
    render() {
        return (
            <div className="container">
                {/* props 方法处理 兄弟组件通信 */}
                {/* <UsersSearch setSearchName={this.setSearchName} /> */}
                {/* pubsub-js 处理 兄弟组件通信 */}
                <UsersSearch />
                {/* props 方法处理 兄弟组件通信 */}
                {/* <UsersMian searchName={this.state.searchName} /> */}
                {/* pubsub-js 处理 兄弟组件通信 */}
                <UsersMian />
            </div>
        );
    }
}

export default UsersApp;