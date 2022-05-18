import logger from '../utils/logger';


// checking UOMData in mongoDB
export const checkUOMDataCtrl = async () => {
  const LOG_PREFIX="checkUOMDataCtrl"
  try {
    const getUOMresponse = "sucess";

      return getUOMresponse;
    
  } catch (error) {
    logger.error(LOG_PREFIX,'Error in checkUOMData ', error);
    throw error={
      errMsg:'Error in checkUOMData'
    };
  }

};

