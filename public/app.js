function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

$(document).ready(function () {
    setActive("getPlaylist");
    $("input").on('input', fixUrl);
})

var routeInfo = {
    createPlaylist: {
        baseUrl: "/api/playlists",
        method: "POST",
        data: [
            {
                title: "title",
                default: "playlist title"
            },
            {
                title: "user",
                default: "5c474486116a07084f7082ef"
            },
            {
                title: "description",
                default: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus ut dolorum eius fugit officia quia repellendus magni debitis labore quaerat."
            }
        ]
    },
    getPlaylists: {
        baseUrl: "/api/playlists",
        method: "GET"
    },
    getPlaylist: {
        baseUrl: "/api/playlists",
        method: "GET",
        parameter: [{
            title: "id",
            default: "5c50765a4f58cc4b8f5ecc12"
        }]
    },
    updatePlaylist: {
        baseUrl: "/api/playlists",
        method: "PUT",
        parameter: [{
            title: "id",
            default: "5c50765a4f58cc4b8f5ecc12"
        }],
        data: [
            {
                title: "title",
                default: "playlist title"
            },
            {
                title: "user",
                default: "5c474486116a07084f7082ef"
            },
            {
                title: "description",
                default: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus ut dolorum eius fugit officia quia repellendus magni debitis labore quaerat."
            }
        ],
    },
    deletePlaylist: {
        baseUrl: "/api/playlists",
        method: "DELETE",
        parameter: [{
            title: "id",
            default: "5c50765a4f58cc4b8f5ecc12"
        }]
    },
    createUser: {
        baseUrl: "/api/users",
        method: "POST",
        data: [
            {
                title: "display_name",
                default: "username"
            },
            {
                title: "spotify_id",
                default: "wizzler"
            },
            {
                title: "image_url",
                default: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg"
            }
        ]
    },
    getUsers: {
        baseUrl: "/api/users",
        method: "GET"
    },
    getUser: {
        baseUrl: "/api/users",
        method: "GET",
        parameter: [{
            title: "id",
            default: "5c474486116a07084f7082ef"
        }]
    },
    updateUser: {
        baseUrl: "/api/users",
        method: "PUT",
        parameter: [{
            title: "id",
            default: "5c474486116a07084f7082ef"
        }],
        data: [
            {
                title: "display_name",
                default: "username"
            },
            {
                title: "spotify_id",
                default: "wizzler"
            },
            {
                title: "image_url",
                default: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg"
            }
        ],
    },
    deleteUser: {
        baseUrl: "/api/users",
        method: "DELETE",
        parameter: [{
            title: "id",
            default: "5c474486116a07084f7082ef"
        }]
    },
    searchLocation: {
        baseUrl: "/api/search/location",
        method: "GET",
        query: [
            {
                title: "latitude",
                default: "0"
            },
            {
                title: "longitude",
                default: "0"
            }
        ]
    }
}

var url = "";
var data = {};
var obj;

function setActive(id) {
    clearForm();
    obj = routeInfo[id];

    if (obj.parameter) {
        formGroup("parameters", obj.parameter);
    }
    if (obj.query) {
        formGroup("query", obj.query);
    }
    if (obj.data) {
        formGroup("data", obj.data);
    }
    $("input").on('input', fixUrl);
    fixUrl()
}


function fixUrl() {
    let queryObj = {}

    url = obj.baseUrl;
    
    $("input").each(function (index, item) {
        if ($(item).hasClass("parameters")) {
            url += "/" + $(item).val()
        }
        if ($(item).hasClass("query")) {
            queryObj[$(item).attr('id')] = $(item).val()
        }
        if ($(item).hasClass("data")) {
            data[$(item).attr('id')] = $(item).val()
        }
    })
    console.log(queryObj)
    if (Object.keys(queryObj).length > 0) {
        url += "?"  + $.param(queryObj);
    }
    $(".settings h4").text(url);
}

function clearForm() {
    $("form").empty();
}


function formGroup(name, group) {
    $("form").append("<h3>"+ name +"</h3>")
    for (item of group) {
        $("form").append("<label for='"+ item.title +"'>"+ item.title +": </label>");
        $("form").append("<input class='"+name+"' type='text' id='"+ item.title +"' value='" + item.default + "'>");
    }
}

function submitAjax() {
    var codeElement = $("#JSON");
    $.ajax({
        url: url,
        type: obj.method,
        success: function (result) {
            console.log(result)
            codeElement.html(syntaxHighlight(result))
        }
    }).catch(function(err) {
        codeElement.html(err)
    })
}