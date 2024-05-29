
document.addEventListener('astro:page-load', () => {
    const btn = document.querySelectorAll("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");
    const menuclose = document.querySelector(".mobile-menu-close");

    



    if(btn!=null){
        // Add Event Listeners
        

        [].forEach.call(btn, function(div) {
            // do whatever
            div.addEventListener("click", () => {
                menu.classList.toggle("hidden");
                menu.classList.toggle("active");
            });
          });

    }

    if(menuclose!=null){
        menuclose.addEventListener("click", () => {
            document.querySelector(".mobile-menu").classList.remove("active");
        });
    }
});