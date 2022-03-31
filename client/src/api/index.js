//统一出口
import * as article from './article'
import * as user from './user'
import * as message from './message'
import * as admin from './admin'
export default{
    ...article,
    ...user,
    ...message,
    ...admin
}