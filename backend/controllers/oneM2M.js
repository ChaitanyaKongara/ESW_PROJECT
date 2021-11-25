const express = require('express');
const axios = require('axios');
var config = require('config');
// var cseurl = "https://" + config.cse.ip + ":" + config.cse.port + "/" + config.cse.name
var cseurl = "https://" + config.cse.ip + "/" + config.cse.name
console.log("cseurl",cseurl)
const route = require('../routes/oneM2M');
var releaseVersion = config.cse.releaseVersion;
var originator = config.cse.originator;
var moment = require('moment');
exports.getAllAEs = async(req, res, next) => {
    try {
        const result = await retrieveAEs();
        res.send(result);
    } catch (err) {
        res.status(500).send({
            error: 'an error has occured trying to fetch the value'
        })
    }
};


exports.getAE = async(req, res, next) => {
    try {
    	let ae = req.params.ae;
        const result = await retrieveAE(ae);
        res.send(result);
    } catch (err) {
        res.status(500).send({
            error: 'an error has occured trying to fetch the value'
        })
    }
};

exports.getCnt = async(req, res, next) => {
    try {
        let ae = req.params.ae;
        let cnt = req.params.cnt;
        const result = await retrieveCnt(ae,cnt);
        console.log(result.data);

        res.send(result);
    } catch (err) {
        res.status(500).send({
            error: 'an error has occured trying to fetch the value'
        })
    }

};


exports.getAllCin = async(req, res, next) => {
    try {
        let ae = req.params.ae;
        let cnt = req.params.cnt;
        let cnt2 = req.params.cnt2;
        const result = await retrieveAllCin(ae,cnt,cnt2);
        var item;
        var list = [];
        // for(var i=0; i<result.data["m2m:cnt"]["m2m:cin"].length;i++){
        //     item=result.data["m2m:cnt"]["m2m:cin"][i];
        //     var date = moment(item.ct,"YYYYMMDDThhmmss").format("lll");
        //     var temp = item.con.split(",");
        //     // var temp2 = temp3[0];
        //     // var temp1 = temp2[0];
        //     var final = {
        //         "time": date,
        //         "voc": (temp[1]),
        //         "hum": (temp[2]),
        //         "temp": (temp[3]),
        //         "light": (temp[0]),
        //         "soil": (temp[4])
        //     };
        //     list.push(final);
        // }
        for(var i=0; i<result.data["m2m:cnt"]["m2m:cin"].length;i++){
            item=result.data["m2m:cnt"]["m2m:cin"][i];
            var date = moment(item.ct,"YYYYMMDDThhmmss").format("lll");
            var temp = item.con.split("/");
            var temp2 = temp[0].split(',');
            var temp1 = temp[1].split(',');
            // console.log(typeof decrypt(temp2[0])+'.'+decrypt(temp1[0]));
            var final = {
                "time": date,
                "voc": parseFloat(decrypt(temp2[1])+'.'+decrypt(temp1[1])),
                "hum": parseFloat(decrypt(temp2[2])+'.'+decrypt(temp1[2])),
                "temp": parseFloat(decrypt(temp2[3])+'.'+decrypt(temp1[3])),
                "light": parseFloat(decrypt(temp2[0])+'.'+decrypt(temp1[0])),
                "soil": parseFloat(decrypt(temp2[4])+'.'+decrypt(temp1[4]))
            };
            // console.log(typeof parseFloat(decrypt(temp2[0])+'.'+decrypt(temp1[0])));
            list.push(final);
        }
        list.reverse();
        // console.log(list);
        res.send(list);
    } catch (err) {
        res.status(500).send({
            error: 'an error has occured trying to fetch the value'
        })
    }

};
exports.getCin = async(req, res, next) => {
    try {
        let ae = req.params.ae;
        let cnt = req.params.cnt;
        let cnt2 = req.params.cnt2;
        const result = await retrieveCin(ae,cnt,cnt2);
        console.log(result);
        res.send(result);
    } catch (err) {
        res.status(500).send({
            error: 'an error has occured trying to fetch the value'
        })
    }
};

async function retrieveAEs() {
    var uri = cseurl + "/" + "?rcn=4";
    console.log("retrieveAE", uri);
    var requestId = Math.floor(Math.random() * 10000);
	var headers={
				"X-M2M-Origin": originator,
				"Content-Type": "application/json",
				'Accept': 'application/json',
                "X-M2M-RI": requestId
			}
	if (releaseVersion != "1"){
		headers = Object.assign(headers, {"X-M2M-RVI":releaseVersion});
	}

	try {
        const result = await axios({
            url: uri,
            method: 'get',
            timeout: 8000,
            headers: headers
        })
        if (result.status == 200) {
            console.log(result.status)
        }

        return result.data;

    } catch (err) {
        console.log('can not retrieve data');
    }

}

