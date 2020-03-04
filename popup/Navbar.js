class Navbar {

    build() {

        const nav = document.getElementById('nav');

        nav.classList.add('navbar-expand-lg');
        nav.classList.add('navbar-light');
        nav.setAttribute('style', 'background-color: #fff;');

        const nav_button = document.createElement('button');
        nav_button.classList.add('navbar-toggler');
        nav_button.setAttribute('type', 'button');
        nav_button.setAttribute('data-toggle', 'collapse');
        nav_button.setAttribute('data-target', 'navbar-toggler');
        nav_button.setAttribute('aria-controls', 'navbar-toggler');
        nav_button.setAttribute('aria-expanded', 'false');
        nav_button.setAttribute('aria-label', 'Toggle navigation');
        nav.appendChild(nav_button);

        const nav_button_icon = document.createElement('span');
        nav_button_icon.classList.add('navbar-toggler-icon');
        nav_button.appendChild(nav_button_icon);

        const navbar = document.createElement('div');
        navbar.classList.add('collapse');
        navbar.classList.add('navbar-collapse');
        navbar.setAttribute('id', 'navbarToggler');

        const navbar_brand = document.createElement('a');
        navbar_brand.classList.add('navbar-brand');
        navbar_brand.classList.add('serif');
        navbar_brand.setAttribute('href', 'view_all.html');
        navbar_brand.setAttribute('id', 'navbar-brand');
        navbar_brand.setAttribute('title', 'Accomplishment Box');
        navbar_brand.innerHTML = '🎁 Accomplishment Box';
        navbar.appendChild(navbar_brand);

        const navbar_list = document.createElement('ul');
        navbar_list.classList.add('navbar-nav');
        navbar_list.classList.add('ml-auto');
        navbar_list.classList.add('mr-2');
        navbar_list.classList.add('mt-auto');
        navbar_list.classList.add('mt-lg-0');

        const navbar_list_item_home = document.createElement('li');
        navbar_list_item_home.classList.add('nav-item');
        const navbar_list_item_home_link = document.createElement('a');
        navbar_list_item_home_link.classList.add('nav-link');
        navbar_list_item_home_link.classList.add('sans-serif');
        if (document.title.includes('Home')) {navbar_list_item_home_link.classList.add('active');}
        navbar_list_item_home_link.setAttribute('href', 'view_all.html');
        navbar_list_item_home_link.innerHTML = 'Home ';
        navbar_list_item_home.appendChild(navbar_list_item_home_link);
        navbar_list.appendChild(navbar_list_item_home);

        const navbar_list_item_favorites = document.createElement('li');
        navbar_list_item_favorites.classList.add('nav-item');
        const navbar_list_item_favorites_link = document.createElement('a');
        navbar_list_item_favorites_link.classList.add('nav-link');
        navbar_list_item_favorites_link.classList.add('sans-serif');
        if (document.title.includes('Favorites')) {navbar_list_item_favorites_link.classList.add('active');}
        navbar_list_item_favorites_link.setAttribute('href', 'view_favorites.html');
        navbar_list_item_favorites_link.innerHTML = 'Favorites ';
        navbar_list_item_favorites.appendChild(navbar_list_item_favorites_link);
        navbar_list.appendChild(navbar_list_item_favorites);

        const navbar_list_item_random = document.createElement('li');
        navbar_list_item_random.classList.add('nav-item');
        const navbar_list_item_random_link = document.createElement('a');
        navbar_list_item_random_link.classList.add('nav-link');
        navbar_list_item_random_link.classList.add('sans-serif');
        if (document.title.includes('Random')) {navbar_list_item_random_link.classList.add('active');}
        navbar_list_item_random_link.setAttribute('href', 'view_random.html');
        navbar_list_item_random_link.innerHTML = 'Random ';
        navbar_list_item_random.appendChild(navbar_list_item_random_link);
        navbar_list.appendChild(navbar_list_item_random);

        const navbar_list_item_storage = document.createElement('li');
        navbar_list_item_storage.classList.add('nav-item');
        const navbar_list_item_storage_link = document.createElement('a');
        navbar_list_item_storage_link.classList.add('nav-link');
        navbar_list_item_storage_link.classList.add('sans-serif');
        if (document.title.includes('Storage')) {navbar_list_item_storage_link.classList.add('active');}
        navbar_list_item_storage_link.setAttribute('href', 'manage_storage.html');
        navbar_list_item_storage_link.innerHTML = 'Manage Storage ';
        navbar_list_item_storage.appendChild(navbar_list_item_storage_link);
        navbar_list.appendChild(navbar_list_item_storage);

        const navbar_list_item_export = document.createElement('li');
        navbar_list_item_export.classList.add('nav-item');
        const navbar_list_item_export_link = document.createElement('a');
        navbar_list_item_export_link.classList.add('btn');
        navbar_list_item_export_link.classList.add('btn-outline-primary');
        navbar_list_item_export_link.classList.add('ml-2');
        navbar_list_item_export_link.classList.add('my-2');
        navbar_list_item_export_link.classList.add('my-sm-0');
        navbar_list_item_export_link.setAttribute('href', '#');
        navbar_list_item_export_link.setAttribute('role', 'button');
        navbar_list_item_export_link.setAttribute('id', 'export');
        navbar_list_item_export_link.innerHTML = 'Export ';
        navbar_list_item_export.appendChild(navbar_list_item_export_link);
        navbar_list.appendChild(navbar_list_item_export);

        navbar.appendChild(navbar_list);
        nav.append(navbar);
    }
    
}
