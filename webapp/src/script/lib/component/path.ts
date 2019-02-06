// Generated by CoffeeScript 1.8.0
const uriregexp = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?');
const pathReg = /(.*\/)?([^\/]+?)(\.[^\/\.]+)?$/i
export const dirname = function (path) {
    return normalize(path.match(pathReg)[1])
}
export const basename = function (path) {
    var match = path.match(pathReg)
    return match[2] + match[3]
}
export const extname = function (path) {
    var match = path.match(pathReg)
    return match[3]
}
export const normalize = function (path) {
    var segs = path.split("/");
    var result = [];
    var offset = 0;
    segs.forEach(function (seg, index) {
        if (seg == "..") {
            if (result.length > offset) {
                result.pop();
            } else {
                result.push("..");
            }
        } else if (seg == ".") {
            return
        } else if (seg) {
            result.push(seg)
        } else if (index < segs.length - 1 && index != 0) {
            return
        } else {
            result.push("");
        }
    })
    return result.join("/");
}
export const join = function () {
    var args = [].slice.call(arguments, 0)
    return normalize(args.join("/"))
}
