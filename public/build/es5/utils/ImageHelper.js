"use strict";

module.exports = {

    thumbnail: function (url, dimension) {
        var thumbParams = "upload/c_thumb,h_" + dimension + ",w_" + dimension + ",x_0,y_0";
        return url.replace("upload", thumbParams);
    }
};