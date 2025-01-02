const app = document.getElementById('app')

chrome.storage.local.get(['templates'], (items) => {
    items.forEach((item) => {
        const templateDiv = document.createElement('div')
        const button = document.createElement('button')
        button.classList.add('collapsible');
        const innerDiv = html`
            <div>

        `



    })
})

/* Form of templates

    - When you click on a template title a form uncollapsed
    - As you type into the form the template should autofill
    - When you have entered the values, the link is also populated and you can click on it
*/