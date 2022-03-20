import '@config/index'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import { Server } from 'http';


// Constants
const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);


// Start server
const appServer :Server=server.listen(port, () => {
    logger.info(serverStartMsg + port);
});

// setup graceful shutdown 
process.on("SIGINT",()=>{
    appServer.close()
})
