//统一出口
import * as article from './article'
import * as user from './user'
import * as message from './message'
export default{
    ...article,
    ...user,
    ...message
}