const app = document.getElementById('app')

const addItem = function(item) {
    const templateDiv = document.createElement('div')
    
    cache[item.id] = item.url
        const button = `<button type="button" class="collapsible">${item.title}</button>`
        
        var form = `
            <form>
                <br>
        `
        const fields = item.fields
        fields.forEach((field) => {
            if (field.default != null) {
                cache[item.id][field.id] = field.default
            }
            const label = field.label
            const type = field.type
            const id = field.id
            
            if (type == "text") {
                form += `
                    <label for="${id}">${label}</label>
                    <input type="text" id="${id}" name="${label}" oninput="inputHandler(this, ${item.id}, ${id})"><br><br>
                    `
            }
            if (type == 'select') {


                form +=`
                    <label for="${id}">${label}</label>
                    <select name="${label}" id="${id}" onchange="inputHandler(this, ${item.id}, ${id})">
                `

                const options = field.options
                options.forEach((option) => {
                    form +=`
                    <option value="${option.value}">${option.label}</option>
                    `
                })


                form += '</select><br><br>'
            }

            
        })
        
        form += `</form><a target="_blank" id="item-${item.id}" href="${cache[item.id].join('')}">${cache[item.id].join('')}<br><br></div>`
        
        
        const content = `<div class="content">${form}</div>`
        templateDiv.innerHTML += `${button}${content}`
        app.appendChild(templateDiv)

}