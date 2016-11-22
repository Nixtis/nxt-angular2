import 'core-js/client/shim.min.js'
import 'reflect-metadata'
import 'zone.js/dist/zone.js'

/**
 * Production mode
 */
import { enableProdMode } from '@angular/core'
if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

import { Bootstrap } from './app'

Bootstrap()

if (module['hot']) {
    module['hot'].accept()
}
