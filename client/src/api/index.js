//统一出口
import * as article from './article'
import * as user from './user'
export default{
    ...article,
    ...user
}