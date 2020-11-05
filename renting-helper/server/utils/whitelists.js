const whitelists = {
    user: [
        'type',
        'name',
        'email',
        'birthday',
        'services',
        'state',
        'image'
    ].reduce((obj, key) => {
        obj[key] = true;
        return obj;
    }, {}),
    author: [
        'name',
        'state',
        'image'
    ].reduce((obj, key) => {
        obj[key] = true;
        return obj;
    }, {})
}



module.exports = whitelists