async function retrieveAE(ae) {
    var uri = cseurl + "/" + ae + "?rcn=4";
    console.log("retrieveAE", uri);
    var requestId = Math.floor(Math.random() * 10000);
	var headers={
				"X-M2M-Origin": originator,
				"Content-Type": "application/json",
				'Accept': 'application/json',
                "X-M2M-RI": requestId
			}
	if (releaseVersion != "1"){
		headers = Object.assign(headers, {"X-M2M-RVI":releaseVersion});
	}

	try {
        const result = await axios({
            url: uri,
            method: 'get',
            timeout: 8000,
            headers: headers
        })
        if (result.status == 200) {
            console.log(result.status)
        }

        return result.data;

    } catch (err) {
        console.log('can not retrieve data');
    }

}

async function retrieveCnt(ae, cnt) {
    var uri = cseurl + "/" + ae + "/" + cnt + "?rcn=4";
    console.log("retrieveCnt", uri);
    var requestId = Math.floor(Math.random() * 10000);
	var headers={
				"X-M2M-Origin": originator,
                // 'Authorization': 'Basic VHFSZ01XcEQ3aDpoRXd4WDREdHly',
				"Content-Type": "application/json",
				'Accept': 'application/json',
                "X-M2M-RI": requestId
			}
	if (releaseVersion != "1"){
		headers = Object.assign(headers, {"X-M2M-RVI":releaseVersion});
	}

	try {
        const result = await axios({
            url: uri,
            method: 'get',
			timeout: 8000,
            headers: headers
        })
        if (result.status == 200) {
            console.log(result.status)
        }
        return result.data;

    } catch (err) {
        console.log(2);
        console.log(uri);
        console.log('can not retrieve data');
    }

}


async function retrieveAllCin(ae, cnt, cnt2) {
    var uri = cseurl + "/" + ae + "/" + cnt  + "/" + cnt2 + "?rcn=4";
    console.log("retrieveAllCin", uri);
    var requestId = Math.floor(Math.random() * 10000);
	var headers={
				"X-M2M-Origin": originator,
				"Content-Type": "application/json",
				'Accept': 'application/json',
                "X-M2M-RI": requestId
			}
	if (releaseVersion != "1"){
		headers = Object.assign(headers, {"X-M2M-RVI":releaseVersion});
	}

    try {
        const result = await axios({
            url: uri,
            method: 'get',
			timeout: 8000,
            headers: headers,

        })
        if (result.status == 200) {
            console.log(result.status)
        }
        return result;

    } catch (err) {
        console.log(3);
        console.log(uri);
        console.log('can not retrieve data');
    }

}

async function retrieveCin(ae, cnt, cnt2) {
    var uri = cseurl + "/" + ae + "/" + cnt  + "/" + cnt2 + "/la";
    console.log("retrieveCin", uri);
    var requestId = Math.floor(Math.random() * 10000);
	var headers={
				"X-M2M-Origin": originator,
				"Content-Type": "application/json",
				'Accept': 'application/json',
                "X-M2M-RI": requestId
			}
	if (releaseVersion != "1"){
		headers = Object.assign(headers, {"X-M2M-RVI":releaseVersion});
	}

    try {
        const result = await axios({
            url: uri,
            method: 'get',
            timeout: 8000,
            headers: headers
        })
        if (result.status == 200) {
            console.log(result.status)
        }
        return result;

    } catch (err) {
        console.log(4);
        console.log(uri);
        console.log('can not retrieve data');
    }

}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function reverse(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}

function gcd(a,h){
    var temp;
	while (1)
	{
		temp = a%h;
		if (temp == 0)
		return h;
		a = h;
		h = temp;
	}
}

function decrypt(s){

    var p = 3;
    var q = 7;
    var N = p * q;
    var e = 2;
    var phi = (p - 1) * (q - 1);
    while (e < phi)
    {
        if (gcd(e, phi) == 1)
            break;
        else
            e++;
    }
    var k = 2;
    for (var i = 2; i <= 100000; i++)
    {
        if ((1 + k * phi) % e == 0)
        {
            k = i;
           // cout<<k<<endl;
            break;
        }
    }
    var cur = "";
    var res = "";
    for(var i = 1  ; i < s.length;i++){
        if(s[i] != '?')
            cur += s[i];
        else{
           
            var en = Number(cur);
            en  = en%N;
            var d =  (1 + (k*phi))/e;
            var m = Math.pow(en,d);
            m = m%N;
            res += m.toString();
            cur ="";
        }
    }
    res = reverse(res);
    return res;
}