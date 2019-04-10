import React, {Component} from 'react';
import PropTypes from 'prop-types'
import $Axios from 'axios'
import PubSub from 'pubsub-js'
class UsersMian extends Component {
    // static propTypes = {
    //     searchName: PropTypes.string.isRequired
    // }
    state = {
        initView: true,
        loading: false,
        users: null,
        errMsg: null,
        zero : false
    }
    /**
     * @name: 使用pubsub接受消息
     * @test: test font
     * @msg:
     * @param {type}
     * @return:
     */
    componentDidMount(){
        PubSub.subscribe('searchName',(msg,searchName)=>{
            //更新状态
            this.setState({
                initView:false,
                loading:true
            })
            //发送请求
            const url = `https://api.github.com/search/users?q=${searchName}`
            $Axios.get(url)
            .then(res=>{
                const result = res.data.items
                if(result.length > 0){
                    const users = result.map(item=>({
                        name:item.login,url:item.html_url,avatarUrl:item.avatar_url
                    }))
                    //更新状态
                    this.setState({
                        zero:false,
                        loading:false,
                        users
                    })
                }else{
                    this.setState({
                        loading:false,
                        zero:true
                    })
                }
            })
            .catch(err=>{
                this.setState({errMsg:err.message})
            })
        })
    }
    /**
     * @name: 钩子函数 接受改变后的Props
     * @test: test font
     * @msg:
     * @param {newProps}
     * @return:
     */
    // componentWillReceiveProps(newProps) {
    //     const { searchName } = newProps
    //     //更新状态
    //     this.setState({
    //         initView:false,
    //         loading:true
    //     })
    //     //发送请求
    //     const url = `https://api.github.com/search/users?q=${searchName}`
    //     $Axios.get(url)
    //     .then(res=>{
    //         const result = res.data.items
    //         if(result.length > 0){
    //             const users = result.map(item=>({
    //                 name:item.login,url:item.html_url,avatarUrl:item.avatar_url
    //             }))
    //             //更新状态
    //             this.setState({
    //                 zero:false,
    //                 loading:false,
    //                 users
    //             })
    //         }else{
    //             this.setState({
    //                 loading:false,
    //                 zero:true
    //             })
    //         }
    //     })
    //     .catch(err=>{
    //         this.setState({errMsg:err.message})
    //     })
    // }
    render() {
        const {initView, loading, users, errMsg ,zero} = this.state
        if (initView) {
            return <h2>请输入人物关键词进行搜索</h2>
        } else if (loading) {
            return <h2>loading...</h2>
        } else if (errMsg) {
            return <h2>{errMsg}</h2>
        } else if (zero) {
            return <h2>对不起没有数据,请换个试试</h2>
        } else {
            return (
                <div className="row">
                    {
                        users.map((user, index) => (
                            <div className="card" key={index}>
                                <a href={user.url} target="_blank">
                                    <img
                                        src={user.avatarUrl}
                                        style={{
                                        width: '100px'
                                    }}/>
                                </a>
                                <p className="card-text">{user.name}</p>
                            </div>
                        ))
                    }
                </div>
            )
        }
    }
}

export default UsersMian;