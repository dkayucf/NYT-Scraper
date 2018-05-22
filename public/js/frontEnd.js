(function(){

    let commentBtnArr = Array.from(document.querySelectorAll('.commentButton'));
    
    commentBtnArr.forEach(button => {
        button.addEventListener('click', (e)=>{
            let nextSibling = e.target.parentElement.parentElement.nextElementSibling;
            console.log(nextSibling)
            let articleID = e.target.getAttribute('data-id');
 
            let html = `
            <form method="post" action="/saveComments/${articleID}">
                <div class="input-field col s12">
                    <label for="textarea1">Textarea</label>
                    <textarea id="textarea1" name="comments" class="materialize-textarea"></textarea>
                </div>
                <button type="submit" class="btn yellow darken-3">Save Comment</button>
            </form>`;
            nextSibling.innerHTML = html;
            e.target.style.display = 'none';
        })
    })
    
    

})()