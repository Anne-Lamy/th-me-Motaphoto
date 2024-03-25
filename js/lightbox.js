document.addEventListener('DOMContentLoaded', function () {
    
    class lightbox {
        // Initialiser la lightbox.
        static init() {
            // Récupérer le lien "screen-link" qui ouvre la lightbox.
            const screenLinks = document.querySelectorAll('.screen-link');
            Array.forEach(link => { link.addEventListener('click', e => { // On lance une fonction qui prendra en paramètre l'évènement.
                e.preventDefault() //Stopper le comporetment par défaut
                // initialise la lightbox.
                new lightbox(e.currentTarget.getAttribute(screenLinks)) // Récupére l'évènement (l'url), le lien actuel cliqué et séléctionne l'attribut (l'url de mon lien).

            })
                
            });
        }

        /**
        * @param {string} url url de mon lien.
        */

        constructor (url) {
            // Construction du dom à partir de l'url dans une constante element.
            const element = this.buildDom(url)
            // Récupère le body et lui ajoute element.
            document.body.appendChild(element)
        }

                /**
        * @param {string} url url de mon lien.
        * @returns {HTMLElement}
        */

        buildDom (url) {
            const dom = document.createElement('div')
            dom.classList.add('lightbox')
            dom.innerHTML ='<div id="lightbox" class="lightbox"><button class="lightbox_close"> </button><button class="lightbox_next"> </button><button class="lightbox_prev"> </button><div class="lightbox_container"><?php the_post_thumbnail(); ?></div></div>'
        return dom
        }
    }

    /*
    <div id="lightbox" class="lightbox">

        <button class="lightbox_close"> </button>
        <button class="lightbox_next"> </button>
        <button class="lightbox_prev"> </button>
        <div class="lightbox_container">
            <?php the_post_thumbnail(); ?>
        </div>

    </div>*/

    // Initialise la lightbox dés le changement de la page.
    lightbox.init()

});