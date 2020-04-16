function serializeJson(form){
    var formData = form.serializeArray()
    let result = {}
    formData.forEach(item=>{
        result[item.name] = item.value
    })
    return result
}