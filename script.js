let output = document.querySelector("#output");
let allInput = document.querySelectorAll(".left textarea");
let htmlcode = '', csscode = '', jscode = '';

allInput.forEach((el, index) => {
    el.addEventListener("keyup", (event) => {
        let value = el.value;
        let startPos = el.selectionStart;
        
        if (index == 0 && event.key === ">") { // For HTML textarea and when ">" is typed
            if (value[startPos - 2] !== "/") { // Skip self-closing tags
                let openTag = value.slice(value.lastIndexOf("<", startPos) + 1, startPos - 1).split(" ")[0];
                if (openTag && !value.includes(`</${openTag}>`, startPos)) { // Only for non-attribute tags and avoid duplicate closing tags
                    el.value = value.slice(0, startPos) + `</${openTag}>` + value.slice(startPos);
                    el.selectionStart = startPos;
                    el.selectionEnd = startPos;
                }
            }
        }
        
        if (index == 1 && event.key === "{") { // For CSS textarea and when "{" is typed
            el.value = value.slice(0, startPos) + `\n\n}` + value.slice(startPos);
            el.selectionStart = startPos + 1;
            el.selectionEnd = startPos + 1;
        }

        if (index == 0) {
            htmlcode = el.value;
        }
        if (index == 1) {
            csscode = el.value;
        }
        if (index == 2) {
            jscode = el.value;
        }

        // Bind the HTML code into the iframe's body
        output.contentDocument.body.innerHTML = htmlcode;

        // Bind the CSS code into the iframe's head
        output.contentDocument.head.innerHTML = `<style>${csscode}</style>`;

        // Bind the JS code into the iframe
        let script = output.contentDocument.createElement('script');
        script.innerHTML = jscode;
        output.contentDocument.body.appendChild(script);
    });
});
