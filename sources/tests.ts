import 'core-js'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy'
import 'zone.js/dist/sync-test'
import 'zone.js/dist/async-test'
import 'zone.js/dist/jasmine-patch'

import { getTestBed  } from '@angular/core/testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'

getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
)

const context = (require as any).context('./', true, /\.spec\.ts$/)
context.keys().map(context)
