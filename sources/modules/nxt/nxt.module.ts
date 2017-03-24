import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'

import { NxtAlertComponent } from './nxt-alert'
import { NxtAnalyticsGoogleService } from './nxt-analytics'
import { NxtApiService } from './nxt-api'
import { NxtChartComponent } from './nxt-chart'
import { NxtCountdownComponent } from './nxt-countdown'
import { NxtDatepickerComponent } from './nxt-datepicker'
import { NxtDynamicModuleService } from './nxt-dynamic-module/nxt-dynamic-module.service'
import {
    NxtCheckboxComponent,
    NxtFileComponent,
    NxtFormDirective,
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
import { NxtModalComponent, NxtModalService } from './nxt-modal'
import { NxtOrderByPipe } from './nxt-pipes'
import { NxtToastComponent, NxtToastContainerComponent, NxtToastService } from './nxt-toast'
import { NxtTooltipComponent, NxtTooltipDirective, NxtTooltipService } from './nxt-tooltip'
import { NxtTranslatePipe, NxtTranslateService } from './nxt-translate'

export const components = [
    NxtAlertComponent,
    NxtChartComponent,
    NxtCheckboxComponent,
    NxtCountdownComponent,
    NxtDatepickerComponent,
    NxtFileComponent,
    NxtFormDirective,
    NxtGamesComponent,
    NxtGamesOutletComponent,
    NxtInputComponent,
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
    imports: [ CommonModule, BrowserModule, FormsModule, HttpModule ],
    providers: [
        NxtAnalyticsGoogleService,
        NxtApiService,
        NxtDynamicModuleService,
        NxtFormService,
        NxtModalService,
        NxtToastService,
        NxtTooltipService,
        NxtTranslateService,
    ],
})

export class NxtModule {}
