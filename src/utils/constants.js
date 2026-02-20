let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8019'
}

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-doj4.onrender.com'
  console.log('🚀 ~ apiRoot:', apiRoot)
}
export const API_ROOT = apiRoot