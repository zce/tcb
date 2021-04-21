const tencentcloud = require('tencentcloud-sdk-nodejs')

const { SECRET_ID, SECRET_KEY } = process.env

const client = new tencentcloud.iai.v20200303.Client({
  credential: {
    secretId: SECRET_ID,
    secretKey: SECRET_KEY
  },
  region: 'ap-beijing',
  profile: {
    httpProfile: {
      endpoint: 'iai.tencentcloudapi.com'
    }
  }
})

module.exports = image => client.DetectFace({
  Image: image,
  NeedFaceAttributes: 1,
  NeedQualityDetection: 1
})
