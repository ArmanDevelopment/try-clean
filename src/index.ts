import { Application } from "./foundation/Application"
import api from "./routes/api"

async function bootstrap() {
    let app = new Application

    await app.use("/api", api).build()
}

bootstrap()