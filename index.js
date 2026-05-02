const cloud = require('wx-server-sdk');
const tencentcloud = require('tencentcloud-sdk-nodejs');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { text, voiceType = 1 } = event;
  
  if (!text) {
    return {
      success: false,
      message: '请提供要合成的文字'
    };
  }

  try {
    const TtsClient = tencentcloud.tts.v20190823.Client;
    const clientConfig = {
      credential: {
        secretId: process.env.TENCENT_SECRET_ID,
        secretKey: process.env.TENCENT_SECRET_KEY
      },
      region: 'ap-beijing',
      profile: {
        httpProfile: {
          endpoint: 'tts.tencentcloudapi.com'
        }
      }
    };

    const client = new TtsClient(clientConfig);
    
    const params = {
      Text: text,
      SessionId: Date.now().toString(),
      VoiceType: voiceType,
      Volume: 5,
      Speed: 0.8,
      ProjectId: 0
    };

    const response = await client.TextToSpeech(params);
    
    return {
      success: true,
      audioBase64: response.Audio.toString('base64')
    };
  } catch (error) {
    console.error('语音合成失败:', error);
    return {
      success: false,
      message: '语音合成失败',
      error: error.message
    };
  }
};