export class AppActions {
    public static SET_LOADING: string = 'SET_LOADING'
    public static SET_LOCATION: string = 'SET_LOCATION'

    public static setLoading (loading: boolean) {
        return {
            loading,
            type: AppActions.SET_LOADING,
        }
    }

    public static setLocation (location: string) {
        return {
            location,
            type: AppActions.SET_LOCATION,
        }
    }
}
