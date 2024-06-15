import { logger } from "./application/logging";
import { web } from "./application/web";

// Digunakan untuk menjalankan aplikasinya 
web.listen(3000, () => {
    logger.info('Listening on port 3000')
});

// Jalankan perintah bun build untuk melakukan compile ke seluruh folder src