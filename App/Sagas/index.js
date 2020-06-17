import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/type';
import {loginSuccess} from '../actions/index'
import {api} from '../../../api';
import {put , takeLatest,takeEvery} from 'redux-saga/effects';
 function* fetchLoginRequestSaga(){
    console.log('voo')
    let url = 'Users/Login';
          // console.log('action', action);
          var body = {
            // UserName: action.userName,
            // UserPassword:action.passWord,
            UserName: 'kythuat1',
            UserPassword:'202cb962ac59075b964b07152d234b70'
          };
    try {
        const result = yield api(url, body);
        console.log('result',result[0],)
        yield put(loginSuccess(result[0]));
        // if(result==true){
        //     yield call( response)
            // yield put ({ LOGIN_SUCCESS, data:result[0]})
        // }
    } catch (error) {
        
    }
} ;
export function* watchFetchLoginRequestSaga(){
    console.log('vooo1')
    yield takeLatest (LOGIN_REQUEST, fetchLoginRequestSaga);
}