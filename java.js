document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk smooth scrolling ketika klik link navigasi
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah perilaku default dari link

            // Hapus kelas 'active' dari semua link
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
            });

            // Tambahkan kelas 'active' ke link yang diklik
            this.classList.add('active');

            const targetId = this.getAttribute('href'); // Dapatkan ID target dari atribut href (misal: "#home")
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll ke bagian target dengan efek halus
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Sesuaikan dengan tinggi header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Opsional: Menandai link aktif saat halaman di-scroll (Intersection Observer API)
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;

    const observerOptions = {
        root: null, // Mengamati viewport
        rootMargin: `-${headerHeight}px 0px -50% 0px`, // Margin root agar lebih akurat saat scroll
        threshold: 0 // Ambang batas 0 berarti segera setelah elemen masuk viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus kelas 'active' dari semua link
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });

                // Tambahkan kelas 'active' ke link yang sesuai dengan bagian yang terlihat
                const activeLink = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});