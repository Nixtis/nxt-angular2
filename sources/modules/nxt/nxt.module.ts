import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'

import { NxtAlertComponent } from './nxt-alert'
import { NxtAnalyticsGoogleService } from './nxt-analytics'
import { NxtApiService } from './nxt-api'
import { NxtChartComponent } from './nxt-chart'
import { NxtDynamicModuleService } from './nxt-dynamic-module/nxt-dynamic-module.service'
import {
    NxtCheckboxComponent,
    NxtFileComponent,
    NxtFormService,
    NxtInputComponent,
    NxtRadioComponent,
    NxtRadioItemComponent,
    NxtSelectComponent,
    NxtSelectOptionComponent,
    NxtSwitchComponent,
    NxtTextareaComponent,
} from './nxt-form'
import { NxtGamesComponent, NxtGamesOutletComponent, NxtSnakeComponent } from './nxt-games'
import { NxtMapComponent, NxtMapService } from './nxt-map'
import { NxtModalComponent, NxtModalService } from './nxt-modal'
import { NxtOrderByPipe } from './nxt-pipes'
import { NxtToastComponent, NxtToastContainerComponent, NxtToastService } from './nxt-toast'
import { NxtTooltipComponent, NxtTooltipDirective, NxtTooltipService } from './nxt-tooltip'
import { NxtTranslatePipe, NxtTranslateService } from './nxt-translate'

export const components = [
    NxtAlertComponent,
    NxtChartComponent,
    NxtCheckboxComponent,
    NxtFileComponent,
    NxtGamesComponent,
    NxtGamesOutletComponent,
    NxtInputComponent,
    NxtMapComponent,
    NxtModalComponent,
    NxtOrderByPipe,
    NxtRadioComponent,
    NxtRadioItemComponent,
    NxtSelectComponent,
    NxtSelectOptionComponent,
    NxtSnakeComponent,
    NxtSwitchComponent,
    NxtTextareaComponent,
    NxtToastComponent,
    NxtToastContainerComponent,
    NxtTooltipComponent,
    NxtTooltipDirective,
    NxtTranslatePipe,
]

@NgModule({
    declarations: components,
    entryComponents: [ NxtGamesComponent, NxtModalComponent, NxtSnakeComponent, NxtToastContainerComponent, NxtTooltipComponent ],
    exports: components,
    imports: [ BrowserModule, FormsModule, HttpModule ],
    providers: [
        NxtAnalyticsGoogleService,
        NxtApiService,
        NxtDynamicModuleService,
        NxtFormService,
        NxtMapService,
        NxtModalService,
        NxtToastService,
        NxtTooltipService,
        NxtTranslateService,
    ],
})

export class NxtModule {}
