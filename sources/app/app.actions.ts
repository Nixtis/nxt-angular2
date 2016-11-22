export class AppActions {
    public static SET_APP_STATE: string = 'SET_APP_STATE'

    public static setAppState (state: any) {
        return {
            state,
            type: AppActions.SET_APP_STATE,
        }
    }
}
