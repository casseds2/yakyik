export default {

    thumbnail: (url, dimension) => {
        let thumbParams = 'upload/c_thumb,h_'+dimension+',w_'+dimension+',x_0,y_0'
        return url.replace('upload', thumbParams)
    }
}
