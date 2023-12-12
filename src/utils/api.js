import { invalidateToken, getToken } from "./auth";
import User from "./user";

export const requestHelpers = {
  logout: () => {} //Set in App.js
}

/*
options={
  login?: <boolean>  //true specifies first login so do not logout on error as we are not logged in yet
  returnType?: <'json' | 'text' | 'blob'>  //Specify the format of the reponse
  noToken?: <boolean> //true means endpoint does not require authorization header
  noRetry?: <boolean> //true means do not try and use refresh token and retry request on 401 error
  externalUrl: <boolean> //true means do not prepend backendUrl to the path 
}
*/

export const request = (path, mode, body=undefined, options={}) => {
  return new Promise((resolve, reject) => {
    getToken(options) //Get token from current session
      .then((token) => {
        let backendUrl = process.env.REACT_APP_BACKEND_URL || '/api/';
        if(options.externalUrl) {
          options.noRetry = true;
          options.noToken = true;
          backendUrl = '';
        }
        let contentType = {};
        if(body && !(body instanceof FormData)) { //If body is json format
          body = JSON.stringify(body);
          contentType = {
            'Content-Type': 'application/json'
          }
        }
        let method = body ? {method: mode, body: body} : {method: mode};
        let authorization = options.noToken ? {} : {Authorization: `Bearer ${token}`} //This is HTTP standard format for sending token to server 
        path = path.replace(/\/$/, ''); //Remove trailing slash
        fetch(backendUrl + path, {
          ...method,
          headers: {
            ...authorization,
            ...contentType
          }
        })
        .then(async (result) => {
          if(result?.ok) { //If status >= 200 && status <= 299 
            switch(options?.returnType) {
              case 'json': //Return json if specified
                return resolve(await result.json());
              case 'text': //Return text if specified
                return resolve(await result.text());
              case 'blob': //Return blob if specified
                return resolve(await result.blob());
              default:
                const res = await result.text();
                try { //Try and return json
                  return resolve(JSON.parse(res));
                } catch(err) { //If not json return text
                  return resolve(res);
                }
            }
          } else {
            return result.text().then(async text => { //fix if no text?
              if(result.status === 401/*&& text === 'Invalid JWT token\n'*/ ) {
                if(!options.noRetry && !options.noToken) { //If access token is invalid
                  console.log('Api retry')
                  invalidateToken(); //Delete access token to force retry with refresh token
                                                  //Specify we do not want to try again if this fails to prevent an infinite loop
                  await request(path, mode, body, { noRetry: true })
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
                  return;
                }
                if(!options.login) {
                  //If unauthorized logout as there is an issue with token
                  requestHelpers.logout('Your token has expired, please login again.');
                }
              }
              throw new
               Error(JSON.stringify({
                code: result.status, //HTTP status code
                message: text || result.statusText, //Error response from the server
                status: result.statusText //HTTP status message
              }));
            })
          }
        })
        .catch((error) => {
          console.error(error);
          try {
            reject(JSON.parse(error.message)); //Return http error code & message
          } catch {
            reject({code: null, status: null, message: /*error.message*/'Could not connect to server'}); //If not http error return message but no code
          }
        })
      })
      .catch((err) => { //If we cannot get token
        if(err) {
          console.error(err);
        }
        if(!options.login) {
          requestHelpers.logout(err); //Logout with error
        }
        reject({code: null, status: null, message: err});
      })
  })
}

//path is after the base api path ex: student/dashboard/3
export const get = (path, options) => request(path, 'GET', null, options);

export const post = (path, body, options) => request(path, 'POST', body, options);

export const put = (path, body, options) => request(path, 'PUT', body, options);

export const patch = (path, body, options) => request(path, 'PATCH', body, options);

export const remove = (path, options) => request(path, 'DELETE', null, options);

export const getUser = (setUser) => {
  return new Promise((res, rej) => {
    get('account/me', { login: true })
      .then((data) => {
        setUser({
          info: {
            ...data,
            instructingCourses: data.instructingCourses || [],
            gradingCourses: data.gradingCourses || [],
          },
          settings: {
            get: () => User.getSettings(data.accountID),
            set: (settings) => User.setSettings(data.accountID, { ...settings })
          }
        })
        res();
      })
      .catch((err) => {
        rej(err.message);
      });
  })
}