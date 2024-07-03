document.querySelector("#search-bar-input").addEventListener('keyup',function(e){
    let search_term = e.target.value
    setTimeout(reload_results,1000,search_term)
})


function reload_results(search_term){
    console.log(search_term)
    fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(search_term)}&resources[options][fields]=title,product_type,variants.title,tag&section_id=quick-search`)
        .then((response) => {
          if (!response.ok) {
            var error = new Error(response.status);
            this.close();
            throw error;
          }
  
          return response.text();
        })
        .then((text) => {
          const resultsMarkup = new DOMParser()
            .parseFromString(text, 'text/html')
            .querySelector('#predsearch').innerHTML;
          // Save bandwidth keeping the cache in all instances synced
          document.querySelector("#predsearch").innerHTML = resultsMarkup
        })
        .catch((error) => {
          if (error?.code === 20) {
            // Code 20 means the call was aborted
            return;
          }
          this.close();
          throw error;
        });
}