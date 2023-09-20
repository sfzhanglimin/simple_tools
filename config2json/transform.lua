cc = {}
cc.p = function (x,y)
    return {x = x,y = y}
end

--此处TR只为标记, 以便工具提取  但是加载的时候配置不需要翻译
TR = function(str_)
    return str_
end

local json = require("./json")

convert = function (aPath)
    local result = require(aPath)

    local decode = json.encode(const_game)
    local file = io.open("./temp/const_game.json","w")
    file:write(decode)
    file:flush()
    file:close()
end





