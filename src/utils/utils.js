// Public Functions 
function logJsonArray(inputArr) {
  console.log(`Results for target league: ${JSON.stringify(inputArr)}`);
}

// Async Public Functions
async function sendAxiosResult(axiosGetPromise, response) {
  const axiosGetResult = await axiosGetPromise;
  response.send(axiosGetResult);
}

async function returnAxiosResult(axiosGetPromise) {
  const axiosGetResult = await axiosGetPromise;
  return axiosGetResult;
}

module.exports = {
  logJsonArray,
  sendAxiosResult,
  returnAxiosResult
}