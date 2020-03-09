class Footer {

    build() {
        const footer = document.getElementById('footer');
        const footer_small = document.createElement('small');
        footer_small.classList.add('text-muted', 'sans-serif');
        const footer_text = "Made with <i class=\"material-icons md-16 md-dark favorite\">favorite</i> in Atlanta";
        footer_small.innerHTML = footer_text;
        footer.appendChild(footer_small);
    }

}
