//migrate sql to neon

import { db } from "./index"
import { migrate } from "drizzle-orm/neon-http/migrator"

//if error: then change the dns server from control panel
const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'src/db/migrations'
    })
    console.log('Migration completed')
  } catch (error) {
    console.error(error)
  }
}

main()
