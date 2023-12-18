const sendResponse = (isSuccessfull, message, data, error) => {
   return (
      {
         isSuccessfull: isSuccessfull,
         message: message ? message : null,
         error: error ? error : null,
         data: data,
      }
   )
}

module.exports = sendResponse