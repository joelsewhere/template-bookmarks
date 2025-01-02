const cache = {}
var elementCount = 1
var template = []

const newElementTemplate = function() {
    return  {
            'title': null,
            'url': [],
            'id': null,
            'fields': []
        }
    }

const newTemplateController = function(app) {

    
    const button = `<button type="button" class="collapsible">+ Add New Template</button>`
    const content = newTemplateForm()
    const newTemplateDiv = document.createElement('div')
    newTemplateDiv.id = 'new-template-controller'
    newTemplateDiv.innerHTML += `${button}${content}`
    app.appendChild(newTemplateDiv);

}


const newTemplateForm = function() {

    const content = `<div class="content">

    <form id="new-template">
        <br>
        <label for="new-title">Template title:</label>
        <input type="text" id="new-title" name="new-title" oninput="this.size = this.value.length"><br>
        <p>URL: <code id="new-url-display"></code></p><br>
        <button id="save" type="button">Save Template</button><br>
        <br><br>
        <div id="new-element-container-${elementCount}">
        ${urlPartType(elementCount)}
        </div>
        </div>
    </form>
    
    </div>`

    return content

}

const urlPartType = function(partNumber) {
    typeSelector = `
    
    <button type="button" class="collapsible url-part"><center id="part-title-${partNumber}">+ URL Part</center></button>
    <div id="new-element-${partNumber}" class="content">
    <p>URL Element ${partNumber}:</p>
    <input type="radio" id="static-${partNumber}" name="type" value="static" onclick="addElementSetter(this)">
    <label for="static-${partNumber}">Static Part</label>
    <input type="radio" id="template-${partNumber}" name="type" value="template" onclick="addElementSetter(this)">
    <label for="template-${partNumber}">Template Part</label><br><br>
    </div>
    `

    return typeSelector
}

const updateTitle = function(control, isTemplateField=false) {
    control.size = control.value.length
    const title = document.getElementById(`part-title-${elementCount}`)
    var value = control.value
    if (isTemplateField == true) {
        value = '{' + value + '}'
    }
    title.innerHTML = value
    template[elementCount-1] = value
    document.getElementById("new-url-display").innerHTML = template.join('')
}

const addElementSetter = function(control) {
    const setterID = `new-element-setter-type-${elementCount}`
    if (document.getElementById(`new-element-setter-${elementCount}`) != null) {
        document.getElementById(`new-element-setter-${elementCount}`).remove()
    }
    const elementForm = document.getElementById(`new-element-${elementCount}`)
    const setterOuter = document.createElement('div')
    const setter = document.createElement('div')
    setterOuter.id = `new-element-setter-${elementCount}`
    setter.id = setterID
    setterOuter.appendChild(setter)
    if (control.value == 'static') {
        const innerHTML = `
        <label for="setter-${elementCount}">Enter the static url part</label>
        <input type="text" id="setter-${elementCount}" oninput="updateTitle(this)">
        `
        setter.innerHTML = innerHTML
    } else {

        setter.innerHTML = templateType(elementCount)

    }

    elementForm.appendChild(setterOuter)

}


const templateType = function(partNumber) {

    typeSelector = `
            <div>
            <p>Select an input type:</p>
            <input type="radio" id="text-${partNumber}" name="template-type" value="text" onclick="setterInput(this)">
            <label for="text-${partNumber}">Text Input</label>
            <input type="radio" id="dropdown-${partNumber}" name="template-type" value="dropdown" onclick="setterInput(this)">
            <label for="dropdown-${partNumber}">Dropdown Input</label><br>
            </div><br>
            `

            return typeSelector
}

const setterInput = function(control) {
    const inputID = `new-element-setter-input-${elementCount}`
    if (document.getElementById(inputID) != null) {
        document.getElementById(inputID).remove()
    }
    const elementForm = document.getElementById(`new-element-setter-${elementCount}`)
    const input = document.createElement('div')
    input.id = inputID
    if (control.value == 'text') {
        innerHTML = `

        <label for="new-element-${elementCount}-label">Template Field Name:</label>
        <input type="text" id="new-element-${elementCount}-label" oninput="updateTitle(this, isTemplateField=true)"><br><br>
        <label for="new-element-${elementCount}-text-default">[Optional] Set a default value</label>
        <input type="text" id="new-element-${elementCount}-text-default" oninput="this.size = this.value.length"><br><br>
        <button>Create Template</button>

        `

        input.innerHTML = innerHTML
    } else {
        innerHTML = `

        <label for="new-element-${elementCount}-label">Template Field Name:</label>
        <input type="text" id="new-element-${elementCount}-label" oninput="updateTitle(this, isTemplateField=true)"><br><br>
        <label for="new-element-${elementCount}-dropdown-options">Enter options seperated by a comma</label>
        <input type="text" id="new-element-${elementCount}-dropdown-options" oninput="this.size = this.value.length"><br><br>
        <button>Create Template</button>

        `

        input.innerHTML = innerHTML

    }

    elementForm.appendChild(input)

    
}