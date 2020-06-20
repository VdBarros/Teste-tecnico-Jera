import { http } from './config'

export default {
    //Metodos get
    fetchWatchlist: ($id) => {
        const $api_key = "4b89e775366b99fd7af4392e021ddf3f"
        const $language = "pt-BR"
        return http.get('movie/' + $id + '?api_key=' + $api_key + '&language=' + $language)
    },

    fetchSearch: ($query) => {
        var $category = "search"
        const $api_key = "4b89e775366b99fd7af4392e021ddf3f"
        const $language = "pt-BR"
        return http.get($category + '/movie?api_key=' + $api_key + '&language=' + $language + '&query=' + $query)
    },

}