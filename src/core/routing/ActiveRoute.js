export class ActiveRoute {
    static get path() {
        return window.location.hash.slice(1)
    }

    static get params() {
        return ActiveRoute.path.split('/')
    }

    static navigate(path) {
        window.location.hash = path
    }
}