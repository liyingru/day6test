function ajax(opt) {
    var json = opt || {};
    var url = json.url;
    if (!url) {
        return;
    }
    var type = json.type || 'get';
    var data = json.data || {};
    var async = json.async === false ? json.async : true;

    var arr = [];
    for (var i in data) {
        arr.push(i + '=' + data[i])
    }
    var params = arr.join('&');

    var xml = new XMLHttpRequest();
    xml.open(type, url, async);
    xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
            if (xml.status === 200) {
                try {
                    typeof json.success === 'function' && json.success(JSON.parse(xml.responseText));
                } catch (e) {
                    typeof json.success === 'function' && json.success(xml.responseText);
                }
            }
        }
    }
    switch (type.toUpperCase()) {
        case 'GET':
            url = json.data ? url + '?' + params : url;
            xml.open(type, url, async);
            xml.send();
            break;
        case 'POST':
            xml.open(type, url, async);
            xml.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xml.send(params);
            break;
    }
}