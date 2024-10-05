const PREFIX = 'RSS_';
const ABSENT_VARS_ERROR_MESSAGE = 'RSS variables do not exist';

const parseEnv = () => {
   const envVars = process.env;
   const rssVars = Object.keys(envVars).filter((item) => item.startsWith(PREFIX));

   if(rssVars.length === 0) {
      console.log('Error:', ABSENT_VARS_ERROR_MESSAGE);
      return;
   }

   const result = rssVars.map((item) => `${item}=${envVars[item]}`).join('; ');

   console.log('Result:', result);
};

parseEnv();