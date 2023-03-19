import config from "./phoneValidation.config";

var request = require('request');

export const validatePhoneNumber =async  (phone: string) => {
    try{
        
    var options = {
    'method': 'GET',
    'url': `${config.PV_URL}/?api_key=${config.PV_API_KEY}&phone=${phone}`,
    'headers': {}
    };
    const response :any =  await new Promise((resolve, reject) => {
        request(options, function (error: any, response: any) {
            if (error) reject(error);
            resolve(JSON.parse(response.body));
        });
    });




    console.log("🚀 ~ file: phoneValidation.service.ts:31 ~ validatePhoneNumber ~ response:", response)

    return {"valid": response.valid, "message": response.valid ? "Phone number is valid" : "Phone number is invalid"}
    }
    catch (e: any){
        console.log(e);
        return {"valid": false, "message": "Error validating phone number"}
    }
}
