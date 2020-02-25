import $ from 'jquery';
// import Util from './Util';
// import Caching from "./Caching";
// import { func } from 'prop-types';

const ApiCalls = {
    makeCall: function (API_URL, method, data) {
        //test comment
        let params = {
            url: API_URL,
            type: method || "GET",
            crossDomain: true,
            cache: false,
            credentials: true
        };

        if (method === 'POST' && data) {
            $.extend(params, {
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json"
            });
        }

        return $.ajax(params).then(response => {
            if (response && response.meta && response.meta.code === 200) {
                return response;
            } else {
                return false;
            }
        }, error => {
            return false;
        });
    },

    //use json-server to make fake api calls
    //to run json server, run npm script: json-server, see package.json
    //url for the fake api should be like : http://localhost:3000/${key} where key is same as the key to dummy data in db.json
    //see jsonServer.js for the server configuration.
    readWriteJsonServer: function(method, params, key){
        let port = 3000,
            hostName = "localhost";

        return this.makeCall(`http://${hostName}:${port}/${key}`, method, params);
    }
};

export default ApiCalls;
