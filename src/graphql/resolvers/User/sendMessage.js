const CryptoJS = require('crypto-js');
const Axios = require('axios');

const sendMessage = (phoneNumber, key) => {
  const ncp_timestamp = new Date().getTime().toString();

  const url = process.env.NCP_SENS_URL;
  const ncp_accessKey = process.env.NCP_SENS_ACCESSKEY;
  const ncp_secretKey = process.env.NCP_SENS_SECRETKEY;

  let verify_code;
  for (let i = 0; i < 6; i++) {
    verify_code += parseInt(Math.random() * 10);
  }

  const makeSignature = () => {
    var space = ' '; // one space
    var newLine = '\n'; // new line
    var method = 'POST'; // method
    var url = '/sms/v2/services/ncp:sms:kr:259777942460:mbtisns/messages'; // url (include query string)
    var timestamp = ncp_timestamp; // current timestamp (epoch)
    var accessKey = ncp_accessKey; // access key id (from portal or Sub Account)
    var secretKey = ncp_secretKey; // secret key (from portal or Sub Account)

    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    var hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  };

  const Header = {
    'Content-Type': 'application/json; charset=utf-8',
    'x-ncp-apigw-timestamp': ncp_timestamp,
    'x-ncp-iam-access-key': ncp_accessKey,
    'x-ncp-apigw-signature-v2': makeSignature(),
  };

  const Body = {
    type: 'SMS',
    from: '01023201516',
    content: 'SMS에서 보낸 메시지',
    messages: [
      {
        to: 'phoneNumber',
        content: `인증번호는 ${verifyCode}입니다.`,
      },
    ],
  };

  Axios({ url, method: 'POST', headers: Header, data: Body })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

module.exports = { sendMessage };
